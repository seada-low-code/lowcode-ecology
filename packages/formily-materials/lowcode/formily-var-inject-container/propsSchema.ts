import { createVoidItemSchema } from '../utils/formilyFieldShared';
import { uuid } from '../../src/shared';

export const Container = {
  type: 'object',
  properties: {},
};

export default createVoidItemSchema(Container, {
  field: () => ({
    name: uuid(),
  }),
  component: () => ({
    'x-component-props': {
      title: 'Container',
    },
  }),
});
