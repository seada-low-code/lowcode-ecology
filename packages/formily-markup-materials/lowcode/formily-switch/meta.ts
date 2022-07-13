import { snippets } from './snippets';
import props from './propsSchema';
import { SwitchSource, takeIcon } from '../icons';

const FormilyComponentMeta = {
  componentName: 'FormilySwitch',
  title: 'Switch',
  group: 'Formily',
  category: '输入组件',
  npm: {
    package: '@seada/formily-markup-materials',
    version: 'latest',
    exportName: 'FormilySwitch',
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
  icon: takeIcon(SwitchSource),
};

export default {
  ...FormilyComponentMeta,
  snippets,
};
