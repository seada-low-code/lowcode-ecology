import { createSchemaField } from '@formily/react';

/**
 * @deprecated
 */
export interface IFormilyFormProps {
  __designMode?: string;
  componentProps?: any;
  style?: React.CSSProperties;
}

export type ISchemaField = ReturnType<typeof createSchemaField>;

export interface IFormContext {
  updateForm: () => void;
  SchemaField: ISchemaField;
}
