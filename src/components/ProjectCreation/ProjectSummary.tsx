import React from "react";
import { ProjectFormData } from "../../types/project";

interface ProjectSummaryProps {
    data: ProjectFormData;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({ data }) => {
    // const { t } = useTranslation();

    return (
        <div className="space-y-6">
            <div className="flex items-start space-x-6">
                {data.logo && <img src={URL.createObjectURL(data.logo)} alt="Project logo" className="w-24 h-24 rounded-lg object-cover" />}
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{data.name}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{data.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectSummary;
