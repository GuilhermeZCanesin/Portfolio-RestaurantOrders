"use client";
import { UploadCloud } from "lucide-react";
import styles from "./styles.module.scss";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button } from "../../components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { redirect } from "next/navigation";

interface CategoryProps {
  id: string;
  name: string;
}
interface Props {
  categories: CategoryProps[];
}export function Form({ categories }: Props) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type !== "image/png" && image.type !== "image/jpeg") {
        toast.warning("Wrong Image Format! PNG or JPEG Allowed");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  async function handleRegisterProduct(formData: FormData) {
    const categoryIndex = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!name || !categoryIndex || !price || !description || !image) {
      toast.warning("There are missing fields!");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", categories[Number(categoryIndex)].id);
    data.append("file", image);

    const token = await getCookieClient();

    const response = await api
      .post("/product", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        toast.error("Failed to create Product");
        return;
      });

    if (response) {
      toast.success("Successfully created Product!");
      redirect("/main");
    }
  }

  return (
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <h1>New Product</h1>
      </section>
      <form className={styles.form} action={handleRegisterProduct}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud className={styles.icon} />
            <input
              type="file"
              name="upload"
              accept="image/png, image/jpeg"
              required
              onChange={handleFile}
            />
            {previewImage && (
              <Image
                alt="Preview Image"
                src={previewImage}
                className={styles.preview}
                fill={true}
                quality={100}
                priority={true}
              />
            )}
          </span>
        </label>
        <select name="category">
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder="Type the name of the product..."
          required
          className={styles.input}
        />
        <input
          type="number"
          step={0.01}
          name="price"
          placeholder="Type the price of the product..."
          required
          className={styles.input}
        />
        <textarea
          name="description"
          placeholder="Type a description for the product..."
          required
          className={styles.input}
        />
        <Button name="Save" />
      </form>
    </main>
  );
}
