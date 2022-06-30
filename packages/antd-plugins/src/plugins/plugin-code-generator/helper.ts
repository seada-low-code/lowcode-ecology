import { ProjectSchema } from '@alilc/lowcode-types'
import { cloneDeep } from 'lodash'
import coerce from 'semver/functions/coerce'
import { FlattenFile } from '@alilc/lowcode-code-generator/types/types/file.d'
import { Code, IFile } from './types'

export function fixSchema(schema: ProjectSchema): ProjectSchema {
  const copied = cloneDeep(schema)
  copied.componentsMap = copied.componentsMap
    // 去掉没有package的组件
    .filter((item) => item['package'])
    .map((item) => {
      // 修正版本号，对于没有有效版本号的组件，默认使用latest
      return item
    })
  return copied
}

export function fixPreviewCode(code: Code) {
  if (!code) {
    console.warn('code cannot be empty')
    return
  }
  const fixedModules: Code['modules'] = Object.entries(code.modules || {})
    .filter((item) => {
      // 去掉隐藏文件、html以及 md 等无用文件
      const path = item[0]
      return (
        !path.startsWith('/.') &&
        !path.endsWith('.html') &&
        !path.endsWith('.md')
      )
    })
    .map((item) => {
      // 将 jsx 改为 js
      const [path, module] = item
      return [path.replace(/\.jsx$/, '.js'), module]
    })
    .reduce((prev, cur) => {
      const [path, module] = cur as [string, IFile]
      return {
        ...prev,
        [path]: {
          ...module,
          fpath: path,
          code: (module.code as string)
            // 所有的 import xxx from '@/yyy' 转换为 import xxx from '/src/yyy'
            .replace(
              /import\s+([^\s]+)\s+from\s+['"]@\/([^'"]+)['"]/g,
              function (_, name, path) {
                return 'import ' + name + " from '/src/" + path + "'"
              }
            )
            // 所有的 import styles from 'xxx.scss' 转换为 import styles from '/src/xxx.css'
            .replace(
              /import\s+([^\s]+)\s+from\s+['"]([^'"]+)\.scss['"]/g,
              function (_, name, path) {
                return 'import ' + name + " from '" + path + ".css'"
              }
            )
        }
      }
    }, {})
  const fixedCode: Code = {
    ...code,
    modules: fixedModules
  }
  fixedCode.modules['/src/app.js'] = {
    ...fixedCode.modules['/src/app.js'],
    code:
      "\n// 为了方便在浏览器中进行预览，这里简化了一些内容\nimport './shims';\nimport './global.css';\n\nimport React from 'react';\nimport ReactDOM from 'react-dom';\n\nimport Page from '" +
      Object.keys(fixedModules).find((fpath) => {
        return fpath.startsWith('/src/pages')
      }) +
      "';\n\nReactDOM.render(<Page/>, document.getElementById('root'));\n"
  }
  fixedCode.modules['/src/shims.js'] = {
    fpath: '/src/shims.js',
    code: "\n// 一些垫片代码，用来解决直接在浏览器中进行预览的问题\nimport PropTypes from 'prop-types';\n\nwindow.PropTypes = PropTypes;\n"
  }
  fixedCode.modules['/package.json'] = {
    ...fixedCode.modules['/package.json'],
    code: JSON.stringify({
      name: 'demo',
      version: '1.0.0',
      dependencies: {
        react: '^16.8.3',
        'react-dom': '^16.8.3',
        ...JSON.parse(fixedCode.modules['/package.json'].code as string)
          .dependencies
      }
    })
  }
  fixedCode.modules = pickKeys(
    fixedCode.modules,
    [
      // '/tsconfig.json',
      // '/jsconfig.json',
      // '/build.json',
      // '/abc.json',
      '/package.json',
      '/src/routes.js',
      '/src/app.js',
      '/src/constants.js',
      '/src/utils.js',
      '/src/i18n.js',
      '/src/global.css',
      '/src/index.js',
      '/src/shims.js'
    ].concat(
      Object.keys(fixedModules).filter((fpath) =>
        fpath.startsWith('/src/pages/')
      )
    )
  )
  fixedCode.modules['/src/routes.js'] = {
    ...fixedCode.modules['/src/routes.js'],
    code: '\n'
  }
  fixedCode.modules['/src/global.css'] = {
    fpath: '/src/global.css',
    code: '\nbody {\n  -webkit-font-smoothing: antialiased;\n}\n'
  }
  Object.assign(fixedCode.modules, {
    '/src/index.html': {
      code: '<div id="root"></div>',
      fpath: '/src/index.html'
    },
    '/src/index.less': {
      fpath: '/src/index.less',
      code: '\n@import "~antd/dist/antd.css";\n'
    }
  })
  fixedCode.type = 'riddle'
  return fixedCode
}

export async function createCodeSandbox(parameters) {
  const res = await fetch(
    'https://codesandbox.io/api/v1/sandboxes/define?json=1',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(parameters)
    }
  )
  return res.json()
}

export function isValidVersion(version) {
  if (
    !version ||
    version === '{{version}}' ||
    version === 'null' ||
    version === 'undefined'
  ) {
    return false
  }
  // 对于 latest/beta/rc 这样的 tag 版本号要支持下
  if (/^[a-z][a-z0-9]+([a-z0-9-]+)?$/i.test(version)) {
    return true
  }
  // 支持所有 semver 能识别的版本
  return coerce(version) !== null
}

export function pickKeys(data, keys) {
  return keys.reduce(function (acc, key) {
    if (data[key]) {
      return {
        ...acc,
        [key]: data[key]
      }
    }
    return acc
  }, {})
}

export function fixResult(originResult: FlattenFile[]) {
  const result = cloneDeep(originResult)
  // 不知道为什么只有components目录而没有pages目录，先hard code将components的数据写进去好了
  result.forEach((item) => {
    const { pathName, content } = item
    if (pathName.startsWith('src/components')) {
      const path = pathName.slice(14)
      result.push({
        pathName: `src/pages/${path}`,
        content: content || '\n' // 如果为空在codesandbox会显示为文件夹，所以写个换行符进去
      })
    }
  })
  return result
}
