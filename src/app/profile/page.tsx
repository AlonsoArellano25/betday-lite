import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Bet, BetWithMatch, Match } from "@/types";
import { ProfileBetsClient } from "@/components/profile/ProfileBetsClient";

async function getProfileData() {
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

  const matchMap = new Map(
    matchesData.matches.map((match) => [match.id, match])
  );

  const bets = betsData.bets
    .map((bet) => {
      const match = matchMap.get(bet.matchId);
      if (!match) return null;
      return { ...bet, match };
    })
    .filter(Boolean) as BetWithMatch[];

  return {
    bets,
    matches: matchesData.matches
  };
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/profile");
  }

  const data = await getProfileData();

  return (
    <section className="page-section">
      <h1 className="page-title">Mis apuestas</h1>
      <p className="page-subtitle">
        Visualiza tus jugadas y el estado actual de cada selección.
      </p>
      <ProfileBetsClient initialBets={data.bets} matches={data.matches} />
    </section>
  );
}
