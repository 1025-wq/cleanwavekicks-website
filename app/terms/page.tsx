import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions | Clean Wave Kicks",
  description:
    "The terms that apply when you book a sneaker cleaning service with Clean Wave Kicks.",
  alternates: { canonical: "/terms" },
};

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8">
      <h2 className="font-display font-bold text-xl sm:text-2xl mb-2">
        <span className="text-cyan mr-2">{n}.</span>
        {title}
      </h2>
      <p className="font-body text-white/60 leading-relaxed">{children}</p>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      {/* Simple header */}
      <header className="border-b border-white/5 bg-navy/80 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Clean Wave Kicks"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-display text-lg font-bold">
              Clean Wave <span className="text-pink">Kicks</span>
            </span>
          </a>
          <a
            href="/"
            className="font-body text-sm text-white/50 hover:text-white transition-colors"
          >
            Back to site
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <p className="font-body text-cyan text-xs uppercase tracking-[0.2em] mb-3">
          The Fine Print
        </p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl mb-3">
          Terms <span className="text-pink">&amp; Conditions</span>
        </h1>
        <p className="font-body text-white/40 text-sm mb-8">
          Last updated: 4 June 2026
        </p>

        <p className="font-body text-white/80 leading-relaxed">
          These terms apply when you book a service with Clean Wave Kicks. By
          making a booking, you agree to them.
        </p>

        <Section n="1" title="Our service">
          Clean Wave Kicks provides mobile sneaker cleaning, including standard,
          suede and nubuck, leather, and colour restoration. You can drop off at
          Little Falls or Northgate, or request pickup and delivery.
        </Section>

        <Section n="2" title="Quotes and pricing">
          The total shown on our booking form is an estimate. The final price is
          confirmed once we inspect your sneakers, as some need more work than
          others. We will confirm any change with you before we start.
        </Section>

        <Section n="3" title="Bookings">
          Submit your details through the booking form. We confirm every booking
          with you on WhatsApp before any work begins.
        </Section>

        <Section n="4" title="Payment">
          Payment is due on collection or delivery, unless we agree otherwise
          with you in advance.
        </Section>

        <Section n="5" title="Turnaround">
          Standard turnaround is about two days. Express same-day service is
          available for an extra fee per pair. Timelines are estimates and can
          vary with the volume and condition of the sneakers.
        </Section>

        <Section n="6" title="Pickup and delivery">
          Pickup and delivery is optional and carries an extra fee. It is
          available within our service area around Johannesburg.
        </Section>

        <Section n="7" title="Care of your sneakers">
          We take reasonable care with every pair. Cleaning results depend on the
          material, age, and condition of the sneakers, and some marks, stains,
          or damage may not come out completely. We are not responsible for
          pre-existing wear or damage. Please check your sneakers on collection
          and raise any concern with us straight away.
        </Section>

        <Section n="8" title="Uncollected sneakers">
          Please collect your sneakers promptly once they are ready. If sneakers
          are left uncollected for a long time, we may contact you to arrange
          collection.
        </Section>

        <Section n="9" title="Privacy">
          We handle your personal information as set out in our{" "}
          <a href="/privacy" className="text-cyan underline hover:text-cyan-dark">
            Privacy Policy
          </a>
          .
        </Section>

        <Section n="10" title="Governing law">
          These terms are governed by the laws of South Africa.
        </Section>

        <div className="mt-10 pt-8 border-t border-white/5">
          <a
            href="/#booking"
            className="inline-flex items-center justify-center gap-2 bg-pink hover:bg-pink-dark text-white font-display font-bold py-3 px-6 rounded-xl transition-colors"
          >
            Back to Booking
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}
