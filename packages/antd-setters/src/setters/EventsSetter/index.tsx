import React, { useEffect, useMemo, useState } from 'react'
import { Button, Divider, Empty, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ISchema } from '@formily/react'
import { isStr } from '@formily/shared'
import { createForm } from '@formily/core'
import { Form } from '@formily/antd'
import { SchemaField } from './components/SchemaField'
import { Header } from './components/Header'
import './index.less'

interface IEventItem {
  name: string
  template?: string
}

interface IDefinitionItem {
  type?: string
  title?: string
  list?: IEventItem[]
}

export interface IEventsSetterProps {
  definition: IDefinitionItem[]
  value?: unknown
  onChange?: (value?: unknown) => void
}

export enum ActionType {
  BuiltIn = 'builtIn',
  Custom = 'custom'
}

export interface IAction {
  type: ActionType
  name?: string
  desc?: string
  params?: ISchema
}

// 内置动作，点击内置动作选项后渲染参数表单，表单使用 formily 渲染
const builtInActions: IAction[] = [
  {
    type: ActionType.BuiltIn,
    name: 'openPage',
    desc: '打开页面',
    params: {
      type: 'object',
      properties: {
        url: {
          name: 'url',
          type: 'string',
          title: 'url',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true
        },
        isBlank: {
          name: 'isBlank',
          type: 'boolean',
          title: '在新页面打开',
          'x-decorator': 'FormItem',
          'x-component': 'Switch'
        }
      }
    }
  },
  {
    type: ActionType.BuiltIn,
    name: 'message',
    desc: '消息提示',
    params: {
      type: 'object',
      properties: {
        message: {
          name: 'message',
          type: 'string',
          title: '消息内容',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true
        }
      }
    }
  },
  {
    type: ActionType.BuiltIn,
    name: 'goBack',
    desc: '返回上一页'
  },
  {
    type: ActionType.BuiltIn,
    name: 'openModal ',
    desc: '打开弹窗'
  }
]

const customActions: IAction[] = [
  {
    type: ActionType.Custom,
    name: 'custom',
    desc: '自定义代码',
    params: {
      type: 'object',
      properties: {
        name: {
          name: 'name',
          type: 'string',
          title: '动作名称',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          required: true
        },
        isSetExtendParams: {
          name: 'isSetExtendParams',
          type: 'boolean',
          title: '扩展参数设置',
          'x-decorator': 'FormItem',
          'x-component': 'Switch'
        }
      }
    }
  }
]

/**
 * 事件属性配置组件，支持在一个事件中配置多个动作
 * @param props
 * @returns
 */
const EventsSetter: React.FC<IEventsSetterProps> = ({
  value,
  definition,
  onChange
}) => {
  const [selectedEvent, setSelectedEvent] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [selectedAction, setSelectedAction] = useState<IAction>()
  const [events, setEvents] = useState<
    Array<string | { label: string; value: string }>
  >([])
  const [curEditIndex, setCurEditIndex] = useState<number>(-1)

  const form = useMemo(() => createForm(), [])

  useEffect(() => {
    // 初始化事件列表
    if (!Array.isArray(definition) || !definition.length) return
    setEvents(
      definition.reduce((prev, val) => {
        return prev.concat(val.list.map((item) => item.name))
      }, [])
    )
  }, [])

  useEffect(() => {
    if (!visible) {
      resetModal()
    }
  }, [visible])

  const resetModal = () => {
    setSelectedAction(null)
    setSelectedEvent('')
    setCurEditIndex(-1)
  }

  /**
   * 显示事件配置modal
   */
  const showModal = () => {
    setVisible(true)
  }

  /**
   * 渲染已经配置的动作列表
   */
  const renderActionList = () => {
    return null
  }

  const handleSelectEvent = (eventName: string) => {
    setSelectedEvent(eventName)
  }

  /**
   * 选中动作触发
   * @param action 动作数据
   */
  const handleSelectAction = (action: IAction) => {
    setSelectedAction(action)
  }

  const hideModal = () => {
    setVisible(false)
  }

  const handleOk = async () => {
    // 校验表单
    try {
      await form.validate()
      // 校验通过，写值到动作列表
      console.log('form value:', form.values)
    } catch (e) {
      console.error('校验失败：', e)
    }
  }

  return (
    <>
      <div className="lc-block-setter">
        <div className="action-list">{renderActionList()}</div>
        <Button type="primary" block onClick={() => showModal()}>
          <PlusOutlined />
          添加动作
        </Button>
      </div>
      <Modal
        visible={visible}
        maskClosable={false}
        title="事件配置"
        onCancel={hideModal}
        onOk={handleOk}
        className="events-setter-modal"
        width={1060}
        okButtonProps={{ disabled: !selectedEvent || !selectedAction }}
        okText="确定"
        cancelText="取消"
      >
        <div className="events-setter__left">
          <Header title="1.触发事件" />
          {events.length ? (
            <ul className="list">
              {events.map((item) => {
                const key = isStr(item) ? item : item.value
                return (
                  <li
                    className={`${selectedEvent === key ? 'is-selected' : ''}`}
                    key={key}
                    onClick={() => handleSelectEvent(key)}
                  >
                    <strong>{isStr(item) ? item : item.label}</strong>
                  </li>
                )
              })}
            </ul>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无可配置事件"
            />
          )}
        </div>
        <div className="events-setter__middle">
          <Header title="2.执行动作" />
          {/* 选中了触发事件才显示动作列表 */}
          {selectedEvent ? (
            <div className="list-container">
              <ul className="list">
                {/* 这里显示内置事件 */}
                {builtInActions.map((item) => {
                  const { name, desc } = item
                  const { name: selectedActionName, type } =
                    selectedAction || {}
                  return (
                    <li
                      className={`${
                        type === ActionType.BuiltIn &&
                        selectedActionName === name
                          ? 'is-selected'
                          : ''
                      }`}
                      onClick={() => handleSelectAction(item)}
                      key={`built_in_${name}`}
                    >
                      {desc || name}
                    </li>
                  )
                })}
              </ul>
              <Divider className="action-divider" />
              <ul className="list">
                {/* 这里显示自定义事件 */}
                <li
                  className={`${
                    selectedAction?.type === ActionType.Custom
                      ? 'is-selected'
                      : ''
                  }`}
                  onClick={() => handleSelectAction(customActions[0])}
                >
                  自定义代码
                </li>
              </ul>
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="请选择触发事件"
            />
          )}
        </div>
        <div className="events-setter__right">
          <Header title="3.参数/代码配置" />
          {!selectedAction?.params ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={!selectedAction ? '请选择执行动作' : '暂无配置项'}
            />
          ) : (
            <div className="config-container">
              <Form form={form} labelAlign="left" size="small" labelWidth={80}>
                <SchemaField
                  components={{ Empty }}
                  schema={selectedAction?.params || {}}
                />
              </Form>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

export default EventsSetter
