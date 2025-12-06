import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Klippy - AI-Powered Viral Clip Generator",
  description: "Transform your long-form content into viral short clips using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
