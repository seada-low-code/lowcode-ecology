import { Schema } from '@formily/react';

/**
 * 将现有 properties 合入到 schema.items.properties 中
 * @param schema
 * @param properties
 * @returns
 */
export const mergeItems = (schema: Schema, properties) => {
  schema.items = new Schema({
    type: 'object',
    properties: {
      ...((schema?.items as any)?.properties || {}),
      ...properties,
    },
  });

  return schema;
};

/**
 * 将现有 properties 合并到当前 schema 中
 * @param schema
 * @param properties
 * @returns
 */
export const mergeProperties = (schema: Schema, properties) => {
  schema.setProperties({
    ...properties,
    ...(schema.properties || {}),
  });

  return schema;
};

/**
 * 获取普通组件schema
 * @param children
 * @param componentsNameMap
 * @returns
 */
export const getNormalChildrenSchema = (
  children?: any,
  componentsNameMap = new Set<string>(),
): [any, Set<string>] => {
  const result = {};

  if (!children) return [result, componentsNameMap];

  // plugins 注入的 __component_name
  const componentName = children.props.__component_name;

  if (!componentName) {
    console.error(`can't find component name`, children.props);
    return [result, componentsNameMap];
  }

  // 保存组件名称
  componentsNameMap.add(componentName);

  // lowcode-engine 自带
  const name = children.props.__id;

  // 当前字段schema
  const fieldSchema: any = {
    [name]: {
      type: 'void',
      'x-component': componentName,
      'x-component-props': {
        ...children.props,
        // fix: children被formily直接渲染，但是如果下一个组件是arrayCards，渲染是无效的，需要原始信息
        __origin_child: children.props.children,
      },
    },
  };

  // 组件不需要获取子schema，他们自己渲染children
  return [fieldSchema, componentsNameMap];
};

export const reactNode2Schema = (children?: any[], componentsNameMap = new Set<string>()): any => {
  let schema = {};

  const schemaList = [];

  if (!children) return [schema, componentsNameMap];

  for (let i = 0; i < children.length; i++) {
    const [fieldSchema] = getNormalChildrenSchema(children[i], componentsNameMap);

    schema = {
      ...schema,
      ...fieldSchema,
    };

    schemaList.push(fieldSchema);
  }

  return {
    schema,
    schemaList,
    componentsNameMap,
  };
};
