import { guestTips } from "@/_data/site";

export function GuestGuide() {
  return (
    <section className="guestGuide section" id="consigli">
      <div className="sectionHeading guestGuideHeading">
        <p className="eyebrow">Utilità per gli ospiti</p>
        <h2>Qualche consiglio per<br />sopravvivere alla giornata</h2>
        <p>Tutto quello che serve per arrivare comodi, eleganti e affamati al punto giusto.</p>
      </div>
      <div className="guestTips">
        {guestTips.map((tip) => (
          <article key={tip.title}>
            <span className="guestTipIcon" aria-hidden="true">{tip.icon}</span>
            <h3>{tip.title}</h3>
            {tip.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
