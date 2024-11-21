import React from 'react';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useProjectStore } from '../store/projectStore';
import Dashboard from '../components/Dashboard';
import TimestampFeature from '../components/features/TimestampFeature';
import VerifyFeature from '../components/features/VerifyFeature';
import AuditTrail from '../components/AuditTrail';
import ProjectCreation from '../components/ProjectCreation';
import ProjectList from '../components/shared/ProjectList';

const TimestampingApp: React.FC = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const projects = useProjectStore(state => 
    state.projects.filter(p => p.type === 'timestamping')
  );

  // Show project creation form when path ends with /new
  if (location.pathname === '/timestamping/new') {
    return <ProjectCreation type="timestamping" />;
  }

  // Show project list when no project is selected
  if (!projectId) {
    return <ProjectList type="timestamping" projects={projects} />;
  }

  return (
    <Routes>
      <Route path="/:projectId/dashboard" element={<Dashboard type="timestamping" />} />
      <Route path="/:projectId/timestamp" element={<TimestampFeature />} />
      <Route path="/:projectId/verify" element={<VerifyFeature />} />
      <Route path="/:projectId/audit" element={<AuditTrail />} />
      <Route path="/:projectId" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default TimestampingApp;