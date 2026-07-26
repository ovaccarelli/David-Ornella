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
          <div className="contactHead" aria-hidden="true">
            <span />
            <span>{t.footer.email}</span>
            <span>{t.footer.phone}</span>
          </div>
          <div className="contactPerson">
            <strong>Ornella</strong>
            <a href="mailto:o.vaccarelli@gmail.com">o.vaccarelli@gmail.com</a>
            <a href="tel:+33768423177">+33768423177</a>
          </div>
          <div className="contactPerson">
            <strong>David</strong>
            <a href="mailto:david.sc.38@gmail.com">david.sc.38@gmail.com</a>
            <a href="tel:+33665084371">+33665084371</a>
          </div>
        </address>
      </div>
    </footer>
  );
}
