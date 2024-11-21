import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Settings, ChevronRight, ChevronLeft } from 'lucide-react';
import Navbar from './Navbar';
import TopBar from './TopBar';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  const getNavbarColor = () => {
    const path = location.pathname;
    if (path.includes('timestamping')) return 'bg-blue-600';
    if (path.includes('sealing')) return 'bg-green-600';
    if (path.includes('archiving')) return 'bg-purple-600';
    return 'bg-gray-800'; // Default color
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar
        isExpanded={isNavExpanded}
        color={getNavbarColor()}
        onToggle={() => setIsNavExpanded(!isNavExpanded)}
      />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;