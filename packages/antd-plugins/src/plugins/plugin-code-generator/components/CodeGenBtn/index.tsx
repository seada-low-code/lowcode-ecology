import React, { useState } from 'react'
import { Button, Drawer, Spin } from 'antd'
import { project } from '@alilc/lowcode-engine'
import { TransformStage } from '@alilc/lowcode-types'
import CodeGenerator from '@alilc/lowcode-code-generator/standalone-loader'
import CodeGenResult, { ICodeGenResultProps } from '../CodeGenResult'

export interface IDrawerState {
  visible: boolean
  loading: boolean
}

type CodeGenResultState = ICodeGenResultProps

const INIT_DRAWER_STATE: IDrawerState = {
  visible: false,
  loading: false
}

const CodeGenBtn: React.FC = () => {
  const [drawerState, setDrawerState] =
    useState<IDrawerState>(INIT_DRAWER_STATE)
  const [resultState, setResultState] = useState<CodeGenResultState>()

  const showDrawer = async () => {
    // 显示抽屉并且进行出码
    setDrawerState({
      loading: true,
      visible: true
    })
    const schema = project.exportSchema(TransformStage.Save)
    console.log('schema:', schema)
    const result = await CodeGenerator.generateCode({
      solution: 'icejs',
      schema,
      flattenResult: true
    })
    console.log('result:', result)
    setResultState({
      result,
      schema
    })
  }

  const closeDrawer = () => {
    setDrawerState(INIT_DRAWER_STATE)
  }

  return (
    <>
      <Button onClick={() => showDrawer()}>出码</Button>
      <Drawer
        visible={drawerState.visible}
        title="出码"
        onClose={closeDrawer}
        width="80vw"
      >
        {drawerState.loading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin spinning={drawerState.loading} />
          </div>
        ) : (
          <CodeGenResult
            schema={resultState.schema}
            result={resultState.result}
          />
        )}
      </Drawer>
    </>
  )
}

export default CodeGenBtn
