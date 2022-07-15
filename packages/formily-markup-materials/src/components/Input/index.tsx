import * as React from 'react';
import { createElement } from 'react';
import { useSchemaField } from '../../shared/hooks';
import { FormItem } from '@formily/antd';

const FormilyInput: React.ForwardRefRenderFunction<any, any> = React.forwardRef((props, ref) => {
  const SchemaField = useSchemaField();

  return (
    <SchemaField.String
      name={Math.random()}
      title="输入框"
      x-decorator={(props) => {
        return (
          <div ref={ref}>
            <FormItem {...props} />
          </div>
        );
      }}
      x-component="Input"
      required
      x-component-props={{
        ...props,
      }}
    />
  );
});

export default FormilyInput;
