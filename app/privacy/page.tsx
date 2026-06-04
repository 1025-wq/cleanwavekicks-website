import Image from "next/image";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Clean Wave Kicks",
  description:
    "How Clean Wave Kicks collects, uses and protects your personal information, in line with POPIA.",
  alternates: { canonical: "/privacy" },
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

export default function PrivacyPage() {
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
          Your Privacy
        </p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl mb-3">
          Privacy <span className="text-pink">Policy</span>
        </h1>
        <p className="font-body text-white/40 text-sm mb-8">
          Last updated: 4 June 2026
        </p>

        <p className="font-body text-white/80 leading-relaxed">
          Clean Wave Kicks respects your privacy and protects your personal
          information in line with South Africa&apos;s Protection of Personal
          Information Act, 2013 (POPIA). This page explains what we collect, why,
          and what you can do about it.
        </p>

        <Section n="1" title="Who we are">
          Clean Wave Kicks is a mobile sneaker laundry based in Johannesburg. You
          can reach us any time on WhatsApp at +27 72 891 8458, or by email at
          Cleanwavekicks@gmail.com.
        </Section>

        <Section n="2" title="What we collect">
          When you use our booking form, we collect the details you give us: your
          name, WhatsApp number, email address (if you provide one), drop-off
          location, the sneaker type and category, number of pairs, turnaround
          choice, delivery option, and any notes you add.
        </Section>

        <Section n="3" title="Why we collect it">
          We use your details only to take and manage your booking, prepare your
          quote, clean and return your sneakers, and contact you about your
          order.
        </Section>

        <Section n="4" title="Is it voluntary?">
          Yes. You do not have to give us your information. But if you do not, we
          may not be able to take your booking or provide the service.
        </Section>

        <Section n="5" title="How we protect it">
          Your details are stored in a secured database and sent over an
          encrypted (HTTPS) connection. Access is limited to the people who need
          it to serve you.
        </Section>

        <Section n="6" title="Where it is stored">
          We use trusted service providers (such as Supabase for our database,
          Vercel for hosting, and Resend for email notifications) who may store
          data on servers outside South Africa, under data protection standards
          comparable to POPIA.
        </Section>

        <Section n="7" title="Who we share it with">
          We never sell your information. We share it only with the service
          providers that help us run the business, and only as far as needed to
          serve you.
        </Section>

        <Section n="8" title="How long we keep it">
          We keep your information only as long as we need it for the purpose
          above, or as the law requires, and then we delete it.
        </Section>

        <Section n="9" title="Your rights">
          You have the right to ask what personal information we hold about you,
          to have it corrected or deleted, and to object to its use. To do any of
          these, just message us on WhatsApp or email Cleanwavekicks@gmail.com.
        </Section>

        <Section n="10" title="Complaints">
          If you believe we have mishandled your information, you may lodge a
          complaint with the Information Regulator (South Africa) at{" "}
          <a
            href="https://inforegulator.org.za"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan underline hover:text-cyan-dark"
          >
            inforegulator.org.za
          </a>
          , or email POPIAComplaints@inforegulator.org.za.
        </Section>

        <Section n="11" title="Changes to this policy">
          We may update this policy from time to time. The current version will
          always be on this page.
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
