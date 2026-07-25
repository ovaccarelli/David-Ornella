import { Countdown } from "./countdown";
import { navigation, schedule, site } from "./content";
import { RsvpForm } from "./rsvp-form";

export function Header() {
  return (
    <header className="hero" id="home">
      <nav className="nav" aria-label="Navigazione principale">
        <a className="monogram" href="#home" aria-label={site.couple}>
          D <i>&amp;</i> O
        </a>
        <div className="navLinks">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </div>
        <a className="navRsvp" href="#rsvp">RSVP</a>
      </nav>
      <div className="heroOrnament" aria-hidden="true">
        <span /><b>17 · 07 · 27</b><span />
      </div>
      <div className="heroContent">
        <p className="eyebrow">Ci sposiamo</p>
        <h1>David <em>&amp;</em> Ornella</h1>
        <p className="heroIntro">
          Con gioia vi invitiamo a celebrare con noi l&apos;inizio della nostra più bella avventura.
        </p>
        <a className="roundLink" href="#invito" aria-label="Scopri l'invito">
          <span>Scopri</span><b>↓</b>
        </a>
      </div>
      <div className="heroDate">
        <span>Sabato {site.date}</span><span className="dot">•</span><span>{site.location}</span>
      </div>
    </header>
  );
}

export function Invitation() {
  return (
    <section className="invitation section" id="invito">
      <p className="eyebrow">Save the date</p>
      <h2>Una sera d&apos;estate,<br />nel cuore della Puglia.</h2>
      <p className="lead">
        Tra ulivi, pietra chiara e il profumo del Mediterraneo, desideriamo condividere con voi
        una giornata fatta di emozioni, bellezza e festa.
      </p>
      <Countdown />
    </section>
  );
}

export function Story() {
  return (
    <section className="story section" id="storia">
      <div className="storyArt" aria-hidden="true">
        <div className="sun" />
        <div className="arch">
          <span className="olive oliveOne">☙</span>
          <span className="olive oliveTwo">❧</span>
          <div className="archText">D <i>&amp;</i> O</div>
        </div>
      </div>
      <div className="storyCopy">
        <p className="eyebrow">La nostra storia</p>
        <h2>Ci siamo scelti.<br />Ora scegliamo per sempre.</h2>
        <p>
          Il nostro viaggio ci ha portati fin qui: circondati dalle persone che amiamo, sotto il
          cielo di Puglia. La vostra presenza renderà questo giorno davvero indimenticabile.
        </p>
        <div className="signature">{site.couple}</div>
      </div>
    </section>
  );
}

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
                aria-label="Facciata della Chiesetta San Michele Arcangelo in Frangesto"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            )}
            <span className="time">{item.time}</span>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <h4>{item.place}</h4>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Venue() {
  return (
    <section className="venue section" id="luogo">
      <div className="venueCard">
        <p className="eyebrow">La location</p>
        <h2>Masseria<br />Papaperta</h2>
        <p className="venueRegion">Puglia, Italia</p>
        <p>
          Una masseria autentica immersa nella campagna pugliese: il luogo che abbiamo scelto
          per accogliervi e festeggiare insieme.
        </p>
        <a
          className="button light"
          href="https://www.google.com/maps/search/?api=1&query=Masseria+Papaperta+Puglia"
          target="_blank"
          rel="noreferrer"
        >
          Apri su Google Maps ↗
        </a>
      </div>
      <div
        className="venueArt"
        role="img"
        aria-label="Illustrazione di Masseria Papaperta nella campagna pugliese"
      />
    </section>
  );
}

export function Rsvp() {
  return (
    <section className="rsvp section" id="rsvp">
      <div className="rsvpIntro">
        <p className="eyebrow">Répondez s&apos;il vous plaît</p>
        <h2>Ci sarete?</h2>
        <p>
          Saremo felici di avervi con noi. Vi chiediamo di confermare la vostra presenza entro
          il <strong> 17 maggio 2027</strong>.
        </p>
      </div>
      <RsvpForm />
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footerMonogram">D <i>&amp;</i> O</div>
      <p>{site.date} · Masseria Papaperta</p>
      <p className="footerLine">Con amore, ci vediamo in Puglia.</p>
    </footer>
  );
}
