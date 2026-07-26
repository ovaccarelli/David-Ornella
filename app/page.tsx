import { Footer } from "@/_includes/layouts/Footer";
import { Header } from "@/_includes/layouts/Header";
import { GuestGuide } from "@/_includes/sections/GuestGuide";
import { Invitation } from "@/_includes/sections/Invitation";
import { Rsvp } from "@/_includes/sections/Rsvp";
import { Schedule } from "@/_includes/sections/Schedule";

export default function Home() {
  return (
    <main>
      <Header />
      <Invitation />
      <Schedule />
      <GuestGuide />
      <Rsvp />
      <Footer />
    </main>
  );
}
