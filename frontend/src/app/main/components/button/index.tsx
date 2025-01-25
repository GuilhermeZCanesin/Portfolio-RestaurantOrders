"use client";

import { SaveIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

import styles from "./styles.module.scss";

interface Props {
  name: string;
}

export function Button({ name }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={styles.button}>
      {name}
      {pending ? (
        <SaveIcon className={styles.saveAnimated} />
      ) : (
        <SaveIcon className={styles.save} />
      )}
    </button>
  );
}
