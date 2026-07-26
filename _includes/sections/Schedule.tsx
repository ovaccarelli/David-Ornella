"use client";

import { schedule } from "@/_data/site";
import { useLanguage } from "../components/LanguageProvider";

export function Schedule() {
  const { t } = useLanguage();
  return (
    <section className="schedule section" id="giornata">
      <div className="sectionHeading">
        <p className="eyebrow">{t.schedule.eyebrow}</p>
        <h2>{t.schedule.title}</h2>
        <p>{t.schedule.note}</p>
      </div>
      <div className="timeline">
        {schedule.map((item, index) => {
          const copy = t.schedule.items[index];
          return (
          <article className={item.image ? "timelineFeatured" : undefined} key={item.mapUrl}>
            {item.image && (
              <div
                className="timelinePhoto"
                role="img"
                aria-label={copy.imageAlt}
                style={{ backgroundImage: `url(${item.image})` }}
              />
            )}
            <span className="time">{t.schedule.time}</span>
            <div className="icon">{item.icon}</div>
            <h3>{copy.title}</h3>
            <h4>{copy.place}</h4>
            <p>{copy.description}</p>
            <a
              className="button light scheduleMap"
              href={item.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t.schedule.maps}
            </a>
          </article>
          );
        })}
      </div>
    </section>
  );
}
