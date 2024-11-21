import { Upload, X } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { ProjectFormData } from "../../types/project";

interface ProjectFormProps {
    data: ProjectFormData;
    onChange: (data: ProjectFormData) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ data, onChange }) => {
    const { t } = useTranslation();
    const { getRootProps, getInputProps } = useDropzone({
        accept: { "image/*": [] },
        maxFiles: 1,
        onDrop: ([file]) => {
            if (file) {
                onChange({ ...data, logo: file });
            }
        }
    });

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{t("project.name")}</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={e => onChange({ ...data, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 px-3 py-2 text-sm 
                   focus:border-primary-500 focus:ring-primary-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{t("project.description")}</label>
                <textarea
                    value={data.description}
                    onChange={e => onChange({ ...data, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 px-3 py-2 text-sm 
                   focus:border-primary-500 focus:ring-primary-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{t("project.logo")}</label>

                {data.logo ? (
                    <div className="relative w-32 h-32">
                        <img src={URL.createObjectURL(data.logo)} alt="Project logo" className="w-full h-full object-cover rounded-lg" />
                        <button
                            onClick={() => onChange({ ...data, logo: undefined })}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full 
                       hover:bg-red-600 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div
                        {...getRootProps()}
                        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg 
                     p-6 text-center cursor-pointer hover:border-primary-500 transition-colors"
                    >
                        <input {...getInputProps()} />
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t("project.dropzone")}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectForm;
