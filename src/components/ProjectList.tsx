import React from 'react';
import { useTranslation } from 'react-i18next';
import { Project } from '../types/project';
import { Folder } from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <button
          key={project.id}
          onClick={() => onSelect(project)}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg 
                   transition-shadow border border-gray-200 dark:border-gray-700 text-left"
        >
          <div className="flex items-start space-x-4">
            {project.logo ? (
              <img
                src={project.logo}
                alt={project.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 
                           flex items-center justify-center">
                <Folder className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {project.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {project.description}
              </p>
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProjectList;