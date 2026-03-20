import { NextResponse } from "next/server";
import matches from "@/data/matches.today.50.json";
import { Bet, BetPick, Match } from "@/types";

function getOdd(match: Match, pick: BetPick) {
  if (pick === "HOME") return match.market.odds.home;
  if (pick === "DRAW") return match.market.odds.draw;
  return match.market.odds.away;
}

export async function POST(request: Request) {
  const body = await request.json();
  const match = matches.matches.find((item) => item.id === body.matchId);

  if (!match) {
    return NextResponse.json({ message: "Match not found" }, { status: 404 });
  }

  const pick = body.pick as BetPick;
  const bet: Bet = {
    id: `bet_sim_${crypto.randomUUID()}`,
    matchId: match.id,
    placedAt: new Date().toISOString(),
    pick,
    odd: getOdd(match, pick),
    stake: 20,
    status: "PENDING",
    return: null
  };

  return NextResponse.json({ bet });
}
