export interface Project {
  id: string;
  name: string;
  description: string;
  logo?: string;
  createdAt: Date;
  type: 'timestamping' | 'sealing' | 'archiving';
}

export interface ProjectFormData {
  name: string;
  description: string;
  logo?: File;
}