"use client";

import { useMemo } from "react";
import { BetWithMatch, Match } from "@/types";
import { useAppSelector } from "@/store/hooks";
import { ProfileBets } from "./ProfileBets";

type Props = {
  initialBets: BetWithMatch[];
  matches: Match[];
};

export function ProfileBetsClient({ initialBets, matches }: Props) {
  const simulated = useAppSelector((state) => state.bets.simulatedBets);

  const merged = useMemo(() => {
    const matchMap = new Map(matches.map((match) => [match.id, match]));
    const simulatedWithMatches = simulated
      .map((bet) => {
        const match = matchMap.get(bet.matchId);
        if (!match) return null;
        return {
          ...bet,
          match
        };
      })
      .filter(Boolean) as BetWithMatch[];

    return [...simulatedWithMatches, ...initialBets].filter(
      (bet, index, array) => array.findIndex((item) => item.id === bet.id) === index
    );
  }, [initialBets, matches, simulated]);

  return <ProfileBets bets={merged} />;
}
