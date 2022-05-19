import React, { useEffect, useState } from 'react'
import { Button, Divider, Empty, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { EventsSetterHeader } from './EventsSetterHeader'
import './index.less'

const isStr = (val?: any) => {
  return typeof val === 'string'
}

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
  const [selectedAction, setSelectedAction] = useState()
  const [events, setEvents] = useState<
    Array<string | { label: string; value: string }>
  >([])
  const [curEditIndex, setCurEditIndex] = useState<number>(-1)

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

  const handleSelectAction = () => {
    // 选择动作
  }

  const hideModal = () => {
    setVisible(false)
  }

  const handleOk = () => {
    // 确认事件配置
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
          <EventsSetterHeader title="1.触发事件" />
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
          <EventsSetterHeader title="2.执行动作" />
          {/* 选中了触发事件才显示动作列表 */}
          {selectedEvent ? (
            <div className="list-container">
              <ul className="list">
                {/* {PLATFORM_METHODS.map((item) => {
                  const key = isStr(item) ? item : item.value
                  return (
                    <li
                      className={`${
                        selectedAction?.type === 'platform' &&
                        selectedAction?.name === key
                          ? 'is-selected'
                          : ''
                      }`}
                      onClick={() => handleSelectAction('platform', key)}
                      key={key}
                    >
                      {isStr(item) ? item : item.label}
                    </li>
                  )
                })} */}
              </ul>
              <Divider className="action-divider" />
              <ul className="list">
                {/* <li
                  className={`${
                    selectedAction?.type === 'custom' ? 'is-selected' : ''
                  }`}
                  onClick={() => handleSelectAction('custom', CUSTOM_ACTION)}
                >
                  自定义代码
                </li> */}
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
          <EventsSetterHeader title="3.参数/代码配置" />
          {selectedAction ? (
            <div className="config-container">
              {/* 如果选中了动作，渲染配置表单；如果选中了自定义方法，渲染编辑器直接写代码 */}
              {/* <Form
                form={form}
                labelWidth={80}
                labelAlign="left"
                size={'small'}
              >
                <SchemaField
                  components={{ Empty }}
                  schema={selectedAction.schema}
                  scope={isPlainObj(context.scope) ? { ...context.scope } : {}}
                />
              </Form> */}
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="请选择执行动作"
            />
          )}
        </div>
      </Modal>
    </>
  )
}

export default EventsSetter
