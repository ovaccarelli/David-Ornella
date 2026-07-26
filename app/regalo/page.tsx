import { giftDetails } from "@/_data/site";
import Link from "next/link";

export default function GiftPage() {
  const detailsAvailable = Boolean(giftDetails.iban);

  return (
    <main className="giftPage">
      <Link className="giftBack" href="/">← Torna all&apos;invito</Link>
      <section className="giftPanel">
        <p className="eyebrow">Un pensiero per noi</p>
        <h1>Il regalo più bello<br />sarà avervi con noi.</h1>
        <p className="giftIntro">
          Se desiderate comunque contribuire alla nostra prossima avventura,
          qui trovate le coordinate bancarie.
        </p>

        {detailsAvailable ? (
          <dl className="bankDetails">
            <div>
              <dt>Intestatario</dt>
              <dd>{giftDetails.accountHolder}</dd>
            </div>
            <div>
              <dt>IBAN</dt>
              <dd>{giftDetails.iban}</dd>
            </div>
            {giftDetails.bic && (
              <div>
                <dt>BIC / SWIFT</dt>
                <dd>{giftDetails.bic}</dd>
              </div>
            )}
            <div>
              <dt>Causale</dt>
              <dd>{giftDetails.reason}</dd>
            </div>
          </dl>
        ) : (
          <div className="bankPending">
            <span>✦</span>
            <p>Le coordinate bancarie saranno disponibili qui a breve.</p>
          </div>
        )}
      </section>
    </main>
  );
}
