import { Moon, Sun } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 
               transition-colors"
            title={t(`common.theme.${theme === "dark" ? "light" : "dark"}`)}
        >
            {theme === "dark" ? <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" /> : <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
        </button>
    );
};

export default ThemeToggle;
