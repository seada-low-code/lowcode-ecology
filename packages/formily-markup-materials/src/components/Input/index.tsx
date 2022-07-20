import * as React from 'react';
import { createElement } from 'react';
import { useSchemaField } from '../../shared/hooks';
import { FormItem } from '@formily/antd';

const FormilyInput: React.ForwardRefRenderFunction<any, any> = React.forwardRef((props, ref) => {
  const SchemaField = useSchemaField();
  const { fieldProps } = props;

  return (
    <SchemaField.String
      {...fieldProps}
      x-decorator={(props) => {
        return (
          <div ref={ref}>
            <FormItem {...props} />
          </div>
        );
      }}
      x-component="Input"
      x-component-props={{}}
      x-reactions={{
        dependencies: ['dateType'],
        fulfill: {
          state: {
            value: '{{$deps[0]}}',
          },
        },
      }}
    />
  );
});

export default FormilyInput;
