import { HomeHero } from "@/components/home/HomeHero";
import { Timeline } from "@/components/home/Timeline";
import { Match } from "@/types";

async function getMatches() {
  const response = await fetch(`${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/api/matches`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los partidos");
  }

  return (await response.json()) as { date: string; matches: Match[] };
}

export default async function HomePage() {
  const data = await getMatches();

  return (
    <div className="page-section">
      <HomeHero totalMatches={data.matches.length} />
      <Timeline matches={data.matches} />
    </div>
  );
}
