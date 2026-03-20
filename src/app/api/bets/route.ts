import { NextResponse } from "next/server";
import bets from "@/data/bets.me.50.json";

export async function GET() {
  return NextResponse.json(bets);
}
