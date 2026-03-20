import { LoginForm } from "@/components/login/LoginForm";
import styles from "@/components/login/login.module.css";

export default function LoginPage() {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Bienvenido a BetDay Lite</h1>
      <p className={styles.text}>
        Usa la cuenta demo para revisar el perfil protegido y registrar apuestas simuladas.
      </p>
      <LoginForm />
    </section>
  );
}
