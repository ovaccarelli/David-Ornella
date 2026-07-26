"use client";

import { guestTips } from "@/_data/site";
import { useLanguage } from "../components/LanguageProvider";

const mapLinks: Record<string, string> = {
  "Mola di Bari": "https://www.google.com/maps/search/?api=1&query=Mola+di+Bari",
  "Castellana Grotte": "https://www.google.com/maps/search/?api=1&query=Castellana+Grotte",
  Alberobello: "https://www.google.com/maps/search/?api=1&query=Alberobello",
  Monopoli: "https://www.google.com/maps/search/?api=1&query=Monopoli+Puglia",
  Bari: "https://www.google.com/maps/search/?api=1&query=Bari+Airport",
  Brindisi: "https://www.google.com/maps/search/?api=1&query=Brindisi+Airport",
};

const rsvpLabels = new Set(["modulo RSVP", "RSVP form", "formulaire RSVP"]);
const linkedTerms = /(Mola di Bari|Castellana Grotte|Alberobello|Monopoli|Bari|Brindisi|modulo RSVP|RSVP form|formulaire RSVP)/g;

function LinkedParagraph({ text }: { text: string }) {
  return (
    <p>
      {text.split(linkedTerms).map((part, index) => {
        if (rsvpLabels.has(part)) {
          return <a href="#rsvp" key={`${part}-${index}`}>{part}</a>;
        }
        if (mapLinks[part]) {
          return (
            <a href={mapLinks[part]} target="_blank" rel="noreferrer" key={`${part}-${index}`}>
              {part}
            </a>
          );
        }
        return part;
      })}
    </p>
  );
}

export function GuestGuide() {
  const { t } = useLanguage();
  return (
    <section className="guestGuide section" id="consigli">
      <div className="sectionHeading guestGuideHeading">
        <p className="eyebrow">{t.guide.eyebrow}</p>
        <h2>
          {t.guide.title}
          {t.guide.titleSecond && <><br />{t.guide.titleSecond}</>}
        </h2>
        <p>{t.guide.intro}</p>
      </div>
      <div className="guestTips">
        {guestTips.map((tip, index) => {
          const copy = t.guide.tips[index];
          return <article key={copy.title}>
            <span className="guestTipIcon" aria-hidden="true">{tip.icon}</span>
            <h3>{copy.title}</h3>
            {copy.text.map((paragraph) => (
              <LinkedParagraph text={paragraph} key={paragraph} />
            ))}
          </article>;
        })}
      </div>
    </section>
  );
}
