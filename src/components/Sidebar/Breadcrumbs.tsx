import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

interface BreadCrumbItem {
  label: string;
  path: string;
}

const formatLabel = (segment: string): string => {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function Breadcrumbs() {
  const location = useLocation();

  const generateBreadcrumbs = (): BreadCrumbItem[] => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadCrumbItem[] = [];
    let currentPath = "";

    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        label: formatLabel(segment),
        path: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const isHomePage = location.pathname === "/";

  if (isHomePage) return null;

  return (
    <div className="breadcrumb-container">
      <Breadcrumb 
        separator=">"
      >
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined style={{ marginRight: 4 }} />
            Home
          </Link>
        </Breadcrumb.Item>
        
        {breadcrumbs.map((crumb, index) => (
          <Breadcrumb.Item key={crumb.path}>
            {index < breadcrumbs.length - 1 ? (
              <Link to={crumb.path}>{crumb.label}</Link>
            ) : (
              <span style={{ color: '#1890ff', fontWeight: 500 }}>
                {crumb.label}
              </span>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}
