import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Clock, ShieldCheck, Archive, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface NavItemsProps {
  isExpanded: boolean;
  appType?: 'timestamping' | 'sealing' | 'archiving';
  projectId?: string;
}

const NavItems: React.FC<NavItemsProps> = ({ isExpanded, appType, projectId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // Don't show navigation items if:
  // 1. We don't have an appType
  // 2. We don't have a projectId
  // 3. We're in the project creation form (/new path)
  if (!appType || !projectId || location.pathname.endsWith('/new')) {
    return null;
  }

  const getNavItems = (): NavItem[] => {
    const baseItems = [
      {
        icon: LayoutDashboard,
        label: t('common.dashboard'),
        path: `/${appType}/${projectId}/dashboard`
      }
    ];

    const specificItems: Record<string, NavItem[]> = {
      timestamping: [
        {
          icon: Clock,
          label: t('features.timestamp'),
          path: `/${appType}/${projectId}/timestamp`
        },
        {
          icon: ShieldCheck,
          label: t('features.verify'),
          path: `/${appType}/${projectId}/verify`
        }
      ],
      sealing: [
        {
          icon: ShieldCheck,
          label: t('features.seal'),
          path: `/${appType}/${projectId}/seal`
        }
      ],
      archiving: [
        {
          icon: Archive,
          label: t('features.archive'),
          path: `/${appType}/${projectId}/archive`
        }
      ]
    };

    const auditTrailItem = {
      icon: FileText,
      label: t('features.auditTrail'),
      path: `/${appType}/${projectId}/audit`
    };

    return [...baseItems, ...(specificItems[appType] || []), auditTrailItem];
  };

  const navItems = getNavItems();

  const handleNavigation = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div className="px-3 py-4 space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={(e) => handleNavigation(item.path, e)}
            className={clsx(
              'w-full flex items-center px-3 py-2 rounded-lg transition-colors',
              isActive
                ? 'bg-white/10 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white',
              isExpanded ? 'justify-start' : 'justify-center'
            )}
          >
            <Icon size={20} />
            {isExpanded && (
              <span className="ml-3 text-sm font-medium">{item.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default NavItems;