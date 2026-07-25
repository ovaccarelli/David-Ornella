"use client";

import { FormEvent, useState } from "react";

export function RsvpForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="thanks" role="status">
        <span>✦</span>
        <h3>Grazie!</h3>
        <p>La vostra risposta è stata preparata. Non vediamo l&apos;ora di festeggiare insieme.</p>
        <button className="textButton" onClick={() => setSent(false)}>Modifica risposta</button>
      </div>
    );
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
        Esigenze alimentari
        <textarea name="diet" placeholder="Allergie, intolleranze o preferenze" rows={3} />
      </label>
      <button className="button" type="submit">Invia la conferma</button>
      <p className="formNote">Il modulo è una demo: prima dell&apos;invio degli inviti potremo collegarlo alla vostra email.</p>
    </form>
  );
}
