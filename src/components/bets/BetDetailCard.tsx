import Link from "next/link";
import { BetWithMatch } from "@/types";
import { currency, dateTimeFormatter, pickLabelMap } from "@/lib/utils";
import styles from "./bet-detail.module.css";

type Props = {
  bet: BetWithMatch;
};

export function BetDetailCard({ bet }: Props) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div>
          <span className={styles.kicker}>Detalle de apuesta</span>
          <h1 className={styles.title}>
            {bet.match.homeTeam.name} vs {bet.match.awayTeam.name}
          </h1>
          <p className={styles.meta}>{dateTimeFormatter.format(new Date(bet.placedAt))}</p>
        </div>
        <span className={styles.status} data-status={bet.status}>
          {bet.status}
        </span>
      </div>

      <div className={styles.grid}>
        <div className={styles.box}>
          <span>Selección</span>
          <strong>{pickLabelMap[bet.pick]}</strong>
        </div>
        <div className={styles.box}>
          <span>Cuota</span>
          <strong>{bet.odd.toFixed(2)}</strong>
        </div>
        <div className={styles.box}>
          <span>Stake</span>
          <strong>{currency.format(bet.stake)}</strong>
        </div>
        <div className={styles.box}>
          <span>Retorno</span>
          <strong>{bet.return ? currency.format(bet.return) : "-"}</strong>
        </div>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.teamBox}>
          <small>Local</small>
          <strong>{bet.match.homeTeam.name}</strong>
        </div>
        <div className={styles.teamBox}>
          <small>Visitante</small>
          <strong>{bet.match.awayTeam.name}</strong>
        </div>
        <div className={styles.teamBox}>
          <small>Liga</small>
          <strong>{bet.match.league.name}</strong>
        </div>
      </div>

      <Link href="/profile" className={styles.link}>
        Volver al perfil
      </Link>
    </section>
  );
}
