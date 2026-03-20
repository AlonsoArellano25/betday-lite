"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BetWithMatch } from "@/types";
import { currency, dateTimeFormatter, pickLabelMap } from "@/lib/utils";
import styles from "./profile.module.css";

type Props = {
  bets: BetWithMatch[];
};

export function ProfileBets({ bets }: Props) {
  if (!bets.length) {
    return (
      <section className={styles.emptyState}>
        <h2>No tienes apuestas aún</h2>
        <p>Ve al timeline y registra una jugada simulada para verla aquí.</p>
        <Link href="/" className={styles.emptyAction}>
          Ir al inicio
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.grid}>
      {bets.map((bet, index) => (
        <motion.article
          key={bet.id}
          className={styles.card}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: index * 0.03 }}
        >
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.matchTitle}>
                {bet.match.homeTeam.name} vs {bet.match.awayTeam.name}
              </p>
              <p className={styles.meta}>{dateTimeFormatter.format(new Date(bet.placedAt))}</p>
            </div>
            <span className={styles.status} data-status={bet.status}>
              {bet.status}
            </span>
          </div>

          <div className={styles.dataGrid}>
            <div>
              <span className={styles.label}>Selección</span>
              <strong>{pickLabelMap[bet.pick]}</strong>
            </div>
            <div>
              <span className={styles.label}>Cuota</span>
              <strong>{bet.odd.toFixed(2)}</strong>
            </div>
            <div>
              <span className={styles.label}>Stake</span>
              <strong>{currency.format(bet.stake)}</strong>
            </div>
          </div>

          <Link href={`/bets/${bet.id}`} className={styles.link}>
            Ver detalle
          </Link>
        </motion.article>
      ))}
    </section>
  );
}
