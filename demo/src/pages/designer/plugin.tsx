import { PluginUndoRedo } from '@seada/antd-plugins'
import { BoolSetter } from '@seada/antd-setters'
import { ILowCodePluginContext, plugins, project } from '@alilc/lowcode-engine'
import AliLowCodeEngineExt from '@alilc/lowcode-engine-ext'
import ComponentsPane from '@alilc/lowcode-plugin-components-pane'
import Inject, { injectAssets } from '@alilc/lowcode-plugin-inject'
import ManualPlugin from '@alilc/lowcode-plugin-manual'
import SchemaPlugin from '@alilc/lowcode-plugin-schema'
import ZhEnPlugin from '@alilc/lowcode-plugin-zh-en'
import { Button } from 'antd'
import React from 'react'
import assets from '../../assets/assets.json'

export default async function registerPlugins() {
  await plugins.register(ManualPlugin)

  await plugins.register(Inject)

  SchemaPlugin.pluginName = 'SchemaPlugin'
  await plugins.register(SchemaPlugin)

  const editorInit = (ctx: ILowCodePluginContext) => {
    return {
      name: 'editor-init',
      async init() {
        // 修改面包屑组件的分隔符属性setter
        // const assets = await (
        //   await fetch(
        //     `https://alifd.alicdn.com/npm/@alilc/lowcode-materials/build/lowcode/assets-prod.json`
        //   )
        // ).json();
        // 设置物料描述
        const { material, project } = ctx

        material.setAssets(await injectAssets(assets))

        // 加载 schema
        project.openDocument()
      }
    }
  }
  editorInit.pluginName = 'editorInit'
  await plugins.register(editorInit)

  await plugins.register(PluginUndoRedo)

  const builtinPluginRegistry = (ctx: ILowCodePluginContext) => {
    return {
      name: 'builtin-plugin-registry',
      async init() {
        const { skeleton } = ctx

        // 注册组件面板
        const componentsPane = skeleton.add({
          area: 'leftArea',
          type: 'PanelDock',
          name: 'componentsPane',
          content: ComponentsPane,
          contentProps: {},
          props: {
            align: 'top',
            icon: 'zujianku',
            description: '组件库'
          }
        })
        componentsPane?.disable?.()
        project.onSimulatorRendererReady(() => {
          componentsPane?.enable?.()
        })
      }
    }
  }
  builtinPluginRegistry.pluginName = 'builtinPluginRegistry'
  await plugins.register(builtinPluginRegistry)

  // 设置内置 setter 和事件绑定、插件绑定面板
  const setterRegistry = (ctx: ILowCodePluginContext) => {
    const { setterMap, pluginMap } = AliLowCodeEngineExt

    setterMap['BoolSetter'] = BoolSetter

    return {
      name: 'ext-setters-registry',
      async init() {
        const { setters, skeleton } = ctx
        // 注册setterMap
        setters.registerSetter(setterMap)
        // 注册插件
        // 注册事件绑定面板
        skeleton.add({
          area: 'centerArea',
          type: 'Widget',
          content: pluginMap.EventBindDialog,
          name: 'eventBindDialog',
          props: {}
        })

        // 注册变量绑定面板
        skeleton.add({
          area: 'centerArea',
          type: 'Widget',
          content: pluginMap.VariableBindDialog,
          name: 'variableBindDialog',
          props: {}
        })
      }
    }
  }
  setterRegistry.pluginName = 'setterRegistry'
  await plugins.register(setterRegistry)

  // 注册中英文切换
  await plugins.register(ZhEnPlugin)

  // 注册保存面板
  const saveSample = (ctx: ILowCodePluginContext) => {
    return {
      name: 'saveSample',
      async init() {
        const { skeleton, hotkey } = ctx

        skeleton.add({
          name: 'saveSample',
          area: 'topArea',
          type: 'Widget',
          props: {
            align: 'right'
          },
          content: (
            <Button
              onClick={() => {
                console.log('保存')
              }}
            >
              保存到本地
            </Button>
          )
        })
        skeleton.add({
          name: 'resetSchema',
          area: 'topArea',
          type: 'Widget',
          props: {
            align: 'right'
          },
          content: (
            <Button
              onClick={() => {
                console.log('重置')
              }}
            >
              重置页面
            </Button>
          )
        })
        hotkey.bind('command+s', (e) => {
          e.preventDefault()
          console.log('保存')
        })
      }
    }
  }
  saveSample.pluginName = 'saveSample'
  await plugins.register(saveSample)

  const previewSample = (ctx: ILowCodePluginContext) => {
    return {
      name: 'previewSample',
      async init() {
        const { skeleton } = ctx
        skeleton.add({
          name: 'previewSample',
          area: 'topArea',
          type: 'Widget',
          props: {
            align: 'right'
          },
          content: (
            <Button
              type="primary"
              onClick={() => {
                console.log('预览')
              }}
            >
              预览
            </Button>
          )
        })
      }
    }
  }
  previewSample.pluginName = 'previewSample'
  await plugins.register(previewSample)
}
