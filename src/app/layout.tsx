import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project MS",
  description: "Movie Search Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
