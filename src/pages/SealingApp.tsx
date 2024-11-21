import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AuditTrail from '../components/AuditTrail';
import Dashboard from '../components/Dashboard';
import SealFeature from '../components/features/SealFeature';
import ProjectCreation from '../components/ProjectCreation';

const SealingApp: React.FC = () => {
  const location = useLocation();
  // const projects = useProjectStore(state => 
  //   state.projects.filter(p => p.type === 'sealing')
  // );

  // Show project creation form when path ends with /new
  if (location.pathname === '/sealing/new') {
    return <ProjectCreation type="sealing" />;
  }

  return (
    <Routes>
      <Route path="/:projectId/dashboard" element={<Dashboard type="sealing" />} />
      <Route path="/:projectId/seal" element={<SealFeature />} />
      <Route path="/:projectId/audit" element={<AuditTrail />} />
      <Route path="/:projectId" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default SealingApp;