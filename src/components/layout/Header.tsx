import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserMenu } from "./UserMenu";
import styles from "./header.module.css";

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandBadge}>B</span>
          <div>
            <p className={styles.brandTitle}>BetDay Lite</p>
            <p className={styles.brandSubtitle}>Sportsbook Experience</p>
          </div>
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>
            Inicio
          </Link>
          {session && (
            <Link href="/profile" className={styles.link}>
              Perfil
            </Link>
          )}
          <UserMenu session={session} />
        </nav>
      </div>
    </header>
  );
}
