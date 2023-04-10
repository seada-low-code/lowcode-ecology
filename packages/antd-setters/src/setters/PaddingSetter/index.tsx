import React from 'react'
import { Input, Tooltip } from 'antd'
import './index.less'

export type PaddingSetterProps = {
  value?: number[]
  onChange?: (value?: number[]) => void
}

const PaddingSetter: React.FC<PaddingSetterProps> = ({
  value = [0, 0, 0, 0],
  onChange
}) => {
  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = parseInt(e.target.value)
    const copied = [...value]
    // 输入的不是数字
    if (isNaN(val)) {
      copied.splice(index, 1, null)
      onChange?.(copied)
      return
    }
    copied.splice(index, 1, val)
    onChange?.(copied)
  }

  return (
    <div className="wrapper">
      <div className="padding-inner-box" />
      <div className="padding-display-value top">
        <Tooltip title="上间距">
          <Input
            maxLength={3}
            bordered={false}
            value={value[0]}
            onChange={(e) => {
              handleValueChange(e, 0)
            }}
          />
        </Tooltip>
      </div>
      <div className="padding-display-value right">
        <Tooltip title="右间距">
          <Input
            maxLength={3}
            bordered={false}
            value={value[1]}
            onChange={(e) => {
              handleValueChange(e, 1)
            }}
          />
        </Tooltip>
      </div>
      <div className="padding-display-value bottom">
        <Tooltip title="下间距">
          <Input
            maxLength={3}
            bordered={false}
            value={value[2]}
            onChange={(e) => {
              handleValueChange(e, 2)
            }}
          />
        </Tooltip>
      </div>
      <div className="padding-display-value left">
        <Tooltip title="左间距">
          <Input
            maxLength={3}
            bordered={false}
            value={value[3]}
            onChange={(e) => {
              handleValueChange(e, 3)
            }}
          />
        </Tooltip>
      </div>
    </div>
  )
}

export default PaddingSetter
