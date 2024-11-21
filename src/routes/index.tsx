import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import TimestampingApp from '../pages/TimestampingApp';
import SealingApp from '../pages/SealingApp';
import ArchivingApp from '../pages/ArchivingApp';

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