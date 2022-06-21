export const snippets = [
  {
    title: 'FormilyForm',
    screenshot: 'https://img.alicdn.com/tfs/TB160cKkP39YK4jSZPcXXXrUFXa-112-64.png',
    schema: {
      title: 'FormilyForm',
      componentName: 'FormilyForm',
      props: {
        componentProps: {
          layout: 'vertical',
        },
        __component_name: 'FormilyForm',
      },
      children: [
        {
          componentName: 'FormilyInput',
          props: {
            __component_name: 'FormilyInput',
            fieldProps: {
              name: 'username',
              title: 'Input',
              'x-validator': [],
            },
            componentProps: {
              'x-component-props': {},
            },
            decoratorProps: {
              'x-decorator-props': {},
            },
          },
        },
        {
          componentName: 'FormilyPassword',
          props: {
            __component_name: 'FormilyPassword',
            fieldProps: {
              name: 'password',
              title: 'Password',
              'x-validator': [],
            },
            componentProps: {
              'x-component-props': {},
            },
            decoratorProps: {
              'x-decorator-props': {},
            },
          },
        },
        {
          componentName: 'FormilyNumberPicker',
          props: {
            __component_name: 'FormilyNumberPicker',
            fieldProps: {
              name: 'age',
              title: 'NumberPicker',
              'x-validator': [],
            },
            componentProps: {
              'x-component-props': {},
            },
            decoratorProps: {
              'x-decorator-props': {},
            },
          },
        },
        {
          componentName: 'FormilySelect',
          props: {
            __component_name: 'FormilySelect',
            fieldProps: {
              name: 'habit',
              title: 'Select',
              'x-validator': [],
            },
            componentProps: {
              'x-component-props': {},
            },
            decoratorProps: {
              'x-decorator-props': {},
            },
          },
        },
        {
          componentName: 'FormilySwitch',
          props: {
            __component_name: 'FormilySwitch',
            fieldProps: {
              name: 'switch',
              title: 'Switch',
              'x-validator': [],
            },
            componentProps: {
              'x-component-props': {},
            },
            decoratorProps: {
              'x-decorator-props': {},
            },
          },
        },
        {
          componentName: 'FormilyCheckbox',
          props: {
            __component_name: 'FormilyCheckbox',
            fieldProps: {
              name: 'gender',
              title: 'Checkbox Group',
              enum: [
                {
                  label: '选项1',
                  value: 1,
                },
                {
                  label: '选项2',
                  value: 2,
                },
              ],
              'x-validator': [],
            },
            componentProps: {
              'x-component-props': {},
            },
            decoratorProps: {
              'x-decorator-props': {},
            },
          },
        },
        {
          componentName: 'FormilyTextArea',
          props: {
            __component_name: 'FormilyTextArea',
            fieldProps: {
              name: 'text',
              title: 'TextArea',
              'x-component': 'Input.TextArea',
              'x-validator': [],
            },
            componentProps: {
              'x-component-props': {},
            },
            decoratorProps: {
              'x-decorator-props': {},
            },
          },
        },
        {
          componentName: 'FormilyMonacoInput',
          props: {
            __component_name: 'FormilyMonacoInput',
            fieldProps: {
              name: 'code',
              title: 'MonacoInput',
              'x-validator': [],
            },
            componentProps: {
              'x-component-props': {
                defaultLanguage: 'text',
                height: 160,
                readOnly: false,
                theme: 'vs-dark',
                options: {
                  lineNumbers: 'on',
                },
              },
            },
            decoratorProps: {
              'x-decorator-props': {},
            },
          },
        },
        {
          componentName: 'FormilyUploadDragger',
          props: {
            __component_name: 'FormilyUploadDragger',
            fieldProps: {
              name: 'files',
              title: 'Drag Upload',
              type: 'Array<object>',
              'x-validator': [],
            },
            componentProps: {
              'x-component-props': {
                textContent: 'Click or drag file to this area to upload',
              },
            },
            decoratorProps: {
              'x-decorator-props': {},
            },
          },
        },
      ],
    },
  },
];
