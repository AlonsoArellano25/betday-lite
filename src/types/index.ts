export type Match = {
  id: string;
  startTime: string;
  league: {
    id: string;
    name: string;
    country: string;
  };
  homeTeam: {
    id: string;
    name: string;
    shortName: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
  };
  market: {
    type: "1X2";
    odds: {
      home: number;
      draw: number;
      away: number;
    };
  };
};

export type BetStatus = "PENDING" | "WON" | "LOST";
export type BetPick = "HOME" | "DRAW" | "AWAY";

export type Bet = {
  id: string;
  matchId: string;
  placedAt: string;
  pick: BetPick;
  odd: number;
  stake: number;
  status: BetStatus;
  return: number | null;
};

export type BetWithMatch = Bet & {
  match: Match;
};

export type PlaceBetPayload = {
  matchId: string;
  pick: BetPick;
};

export type PlaceBetResponse = {
  bet: Bet;
};
