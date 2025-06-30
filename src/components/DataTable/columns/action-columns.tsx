import { Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ActionList } from '../../../types/auth.types';

export const actionColumns: ColumnsType<ActionList> = [
{
    title: 'Sr. No.',
    key: 'srno',
    width: 80,
    render: (_, __, index) => (
      <Tag color="blue">{index + 1}</Tag>
    ),
    sorter: false,
  },
  {
    title: 'Action Name',
    dataIndex: 'actionName',
    key: 'actionName',
    sorter: (a, b) => a.actionName.localeCompare(b.actionName),
    sortDirections: ['ascend', 'descend'],
    ellipsis: {
      showTitle: false,
    },
    render: (actionName: string) => (
      <Tooltip placement="topLeft" title={actionName}>
        <strong>{actionName}</strong>
      </Tooltip>
    ),
  },
  {
    title: 'Action Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: {
      showTitle: false,
    },
    render: (description: string) => (
      <Tooltip placement="topLeft" title={description}>
        {description}
      </Tooltip>
    ),
  },
  {
    title: 'Create Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    render: (createdAt: string) => (
      <span>
        {new Date(createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}
      </span>
    ),
  },
];