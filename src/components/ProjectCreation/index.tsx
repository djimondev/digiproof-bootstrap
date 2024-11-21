import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProjectFormData, Project } from '../../types/project';
import { useProjectStore } from '../../store/projectStore';
import ProjectForm from './ProjectForm';
import ProjectSummary from './ProjectSummary';

interface ProjectCreationProps {
  type: 'timestamping' | 'sealing' | 'archiving';
}

const ProjectCreation: React.FC<ProjectCreationProps> = ({ type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const addProject = useProjectStore((state) => state.addProject);
  const [step, setStep] = useState<'form' | 'summary'>('form');
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
  });

  const handleSubmit = () => {
    const project: Project = {
      id: crypto.randomUUID(),
      ...formData,
      type,
      createdAt: new Date(),
    };
    addProject(project);
    navigate(`/${type}/${project.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {t('project.create')}
        </h2>

        {step === 'form' ? (
          <>
            <ProjectForm data={formData} onChange={setFormData} />
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setStep('summary')}
                disabled={!formData.name || !formData.description}
                className="px-4 py-2 bg-primary-500 text-white rounded-md 
                         hover:bg-primary-600 disabled:opacity-50 
                         disabled:cursor-not-allowed transition-colors"
              >
                {t('common.next')}
              </button>
            </div>
          </>
        ) : (
          <>
            <ProjectSummary data={formData} />
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setStep('form')}
                className="px-4 py-2 text-gray-700 dark:text-gray-200 
                         hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md 
                         transition-colors"
              >
                {t('common.back')}
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-primary-500 text-white rounded-md 
                         hover:bg-primary-600 transition-colors"
              >
                {t('common.create')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCreation;