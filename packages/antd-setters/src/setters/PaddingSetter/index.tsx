import React from 'react'
import { Input } from 'antd'
import './index.less'

export type PaddingValue = {
  paddingTop?: string
  paddingBottom?: string
  paddingLeft?: string
  paddingRight?: string
}

export type PaddingSetterProps = {
  value?: PaddingValue
  onChange?: (value?: PaddingValue) => void
}

const PaddingSetter: React.FC<PaddingSetterProps> = ({
  value = {
    paddingBottom: '0px',
    paddingTop: '0px',
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  onChange
}) => {
  /**
   * 移除单位
   */
  const removeUnit = (val = '0px') => {
    return isNaN(parseInt(val)) ? null : `${parseInt(val)}`
  }

  const addUnit = (val: string, unit = 'px') => {
    return val + unit
  }

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const val = e.target.value
    // 输入的不是数字
    if (isNaN(parseInt(val))) {
      onChange?.({
        ...value,
        [key]: null
      })
    }
    onChange?.({
      ...value,
      [key]: addUnit(val)
    })
  }

  const { paddingBottom, paddingTop, paddingLeft, paddingRight } = value
  return (
    <div className="wrapper">
      <div className="padding-display-value top">
        <Input
          maxLength={3}
          bordered={false}
          value={removeUnit(paddingTop)}
          onChange={(e) => {
            handleValueChange(e, 'paddingTop')
          }}
        />
      </div>
      <div className="padding-display-value right">
        <Input
          maxLength={3}
          bordered={false}
          value={removeUnit(paddingRight)}
          onChange={(e) => {
            handleValueChange(e, 'paddingRight')
          }}
        />
      </div>
      <div className="padding-display-value bottom">
        <Input
          maxLength={3}
          bordered={false}
          value={removeUnit(paddingBottom)}
          onChange={(e) => {
            handleValueChange(e, 'paddingBottom')
          }}
        />
      </div>
      <div className="padding-display-value left">
        <Input
          maxLength={3}
          bordered={false}
          value={removeUnit(paddingLeft)}
          onChange={(e) => {
            handleValueChange(e, 'paddingLeft')
          }}
        />
      </div>
    </div>
  )
}

export default PaddingSetter
