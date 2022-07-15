import * as React from 'react';
import { createElement } from 'react';
import { useSchemaField } from '../../shared/hooks';
import { FormItem } from '@formily/antd';

const FormilyObject: React.ForwardRefRenderFunction<any, any> = React.forwardRef((props, ref) => {
  const SchemaField = useSchemaField();

  return <SchemaField.Object name={Math.random()}>{props.children}</SchemaField.Object>;
});

export default FormilyObject;
