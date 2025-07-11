import { Layout, Menu, Dropdown, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

import {
  ShieldCheck,
  KeySquare,
  BadgeIndianRupee,
  Cable,
  List,
  Upload,
  PlusCircle,
  Building2,
  User,
  Package,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const { Sider } = Layout;

interface NavItem {
  title?: string;
  name?: string;
  url: string;
  icon?: LucideIcon;
  items?: NavItem[];
}

const data = {
  navMain: [
    {
      title: "Authentication",
      url: "authentication",
      icon: ShieldCheck,
      items: [{ title: "Users", url: "auth/users" }],
    },
    {
      title: "Authorization",
      url: "authorization",
      icon: KeySquare,
      items: [
        { title: "Role", url: "access/roles" },
        { title: "Module", url: "access/modules" },
        { title: "Action", url: "access/actions" },
        { title: "Permission", url: "access/permissions" },
        { title: "Role Permission", url: "access/role-permissions" },
        { title: "User Permission", url: "access/user-permissions" },
        { title: "Route Permission", url: "access/route-permissions" },
        { title: "Routes", url: "access/routes" },
      ],
    },
    {
      title: "Sales",
      url: "sales",
      icon: BadgeIndianRupee,
      items: [
        { title: "Create Lead", url: "create-lead", icon: Cable },
        { title: "Lead List", url: "leads", icon: List },
        { title: "Quotation", url: "quotation", icon: Upload },
      ],
    },
  ],
  masters: [
    {
      name: "Create New",
      url: "create",
      icon: PlusCircle,
      items: [
        { name: "Organization", url: "create/organization", icon: Building2 },
        { name: "Person", url: "create/person", icon: User },
        { name: "Product", url: "create/product", icon: Package },
      ],
    },
    {
      name: "List",
      url: "list",
      icon: List,
      items: [
        { name: "Organizations", url: "list/organizations", icon: Building2 },
        { name: "Persons", url: "list/persons", icon: User },
        { name: "Products", url: "list/products", icon: Package },
      ],
    },
  ],
};

const AdvancedSidebar = () => {
const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mainOpenKey, setMainOpenKey] = useState<string[]>([]);
  const [mastersOpenKey, setMastersOpenKey] = useState<string[]>([]);

  const prependDashboard = (url: string) => `/dashboard/${url}`;
  const selectedKey = location.pathname;

  const onMainOpenChange = (keys: string[]) => {
    const latest = keys.find((key) => !mainOpenKey.includes(key));
    setMainOpenKey(latest ? [latest] : []);
  };

  const onMastersOpenChange = (keys: string[]) => {
    const latest = keys.find((key) => !mastersOpenKey.includes(key));
    setMastersOpenKey(latest ? [latest] : []);
  };

  const renderMenuItems = (items: NavItem[]): any[] =>
    items.map((item) => {
      const label = item.title || item.name;
      const key = prependDashboard(item.url);
      const Icon = item.icon;

      if (item.items && item.items.length > 0) {
        return {
          key,
          label,
          icon: Icon ? <Icon size={18} /> : undefined,
          children: renderMenuItems(item.items),
        };
      }

      return {
        key: prependDashboard(item.url),
        label,
        icon: Icon ? <Icon size={18} /> : undefined,
        onClick: () => navigate(prependDashboard(item.url)),
      };
    });

  const renderCollapsedDropdown = (item: NavItem) => {
    const label = item.title || item.name;
    const Icon = item.icon;
    const isActive = (item.items || []).some(
      (sub) => selectedKey === prependDashboard(sub.url)
    );

    const items = (item.items || []).map((subItem) => ({
      key: prependDashboard(subItem.url),
      label: (
        <span onClick={() => navigate(prependDashboard(subItem.url))}>
          {subItem.title || subItem.name}
        </span>
      ),
    }));

    return (
      <Dropdown
        key={label}
        menu={{ items }}
        placement="bottomRight"
        overlayClassName="!bg-neutral-800"
      >
        <div
          className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#2a2a2a] rounded-md mx-3 my-3 ${
            isActive ? "bg-neutral-700 text-white" : "text-neutral-500"
          }`}
        >
          {/* <Tooltip title={label} placement="right"> */}
            {Icon && <Icon size={22} />}
          {/* </Tooltip> */}
        </div>
      </Dropdown>
    );
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={240}
      style={{ height: "100vh", position: "sticky", top: 0, left: 0, backgroundColor: darkMode ? "#262626" : "#ffffff", borderRight: darkMode ? "1px solid #404040" : "1px solid lightgray" }}
    >
      <div className="mt-2 flex items-center justify-center font-bold text-lg">
        {collapsed ? "CRM" : "Accounts CRM"}
      </div>
      <Divider className="absolute top-[23px] " />

      <div className="overflow-y-auto h-[calc(100vh-64px)] py-3 mt-6 custom-scrollbar">
        {/* Main Section */}
        {!collapsed && (
          <div className="text-xs text-gray-400 px-4 mb-1 uppercase">Main</div>
        )}
        {collapsed ? (
          data.navMain.map(renderCollapsedDropdown)
        ) : (
          <Menu
            mode="inline"
            // theme="dark"
            selectedKeys={[selectedKey]}
            openKeys={mainOpenKey}
            onOpenChange={onMainOpenChange}
            items={renderMenuItems(data.navMain)}
            style={{ backgroundColor: "inherit" }}
          />
        )}

        {/* Masters Section */}
        {!collapsed && (
          <div className="text-xs text-gray-400 px-4 mt-6 mb-1 uppercase">
            Masters
          </div>
        )}
        {collapsed ? (
          data.masters.map(renderCollapsedDropdown)
        ) : (
          <Menu
            mode="inline"
            // theme="dark"
            selectedKeys={[selectedKey]}
            openKeys={mastersOpenKey}
            onOpenChange={onMastersOpenChange}
            items={renderMenuItems(data.masters)}
            style={{ backgroundColor: "inherit" }}
          />
        )}
      </div>
    </Sider>
  );
};

export default AdvancedSidebar;
