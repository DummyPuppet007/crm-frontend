import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import SidebarLayout from '../Sidebar/SidebarLayout';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarLayout collapsed={sidebarCollapsed} />
      <main style={{ flex: 1}}>
        <header className="bg-white border-b border-gray-200">
          <button onClick={toggleSidebar} className='p-2'>
          {sidebarCollapsed ? 
          <PanelRightClose /> : <PanelLeftClose />}
        </button>
        </header>
        
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;