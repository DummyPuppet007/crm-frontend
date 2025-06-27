import { Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { UserList } from '../../../types/auth.types';

export const userColumns: ColumnsType<UserList> = [
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
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    sortDirections: ['ascend', 'descend'],
    ellipsis: {
      showTitle: false,
    },
    render: (firstName: string) => (
      <Tooltip placement="topLeft" title={firstName}>
        <strong>{firstName}</strong>
      </Tooltip>
    ),
  },
  {
    title: 'LogIn Id',
    dataIndex: 'username',
    key: 'username',
    ellipsis: {
      showTitle: false,
    },
    render: (username: string) => (
      <Tooltip placement="topLeft" title={username}>
        {username}
      </Tooltip>
    ),
  },
  {
    title: 'Email ',
    dataIndex: 'email',
    key: 'email',
    ellipsis: {
      showTitle: false,
    },
    render: (email: string) => (
      <Tooltip placement="topLeft" title={email}>
        {email}
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