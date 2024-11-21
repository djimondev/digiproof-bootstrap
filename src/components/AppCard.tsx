import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import React from "react";

interface AppCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    onClick: () => void;
}

const AppCard: React.FC<AppCardProps> = ({ icon: Icon, title, description, color, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "w-full p-6 rounded-xl transition-transform transform hover:scale-105",
                "bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl",
                "text-left border border-gray-200 dark:border-gray-700"
            )}
        >
            <div className={clsx("w-12 h-12 rounded-lg flex items-center justify-center mb-4", color, "text-white")}>
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </button>
    );
};

export default AppCard;
