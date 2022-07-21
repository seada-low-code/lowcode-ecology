import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from 'react';
import { FormItem, FormLayout } from '@formily/antd';
import {
  useSchemaField,
  useHasPlaceholder,
  useComponentProps,
  useDecoratorProps,
  useUpdateForm,
} from '../../shared/hooks';

import './index.less';

const FormilyObject: React.ForwardRefRenderFunction<any, any> = React.forwardRef((props, ref) => {
  const SchemaField = useSchemaField();
  const hasPlaceholder = useHasPlaceholder(props);

  const { fieldProps, children } = props;

  useUpdateForm([props]);

  console.log('FormilyObject', props);

  if (hasPlaceholder) {
    return (
      <SchemaField.Void
        x-component="Slot"
        x-component-props={{
          children: <div ref={ref}>{children}</div>,
        }}
      />
    );
  }

  console.log('FormilyObject FormLayout props', props, useComponentProps(props));
  return (
    <SchemaField.Void
      // x-decorator={(props) => {
      //   return (
      //     <div ref={ref}>
      //       <FormItem {...props} />
      //     </div>
      //   );
      // }}
      // x-decorator-props={useDecoratorProps(props)}
      x-component={(props) => {
        return (
          <div ref={ref}>
            {/* 此处使用 FormLayout 来进行表单局部的嵌套，会有问题 */}
            <FormLayout {...props} />
          </div>
        );
      }}
      x-component-props={useComponentProps(props)}
    >
      <SchemaField.Object {...fieldProps}>{props.children}</SchemaField.Object>
    </SchemaField.Void>
  );
});

export default FormilyObject;
