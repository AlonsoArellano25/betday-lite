import { Suspense } from "react";
import { Match } from "@/types";
import { TimelineClient } from "./TimelineClient";

type Props = {
  matches: Match[];
};

export function Timeline({ matches }: Props) {
  return (
    <Suspense fallback={<div>Preparando timeline...</div>}>
      <TimelineClient matches={matches} />
    </Suspense>
  );
}
