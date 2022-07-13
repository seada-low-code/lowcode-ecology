import * as React from 'react';
import { createElement } from 'react';
import { useSchemaField } from '../../shared/hooks';

const FormilyInput: React.FC<{ style: React.CSSProperties }> = (props) => {
  console.log('props', props)
  const SchemaField = useSchemaField();

  return (
    // <div>
    // 123
    <SchemaField.String
      name={Math.random()}
      title="输入框"
      x-decorator="Container"
      x-component="Container1"
      required
      x-decorator-props={{
        ...props
      }}
      x-component-props={{
        ...props,
        style: {
          width: 240,
          ...props.style,
        },
      }}
    />
    // </div>
  );
};

export default FormilyInput;
