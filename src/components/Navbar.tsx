import clsx from 'clsx';
import { ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavItems from './NavItems';
import ProjectSelector from './shared/ProjectSelector';

interface NavbarProps {
  isExpanded: boolean;
  color: string;
  onToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isExpanded, color, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { t } = useTranslation();

  const getAppTypeAndProjectId = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    const appType = parts[0] as 'timestamping' | 'sealing' | 'archiving';
    const projectId = parts[1];
    return { appType, projectId };
  };

  const { appType, projectId } = getAppTypeAndProjectId();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav
      className={clsx(
        'flex flex-col h-full transition-all duration-300',
        color,
        isExpanded ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex items-center justify-between p-4 text-white">
        <button
          onClick={handleLogoClick}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <Shield size={24} />
          {isExpanded && <span className="font-bold text-xl">Evidency</span>}
        </button>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {appType && !location.pathname.endsWith('/new') && (
        <div className={clsx(
          'px-3 py-2',
          !isExpanded && 'hidden' // Hide project selector when navbar is collapsed
        )}>
          <ProjectSelector type={appType} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <NavItems
          isExpanded={isExpanded}
          appType={appType}
          projectId={projectId}
        />
      </div>
    </nav>
  );
};

export default Navbar;