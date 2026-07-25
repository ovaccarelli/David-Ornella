import { site } from "@/_data/site";

export function Footer() {
  return (
    <footer>
      <div className="footerMonogram">D <i>&amp;</i> O</div>
      <p>{site.date} · Masseria Papaperta</p>
      <p className="footerLine">Con amore, ci vediamo in Puglia.</p>
    </footer>
  );
}
