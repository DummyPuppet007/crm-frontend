  import { useState, useRef } from 'react';
  import {
    Table,
    Input,
    Button,
    Space,
    Typography,
    Card,
  } from 'antd';
  import {
    SearchOutlined,
    ReloadOutlined,
  } from '@ant-design/icons';
  import type { TableProps } from 'antd/es/table';
  import type { FilterConfirmProps } from 'antd/es/table/interface';
  import type { InputRef } from 'antd';

  import type { DataTableProps } from '../../types/datatable.types';
import Highlighter from 'react-highlight-words';

  const { Title } = Typography;

  interface AdvancedDataTableProps<T> extends DataTableProps<T> {
    searchableColumns?: (keyof T)[];
  }

  export function AdvancedDataTable<T extends Record<string, any>>({
    columns,
    data,
    loading = false,
    rowKey = 'id',
    title,
    bordered = true,
    size = 'middle',
    pageSize = 10,
    pageSizeOptions = ['10', '20', '50', '100'],
    showSizeChanger = true,
    showQuickJumper = true,
    scroll = { x: 800 },
    expandable,
    className,
    style,
    tableProps = {},
    searchableColumns = [],
    showRefresh = false,
    onRefresh,
  }: AdvancedDataTableProps<T>) {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

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
        record[dataIndex]
          ?.toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()) || false,
      onFilterDropdownOpenChange: (visible: boolean) => {
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

    // Add search functionality to specified columns
    const enhancedColumns = columns.map((column: any) => {
      if (searchableColumns.includes(column.dataIndex || column.key)) {
        return {
          ...column,
          ...getColumnSearchProps(column.dataIndex || column.key),
        };
      }
      return column;
    });

    const defaultTableProps: TableProps<T> = {
      columns: enhancedColumns,
      dataSource: data,
      loading,
      rowKey,
      pagination: {
        pageSize,
        showSizeChanger,
        showQuickJumper,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        pageSizeOptions,
      },
      scroll,
      size,
      bordered,
      expandable,
      ...tableProps,
    };

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
              {showRefresh && (
                <Button
                  icon={<ReloadOutlined />}
                  onClick={onRefresh}
                  loading={loading}
                >
                  Refresh
                </Button>
              )}
            </div>
            <Table {...defaultTableProps} />
          </Card>
        )}
        {!title && <Table {...defaultTableProps} />}
      </div>
    );
  }