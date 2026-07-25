import { RsvpForm } from "../components/RsvpForm";

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
