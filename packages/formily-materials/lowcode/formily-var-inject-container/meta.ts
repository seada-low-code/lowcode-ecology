import { snippets } from './snippets';
import props from './propsSchema';

const FormilyInputMeta = {
  componentName: 'FormilyVarInjectContainer',
  title: 'VarInjectContainer',
  group: 'Formily',
  category: '变量组件',
  npm: {
    package: '@seada/formily-materials',
    version: 'latest',
    exportName: 'FormilyVarInjectContainer',
    main: 'src/index.tsx',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      ...props,
      {
        name: 'render',
        title: {
          label: '自定义渲染',
          tip: 'render | 插槽内的物料表达式可通过 this.scope 获取到 Formily 传递下来变量（如 $record、$index...）',
        },
        propType: 'func',
        setter: [
          {
            componentName: 'SlotSetter',
            title: '单元格插槽',
            initialValue: {
              type: 'JSSlot',
              params: ['scope'],
              value: [],
            },
          },
          'VariableSetter',
        ],
      },
    ],
    component: {
      isContainer: true,
    },
    supports: {
      style: true,
    },
  },
  advanced: {},
  icon: 'https://img.alicdn.com/imgextra/i3/O1CN01G7Lc8e1pZL7p4cdKc_!!6000000005374-2-tps-112-112.png',
};

export default {
  ...FormilyInputMeta,
  snippets,
};
