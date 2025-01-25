"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import logoImg from "@/../public/logo.svg";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Header() {
  const router = useRouter();

  async function handleLogout() {
    deleteCookie("session", { path: "/" });
    router.replace("/");
    toast.success("User Logged Out!");
  }
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/main">
          <Image className={styles.logo} src={logoImg} alt="Logomarca" />
        </Link>
        <nav>
          <Link href="/main/category"> Category </Link>
          <Link href="/main/product"> Products </Link>
          <form action={handleLogout}>
            <button type="submit">
              <LogOutIcon className={styles.icon}></LogOutIcon>
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
