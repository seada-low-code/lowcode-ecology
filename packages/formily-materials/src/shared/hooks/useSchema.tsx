import { useState } from 'react';
import { IFormItemProps } from '..';
import { Schema } from '@formily/react';
import { uuid } from '../';

// 包裹 'x-decorator': 'FormItem'
const useSchema = (
  { componentProps = {}, fieldProps, decoratorProps = {}, style, ...extra }: IFormItemProps,
  defaultProps?: any,
): Schema => {
  const { name, ...rest } = fieldProps;
  const [initialName] = useState(uuid());

  const schema = {
    type: 'object',
    properties: {
      [name || initialName]: {
        'x-decorator': 'FormItem',
        ...defaultProps,
        ...rest,
        'x-component-props': {
          style,
          ...componentProps['x-component-props'],
          ...(extra || {}),
        },
        ...decoratorProps,
      },
    },
  };

  return new Schema(schema);
};

export default useSchema;
