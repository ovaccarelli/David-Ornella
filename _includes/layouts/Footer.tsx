"use client";

import { useLanguage } from "../components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer>
      <div className="footerMonogram">O <i>&amp;</i> D</div>
      <p>{t.date} · Masseria Papaperta</p>
      <p className="footerLine">{t.footer.line}</p>
      <a className="giftLink" href="regalo/">{t.footer.gift}</a>
    </footer>
  );
}
