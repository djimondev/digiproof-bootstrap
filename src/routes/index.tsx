import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ArchivingApp from "../pages/ArchivingApp";
import Homepage from "../pages/Homepage";
import SealingApp from "../pages/SealingApp";
import TimestampingApp from "../pages/TimestampingApp";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/timestamping/*" element={<TimestampingApp />} />
            <Route path="/sealing/*" element={<SealingApp />} />
            <Route path="/archiving/*" element={<ArchivingApp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
