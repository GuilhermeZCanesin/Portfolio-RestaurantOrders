import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "./../../public/logo.svg";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.containerCentered}>
        <Image className={styles.logo} src={logoImg} alt="Logomarca"></Image>
        <section className={styles.login}>
          <form>
            <input
              type="email"
              required
              name="email"
              className={styles.input}
              placeholder="Type your email" />
            <input
              type="password"
              required
              name="password"
              className={styles.input}
              placeholder="Type your password" />
            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
          <Link href="/register" className={styles.text}>
            Still no account? Sign-up
          </Link>
        </section>
      </div>
    </>
  );
}
