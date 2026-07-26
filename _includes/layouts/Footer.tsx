"use client";

import { useLanguage } from "../components/LanguageProvider";
import Link from "next/link";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer>
      <div className="footerMonogram">D <i>&amp;</i> O</div>
      <p>{t.date} · Masseria Papaperta</p>
      <p className="footerLine">{t.footer.line}</p>
      <Link className="giftLink" href="/regalo">{t.footer.gift}</Link>
    </footer>
  );
}
