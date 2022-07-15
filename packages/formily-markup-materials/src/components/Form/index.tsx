import * as React from 'react';
import {
  createElement,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  createRef,
} from 'react';
import { createForm, Form } from '@formily/core';
import { FormProvider, createSchemaField } from '@formily/react';
import { FormContext } from '../../shared/context';
import { FormItem, Input, ArrayCards, FormButtonGroup, Submit } from '@formily/antd';

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
    FormItem,
    Input,
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
    });
  };

  const [form, setForm] = useState<Form>(() => {
    return createFormilyForm();
  });

  useImperativeHandle(ref, () => {
    return {
      form,
    };
  });

  const updateForm = useCallback(() => {
    setForm((prevForm) => {
      const prevState = prevForm.getState();

      const newForm = createFormilyForm();

      newForm.setState(prevState);

      return newForm;
    });
  }, []);

  useEffect(() => {
    if (__designMode === 'design') {
      // todo: 需要监听当前 node 的 onAddNode 事件去 updateForm
      updateForm();
    }
  }, [componentProps, children]);

  // 是否存在占位元素
  const hasPlaceholder = isDesign && children?.[0]?.props?.className === 'lc-container-placeholder';

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
            <React.Fragment>{children}</React.Fragment>
          )}
        </SchemaField>
        <FormButtonGroup>
          <Submit onSubmit={console.log}>Submit</Submit>
        </FormButtonGroup>
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
