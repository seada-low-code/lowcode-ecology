import { Space } from '@formily/antd';
import { IFormItemProps, createVoidSchemaComponent } from '../../shared';

const FormilySpace: React.FC<IFormItemProps> = createVoidSchemaComponent({
  componentName: 'Space',
  component: Space,
});

export default FormilySpace;
