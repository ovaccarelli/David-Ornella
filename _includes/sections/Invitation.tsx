"use client";

import { useLanguage } from "../components/LanguageProvider";
import { Countdown } from "../components/Countdown";

export function Invitation() {
  const { t } = useLanguage();
  return (
    <section className="invitation section" id="invito">
      <div className="invitationCollage">
        <div className="photoPair photoPairLeft" aria-hidden="true">
          <figure><img src="assets/images/1.jpg" alt="" /></figure>
          <span className="goldenThread"><i>✦</i></span>
          <figure><img src="assets/images/2.jpg" alt="" /></figure>
        </div>
        <div className="invitationCopy">
          <p className="eyebrow">{t.invitation.eyebrow}</p>
          <h2>{t.invitation.title}<br />{t.invitation.titleSecond}</h2>
          <p className="lead">{t.invitation.text}</p>
          <Countdown />
        </div>
        <div className="photoPair photoPairRight" aria-hidden="true">
          <figure><img src="assets/images/3.jpg" alt="" /></figure>
          <span className="goldenThread"><i>✦</i></span>
          <figure><img src="assets/images/4.jpg" alt="" /></figure>
        </div>
      </div>
    </section>
  );
}
