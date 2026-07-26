"use client";

import { FormEvent } from "react";

export function RsvpForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = "RSVP matrimonio David & Ornella";
    const body = [
      `Nome e cognome: ${form.get("name")}`,
      `Partecipazione: ${form.get("attendance")}`,
      `Numero di ospiti: ${form.get("guests")}`,
      `Navetta da Mola di Bari: ${form.get("transport")}`,
      `Esigenze alimentari: ${form.get("diet") || "Nessuna"}`,
    ].join("\n");

    window.location.href =
      `mailto:o.vaccarelli@gmail.com?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="rsvpForm" onSubmit={handleSubmit}>
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
        Navetta da Mola di Bari
        <select name="transport" defaultValue="" required>
          <option value="" disabled>Seleziona una risposta</option>
          <option>Sì, sono interessato/a</option>
          <option>No, mi organizzerò autonomamente</option>
        </select>
      </label>
      <label>
        Esigenze alimentari
        <textarea name="diet" placeholder="Allergie, intolleranze o preferenze" rows={3} />
      </label>
      <button className="button" type="submit">Invia la conferma</button>
    </form>
  );
}
