import { Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { RoleList } from '../../../types/auth.types';


export const roleColumns: ColumnsType<RoleList> = [
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
    title: 'Role Name',
    dataIndex: 'roleName',
    key: 'roleName',
    sorter: (a, b) => a.roleName.localeCompare(b.roleName),
    sortDirections: ['ascend', 'descend'],
    ellipsis: {
      showTitle: false,
    },
    render: (roleName: string) => (
      <Tooltip placement="topLeft" title={roleName}>
        <strong>{roleName}</strong>
      </Tooltip>
    ),
  },
  {
    title: 'Role Description',
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