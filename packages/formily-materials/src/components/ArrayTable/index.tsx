import * as React from 'react';
import { createElement } from 'react';
import { ArrayTable } from '@formily/antd';
import { useForm } from '@formily/react';
import { Alert } from 'antd';
import {
  syncUI,
  IFormItemProps,
  useSchema,
  useSchemaField,
  reactNode2Schema,
  mergeItems,
  mergeProperties,
  uuid,
} from '../../shared';
import { ArrayTablePreview } from './preview';

// todo refactor
const FormilyArrayTable: React.FC<IFormItemProps> = syncUI((props) => {
  const form = useForm();

  if (!form) {
    return <Alert message="formily component can only be used in formily form" type="error" />;
  }

  if (props.__designMode === 'design') {
    return <ArrayTablePreview {...props} />;
  }

  const { columns } = props;

  const { name } = props.fieldProps;

  const {
    schema: childrenSchema,
    schemaList: childrenSchemaList,
    componentsNameMap: componentMap,
  } = reactNode2Schema(
    (columns || []).map((item) => {
      const reactNode = item.render();
      return reactNode;
    }),
  );

  const schema = useSchema(props, {
    'x-component': 'ArrayTable',
  });

  mergeItems(schema.properties[name], {
    ...childrenSchemaList.reduce((prev, item, index) => {
      prev[uuid()] = {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: columns?.[index]?.title,
        },
        properties: {
          ...item,
        },
        'x-index': 1 + index,
      };
      return prev;
    }, {}),
    [uuid()]: {
      type: 'void',
      'x-component': 'ArrayTable.Column',
      'x-component-props': {
        title: 'Operation',
      },
      properties: {
        [uuid()]: {
          type: 'void',
          'x-component': 'ArrayTable.Remove',
          'x-index': 0,
        },
        [uuid()]: {
          type: 'void',
          'x-component': 'ArrayTable.MoveDown',
          'x-index': 1,
        },
        [uuid()]: {
          type: 'void',
          'x-component': 'ArrayTable.MoveUp',
          'x-index': 2,
        },
      },
      'x-index': 1 + Object.keys(childrenSchema).length,
    },
  });

  mergeProperties(schema.properties[name], {
    [uuid()]: {
      type: 'void',
      title: 'Addition',
      'x-component': 'ArrayTable.Addition',
      'x-index': 0,
    },
  });

  componentMap.add('ArrayTable');

  const SchemaField = useSchemaField(componentMap, { ArrayTable });

  return <SchemaField schema={schema} />;
});

export default FormilyArrayTable;
