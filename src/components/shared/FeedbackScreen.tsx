import React from 'react';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface Action {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  primary?: boolean;
}

interface FeedbackScreenProps {
  icon: LucideIcon;
  title: string;
  message: string;
  actions: Action[];
  status?: 'success' | 'error';
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  icon: Icon,
  title,
  message,
  actions,
  status = 'success'
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'error':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-green-500 bg-green-100 dark:bg-green-900/20';
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div
        className={clsx(
          'mx-auto w-16 h-16 rounded-full flex items-center justify-center',
          getStatusColor()
        )}
      >
        <Icon size={32} />
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>
      <div className="mt-8 flex justify-center space-x-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={clsx(
                'px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors',
                action.primary
                  ? 'bg-primary-500 text-white hover:bg-primary-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              )}
            >
              <Icon size={20} />
              <span>{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FeedbackScreen;