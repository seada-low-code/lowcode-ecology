import React from 'react'
import {
  default as OriginalProTable,
  ProColumnType
} from '@ant-design/pro-table'

interface IValueEnum {
  text: string
  value: string
  status: string
}

type ExtendsColType = ProColumnType & {
  valueEnum?: IValueEnum[]
  renderTag?: boolean
}

export type ProTableProps = React.ComponentProps<typeof OriginalProTable> & {
  columns?: ExtendsColType
}

export const ProTable: React.FC<ProTableProps> = () => {
  return <div>hello world</div>
}
