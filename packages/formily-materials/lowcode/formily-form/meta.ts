import { snippets } from './snippets';
import props from './propsSchema';
import { uuid } from '../utils';

const FormilyFormMeta = {
  componentName: 'FormilyForm',
  title: 'FormilyForm',
  group: 'Formily',
  category: '布局组件',
  npm: {
    package: '@seada/formily-materials',
    version: 'latest',
    exportName: 'FormilyForm',
    main: 'src/index.tsx',
    destructuring: true,
    subName: '',
  },
  configure: {
    props: [
      {
        name: 'ref',
        title: {
          label: 'ref',
          tip: "ref | 通过 this.$('xxx') 获取到组件实例",
        },
        defaultValue: () => {
          return `formily_${uuid()}`;
        },
        setter: ['StringSetter', 'VariableSetter'],
      },
      ...props,
    ],
    component: {
      isContainer: true,
      // todo: descendantBlacklist 配置无效
      // nestingRule: {
      //   descendantBlacklist: (item) => {
      //   },
      // },
    },
    supports: {
      style: true,
    },
  },
  advanced: {},
  icon: 'https://img.alicdn.com/imgextra/i3/O1CN01G7Lc8e1pZL7p4cdKc_!!6000000005374-2-tps-112-112.png',
};

export default {
  ...FormilyFormMeta,
  snippets,
};
