"use client";

import { site } from "@/_data/site";
import { Language } from "@/_data/translations";
import { useLanguage } from "../components/LanguageProvider";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const navigation = [
    { label: t.nav.program, href: "#giornata" },
    { label: t.nav.tips, href: "#consigli" },
    { label: t.nav.rsvp, href: "#rsvp" },
    { label: t.nav.gift, href: "regalo/" },
  ];

  return (
    <header className="hero" id="home">
      <nav className="nav" aria-label={t.hero.aria}>
        <a className="monogram" href="#home" aria-label={site.couple}>
          D <i>&amp;</i> O
        </a>
        <div className="navLinks">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
          <label className="languagePicker">
            <span>{t.language}</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
              aria-label={t.language}
            >
              <option value="it">Italiano</option>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </label>
        </div>
      </nav>
      <div className="heroOrnament" aria-hidden="true">
        <span /><b>17 · 07 · 27</b><span />
      </div>
      <div className="heroContent">
        <p className="eyebrow">{t.hero.married}</p>
        <h1>David <em>&amp;</em> Ornella</h1>
        <p className="heroIntro">
          {t.hero.intro}
        </p>
        <a className="roundLink" href="#invito" aria-label={t.hero.discover}>
          <span>{t.hero.discover}</span><b>↓</b>
        </a>
      </div>
      <div className="heroDate">
        <span>{t.hero.saturday} {t.date}</span><span className="dot">•</span><span>{t.location}</span>
      </div>
    </header>
  );
}
