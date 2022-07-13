import { snippets } from './snippets';
import props from './propsSchema';
import { TreeSelectSource, takeIcon } from '../icons';

const FormilyComponentMeta = {
  componentName: 'FormilyTreeSelect',
  title: 'TreeSelect',
  group: 'Formily',
  category: '输入组件',
  npm: {
    package: '@seada/formily-markup-materials',
    version: 'latest',
    exportName: 'FormilyTreeSelect',
    main: 'src/index.tsx',
    destructuring: true,
    subName: '',
  },
  configure: {
    props,
    supports: {
      style: true,
    },
  },
  advanced: {},
  icon: takeIcon(TreeSelectSource),
};

export default {
  ...FormilyComponentMeta,
  snippets,
};
