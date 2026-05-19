import { projectsData } from "../data/projects";

export interface ProjectSlide {
  image: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  year: number;
  role: string;
  client: string;
  location: string;
  status: string;
  link?: string;
  tags: string[];
  cover_color: string;
  featured_image?: string;
  slides?: ProjectSlide[];
}

export function getProjects(): Project[] {
  return projectsData.projects as Project[];
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}
