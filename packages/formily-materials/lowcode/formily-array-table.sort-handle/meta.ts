const FormilyInputMeta = {
  componentName: 'FormilyArrayTable.SortHandle',
  title: 'ArrayTable.SortHandle',
  group: 'Formily',
  category: '自增组件',
  npm: {
    package: '@seada/formily-materials',
    version: 'latest',
    exportName: 'FormilyArrayTable',
    main: 'src/index.tsx',
    destructuring: true,
    subName: 'SortHandle',
  },
  configure: {
    supports: {
      style: true,
    },
    nestingRule: {
      parentWhitelist: ['FormilyArrayTable', 'ArrayTable'],
    },
    component: {
      isContainer: true,
    },
  },
  advanced: {},
  icon: 'https://img.alicdn.com/imgextra/i3/O1CN01G7Lc8e1pZL7p4cdKc_!!6000000005374-2-tps-112-112.png',
};

export default {
  ...FormilyInputMeta,
};
