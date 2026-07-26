"use client";

import { useLanguage } from "../components/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer>
      <div className="footerMonogram">D <i>&amp;</i> O</div>
      <p>{t.date} · Masseria Papaperta</p>
      <p className="footerLine">{t.footer.line}</p>
      <a className="giftLink" href="regalo/">{t.footer.gift}</a>
      <div className="footerContacts">
        <h2>{t.footer.contacts}</h2>
        <address>
          <div>
            <span>{t.footer.email}</span>
            <a href="mailto:o.vaccarelli@gmail.com">o.vaccarelli@gmail.com</a>
            <a href="mailto:david.sc.38@gmail.com">david.sc.38@gmail.com</a>
          </div>
          <div>
            <span>{t.footer.phone}</span>
            <a href="tel:+33768423177">+33768423177</a>
            <a href="tel:+3365084371">+3365084371</a>
          </div>
        </address>
      </div>
    </footer>
  );
}
