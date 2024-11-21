import clsx from 'clsx';
import { ChevronDown, Plus } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectStore } from '../../store/projectStore';
import { Project } from '../../types/project';

interface ProjectSelectorProps {
  type: 'timestamping' | 'sealing' | 'archiving';
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { t } = useTranslation();
  
  const projects = useProjectStore(state => 
    state.projects.filter(p => p.type === type)
  );
  const selectedProject = useProjectStore(state => state.selectedProject);
  const selectProject = useProjectStore(state => state.selectProject);

  useEffect(() => {
    if (projectId) {
      const project = projects.find(p => p.id === projectId);
      if (project && (!selectedProject || selectedProject.id !== project.id)) {
        selectProject(project);
      }
    }
  }, [projectId, projects, selectedProject, selectProject]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNewProject = () => {
    navigate(`/${type}/new`);
    setIsOpen(false);
  };

  const handleSelectProject = (project: Project) => {
    selectProject(project);
    navigate(`/${type}/${project.id}/dashboard`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg 
                 bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <span className="font-medium truncate">
          {selectedProject ? selectedProject.name : t('project.select.title')}
        </span>
        <ChevronDown
          size={20}
          className={clsx(
            'transform transition-transform flex-shrink-0 ml-2',
            isOpen ? 'rotate-180' : ''
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full rounded-lg shadow-lg 
                     bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                     divide-y divide-gray-200 dark:divide-gray-700 z-50">
          {projects.length > 0 ? (
            <div className="py-1">
              {projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => handleSelectProject(project)}
                  className={clsx(
                    'w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700',
                    selectedProject?.id === project.id
                      ? 'text-primary-600 dark:text-primary-400 font-medium bg-primary-50 dark:bg-primary-900/10'
                      : 'text-gray-700 dark:text-gray-200'
                  )}
                >
                  {project.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-2 px-4 text-sm text-gray-500 dark:text-gray-400">
              {t('project.select.empty')}
            </div>
          )}

          <div className="py-1">
            <button
              onClick={handleNewProject}
              className="w-full flex items-center space-x-2 px-4 py-2 text-sm 
                       text-primary-600 dark:text-primary-400 hover:bg-gray-50 
                       dark:hover:bg-gray-700 font-medium"
            >
              <Plus size={16} />
              <span>{t('project.select.new')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;