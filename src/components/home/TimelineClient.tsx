"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Match } from "@/types";
import { toHourKey } from "@/lib/utils";
import { MatchCard } from "./MatchCard";
import styles from "./home.module.css";

type Props = {
  matches: Match[];
};

export function TimelineClient({ matches }: Props) {
  const groups = useMemo(() => {
    return matches.reduce<Record<string, Match[]>>((acc, match) => {
      const hour = toHourKey(match.startTime);
      acc[hour] = acc[hour] ? [...acc[hour], match] : [match];
      return acc;
    }, {});
  }, [matches]);

  return (
    <section className={styles.timelineSection}>
      {Object.entries(groups).map(([hour, items], index) => (
        <motion.div
          key={hour}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.03 }}
          className={styles.hourGroup}
        >
          <div className={styles.hourHeader}>
            <span className={styles.hourLabel}>{hour}</span>
            <span className={styles.hourCount}>{items.length} partidos</span>
          </div>

          <div className={styles.matchesGrid}>
            {items.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
}
