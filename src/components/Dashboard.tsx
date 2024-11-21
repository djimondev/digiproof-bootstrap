import clsx from 'clsx';
import { AlertCircle, CheckCircle, Folder } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useProjectStore } from '../store/projectStore';

interface DashboardProps {
  type: 'timestamping' | 'sealing' | 'archiving';
}

const Dashboard: React.FC<DashboardProps> = ({ type }) => {
  const { projectId } = useParams();
  // const { t } = useTranslation();
  const project = useProjectStore(state => state.selectedProject);

  React.useEffect(() => {
    // Add your project fetching logic here using the projectId
  }, [projectId]);

  // Mock data - replace with real data in production
  const stats = {
    total: 150,
    successRate: 98.5
  };

  const getTypeColor = () => {
    switch (type) {
      case 'timestamping':
        return 'bg-blue-500';
      case 'sealing':
        return 'bg-green-500';
      case 'archiving':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (!project) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-start space-x-6">
          {project.logo ? (
            <img
              src={project.logo}
              alt={project.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
          ) : (
            <div className={clsx(
              'w-24 h-24 rounded-lg flex items-center justify-center',
              getTypeColor()
            )}>
              <Folder className="w-12 h-12 text-white" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.name}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Created {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Items
              </p>
              <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Success Rate
              </p>
              <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                {stats.successRate}%
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <AlertCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;