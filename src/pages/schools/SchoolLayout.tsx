import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SchoolSidebar from '@/components/SchoolSidebar';

const SchoolLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      <SchoolSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SchoolLayout;
