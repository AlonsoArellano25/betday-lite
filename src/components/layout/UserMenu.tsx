"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import styles from "./header.module.css";

type Props = {
  session: Session | null;
};

export function UserMenu({ session }: Props) {
  if (!session?.user) {
    return (
      <Link href="/login" className={styles.primaryAction}>
        Ingresar
      </Link>
    );
  }

  return (
    <div className={styles.userBlock}>
      <div className={styles.userInfo}>
        <span className={styles.userName}>{session.user.name}</span>
        <span className={styles.userEmail}>{session.user.email}</span>
      </div>
      <button className={styles.secondaryAction} onClick={() => signOut({ callbackUrl: "/" })}>
        Salir
      </button>
    </div>
  );
}
