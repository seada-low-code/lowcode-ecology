import * as React from 'react';
// import { Input } from 'antd'
import { createElement } from 'react';
import { Input } from '@alifd/next';

export interface IFormilyCompSetterProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
}

const FormilyCompSetter: React.FC<IFormilyCompSetterProps> = ({
  onChange,
  placeholder = '请输入',
  value,
}) => {
  // console.log('123213', Input)
  return (
    <div>
      123
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          const val = e.currentTarget.value;
          onChange?.(val);
        }}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default FormilyCompSetter;
