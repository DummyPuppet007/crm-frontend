// src/components/Dashboard/Dashboard.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { Bell } from 'lucide-react';
import Breadcrumbs from '../Sidebar/Breadcrumbs';
import AdvancedSidebar from '../Sidebar/AdvancedSidebar';

const Dashboard: React.FC = () => {
    const { darkMode } = useTheme();
  
  return (
    <div className={`flex h-screen  ${darkMode ? 'bg-neutral-900' : 'bg-gray-100'}`}>
      <AdvancedSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className={`border-b flex items-center h-12 ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center flex-1">
            <div className="ml-4">
              <Breadcrumbs />
            </div>
          </div>
          <div className="flex items-center gap-4 px-4">
            <Bell className="h-5 w-5" />
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