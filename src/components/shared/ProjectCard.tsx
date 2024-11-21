import clsx from "clsx";
import { Folder } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../../store/projectStore";
import { Project } from "../../types/project";

interface ProjectCardProps {
    project: Project;
    type: "timestamping" | "sealing" | "archiving";
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, type }) => {
    const navigate = useNavigate();
    const selectProject = useProjectStore(state => state.selectProject);

    const getTypeColor = () => {
        switch (type) {
            case "timestamping":
                return "bg-blue-500";
            case "sealing":
                return "bg-green-500";
            case "archiving":
                return "bg-purple-500";
            default:
                return "bg-gray-500";
        }
    };

    const handleClick = () => {
        selectProject(project);
        navigate(`/${type}/${project.id}/dashboard`);
    };

    return (
        <button
            onClick={handleClick}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg 
               transition-all duration-200 p-6 text-left border border-gray-200 
               dark:border-gray-700 w-full"
        >
            <div className="flex items-start space-x-4">
                {project.logo ? (
                    <img src={project.logo} alt={project.name} className="w-16 h-16 rounded-lg object-cover" />
                ) : (
                    <div className={clsx("w-16 h-16 rounded-lg flex items-center justify-center", getTypeColor())}>
                        <Folder className="w-8 h-8 text-white" />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{project.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{project.description}</p>
                    <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">Created {new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </button>
    );
};

export default ProjectCard;
