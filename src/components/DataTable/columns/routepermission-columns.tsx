import { Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const routePermissionColumns: ColumnsType<any> = [
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
    title: 'Route Name',
    dataIndex: 'routeName',
    key: 'routeName',
    sorter: (a, b) => a.routeName.localeCompare(b.routeName),
    sortDirections: ['ascend', 'descend'],
    ellipsis: {
      showTitle: false,
    },
    render: (routeName: string) => (
      <Tooltip placement="topLeft" title={routeName}>
        <strong>{routeName}</strong>
      </Tooltip>
    ),
  },
  {
    title: 'Permission Name',
    dataIndex: 'permissionName',
    key: 'permissionName',
    sorter: (a, b) => a.permissionName.localeCompare(b.permissionName),
    sortDirections: ['ascend', 'descend'],
    ellipsis: {
      showTitle: false,
    },
    render: (permissionName: string) => (
      <Tooltip placement="topLeft" title={permissionName}>
        <strong>{permissionName}</strong>
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