import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, Shield, Archive } from 'lucide-react';
import AppCard from '../components/AppCard';

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const apps = [
    {
      id: 'timestamping',
      icon: Clock,
      color: 'bg-blue-500',
      path: '/timestamping'
    },
    {
      id: 'sealing',
      icon: Shield,
      color: 'bg-green-500',
      path: '/sealing'
    },
    {
      id: 'archiving',
      icon: Archive,
      color: 'bg-purple-500',
      path: '/archiving'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t('common.applications')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppCard
            key={app.id}
            icon={app.icon}
            title={t(`apps.${app.id}.title`)}
            description={t(`apps.${app.id}.description`)}
            color={app.color}
            onClick={() => navigate(app.path)}
          />
        ))}
      </div>
    </div>
  );
}

export default Homepage;