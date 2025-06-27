import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Input,
  Button,
  Space,
  Card,
  Typography,
  Tooltip,
  Skeleton,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd/es/table';
import type { InputRef } from 'antd';
import type { DataTableProps } from '../../types/datatable.types';


const { Title } = Typography;
const { Search } = Input;

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  searchKey,
  searchPlaceholder = 'Search...',
  rowKey = 'id',
  showSearch = true,
  showRefresh = false,
  onRefresh,
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
}: DataTableProps<T>) {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [searchText, setSearchText] = useState<string>('');
  const searchInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (searchText && searchKey) {
      const filtered = data.filter((item) => {
        const searchValue = item[searchKey];
        if (typeof searchValue === 'string') {
          return searchValue.toLowerCase().includes(searchText.toLowerCase());
        }
        return false;
      });
      setFilteredData(filtered);
    } else if (searchText) {
      // Global search across all string fields
      const filtered = data.filter((item) =>
        Object.values(item).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchText.toLowerCase());
          }
          return false;
        })
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, searchText, searchKey]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleRefresh = () => {
    setSearchText('');
    if (onRefresh) {
      onRefresh();
    }
  };

  const defaultTableProps: TableProps<T> = {
    columns,
    dataSource: filteredData,
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
        <Title
          level={2}
          style={{
            borderBottom: '1px solid #d9d9d9',
            paddingBottom: '16px',
            marginBottom: '24px',
          }}
        >
          {title}
        </Title>
      )}

      {(showSearch || showRefresh) && (
        <div
          style={{
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {showSearch && (
            <Search
              ref={searchInputRef}
              placeholder={searchPlaceholder}
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              style={{ maxWidth: '400px' }}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              value={searchText}
            />
          )}

          <Space>
            {showRefresh && (
              <Tooltip title="Refresh Data">
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                  loading={loading}
                >
                  Refresh
                </Button>
              </Tooltip>
            )}
          </Space>
        </div>
      )}

      <Table {...defaultTableProps} />
    </div>
  );
}
