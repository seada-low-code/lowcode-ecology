import { snippets } from './snippets';
import props from './propsSchema';
import { uuid } from '../utils';
import { DataFormSource, takeIcon } from '../icons';

const FormilyFormMeta = {
  componentName: 'FormilyForm',
  title: 'FormilyForm',
  group: 'Formily Markup',
  category: '布局组件',
  npm: {
    package: '@seada/formily-markup-materials',
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
        setter: ['StringSetter', 'VariableSetter', 'FormilyCompSetter'],
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
    advanced: {
      callbacks: {
        onSubtreeModified: (currentNode, options) => {
          currentNode.replaceWith(currentNode.exportSchema());
        },
      },
    },
  },
  icon: takeIcon(DataFormSource),
};

export default {
  ...FormilyFormMeta,
  snippets,
};
