import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import BookingForm from "@/components/BookingForm";
import Locations from "@/components/Locations";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Pricing />
        <Gallery />
        <BookingForm />
        <Locations />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
