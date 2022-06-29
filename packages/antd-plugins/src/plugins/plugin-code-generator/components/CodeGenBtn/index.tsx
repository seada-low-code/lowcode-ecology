import React, { useRef, useState } from 'react'
import { Button, Drawer, Spin } from 'antd'
import { project } from '@alilc/lowcode-engine'
import { TransformStage } from '@alilc/lowcode-types'
import * as CodeGenerator from '@alilc/lowcode-code-generator/standalone-loader'
import CodeGenResult, { ICodeGenResultProps } from '../CodeGenResult'

type CodeGenResultState = ICodeGenResultProps

const CodeGenBtn: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [resultState, setResultState] = useState<CodeGenResultState>()
  const loading = useRef<boolean>(false)

  const showDrawer = async () => {
    // 显示抽屉并且进行出码
    setVisible(true)
    loading.current = true
    const schema = project.exportSchema(TransformStage.Save)
    console.log('schema:', schema)
    const result = await CodeGenerator.generateCode({
      solution: 'icejs',
      schema,
      flattenResult: true
    })
    loading.current = false
    console.log('result:', result)
    setResultState({
      result,
      schema
    })
  }

  const closeDrawer = () => {
    setVisible(false)
  }

  return (
    <>
      <Button onClick={() => showDrawer()}>出码</Button>
      <Drawer visible={visible} title="出码" onClose={closeDrawer} width="80vw">
        {loading.current ? (
          <div style={{ textAlign: 'center' }}>
            <Spin spinning={loading.current} />
          </div>
        ) : (
          <CodeGenResult
            schema={resultState?.schema}
            result={resultState?.result}
          />
        )}
      </Drawer>
    </>
  )
}

export default CodeGenBtn
