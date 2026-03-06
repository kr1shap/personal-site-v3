import { NextResponse } from "next/server";
import type { ExperienceEntry } from "../../types/experience";
import experienceData from "../../data/experience.json";

export async function GET() {
  return NextResponse.json(experienceData);
}
