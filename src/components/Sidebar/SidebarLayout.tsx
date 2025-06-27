import React from 'react';
import { Sidebar, Menu, menuClasses } from 'react-pro-sidebar';
import { Package, Factory, ShieldCheck, SquareUserRoundIcon, UserPlus, List, Upload, BellRing, Warehouse, KeySquare } from "lucide-react";
import { NavMain } from './nav-main';
import { NavMaster } from "./nav-master";

const data = {
    navMain: [
        {
            title: "Authentication",
            url: "#",
            icon: ShieldCheck,
            items: [
                { title: "Users", url: "auth/users" },
            ],
        },
        {
            title: "Authorization",
            url: "#",
            icon: KeySquare,
            items: [
                { title: "Role", url: "access/roles" },
            ]
        }
    ],
    masters: [
        {
            name: "Customer",
            url: "customers",
            icon: SquareUserRoundIcon,
            items: [
                { name: "Create Customer", url: "create-customer", icon: UserPlus },
                { name: "Customer List", url: "customers", icon: List },
                { name: "Bulk Customer Upload", url: "create-customer-bulk", icon: Upload },
            ],
        },
        { name: "Notification Center", url: "notifications", icon: BellRing, items: [] },
        { name: "Logging", url: "logging", icon: Warehouse, items: [] },
    ],
};

interface SidebarLayoutProps {
    collapsed: boolean;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ collapsed }) => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar
                collapsed={collapsed}
                backgroundColor="#ffffff"
                rootStyles={{
                    [`.${menuClasses.button}`]: {
                        color: '#111827',
                        fontWeight: 500,
                        fontSize: '14px',
                        padding: '10px 20px',
                        '&:hover': {
                            backgroundColor: '#f3f4f6',
                        },
                    },
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px 16px 8px 16px' }}>
                    {!collapsed && (
                        <span style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>Sales CRM</span>
                    )}
                </div>

                <Menu>
                    {!collapsed && (
                        <div style={{ padding: '8px 16px', color: '#6b7280', fontSize: '12px', textTransform: 'uppercase' }}>
                            Modules
                        </div>
                    )}
                    <NavMain items={data.navMain} />

                    {!collapsed && (
                        <div style={{ padding: '8px 16px', color: '#6b7280', fontSize: '12px', textTransform: 'uppercase' }}>
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
