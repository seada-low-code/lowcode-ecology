import React, { useState } from 'react'
import { Button, Drawer, Spin } from 'antd'
import { project } from '@alilc/lowcode-engine'
import { TransformStage } from '@alilc/lowcode-types'
import * as CodeGenerator from '@alilc/lowcode-code-generator/standalone-loader'

export interface IDrawerState {
  visible: boolean
  loading: boolean
}

const INIT_DRAWER_STATE: IDrawerState = {
  visible: false,
  loading: false
}

const CodeGenBtn: React.FC = () => {
  const [drawerState, setDrawerState] =
    useState<IDrawerState>(INIT_DRAWER_STATE)

  const showDrawer = async () => {
    // 显示抽屉并且进行出码
    setDrawerState({
      loading: true,
      visible: true
    })
    const schema = project.exportSchema(TransformStage.Save)
    console.log('schema:', schema)
    const code = await CodeGenerator.generateCode({
      solution: 'icejs',
      schema,
      flattenResult: true
    })
    console.log('code:', code)
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
        <div style={{ textAlign: 'center' }}>
          <Spin spinning={drawerState.loading} />
        </div>
      </Drawer>
    </>
  )
}

export default CodeGenBtn
