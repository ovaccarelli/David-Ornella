import { Footer, Header, Invitation, Rsvp, Schedule, Venue } from "./components";

export default function Home() {
  return (
    <main>
      <Header />
      <Invitation />
      <Schedule />
      <Venue />
      <Rsvp />
      <Footer />
    </main>
  );
}
