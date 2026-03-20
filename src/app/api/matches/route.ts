import { NextResponse } from "next/server";
import matches from "@/data/matches.today.50.json";

export async function GET() {
  return NextResponse.json(matches);
}
