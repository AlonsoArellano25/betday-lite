"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Match, BetPick } from "@/types";
import { timeFormatter, getOddByPick } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { addSimulatedBet } from "@/store/slices/betsSlice";
import { toast } from "sonner";
import styles from "./home.module.css";

type Props = {
  match: Match;
};

export function MatchCard({ match }: Props) {
  const dispatch = useAppDispatch();
  const [busyPick, setBusyPick] = useState<BetPick | null>(null);

  async function onBet(pick: BetPick) {
    try {
      setBusyPick(pick);
      const response = await fetch("/api/place-bet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ matchId: match.id, pick })
      });

      if (!response.ok) {
        throw new Error("No se pudo registrar la apuesta");
      }

      const data = await response.json();
      dispatch(addSimulatedBet(data.bet));
      toast.success(`Apuesta registrada a ${pick === "HOME" ? "1" : pick === "DRAW" ? "X" : "2"}`);
    } catch {
      toast.error("No se pudo procesar tu apuesta");
    } finally {
      setBusyPick(null);
    }
  }

  return (
    <motion.article whileHover={{ y: -4, scale: 1.01 }} className={styles.matchCard}>
      <div className={styles.cardHeader}>
        <span className={styles.league}>{match.league.name}</span>
        <span className={styles.startTime}>{timeFormatter.format(new Date(match.startTime))}</span>
      </div>

      <div className={styles.teams}>
        <div>
          <p className={styles.teamName}>{match.homeTeam.name}</p>
          <p className={styles.teamNameMuted}>{match.awayTeam.name}</p>
        </div>
        <span className={styles.marketChip}>1X2</span>
      </div>

      <div className={styles.oddsGrid}>
        <button
          className={styles.oddButton}
          onClick={() => onBet("HOME")}
          disabled={busyPick !== null}
        >
          <span>1</span>
          <strong>{getOddByPick(match, "HOME").toFixed(2)}</strong>
        </button>
        <button
          className={styles.oddButton}
          onClick={() => onBet("DRAW")}
          disabled={busyPick !== null}
        >
          <span>X</span>
          <strong>{getOddByPick(match, "DRAW").toFixed(2)}</strong>
        </button>
        <button
          className={styles.oddButton}
          onClick={() => onBet("AWAY")}
          disabled={busyPick !== null}
        >
          <span>2</span>
          <strong>{getOddByPick(match, "AWAY").toFixed(2)}</strong>
        </button>
      </div>
    </motion.article>
  );
}
