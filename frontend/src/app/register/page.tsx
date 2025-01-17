import Image from "next/image";
import styles from "./../page.module.scss";
import logoImg from "./../../../public/logo.svg";
import Link from "next/link";

import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Register() {
  async function handleRegister(formData: FormData) {
    "use server"
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
      console.log("Fill all fields");
      return;
    }

    try {
      await api.post("/user", {
        name, email, password
      });
      redirect("/");
    } catch (error) {
      console.log("Error creating account: ", error);
    }

  }

  return (
    <>
      <div className={styles.containerCentered}>
        <Image className={styles.logo} src={logoImg} alt="Logomarca"></Image>
        <section className={styles.login}>
          <h1>Let's create your account!</h1>
          <form action={handleRegister}>
            <input
              type="text"
              required
              name="name"
              className={styles.input}
              placeholder="Type your name" />
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
              Register
            </button>
          </form>
          <Link href="/" className={styles.text}>
            Already registered? Sign-in
          </Link>
        </section>
      </div>
    </>
  );
}
