import * as React from 'react';
import { createElement } from 'react';
import { useSchemaField, useComponentProps, useDecoratorProps } from '../../shared/hooks';
import { FormItem } from '@formily/antd';

const FormilyInput: React.ForwardRefRenderFunction<any, any> = React.forwardRef((props, ref) => {
  const SchemaField = useSchemaField();
  console.log('FormilyInput props', props);
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
      x-decorator-props={useDecoratorProps(props)}
      x-component="Input"
      x-component-props={useComponentProps(props)}
    />
  );
});

export default FormilyInput;
