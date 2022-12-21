import { fieldSchema } from './FieldSchema';
import { formItemSchema } from './FormItemSchema';

export interface IDefaultPropsValue {
  field?: any;
  component?: any;
  decorator?: any;
}

export const createFormItemSchema = (componentsSchema: any, initial?: IDefaultPropsValue) => {
  return [
    {
      name: 'fieldProps',
      title: '字段属性',
      display: 'accordion',
      setter: {
        componentName: 'FormilySchemaSetter',
        initialValue: initial?.field,
        props: {
          propsSchema: fieldSchema,
        },
      },
    },
    {
      name: 'componentProps',
      title: '组件属性',
      display: 'accordion',
      setter: {
        componentName: 'FormilySchemaSetter',
        initialValue: initial?.component,
        props: {
          // 多包一层是为了复用locale翻译
          propsSchema: {
            properties: {
              'x-component-props': componentsSchema,
            },
          },
        },
      },
    },
    {
      name: 'decoratorProps',
      title: '容器属性',
      display: 'accordion',
      setter: {
        componentName: 'FormilySchemaSetter',
        initialValue: initial?.decorator,
        props: {
          propsSchema: {
            properties: {
              'x-decorator-props': formItemSchema,
            },
          },
        },
      },
    },
  ];
};

export const createVoidItemSchema = (componentsSchema: any, initial?: IDefaultPropsValue) => {
  return [
    {
      name: 'fieldProps',
      title: '字段属性',
      display: 'accordion',
      setter: {
        componentName: 'FormilySchemaSetter',
        initialValue: initial?.field,
        props: {
          propsSchema: fieldSchema,
        },
      },
    },
    {
      name: 'componentProps',
      title: '组件属性',
      display: 'accordion',
      setter: {
        componentName: 'FormilySchemaSetter',
        initialValue: initial?.component,
        props: {
          // 多包一层是为了复用locale翻译
          propsSchema: {
            properties: {
              'x-component-props': componentsSchema,
            },
          },
        },
      },
    },
  ];
};
