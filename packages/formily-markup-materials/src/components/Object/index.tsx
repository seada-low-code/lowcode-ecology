import * as React from 'react';
import { createElement } from 'react';
import { FormLayout } from '@formily/antd';
import { useSchemaField, useHasPlaceholder, useInDesignMode } from '../../shared/hooks';

const FormilyObject: React.ForwardRefRenderFunction<any, any> = React.forwardRef((props, ref) => {
  const SchemaField = useSchemaField();
  const hasPlaceholder = useHasPlaceholder(props);
  const inDesign = useInDesignMode(props);

  const { fieldProps } = props;

  console.log('FormilyObject', props);

  if (hasPlaceholder) {
    return (
      <SchemaField.Void
        x-component="Slot"
        x-component-props={{
          children: <div ref={ref}>{props.children}</div>,
        }}
      />
    );
  }

  console.log(inDesign, 'inDesign');
  // if (inDesign) {
  //   return <SchemaField.Void
  //     x-component="Slot"
  //     x-component-props={{
  //       children: <div ref={ref}>{ props.children }</div>
  //     }}
  //   />
  // }

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
    >
      <SchemaField.Object name="person">{props.children}</SchemaField.Object>
    </SchemaField.Void>
  );
});

export default FormilyObject;
