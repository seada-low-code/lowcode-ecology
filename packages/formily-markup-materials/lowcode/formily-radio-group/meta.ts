import { snippets } from './snippets';
import props from './propsSchema';
import { InputSource, takeIcon } from '../icons';

const FormilyRadioGroupMeta = {
  componentName: 'FormilyRadioGroup',
  title: 'RadioGroup',
  group: 'Formily Markup',
  category: '输入组件',
  npm: {
    package: '@seada/formily-markup-materials',
    version: 'latest',
    exportName: 'FormilyRadioGroup',
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
  ...FormilyRadioGroupMeta,
  snippets,
};
