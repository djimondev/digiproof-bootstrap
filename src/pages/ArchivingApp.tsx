import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AuditTrail from '../components/AuditTrail';
import Dashboard from '../components/Dashboard';
import ArchiveFeature from '../components/features/ArchiveFeature';
import ProjectCreation from '../components/ProjectCreation';
import { useProjectStore } from '../store/projectStore';

const ArchivingApp: React.FC = () => {
  const location = useLocation();
  const projects = useProjectStore(state => 
    state.projects.filter(p => p.type === 'archiving')
  );

  // Show project creation form when path ends with /new
  if (location.pathname === '/archiving/new') {
    return <ProjectCreation type="archiving" />;
  }

  return (
    <Routes>
      <Route path="/:projectId/dashboard" element={<Dashboard type="archiving" />} />
      <Route path="/:projectId/archive" element={<ArchiveFeature />} />
      <Route path="/:projectId/audit" element={<AuditTrail />} />
      <Route path="/:projectId" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default ArchivingApp;