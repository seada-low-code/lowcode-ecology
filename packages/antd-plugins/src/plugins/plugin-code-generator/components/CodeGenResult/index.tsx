import React, { useEffect, useState } from 'react'
import * as CodeGenerator from '@alilc/lowcode-code-generator/standalone-loader'
import { ProjectSchema } from '@alilc/lowcode-types'
import { Collapse } from 'antd'
import SourceView from '../SourceView'
import CodeGenPreview from '../CodeGenPreview'

const { Panel } = Collapse

export interface ICodeGenResultProps {
  result?: CodeGenerator.Result
  schema?: ProjectSchema
}

const CodeGenResult: React.FC<ICodeGenResultProps> = ({ result, schema }) => {
  const [code, setCode] = useState<any>()

  useEffect(() => {
    setCode(getCodeFromResult(result, schema))
  }, [result])

  function getCodeFromResult(
    result: CodeGenerator.Result,
    schema: ProjectSchema
  ) {
    const schemaFiles = {
      '/.project-schema.json': {
        fpath: '/.project-schema.json',
        code: JSON.stringify(schema, null, 2) + '\n'
      }
    }
    if (!Array.isArray(result) || !result.length) {
      return {
        type: 'demo',
        modules: schemaFiles
      }
    }
    const code = {
      type: 'demo',
      modules: result.reduce<any>((prev, cur) => {
        return {
          ...prev,
          [`/${cur.pathName}`]: {
            fpath: `/${cur.pathName}`,
            code: cur.content,
            packagejson: ['package.json'].includes(cur.pathName) ? 1 : undefined
          }
        }
      }, {})
    }
    let foundEntry = false // 是否找到入口文件标识
    const entryNameList: string[] = [
      'index.js',
      'index.ts',
      'index.tsx',
      'app.js',
      'app.ts',
      'app.tsx'
    ]
    for (const name of entryNameList) {
      const filePath = `/src/${name}`
      if (code.modules[filePath]) {
        foundEntry = true
        if (name === 'index.js') {
          code.modules[filePath].entry = 1
        } else {
          code.modules['/src/index.js'] = {
            fpath: '/src/index.js',
            entry: 1,
            code: 'import "./' + name.replace(/\.\w+$/, '') + '"'
          }
        }
        break
      }
    }
    if (!foundEntry) {
      if (!foundEntry) {
        console.warn('Failed to find entry file for demo.')
      }
    }
    return { ...code, ...schemaFiles }
  }

  if (!result) return null

  return (
    <div className="code-gen-result">
      <Collapse defaultActiveKey={['1', '2']}>
        <Panel key="1" header="源代码">
          {/* 源码视图 */}
          <SourceView />
        </Panel>
        <Panel key="2" header="在线预览">
          {/* codesandbox预览 */}
          <CodeGenPreview />
        </Panel>
      </Collapse>
    </div>
  )
}

export default CodeGenResult
