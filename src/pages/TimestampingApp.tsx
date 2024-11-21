import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AuditTrail from "../components/AuditTrail";
import Dashboard from "../components/Dashboard";
import TimestampFeature from "../components/features/TimestampFeature";
import VerifyFeature from "../components/features/VerifyFeature";
import ProjectCreation from "../components/ProjectCreation";
import ProjectList from "../components/shared/ProjectList";
import { useProjectStore } from "../store/projectStore";

const TimestampingApp: React.FC = () => {
    const location = useLocation();
    const projects = useProjectStore(state => state.projects.filter(p => p.type === "timestamping"));

    // Show project creation form when path ends with /new
    if (location.pathname === "/timestamping/new") {
        return <ProjectCreation type="timestamping" />;
    }

    return (
        <Routes>
            <Route index element={<ProjectList type="timestamping" projects={projects} />} />
            <Route path="new" element={<ProjectCreation type="timestamping" />} />
            <Route path=":projectId/dashboard" element={<Dashboard type="timestamping" />} />
            <Route path=":projectId/timestamp" element={<TimestampFeature />} />
            <Route path=":projectId/verify" element={<VerifyFeature />} />
            <Route path=":projectId/audit" element={<AuditTrail />} />
            <Route path=":projectId" element={<Navigate to="dashboard" replace />} />
        </Routes>
    );
};

export default TimestampingApp;
