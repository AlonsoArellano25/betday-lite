import styles from "./home.module.css";

type Props = {
  totalMatches: number;
};

export function HomeHero({ totalMatches }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <span className={styles.eyebrow}>Reto técnico</span>
        <h1 className={styles.heroTitle}>Eventos del día, cuotas claras y una experiencia moderna.</h1>
        <p className={styles.heroDescription}>
          Explora el timeline de partidos, realiza apuestas simuladas 1X2 y revisa tu actividad desde un perfil protegido.
        </p>
      </div>

      <div className={styles.heroStats}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Partidos</span>
          <strong className={styles.statValue}>{totalMatches}</strong>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Mercado</span>
          <strong className={styles.statValue}>1X2</strong>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Zona horaria</span>
          <strong className={styles.statValue}>Lima</strong>
        </div>
      </div>
    </section>
  );
}
