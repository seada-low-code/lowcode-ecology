export const snippets = [
  {
    title: 'VarInjectContainer',
    screenshot: 'https://img.alicdn.com/tfs/TB160cKkP39YK4jSZPcXXXrUFXa-112-64.png',
    schema: {
      title: 'VarInjectContainer',
      componentName: 'FormilyVarInjectContainer',
      props: {
        render: {
          type: 'JSSlot',
          params: ['scope'],
          value: {
            componentName: 'Slot',
            props: {
              __component_name: 'Slot',
            },
            params: ['scope'],
          },
        },
      },
    },
  },
];
