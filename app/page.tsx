"use client";

import { FormEvent, useEffect, useState } from "react";

const weddingDate = new Date("2027-07-17T17:00:00+02:00");

function Countdown() {
  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const distance = Math.max(0, weddingDate.getTime() - Date.now());
      setRemaining({
        days: Math.floor(distance / 86_400_000),
        hours: Math.floor((distance / 3_600_000) % 24),
        minutes: Math.floor((distance / 60_000) % 60),
        seconds: Math.floor((distance / 1_000) % 60),
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label="Conto alla rovescia">
      {Object.entries(remaining).map(([label, value]) => (
        <div className="countdownItem" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>
            {label === "days"
              ? "giorni"
              : label === "hours"
                ? "ore"
                : label === "minutes"
                  ? "minuti"
                  : "secondi"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [sent, setSent] = useState(false);

  function handleRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <header className="hero" id="home">
        <nav className="nav" aria-label="Navigazione principale">
          <a className="monogram" href="#home" aria-label="David e Ornella">
            D <i>&amp;</i> O
          </a>
          <div className="navLinks">
            <a href="#storia">Noi</a>
            <a href="#giornata">La giornata</a>
            <a href="#luogo">Il luogo</a>
          </div>
          <a className="navRsvp" href="#rsvp">
            RSVP
          </a>
        </nav>

        <div className="heroOrnament" aria-hidden="true">
          <span />
          <b>17 · 07 · 27</b>
          <span />
        </div>
        <div className="heroContent">
          <p className="eyebrow">Ci sposiamo</p>
          <h1>
            David <em>&amp;</em> Ornella
          </h1>
          <p className="heroIntro">
            Con gioia vi invitiamo a celebrare con noi l&apos;inizio della
            nostra più bella avventura.
          </p>
          <a className="roundLink" href="#invito" aria-label="Scopri l'invito">
            <span>Scopri</span>
            <b>↓</b>
          </a>
        </div>
        <div className="heroDate">
          <span>Sabato 17 luglio 2027</span>
          <span className="dot">•</span>
          <span>Masseria Papaperta, Puglia</span>
        </div>
      </header>

      <section className="invitation section" id="invito">
        <p className="eyebrow">Save the date</p>
        <h2>Una sera d&apos;estate,<br />nel cuore della Puglia.</h2>
        <p className="lead">
          Tra ulivi, pietra chiara e il profumo del Mediterraneo, desideriamo
          condividere con voi una giornata fatta di emozioni, bellezza e festa.
        </p>
        <Countdown />
      </section>

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
            Il nostro viaggio ci ha portati fin qui: circondati dalle persone
            che amiamo, sotto il cielo di Puglia. La vostra presenza renderà
            questo giorno davvero indimenticabile.
          </p>
          <div className="signature">David &amp; Ornella</div>
        </div>
      </section>

      <section className="schedule section" id="giornata">
        <div className="sectionHeading">
          <p className="eyebrow">Il programma</p>
          <h2>La giornata</h2>
          <p>I dettagli definitivi saranno comunicati agli invitati più avanti.</p>
        </div>
        <div className="timeline">
          <article>
            <span className="time">17:00</span>
            <div className="icon">◇</div>
            <h3>Benvenuto</h3>
            <p>Arrivo degli ospiti e un primo brindisi insieme.</p>
          </article>
          <article>
            <span className="time">17:30</span>
            <div className="icon">○</div>
            <h3>Cerimonia</h3>
            <p>La nostra promessa, tra gli ulivi della masseria.</p>
          </article>
          <article>
            <span className="time">19:00</span>
            <div className="icon">✦</div>
            <h3>Cena &amp; festa</h3>
            <p>Sapori di Puglia, musica e balli sotto le stelle.</p>
          </article>
        </div>
      </section>

      <section className="venue section" id="luogo">
        <div className="venueCard">
          <p className="eyebrow">La location</p>
          <h2>Masseria<br />Papaperta</h2>
          <p className="venueRegion">Puglia, Italia</p>
          <p>
            Una masseria autentica immersa nella campagna pugliese: il luogo
            che abbiamo scelto per accogliervi e festeggiare insieme.
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
        <div className="venueArt" aria-label="Paesaggio pugliese stilizzato">
          <div className="moon" />
          <div className="horizon" />
          <div className="masseria"><span /><span /><span /></div>
          <div className="tree treeOne">♣</div>
          <div className="tree treeTwo">♣</div>
        </div>
      </section>

      <section className="rsvp section" id="rsvp">
        <div className="rsvpIntro">
          <p className="eyebrow">Répondez s&apos;il vous plaît</p>
          <h2>Ci sarete?</h2>
          <p>
            Saremo felici di avervi con noi. Vi chiediamo di confermare la
            vostra presenza entro il <strong>17 maggio 2027</strong>.
          </p>
        </div>

        {sent ? (
          <div className="thanks" role="status">
            <span>✦</span>
            <h3>Grazie!</h3>
            <p>La vostra risposta è stata preparata. Non vediamo l&apos;ora di festeggiare insieme.</p>
            <button className="textButton" onClick={() => setSent(false)}>Modifica risposta</button>
          </div>
        ) : (
          <form className="rsvpForm" onSubmit={handleRsvp}>
            <label>
              Nome e cognome
              <input name="name" type="text" placeholder="Il vostro nome" required />
            </label>
            <label>
              Parteciperete?
              <select name="attendance" defaultValue="" required>
                <option value="" disabled>Seleziona una risposta</option>
                <option>Sì, con grande gioia</option>
                <option>Purtroppo non potrò esserci</option>
              </select>
            </label>
            <label>
              Numero di ospiti
              <input name="guests" type="number" min="1" max="8" defaultValue="1" required />
            </label>
            <label>
              Esigenze alimentari
              <textarea name="diet" placeholder="Allergie, intolleranze o preferenze" rows={3} />
            </label>
            <button className="button" type="submit">Invia la conferma</button>
            <p className="formNote">Il modulo è una demo: prima dell&apos;invio degli inviti potremo collegarlo alla vostra email.</p>
          </form>
        )}
      </section>

      <footer>
        <div className="footerMonogram">D <i>&amp;</i> O</div>
        <p>17 luglio 2027 · Masseria Papaperta</p>
        <p className="footerLine">Con amore, ci vediamo in Puglia.</p>
      </footer>
    </main>
  );
}
