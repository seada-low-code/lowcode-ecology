import { snippets } from './snippets';
import props from './propsSchema';
import { TabSource, takeIcon } from '../icons';

const FormilyComponentMeta = {
  componentName: 'FormilyArrayTabs',
  title: 'ArrayTabs',
  group: 'Formily',
  category: '自增组件',
  npm: {
    package: '@seada/formily-markup-materials',
    version: 'latest',
    exportName: 'FormilyArrayTabs',
    main: 'src/index.tsx',
    destructuring: true,
    subName: '',
  },
  configure: {
    props,
    supports: {
      style: true,
    },
    component: {
      isContainer: true,
    },
  },
  advanced: {},
  icon: takeIcon(TabSource),
};

export default {
  ...FormilyComponentMeta,
  snippets,
};
