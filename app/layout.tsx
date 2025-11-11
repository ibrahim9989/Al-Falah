import type { Metadata } from "next";
import { Noto_Kufi_Arabic, Cairo } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";
import ImamNav from "./components/ImamNav";

const notoKufi = Noto_Kufi_Arabic({
  variable: "--font-kufi",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al Falah - Find Masjids Near You",
  description: "Find masjids and mosques near you, view prayer timings, juma schedules, and announcements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${notoKufi.variable} ${cairo.variable} antialiased`}
      >
        {children}
        <BottomNav />
        <ImamNav />
      </body>
    </html>
  );
}
