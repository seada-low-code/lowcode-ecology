import * as React from 'react';
import { createElement } from 'react';
import { useSchemaField } from '../../shared/hooks';
import { FormItem } from '@formily/antd';

const FormilyRadioGroup: React.ForwardRefRenderFunction<any, any> = React.forwardRef(
  (props, ref) => {
    console.log('FormilyRadioGroup props', props);
    const SchemaField = useSchemaField();
    const { fieldProps, componentProps, style, decoratorProps } = props;

    const finalComponentProps = {
      style,
      ...componentProps['x-component-props'],
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
        x-component="Radio.Group"
        x-component-props={finalComponentProps}
      />
    );
  },
);

export default FormilyRadioGroup;
