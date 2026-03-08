"use client";

import { useState } from "react";
import ProjectCard from "@/app/components/cards/ProjectCard";
import DetailPopup from "@/app/components/cards/DetailPopup";
import type { ProjectEntry, ProjectsData } from "@/app/types/projects";

const CATEGORY_ORDER: Array<keyof ProjectsData> = ["mobile", "webdev", "other"];
const CATEGORY_LABELS: Record<keyof ProjectsData, string> = {
  mobile: "mobile",
  webdev: "more web dev",
  other: "other",
};

interface ProjectsSectionProps {
  projects: ProjectsData;
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectEntry | null>(
    null,
  );

  return (
    <section
      id="projects"
      className="w-full px-4 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <h2 className="text-[clamp(3.125rem,13vw,7.5rem)] leading-[0.95] mb-4 lg:mb-5 text-(--dull-blue)">
            projects
          </h2>
          <p className="-mt-1 mb-5 text-[clamp(1.5rem,4.2vw,2.5rem)] leading-none text-(--dull-grey)">
            scroll horizontally to see more :)
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {CATEGORY_ORDER.map((category) => {
            const entries = projects[category] ?? [];

            if (entries.length === 0) return null;

            return (
              <div key={category} className="w-full">
                <h3 className="mb-4 text-[clamp(2rem,6vw,3rem)] leading-none text-(--dark-blue)">
                  {CATEGORY_LABELS[category]}
                </h3>

                <div className="relative">
                  <div className="overflow-x-auto pt-2 pb-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex w-max items-start gap-4 sm:gap-5 lg:gap-6 pl-0.5 pr-5">
                      {entries.map((project) => {
                        const normalizedProject = {
                          ...project,
                          img:
                            project?.img && project.img.startsWith("/")
                              ? project.img
                              : `/${project.img}`,
                        };

                        return (
                          <ProjectCard
                            key={project.title}
                            project={normalizedProject}
                            onClick={() =>
                              setSelectedProject(normalizedProject)
                            }
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-10 bg-linear-to-r from-(--cream) to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-10 bg-linear-to-l from-(--cream) to-transparent"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <DetailPopup
          isOpen
          onClose={() => setSelectedProject(null)}
          type="project"
          data={selectedProject}
        />
      )}
    </section>
  );
}
