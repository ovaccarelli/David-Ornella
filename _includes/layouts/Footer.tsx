import { site } from "@/_data/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <div className="footerMonogram">D <i>&amp;</i> O</div>
      <p>{site.date} · Masseria Papaperta</p>
      <p className="footerLine">Con amore, ci vediamo in Puglia.</p>
      <Link className="giftLink" href="/regalo">Un pensiero per noi</Link>
    </footer>
  );
}
