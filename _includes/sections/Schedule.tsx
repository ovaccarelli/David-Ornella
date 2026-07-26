import { schedule } from "@/_data/site";

export function Schedule() {
  return (
    <section className="schedule section" id="giornata">
      <div className="sectionHeading">
        <p className="eyebrow">Il programma</p>
        <h2>La giornata</h2>
        <p>Gli orari definitivi saranno comunicati agli invitati più avanti.</p>
      </div>
      <div className="timeline">
        {schedule.map((item) => (
          <article className={item.image ? "timelineFeatured" : undefined} key={item.title}>
            {item.image && (
              <div
                className="timelinePhoto"
                role="img"
                aria-label={item.imageAlt}
                style={{ backgroundImage: `url(${item.image})` }}
              />
            )}
            <span className="time">{item.time}</span>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <h4>{item.place}</h4>
            <p>{item.description}</p>
            <a
              className="button light scheduleMap"
              href={item.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              Apri su Google Maps ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
