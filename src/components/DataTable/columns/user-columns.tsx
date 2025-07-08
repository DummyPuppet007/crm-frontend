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
  dataIndex: ['firstName', 'lastName'],
  key: 'fullName',
  sorter: (a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
  sortDirections: ['ascend', 'descend'],
  ellipsis: {
    showTitle: false,
  },
  render: (_, record) => {
    const fullName = `${record.firstName} ${record.lastName}`;
    return (
      <Tooltip placement="topLeft" title={fullName}>
        <strong>{fullName}</strong>
      </Tooltip>
    );
  },
  onFilter: (value, record) => {
    const fullName = `${record.firstName} ${record.lastName}`;
    return fullName.includes(String(value).toLowerCase());
  },
},

  {
    title: 'Username',
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
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    ellipsis: {
      showTitle: false,
    },
    render: (role: { roleName: string }) => (
      <Tooltip placement="topLeft" title={role.roleName}>
        {role.roleName}
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