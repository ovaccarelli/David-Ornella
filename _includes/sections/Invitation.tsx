import { Countdown } from "../components/Countdown";

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
