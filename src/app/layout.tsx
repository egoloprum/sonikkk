import type { Metadata } from "next";
import "./globals.css";
import CompNavbar from "@/components/CompNavbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Meal planner",
  description: "describe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <CompNavbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
