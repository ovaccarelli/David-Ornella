"use client";

import { RsvpForm } from "../components/RsvpForm";
import { useLanguage } from "../components/LanguageProvider";

export function Rsvp() {
  const { t } = useLanguage();
  return (
    <section className="rsvp section" id="rsvp">
      <div className="rsvpIntro">
        <p className="eyebrow">{t.rsvp.eyebrow}</p>
        <h2>{t.rsvp.title}</h2>
        <p>{t.rsvp.intro} {t.rsvp.changePlans}</p>
      </div>
      <RsvpForm />
    </section>
  );
}
