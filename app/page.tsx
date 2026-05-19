import { getProjects } from "@/lib/getProjects";
import Header from "@/components/Header";
import ProjectList from "@/components/ProjectList";

export default function HomePage() {
  const projects = getProjects();

  return (
    <>
      <Header />
      <main className="page-enter pt-12 site-container">
        <ProjectList projects={projects} />
      </main>
    </>
  );
}
