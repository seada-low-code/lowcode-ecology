import * as React from 'react';
import { createElement } from 'react';
import {
  useSchemaField,
  useComponentProps,
  useDecoratorProps,
  useUpdateForm,
} from '../../shared/hooks';
import { FormItem } from '@formily/antd';

const FormilyRadioGroup: React.ForwardRefRenderFunction<any, any> = React.forwardRef(
  (props, ref) => {
    console.log('FormilyRadioGroup props', props);
    const SchemaField = useSchemaField();
    const { fieldProps } = props;

    useUpdateForm([props]);

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
        x-component="Radio.Group"
        x-component-props={useComponentProps(props)}
      />
    );
  },
);

export default FormilyRadioGroup;
