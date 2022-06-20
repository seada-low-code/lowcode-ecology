import * as React from 'react'
import { Component, createRef } from 'react'
import {
  default as OriginalProTable,
  ActionType,
  ProColumnType
} from '@ant-design/pro-table'
import type { ProFormInstance } from '@ant-design/pro-form'
import { Tag } from 'antd'
import { defineGetterProperties, isPlainObj } from '../../shared/index'

interface IValueEnum {
  text: string
  value: string
  status: string
}

type IExtendsColType = ProColumnType & {
  valueEnum?: IValueEnum[]
  renderTag?: boolean
}

export type IProTableProps = React.ComponentProps<typeof OriginalProTable> & {
  columns?: IExtendsColType
}

class ProTable extends Component<IProTableProps, any> {
  // pro-table 未对批量操作进行封装，自己封了
  state = {
    selectedRowKeys: (this.props.rowSelection as any)?.selectedRowKeys ?? []
  }

  actionRef = createRef<ActionType>()

  formRef = createRef<ProFormInstance>()

  onSelectRowsChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys
    })
  }

  getSelectedRowKeys() {
    return this.state.selectedRowKeys
  }

  setSelectedRowKeys(selectedRowKeys) {
    this.setState({
      selectedRowKeys: Array.isArray(selectedRowKeys)
        ? selectedRowKeys
        : [selectedRowKeys]
    })
  }

  componentDidMount() {
    // 把操作方法挂载到 class instance 上，可通过 this.$ 调用
    defineGetterProperties(this, [this.actionRef, this.formRef])
  }

  render() {
    const { columns, rowSelection } = this.props

    const { selectedRowKeys } = this.state

    // 劫持渲染标签类型的列
    columns?.map((item) => {
      if (isPlainObj(item.valueEnum) && (item as any).renderTag === true) {
        item.render = (_, record) => {
          const colValue = record[item.dataIndex as string]

          const target = item.valueEnum[colValue]

          return target?.text ? (
            <Tag color={target?.status?.toLowerCase()}>{target?.text}</Tag>
          ) : (
            '-'
          )
        }
      }
    })

    return (
      <OriginalProTable
        {...this.props}
        rowSelection={
          rowSelection
            ? {
                ...rowSelection,
                defaultSelectedRowKeys: selectedRowKeys,
                selectedRowKeys,
                onChange: (...args) => {
                  rowSelection?.onChange?.(...args)
                  this.onSelectRowsChange(...args)
                }
              }
            : false
        }
        columns={columns}
        actionRef={this.actionRef}
        formRef={this.formRef}
      />
    )
  }
}

export default ProTable
