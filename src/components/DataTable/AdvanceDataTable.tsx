import { useState, useRef } from 'react';
import React from 'react';
import {
  Table,
  Input,
  Button,
  Space,
  Typography,
  Card,
  Dropdown,
  Checkbox
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  DownOutlined
} from '@ant-design/icons';
import type { TableProps } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { InputRef } from 'antd';
import type { DataTableProps } from '../../types/datatable.types';
import Highlighter from 'react-highlight-words';

const { Title } = Typography;

// Custom styles for scrollable table
const customTableStyles = `
  .custom-scrollable-table .ant-table-container .ant-table-body,
  .custom-scrollable-table .ant-table-container .ant-table-content {
    scrollbar-width: thin;
    scrollbar-color: #eaeaea transparent;
    scrollbar-gutter: stable;
  }
  
  .custom-scrollable-table .ant-table-container .ant-table-body::-webkit-scrollbar,
  .custom-scrollable-table .ant-table-container .ant-table-content::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  
  .custom-scrollable-table .ant-table-container .ant-table-body::-webkit-scrollbar-track,
  .custom-scrollable-table .ant-table-container .ant-table-content::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollable-table .ant-table-container .ant-table-body::-webkit-scrollbar-thumb,
  .custom-scrollable-table .ant-table-container .ant-table-content::-webkit-scrollbar-thumb {
    background-color: #eaeaea;
    border-radius: 4px;
  }
  
  .custom-scrollable-table .ant-table-container .ant-table-body::-webkit-scrollbar-thumb:hover,
  .custom-scrollable-table .ant-table-container .ant-table-content::-webkit-scrollbar-thumb:hover {
    background-color: #d0d0d0;
  }
`;

interface AdvancedDataTableProps<T> extends DataTableProps<T> {
  searchableColumns?: (keyof T)[];
  enableScroll?: boolean;
  scrollXWidth?: number | string;
  defaultVisibleColumns?: (string | number)[];
}

export function AdvancedDataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  rowKey = 'id',
  title,
  bordered = true,
  size = 'middle',
  pageSize: initialPageSize = 10,
  pageSizeOptions = ['10', '20', '50', '100'],
  showSizeChanger = true,
  showQuickJumper = true,
  enableScroll = false,
  scrollXWidth = 'max-content',
  defaultVisibleColumns,
  expandable,
  className,
  style,
  tableProps = {},
  searchableColumns = [],
  showRefresh = false,
  onRefresh,
}: AdvancedDataTableProps<T>) {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: initialPageSize,
  });

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  // Add custom styles to head if they don't exist
  React.useEffect(() => {
    const styleId = 'custom-scrollable-table-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = customTableStyles;
      document.head.appendChild(style);
    }
  }, []);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: keyof T,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: keyof T) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${String(dataIndex)}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined, fontSize: '1.1rem' }} />
    ),
    onFilter: (value: any, record: T) =>
      record[dataIndex]?.toString().toLowerCase().includes((value as string).toLowerCase()) || false,
    onOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const initialVisible = defaultVisibleColumns && defaultVisibleColumns.length > 0
    ? defaultVisibleColumns
    : columns.map(col => col.key || col.dataIndex);
  const [visibleColumnKeys, setVisibleColumnKeys] = useState(initialVisible);

  const handleToggleColumn = (key: string) => {
    setVisibleColumnKeys(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const filteredColumns = columns
    .filter(col => visibleColumnKeys.includes(col.key || col.dataIndex))
    .map((column: any) => {
      if (searchableColumns.includes(column.dataIndex || column.key)) {
        return {
          ...column,
          ...getColumnSearchProps(column.dataIndex || column.key),
        };
      }
      return column;
    });

  const menuProps = {
    items: columns.map(col => ({
      key: col.key || col.dataIndex,
      label: (
        <Checkbox
          checked={visibleColumnKeys.includes(col.key || col.dataIndex)}
          onChange={e => {
            e.stopPropagation();
            handleToggleColumn(col.key || col.dataIndex);
          }}
        >
          {col.title}
        </Checkbox>
      ),
    })),
  };

  const handleTableChange = (newPagination: any) => {
    setPagination({
      ...pagination,
      ...newPagination,
    });
  };

  // Enhanced scroll configuration
  const getScrollConfig = () => {
    if (enableScroll) {
      return {
        x: scrollXWidth,
        y: undefined, // You can add vertical scroll height if needed
      };
    }
    return undefined;
  };

  const defaultTableProps: TableProps<T> = {
    columns: filteredColumns,
    dataSource: data,
    loading,
    rowKey,
    pagination: {
      current: pagination.current,
      pageSize: pagination.pageSize,
      showSizeChanger,
      showQuickJumper,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSizeOptions,
      onShowSizeChange: (current, size) => {
        setPagination({
          current: 1,
          pageSize: size,
        });
      },
      onChange: (page, pageSize) => {
        setPagination({
          current: page,
          pageSize: pageSize || pagination.pageSize,
        });
      },
    },
    scroll: getScrollConfig(),
    size,
    bordered,
    expandable,
    onChange: handleTableChange,
    ...tableProps,
  };

  // Combine custom scroll styles with existing className
  const tableClassName = `custom-scrollable-table ${className || ''}`.trim();

  return (
    <div className={className} style={style}>
      {title && (
        <Card>
          <div
            style={{
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title level={2} style={{ margin: 0 }}>
              {title}
            </Title>
            <Space>
              <Dropdown.Button
                menu={menuProps}
                icon={<DownOutlined />}
              >
                Columns
              </Dropdown.Button>
              {showRefresh && (
                <Button
                  icon={<ReloadOutlined />}
                  onClick={onRefresh}
                  loading={loading}
                >
                  Refresh
                </Button>
              )}
            </Space>
          </div>
          <Table {...defaultTableProps} className={tableClassName} />
        </Card>
      )}
      {!title && (
        <>
          <Space style={{ marginBottom: 16 }}>
            <Dropdown.Button
              menu={menuProps}
              icon={<DownOutlined />}
            >
              Columns
            </Dropdown.Button>
          </Space>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <Table {...defaultTableProps} className={tableClassName} />
          </div>
        </>
      )}
    </div>
  );
}