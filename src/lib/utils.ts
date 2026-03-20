import { BetPick, Match } from "@/types";

export const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
  maximumFractionDigits: 2
});

export const timeFormatter = new Intl.DateTimeFormat("es-PE", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
});

export const dateTimeFormatter = new Intl.DateTimeFormat("es-PE", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});

export const pickLabelMap: Record<BetPick, string> = {
  HOME: "1",
  DRAW: "X",
  AWAY: "2"
};

export function getOddByPick(match: Match, pick: BetPick) {
  if (pick === "HOME") return match.market.odds.home;
  if (pick === "DRAW") return match.market.odds.draw;
  return match.market.odds.away;
}

export function toHourKey(isoDate: string) {
  return isoDate.slice(11, 13) + ":00";
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
