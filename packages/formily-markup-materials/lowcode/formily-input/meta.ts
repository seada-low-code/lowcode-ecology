import { snippets } from './snippets';
import props from './propsSchema';
import { InputSource, takeIcon } from '../icons';

const FormilyInputMeta = {
  componentName: 'FormilyInput',
  title: 'Input',
  group: 'Formily',
  category: '输入组件',
  npm: {
    package: '@seada/formily-markup-materials',
    version: 'latest',
    exportName: 'FormilyInput',
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
  icon: takeIcon(InputSource),
};

export default {
  ...FormilyInputMeta,
  snippets,
};
