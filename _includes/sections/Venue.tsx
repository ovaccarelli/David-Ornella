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
        aria-label="Masseria Papaperta nella campagna pugliese"
      />
    </section>
  );
}
