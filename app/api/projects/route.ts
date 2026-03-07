import { NextResponse } from "next/server";
import type { ProjectsData } from "../../types/projects";
import projectsData from "../../data/projects.json";

export async function GET() {
  const response: ProjectsData = projectsData;
  return NextResponse.json(response);
}
