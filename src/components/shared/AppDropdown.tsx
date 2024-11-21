import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Clock, Shield, Archive } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProjectStore } from '../../store/projectStore';
import clsx from 'clsx';

interface AppDropdownProps {
  currentApp: string;
}

const apps = [
  {
    id: 'timestamping',
    icon: Clock,
    path: '/timestamping',
    color: 'text-blue-500'
  },
  {
    id: 'sealing',
    icon: Shield,
    path: '/sealing',
    color: 'text-green-500'
  },
  {
    id: 'archiving',
    icon: Archive,
    path: '/archiving',
    color: 'text-purple-500'
  }
];

const AppDropdown: React.FC<AppDropdownProps> = ({ currentApp }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const selectProject = useProjectStore(state => state.selectProject);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentAppIcon = () => {
    const path = location.pathname;
    if (path.includes('timestamping')) return Clock;
    if (path.includes('sealing')) return Shield;
    if (path.includes('archiving')) return Archive;
    return null;
  };

  const handleAppSelect = (appPath: string) => {
    // Clear selected project when switching apps
    selectProject(null);
    // Navigate to the base app route
    navigate(appPath);
    setIsOpen(false);
  };

  const Icon = getCurrentAppIcon();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 
                 dark:hover:bg-gray-700 transition-colors"
      >
        {Icon && (
          <Icon
            size={20}
            className={clsx(
              location.pathname.includes('timestamping') && 'text-blue-500',
              location.pathname.includes('sealing') && 'text-green-500',
              location.pathname.includes('archiving') && 'text-purple-500'
            )}
          />
        )}
        <span className="font-medium text-gray-900 dark:text-white">
          {currentApp}
        </span>
        <ChevronDown
          size={20}
          className={clsx(
            'transform transition-transform text-gray-500 dark:text-gray-400',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 rounded-md shadow-lg 
                     bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => handleAppSelect(app.path)}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm 
                           text-gray-700 dark:text-gray-200 hover:bg-gray-100 
                           dark:hover:bg-gray-700"
                >
                  <Icon className={app.color} size={20} />
                  <span>{t(`apps.${app.id}.title`)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppDropdown;