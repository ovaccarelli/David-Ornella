import type { Metadata } from "next";
import { LanguageProvider } from "@/_includes/components/LanguageProvider";
import "../assets/css/site.css";

export const metadata: Metadata = {
  title: "Ornella & David — 17 luglio 2027",
  description:
    "Ornella e David si sposano il 17 luglio 2027 a Masseria Papaperta, in Puglia.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title: "Ornella & David — 17 luglio 2027",
    description: "Una sera d'estate nel cuore della Puglia.",
    type: "website",
    locale: "it_IT",
    images: [{ url: "/assets/images/og.png", width: 1733, height: 907, alt: "Ornella e David — 17 luglio 2027" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ornella & David — 17 luglio 2027",
    description: "Una sera d'estate nel cuore della Puglia.",
    images: ["/assets/images/og.png"],
  },
  icons: {
    icon: "/assets/images/favicon.svg",
    shortcut: "/assets/images/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body><LanguageProvider>{children}</LanguageProvider></body>
    </html>
  );
}
