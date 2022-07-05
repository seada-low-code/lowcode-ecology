import React, { useRef, useState } from 'react'
import { Button, Drawer } from 'antd'
import { ILowCodePluginContext, project } from '@alilc/lowcode-engine'
import PreviewFrame from './components/PreviewFrame'
import { ProjectSchema, TransformStage } from '@alilc/lowcode-types'

const PreviewBtn: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const projectSchemaRef = useRef<ProjectSchema>()

  const handlePreview = () => {
    projectSchemaRef.current = project.exportSchema(TransformStage.Save)
    setVisible(true)
  }

  const closeDrawer = () => {
    setVisible(false)
  }

  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation()
          handlePreview()
        }}
      >
        预览
      </Button>
      <Drawer
        title="页面预览"
        visible={visible}
        width="90vw"
        onClose={closeDrawer}
      >
        <PreviewFrame projectSchema={projectSchemaRef.current} />
      </Drawer>
    </>
  )
}

const plugin = (ctx: ILowCodePluginContext) => {
  return {
    name: 'PluginPreview',
    dep: [],
    // 插件对外暴露的插件和方法
    exports() {
      return {}
    },
    // 插件的初始化函数，在引擎初始化之后会立即调用
    init() {
      const { skeleton } = ctx
      skeleton.add({
        name: 'preview',
        area: 'topArea',
        type: 'Widget',
        props: {
          align: 'right'
        },
        content: PreviewBtn
      })
    }
  }
}

plugin.pluginName = 'PluginPreview'

export default plugin
