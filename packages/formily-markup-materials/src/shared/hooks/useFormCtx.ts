import { useContext } from 'react';
import { FormContext } from '../context/index';

export const useFormCtx = () => {
  const ctx = useContext(FormContext);

  return ctx;
};

export const useSchemaField = () => {
  const ctx = useFormCtx();

  return ctx.SchemaField;
};
