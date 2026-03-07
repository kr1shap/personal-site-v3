import { NextResponse } from "next/server";
import type { VolunteerEntry } from "../../types/volunteer";
import volunteerData from "../../data/volunteer.json";

export async function GET() {
  // Ensure each entry matches the expected VolunteerEntry shape
  const normalized = (volunteerData?.volunteer || []).map((v: any) => {
    const entry: VolunteerEntry = {
      title: v.title || "",
      description: v.description || "",
      bullets: Array.isArray(v.bullets) ? v.bullets : [],
      img: v.img || "",
    };
    return entry;
  });

  return NextResponse.json({ volunteer: normalized });
}
