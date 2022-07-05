/* eslint-disable react/jsx-key */
import { AssetsJson, ProjectSchema } from '@alilc/lowcode-types'
import { buildComponents } from '@alilc/lowcode-utils'
import { Spin } from 'antd'
import React, { useState } from 'react'
import Frame, { FrameContextConsumer, useFrame } from 'react-frame-component'
import { material } from '@alilc/lowcode-engine'
import { useAsyncEffect } from 'ahooks'
import { injectComponents } from '@alilc/lowcode-plugin-inject'
import ReactRenderer from '@alilc/lowcode-react-renderer'
import { loadCss, loadJs } from '../../helper'
import './index.less'

interface IProps {
  projectSchema?: ProjectSchema
}

const Renderer: React.FC<IProps> = ({ projectSchema }) => {
  const { document } = useFrame()

  const [loading, setLoading] = useState(true)
  const [components, setComponents] = useState()
  const { componentsTree, componentsMap: componentsMapArr } = projectSchema

  const schema = componentsTree[0]

  const componentsMap = componentsMapArr.reduce((prev, cur) => {
    return {
      ...prev,
      [cur.componentName]: cur
    }
  }, {})

  useAsyncEffect(async () => {
    const { packages } = material.getAssets() as AssetsJson
    const libMap = {}
    const cssAssets: string[] = []
    const jsAssets: string[] = []

    packages.forEach(({ urls, package: pkgName, library }) => {
      libMap[pkgName] = library
      if (typeof urls === 'string') {
        if (urls.endsWith('.css')) {
          cssAssets.push(urls)
          return
        }
        if (urls.endsWith('.js')) {
          jsAssets.push(urls)
        }
        return
      }
      if (Array.isArray(urls)) {
        urls.forEach((url) => {
          if (typeof url !== 'string') return
          if (url.endsWith('.css')) {
            cssAssets.push(url)
            return
          }
          if (url.endsWith('.js')) {
            jsAssets.push(url)
          }
        })
      }
    })

    await Promise.all([
      ...cssAssets.map((url) => loadCss(url, document)),
      ...[
        'https://g.alicdn.com/code/lib/react/18.0.0/umd/react.production.min.js',
        'https://g.alicdn.com/code/lib/react-dom/18.0.0/umd/react-dom.production.min.js',
        'https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js',
        'https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js',
        'https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js',
        'https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js',
        'https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.js'
      ]
        .concat(jsAssets)
        .map((url) => loadJs(url, document))
    ])
    const components = await injectComponents(
      buildComponents(libMap, componentsMap, null)
    )
    console.log('components:', components)
    setComponents(components)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div>
        <Spin />
      </div>
    )
  }

  return <ReactRenderer schema={schema} components={components} />
}

const PreviewFrame: React.FC<IProps> = ({ projectSchema }) => {
  // 获取ReactRenderer的参数
  return (
    <Frame className="preview-iframe">
      <FrameContextConsumer>
        {() => <Renderer projectSchema={projectSchema} />}
      </FrameContextConsumer>
    </Frame>
  )
}

export default PreviewFrame
