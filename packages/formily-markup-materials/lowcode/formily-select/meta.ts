import { snippets } from './snippets';
import props from './propsSchema';
import { SelectSource, takeIcon } from '../icons';

const FormilyComponentMeta = {
  componentName: 'FormilySelect',
  title: 'Select',
  group: 'Formily',
  category: '输入组件',
  npm: {
    package: '@seada/formily-markup-materials',
    version: 'latest',
    exportName: 'FormilySelect',
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
  icon: takeIcon(SelectSource),
};

export default {
  ...FormilyComponentMeta,
  snippets,
};
