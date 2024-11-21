import React from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useProjectStore } from '../store/projectStore';
import Dashboard from '../components/Dashboard';
import SealFeature from '../components/features/SealFeature';
import AuditTrail from '../components/AuditTrail';
import ProjectCreation from '../components/ProjectCreation';
import ProjectList from '../components/shared/ProjectList';

const SealingApp: React.FC = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const projects = useProjectStore(state => 
    state.projects.filter(p => p.type === 'sealing')
  );

  // Show project creation form when path ends with /new
  if (location.pathname === '/sealing/new') {
    return <ProjectCreation type="sealing" />;
  }

  // Show project list when no project is selected
  if (!projectId) {
    return <ProjectList type="sealing" projects={projects} />;
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