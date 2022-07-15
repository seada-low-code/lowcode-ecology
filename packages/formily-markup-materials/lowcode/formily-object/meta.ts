import { snippets } from './snippets';
import { InputSource, takeIcon } from '../icons';

const FormilyObjectMeta = {
  componentName: 'FormilyObject',
  title: 'Input',
  group: 'Formily',
  category: '输入组件',
  npm: {
    package: '@seada/formily-markup-materials',
    version: 'latest',
    exportName: 'FormilyObject',
    main: 'src/index.tsx',
    destructuring: true,
    subName: '',
  },
  configure: {
    supports: {
      style: true,
    },
  },
  advanced: {},
  icon: takeIcon(InputSource),
};

export default {
  ...FormilyObjectMeta,
  snippets,
};
