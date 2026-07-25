import { navigation, site } from "@/_data/site";

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
