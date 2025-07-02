// src/components/Dashboard/Dashboard.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import SidebarLayout from '../Sidebar/SidebarLayout';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const { darkMode } = useTheme();
  

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`flex h-screen  ${darkMode ? 'bg-neutral-900' : 'bg-gray-100'}`}>
      <SidebarLayout collapsed={sidebarCollapsed} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className={`border-b flex justify-between items-center h-12 ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-gray-200'}`}>
          <button 
            onClick={toggleSidebar} 
            className={`p-2 rounded ${darkMode ? 'text-gray-200 hover:bg-neutral-700' : 'text-neutral-700 hover:bg-gray-100'}`}
          >
            {sidebarCollapsed ? <PanelRightClose /> : <PanelLeftClose />}
          </button>
          <div className="px-4">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;