import { notFound } from "next/navigation";
import { BetDetailCard } from "@/components/bets/BetDetailCard";
import { Bet, BetWithMatch, Match } from "@/types";

async function getBet(betId: string) {
  const [betsResponse, matchesResponse] = await Promise.all([
    fetch(`${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/api/bets`, {
      cache: "no-store"
    }),
    fetch(
      `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/api/matches`,
      { cache: "no-store" }
    )
  ]);

  const betsData = (await betsResponse.json()) as { bets: Bet[] };
  const matchesData = (await matchesResponse.json()) as { matches: Match[] };

  const bet = betsData.bets.find((item) => item.id === betId);
  if (!bet) return null;

  const match = matchesData.matches.find((item) => item.id === bet.matchId);
  if (!match) return null;

  return { ...bet, match } as BetWithMatch;
}

export default async function BetDetailPage({
  params
}: {
  params: Promise<{ betId: string }>;
}) {
  const { betId } = await params;
  const bet = await getBet(betId);

  if (!bet) {
    notFound();
  }

  return <BetDetailCard bet={bet} />;
}
