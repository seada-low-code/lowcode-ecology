import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createElement } from 'react';
import { FormLayout } from '@formily/antd';
import {
  useSchemaField,
  useHasPlaceholder,
  useInDesignMode,
  useComponentProps,
} from '../../shared/hooks';

const FormilyObject: React.ForwardRefRenderFunction<any, any> = React.forwardRef((props, ref) => {
  const SchemaField = useSchemaField();
  const hasPlaceholder = useHasPlaceholder(props);
  const inDesign = useInDesignMode(props);

  const { fieldProps, children } = props;

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

  console.log('FormilyObject FormLayout props', props);
  return (
    <SchemaField.Void
      {...fieldProps}
      x-component={(props) => {
        // @ts-ignore
        return (
          <div ref={ref}>
            <FormLayout {...props} layout="inline" />
          </div>
        );
      }}
      x-component-props={useComponentProps(props)}
    >
      <SchemaField.Object name="person">{props.children}</SchemaField.Object>
    </SchemaField.Void>
  );
});

export default FormilyObject;