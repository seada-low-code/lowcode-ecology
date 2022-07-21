import * as React from 'react';
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createElement,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  createRef,
} from 'react';
import { FormLayout } from '@formily/antd';
import { createForm, Form, onFormInit, onFormMount, onFormValuesChange } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import { FormContext } from '../../shared/context';
import { FormItem, Input, Radio, ArrayCards, FormButtonGroup, Submit } from '@formily/antd';

/**
 * @deprecated
 */
export interface IFormilyFormProps {
  __designMode?: string;
  componentProps?: any;
  style?: React.CSSProperties;
}

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Input,
    Radio,
    ArrayCards,
    Slot: (props) => {
      return <React.Fragment>{props.children}</React.Fragment>;
    },
  },
});

// @ts-ignore
const FormilyForm: React.ForwardRefRenderFunction<any, any> = React.forwardRef((props, ref) => {
  const { __designMode, style, componentProps, children } = props;

  const isDesign = __designMode === 'design';

  const createFormilyForm = () => {
    return createForm({
      readOnly: isDesign,
      effects() {
        onFormInit(() => {
          console.log('表单已初始化: ', form);
        });
        onFormMount(() => {
          form.setValues({}, 'deepMerge');
          console.log('表单已挂载: ', form.values);
        });
        onFormValuesChange((form) => {
          console.log('表单值变化: ', form.values);
        });
      },
    });
  };

  const [form, setForm] = useState<Form>(() => {
    return createFormilyForm();
  });

  const updateForm = useCallback(() => {
    setForm((prevForm) => {
      const prevState = prevForm.getState();

      const newForm = createFormilyForm();

      newForm.setState(prevState);
      console.log('updateForm useCallback', prevState);
      return newForm;
    });
  }, []);

  useImperativeHandle(ref, () => {
    return {
      form,
      updateForm: () => {
        updateForm();
      },
    };
  });

  useEffect(() => {
    if (__designMode === 'design') {
      // todo: 需要监听当前 node 的 onAddNode 事件去 updateForm
      console.log('FormilyForm useEffect  props', props);
      updateForm();
    }
  }, [componentProps, children]);

  // 是否存在占位元素
  const hasPlaceholder = isDesign && children?.[0]?.props?.className === 'lc-container-placeholder';

  console.log('FormilyForm render hasPlaceholder', hasPlaceholder);
  console.log('FormilyForm render props', props);

  return (
    <FormContext.Provider
      value={{
        updateForm,
        SchemaField,
      }}
    >
      <FormProvider form={form}>
        <SchemaField>
          {hasPlaceholder ? (
            <SchemaField.Void x-component="Slot" x-component-props={{ children }} />
          ) : (
            <SchemaField.Void
              x-component={(props) => {
                // @ts-ignore
                return (
                  <div>
                    <FormLayout {...props} />
                  </div>
                );
              }}
              x-component-props={componentProps}
            >
              <React.Fragment>{children}</React.Fragment>
            </SchemaField.Void>
          )}
        </SchemaField>
      </FormProvider>
    </FormContext.Provider>
  );
});

class FormClass extends React.Component<
  IFormilyFormProps,
  {
    form: Form<any>;
  }
> {
  formRef = createRef<any>();

  get form() {
    return this.formRef.current.form;
  }

  render() {
    return <FormilyForm {...this.props} ref={this.formRef} />;
  }
}

export default FormClass;
