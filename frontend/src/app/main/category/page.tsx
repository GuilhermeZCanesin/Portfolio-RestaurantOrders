import styles from "./styles.module.scss";
import "./../../globals.scss";
import { Button } from "../components/button";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { redirect } from "next/navigation";

export default function Category() {
  async function handleRegisterCategory(formData: FormData) {
    "use server";
    const name = formData.get("name");
    if (!name) return;
    const data = {
      name: name,
    };

    const token = await getCookieServer();
    await api
      .post("/category", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    redirect("/main");
  }

  return (
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <h1>New Category</h1>
      </section>
      <form className={styles.form} action={handleRegisterCategory}>
        <input
          type="text"
          name="name"
          placeholder="Category Name, ex: Pizza"
          className={styles.input}
        />
        <Button name="Save" />
      </form>
    </main>
  );
}
