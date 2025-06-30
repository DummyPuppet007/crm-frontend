import { Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ModuleList } from '../../../types/auth.types';


export const moduleColumns: ColumnsType<ModuleList> = [
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
    title: 'Module Name',
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
    title: 'Module Description',
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