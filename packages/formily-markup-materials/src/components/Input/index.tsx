import * as React from 'react';
import { createElement } from 'react';
import { useSchemaField } from '../../shared/hooks';
import { FormItem } from '@formily/antd';

const FormilyInput: React.ForwardRefRenderFunction<any, any> = React.forwardRef((props, ref) => {
  const SchemaField = useSchemaField();
  const { fieldProps, componentProps, style, decoratorProps } = props;

  const finalComponentProps = {
    ...componentProps['x-component-props'],
    style,
  };

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
      x-decorator-props={decoratorProps['x-decorator-props']}
      x-component="Input"
      x-component-props={finalComponentProps}
    />
  );
});

export default FormilyInput;
