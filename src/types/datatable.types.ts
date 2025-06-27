export interface DataTableProps<T = any> {
  columns: any[];
  data: T[];
  loading?: boolean;
  searchKey?: string;
  searchPlaceholder?: string;
  rowKey?: string | ((record: T) => string);
  showSearch?: boolean;
  showRefresh?: boolean;
  onRefresh?: () => void;
  title?: string;
  bordered?: boolean;
  size?: 'small' | 'middle' | 'large';
  pageSize?: number;
  pageSizeOptions?: string[];
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  scroll?: { x?: number; y?: number };
  expandable?: {
    expandedRowRender?: (record: T) => React.ReactNode;
    rowExpandable?: (record: T) => boolean;
  };
  className?: string;
  style?: React.CSSProperties;
  tableProps?: any; 
}

export interface SearchConfig {
  placeholder?: string;
  allowClear?: boolean;
  enterButton?: boolean;
  size?: 'small' | 'middle' | 'large';
  style?: React.CSSProperties;
}

export interface PaginationConfig {
  pageSize?: number;
  pageSizeOptions?: string[];
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  position?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
}