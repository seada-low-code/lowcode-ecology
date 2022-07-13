import { snippets } from './snippets';
import props from './propsSchema';
import { FormLayoutSource, takeIcon } from '../icons';

const FormilyComponentMeta = {
  componentName: 'FormilyFormLayout',
  title: 'Card',
  group: 'Formily',
  category: '布局组件',
  npm: {
    package: '@seada/formily-markup-materials',
    version: 'latest',
    exportName: 'FormilyFormLayout',
    main: 'src/index.tsx',
    destructuring: true,
    subName: '',
  },
  configure: {
    props,
    component: {
      isContainer: true,
    },
    supports: {
      style: true,
    },
  },
  advanced: {},
  icon: takeIcon(FormLayoutSource),
};

export default {
  ...FormilyComponentMeta,
  snippets,
};
