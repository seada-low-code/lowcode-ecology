import * as React from 'react';
import { createElement } from 'react';
import { useSchemaField, useHasPlaceholder, useInDesignMode } from '../../shared/hooks';
import { FormItem } from '@formily/antd';


const FormilyObject: React.ForwardRefRenderFunction<any, any> = React.forwardRef((props, ref) => {
  const SchemaField = useSchemaField();

  const hasPlaceholder = useHasPlaceholder(props)

  const inDesign = useInDesignMode(props)

  console.log('hasPlaceholder', hasPlaceholder)

  if (hasPlaceholder) {
    return <SchemaField.Void x-component="Slot" x-component-props={{
      children: <div ref={ref}>{ props.children }</div>
    }} />
  }

  console.log(inDesign, 'inDesign')

  // if (inDesign) {
  //   return <SchemaField.Void
  //     x-component="Slot"
  //     x-component-props={{
  //       children: <div ref={ref}>{ props.children }</div>
  //     }}
  //   />
  // }

  return (
    <SchemaField.Object
      name="person"
      // x-decorator={(props) => {
      //   return (
      //     <div ref={ref}>
      //       { props.chidlren }
      //     </div>
      //   );
      // }}
    >
      { props.children }
    </SchemaField.Object>
  )
});

export default FormilyObject;
