import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David & Ornella — 17 luglio 2027",
  description:
    "David e Ornella si sposano il 17 luglio 2027 a Masseria Papaperta, in Puglia.",
  openGraph: {
    title: "David & Ornella — 17 luglio 2027",
    description: "Una sera d'estate nel cuore della Puglia.",
    type: "website",
    locale: "it_IT",
    images: [{ url: "/og.png", width: 1733, height: 907, alt: "David e Ornella — 17 luglio 2027" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "David & Ornella — 17 luglio 2027",
    description: "Una sera d'estate nel cuore della Puglia.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
