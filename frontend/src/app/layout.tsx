import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lorem Ipsum",
  description: "Lorem Ipsum Google Find Assist",
};

const toasterStyle = {
  backgroundColor: "#f1f1f1",
  color: "#131313",
  borderColor: "rgba(255,255,255,0)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Toaster position="top-center" toastOptions={{ style: toasterStyle }} />
        {children}
      </body>
    </html>
  );
}
