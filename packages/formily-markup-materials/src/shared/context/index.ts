import { createContext } from 'react';
import { IFormContext } from '../../types';

/**
 * @deprecated
 */
export const FormControlContext = createContext<{
  updateForm: () => void;
}>(null);

export const FormContext = createContext<IFormContext>(null);
