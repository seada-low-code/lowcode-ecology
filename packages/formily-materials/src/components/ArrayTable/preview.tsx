import * as React from 'react';
import { Fragment, createElement } from 'react';
import { Table } from 'antd';
import { ArrayBase } from '@formily/antd';
import { observer, VoidField } from '@formily/react';
import { IFormItemProps } from '../../shared';
import cls from 'classnames';

const HeaderCell: React.FC = (props: any) => {
  return (
    <th {...props} data-designer-node-id={props.className.match(/data-id\:([^\s]+)/)?.[1]}>
      {props.children}
    </th>
  );
};

const BodyCell: React.FC = (props: any) => {
  return (
    <td {...props} data-designer-node-id={props.className.match(/data-id\:([^\s]+)/)?.[1]}>
      {props.children}
    </td>
  );
};

// todo
export const ArrayTablePreview: React.FC<any> = observer((props) => {
  const { columns, ...extra } = props;

  return (
    <ArrayBase disabled>
      <Table
        size="small"
        bordered
        {...extra}
        scroll={{ x: '100%' }}
        style={{ marginBottom: 10, ...props.style }}
        rowKey={'id'}
        dataSource={[{ id: '1' }]}
        pagination={false}
        components={{
          header: {
            cell: HeaderCell,
          },
          body: {
            cell: BodyCell,
          },
        }}
      >
        {(columns || []).map((col, index) => {
          // const children = node.children.map((child) => {
          //   return <TreeNodeWidget node={child} key={child.id} />
          // })
          // const props = node.props['x-component-props']
          return (
            <Table.Column
              key={index}
              // {...props}
              title={<div data-content-editable="x-component-props.title">{col.title}</div>}
              // dataIndex={node.id}
              // className={`data-id:${node.id}`}
              // key={node.id}
              render={(value, record, key) => {
                return (
                  <ArrayBase.Item key={key} index={key} record={null}>
                    {/* {children.length > 0 ? children : 'Droppable'} */}
                    {col?.render ? col.render(value, record, key) : '请使用自定义渲染'}
                  </ArrayBase.Item>
                );
              }}
            />
          );
        })}
        {/* {columns.length === 0 && (
          <Table.Column render={() => <DroppableWidget />} />
        )} */}
      </Table>
      {/* {additions.map((child) => {
        return <TreeNodeWidget node={child} key={child.id} />
      })} */}
    </ArrayBase>
  );
});

ArrayBase.mixin(ArrayTablePreview);

// export default (props) => {
//   return (
//     <VoidField name={props.fieldProps.name} pattern="editable">
//       <ArrayCardsPreview {...props}>{props.children}</ArrayCardsPreview>
//     </VoidField>
//   );
// };
