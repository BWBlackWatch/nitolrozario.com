import fs from "fs";
import path from "path";
import yaml from "js-yaml";

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

interface ProjectsData {
  projects: Project[];
}

export function getProjects(): Project[] {
  const filePath = path.join(process.cwd(), "data", "projects.yaml");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(fileContents) as ProjectsData;
  return data.projects;
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}
