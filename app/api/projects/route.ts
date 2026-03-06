import { NextResponse } from "next/server";
import type { ProjectEntry } from "../../types/projects";
import projectsData from "../../data/projects.json";

export async function GET() {
  return NextResponse.json(projectsData);
}
