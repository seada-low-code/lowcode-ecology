import { useContext, useEffect } from 'react';
import { FormContext } from '../context/index';

export const useFormCtx = () => {
  const ctx = useContext(FormContext);

  return ctx;
};

export const useSchemaField = () => {
  const ctx = useFormCtx();

  return ctx.SchemaField;
};

/**
 * props改变时需要更新顶层的form
 * 相关链接：https://v2.formilyjs.org/zh-CN/guide/advanced/controlled#schema-%E5%8F%97%E6%8E%A7
 * TODO：该处理方法可能会触发频繁更新，导致性能问题，可以考虑使用 debounce，或者手动触发更新
 *
 * @param dependencies 变更后会触发 updateForm 的依赖
 */
export const useUpdateForm = (dependencies: any[]) => {
  const ctx = useFormCtx();
  const updateForm = ctx.updateForm;
  useEffect(() => {
    updateForm();
  }, dependencies);
};
