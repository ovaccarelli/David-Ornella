"use client";

import { useLanguage } from "../components/LanguageProvider";
import { Countdown } from "../components/Countdown";

export function Invitation() {
  const { t } = useLanguage();
  return (
    <section className="invitation section" id="invito">
      <p className="eyebrow">{t.invitation.eyebrow}</p>
      <h2>{t.invitation.title}<br />{t.invitation.titleSecond}</h2>
      <p className="lead">{t.invitation.text}</p>
      <Countdown />
    </section>
  );
}
