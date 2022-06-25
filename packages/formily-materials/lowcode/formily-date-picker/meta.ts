import { snippets } from './snippets';
import props from './propsSchema';
import { DatePickerSource, takeIcon } from '../icons';

const FormilyComponentMeta = {
  componentName: 'FormilyDatePicker',
  title: 'DatePicker',
  group: 'Formily',
  category: '输入组件',
  npm: {
    package: '@seada/formily-materials',
    version: 'latest',
    exportName: 'FormilyDatePicker',
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
  icon: takeIcon(DatePickerSource),
};

export default {
  ...FormilyComponentMeta,
  snippets,
};
