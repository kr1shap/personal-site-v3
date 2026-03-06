import { NextResponse } from "next/server";
import type { SkillSet } from "../../types/skillSet";
import skillSetData from "../../data/skillSet.json";

export async function GET() {
  return NextResponse.json(skillSetData);
}
