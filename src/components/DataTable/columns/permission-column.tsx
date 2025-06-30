import { Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PermissionList } from '../../../types/auth.types';

export const permissionColumns: ColumnsType<PermissionList> = [
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
    title: 'Module',
    dataIndex: 'moduleName',
    key: 'moduleName',
    sorter: (a, b) => a.moduleName.localeCompare(b.moduleName),
    sortDirections: ['ascend', 'descend'],
    ellipsis: {
      showTitle: false,
    },
    render: (moduleName: string) => (
      <Tooltip placement="topLeft" title={moduleName}>
        <strong>{moduleName}</strong>
      </Tooltip>
    ),
  },
  {
    title: 'Action',
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