import * as React from 'react';
import { Card as AntdCard } from 'antd';
import { IFormItemProps, createVoidSchemaComponent } from '../../shared';

const FormilyCard: React.FC<IFormItemProps> = createVoidSchemaComponent({
  componentName: 'Card',
  component: AntdCard,
});

export default FormilyCard;
