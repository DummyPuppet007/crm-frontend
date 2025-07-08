import type { ColumnsType } from "antd/es/table";
import { Tag, Tooltip } from "antd";

export const routeColumns: ColumnsType<any> = [
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
        title: 'Route Description',
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
        title: 'Http Method',
        dataIndex: 'httpMethod',
        key: 'httpMethod',
        sorter: (a, b) => a.httpMethod.localeCompare(b.httpMethod),
        sortDirections: ['ascend', 'descend'],
        ellipsis: {
          showTitle: false,
        },
        render: (httpMethod: string) => (
          <Tooltip placement="topLeft" title={httpMethod}>
            {httpMethod}
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
