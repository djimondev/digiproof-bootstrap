import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import AppDropdown from "./shared/AppDropdown";
import LanguageSwitcher from "./shared/LanguageSwitcher";
import ThemeToggle from "./shared/ThemeToggle";

const TopBar: React.FC = () => {
    const location = useLocation();
    const { t } = useTranslation();

    const getCurrentApp = () => {
        const path = location.pathname;
        if (path.includes("timestamping")) return t("apps.timestamping.title");
        if (path.includes("sealing")) return t("apps.sealing.title");
        if (path.includes("archiving")) return t("apps.archiving.title");
        return t("common.applications");
    };

    return (
        <div
            className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 
                   dark:border-gray-700 px-4 flex items-center justify-between"
        >
            <AppDropdown currentApp={getCurrentApp()} />
            <div className="flex items-center space-x-2">
                <LanguageSwitcher />
                <ThemeToggle />
            </div>
        </div>
    );
};

export default TopBar;
