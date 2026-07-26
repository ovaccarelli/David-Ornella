"use client";

import { giftDetails } from "@/_data/site";
import { useLanguage } from "@/_includes/components/LanguageProvider";

export default function GiftPage() {
  const { t } = useLanguage();
  const detailsAvailable = Boolean(giftDetails.iban);

  return (
    <main className="giftPage">
      <a className="giftBack" href="../">← {t.gift.back}</a>
      <section className="giftPanel">
        <p className="eyebrow">{t.gift.eyebrow}</p>
        <h1>{t.gift.title}<br />{t.gift.titleSecond}</h1>
        <p className="giftIntro">{t.gift.intro}</p>

        {detailsAvailable ? (
          <dl className="bankDetails">
            <div>
              <dt>{t.gift.holder}</dt>
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
              <dt>{t.gift.reason}</dt>
              <dd>{t.gift.reasonValue}</dd>
            </div>
          </dl>
        ) : (
          <div className="bankPending">
            <span>✦</span>
            <p>{t.gift.pending}</p>
          </div>
        )}
      </section>
    </main>
  );
}
