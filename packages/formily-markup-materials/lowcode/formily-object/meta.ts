import { snippets } from './snippets';
import props from './propsSchema';
import { InputSource, takeIcon } from '../icons';

const FormilyInputMeta = {
  componentName: 'FormilyObject',
  title: 'Input',
  group: 'Formily Markup',
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
    props,
    supports: {
      style: true,
    },
    component: {
      isContainer: true
    },
  },
  advanced: {},
  icon: takeIcon(InputSource),
};

export default {
  ...FormilyInputMeta,
  snippets,
};
