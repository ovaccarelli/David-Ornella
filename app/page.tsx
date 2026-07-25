import { Footer, Header, Invitation, Rsvp, Schedule, Story, Venue } from "./components";

export default function Home() {
  return (
    <main>
      <Header />
      <Invitation />
      <Story />
      <Schedule />
      <Venue />
      <Rsvp />
      <Footer />
    </main>
  );
}
