import Image from "next/image";
import styles from "./styles.module.scss";
import logoImg from "./../../public/logo.svg";
import Link from "next/link";

import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Login() {
  async function handleLogin(formData: FormData) {
    "use server"
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      console.log("Fill all fields");
      return;
    }

    try {
      const response = await api.post("/user/session", {
        email, password
      });

      if (!response.data.token) {
        return;
      }

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      (await cookies()).set('session', response.data.token, {
        maxAge: expressTime,
        path: '/',
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    } catch (error) {
      console.log("Error logging in: ", error);
    }

    redirect("/main");
  }
  return (
    <>
      <div className={styles.containerCentered}>
        <Image className={styles.logo} src={logoImg} alt="Logomarca" />
        <section className={styles.login}>
          <form action={handleLogin}>
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
            Still no account? Register now!
          </Link>
        </section>
      </div>
    </>
  );
}
