import { getProjects } from "@/lib/getProjects";
import Header from "@/components/Header";
import ProjectList from "@/components/ProjectList";

export default function HomePage() {
  const projects = getProjects();

  return (
    <main className="page-enter">
      <Header />
      <div className="pt-12">
        <ProjectList projects={projects} />
      </div>
    </main>
  );
}
