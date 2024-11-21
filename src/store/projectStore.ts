import { create } from 'zustand';
import { Project } from '../types/project';

interface ProjectStore {
  projects: Project[];
  selectedProject: Project | null;
  addProject: (project: Project) => void;
  selectProject: (project: Project | null) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  selectedProject: null,
  addProject: (project) =>
    set((state) => ({ 
      projects: [...state.projects, project],
      selectedProject: project // Auto-select newly created project
    })),
  selectProject: (project) =>
    set(() => ({ selectedProject: project })),
}));