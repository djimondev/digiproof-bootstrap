import { Plus } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../types/project';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  type: 'timestamping' | 'sealing' | 'archiving';
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ type, projects }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getTypeColor = () => {
    switch (type) {
      case 'timestamping':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'sealing':
        return 'bg-green-500 hover:bg-green-600';
      case 'archiving':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getTitle = () => {
    return t(`apps.${type}.title`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {getTitle()}
        </h1>
        <button
          onClick={() => navigate(`/${type}/new`)}
          className={`inline-flex items-center px-4 py-2 text-white 
                   rounded-lg transition-colors space-x-2 ${getTypeColor()}`}
        >
          <Plus size={20} />
          <span>{t('common.newProject')}</span>
        </button>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              type={type}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {t('project.noProjects')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectList;