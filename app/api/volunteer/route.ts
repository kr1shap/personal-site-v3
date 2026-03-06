import { NextResponse } from "next/server";
import type { VolunteerEntry } from "../../types/volunteer";
import volunteerData from "../../data/volunteer.json";

export async function GET() {
  return NextResponse.json(volunteerData);
}
