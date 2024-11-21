import React from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useProjectStore } from '../store/projectStore';
import Dashboard from '../components/Dashboard';
import ArchiveFeature from '../components/features/ArchiveFeature';
import AuditTrail from '../components/AuditTrail';
import ProjectCreation from '../components/ProjectCreation';
import ProjectList from '../components/shared/ProjectList';

const ArchivingApp: React.FC = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const projects = useProjectStore(state => 
    state.projects.filter(p => p.type === 'archiving')
  );

  // Show project creation form when path ends with /new
  if (location.pathname === '/archiving/new') {
    return <ProjectCreation type="archiving" />;
  }

  // Show project list when no project is selected
  if (!projectId) {
    return <ProjectList type="archiving" projects={projects} />;
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