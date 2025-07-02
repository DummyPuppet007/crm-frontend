import React from "react";
import { Sidebar, Menu, menuClasses } from "react-pro-sidebar";
import {
  Package,
  Factory,
  ShieldCheck,
  SquareUserRoundIcon,
  UserPlus,
  List,
  Upload,
  BellRing,
  Warehouse,
  KeySquare,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavMaster } from "./nav-master";
import { useTheme } from "../../context/ThemeContext";

const data = {
  navMain: [
    {
      title: "Authentication",
      url: "#",
      icon: ShieldCheck,
      items: [{ title: "Users", url: "auth/users" }],
    },
    {
      title: "Authorization",
      url: "#",
      icon: KeySquare,
      items: [
        { title: "Role", url: "access/roles" },
        { title: "Module", url: "access/modules" },
        { title: "Action", url: "access/actions" },
        { title: "Permission", url: "access/permissions" },
        { title: "Role Permission", url: "access/role-permissions" },
        { title: "User Permission", url: "access/user-permissions" },
        { title: "Route Permission", url: "access/route-permissions" },
      ],
    },
  ],
  masters: [
    {
      name: "Customer",
      url: "customers",
      icon: SquareUserRoundIcon,
      items: [
        { name: "Create Customer", url: "create-customer", icon: UserPlus },
        { name: "Customer List", url: "customers", icon: List },
        {
          name: "Bulk Customer Upload",
          url: "create-customer-bulk",
          icon: Upload,
        },
      ],
    },
    {
      name: "Notification Center",
      url: "notifications",
      icon: BellRing,
      items: [],
    },
    { name: "Logging", url: "logging", icon: Warehouse, items: [] },
  ],
};

interface SidebarLayoutProps {
  collapsed: boolean;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ collapsed }) => {
  const { darkMode } = useTheme();

  return (
    <div className="flex h-screen">
      <Sidebar
        collapsed={collapsed}
        backgroundColor={darkMode ? "#262626" : "#ffffff"}
        rootStyles={{
          [`.${menuClasses.button}`]: {
            color: darkMode ? "#e5e7eb" : "#111827",
            fontWeight: 500,
            fontSize: "14px",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: darkMode ? "#404040" : "#f3f4f6",
            },
          },
          [`.${menuClasses.subMenuContent}`]: {
            backgroundColor: darkMode ? "#262626" : "#ffffff",
          },
          [`.${menuClasses.menuItemRoot}`]: {
            backgroundColor: darkMode ? "#262626" : "#ffffff",
          },
        }}
        className={`border-r ${darkMode ? 'border-neutral-700' : 'border-neutral-200'}`}
      >
        <div className="flex justify-center items-center py-4 px-4">
          {!collapsed && (
            <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Sales CRM
            </span>
          )}
        </div>

        <Menu
          menuItemStyles={{
            button: {
              '&:hover': {
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                color: darkMode ? '#ffffff' : '#111827',
              },
              '&.ps-active': {
                backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
                color: darkMode ? '#3b82f6' : '#1d4ed8',
                fontWeight: 500,
              },
              padding: '8px 12px',
              margin: '2px 8px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
            },
            label: {
              color: 'inherit',
              fontWeight: 'inherit',
              '&:hover': {
                color: 'inherit',
              },
            },
            icon: {
              color: 'inherit',
              '&:hover': {
                color: 'inherit',
              },
            },
          }}
        >
          {!collapsed && (
            <div className={`px-4 py-2 text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
              Modules
            </div>
          )}
          <NavMain items={data.navMain} />

          {!collapsed && (
            <div className={`px-4 py-2 text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
              Master Data
            </div>
          )}
          <NavMaster masters={data.masters} />
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarLayout;
