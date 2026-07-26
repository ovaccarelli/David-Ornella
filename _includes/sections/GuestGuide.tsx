"use client";

import { guestTips } from "@/_data/site";
import { useLanguage } from "../components/LanguageProvider";

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
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>;
        })}
      </div>
    </section>
  );
}
