import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://cleanwavekicks.co.za";
const siteTitle = "Clean Wave Kicks | Mobile Sneaker Laundry - Johannesburg";
const siteDescription =
  "Professional mobile sneaker cleaning in Johannesburg. Standard, suede, leather & colour restoration. Drop off at Little Falls or Northgate. Book online.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: "0ba7Tm2ho1LaecbWO8-AaFMAuR8ozct-wfJLUoVBzRc",
  },
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "sneaker cleaning johannesburg",
    "shoe cleaning roodepoort",
    "mobile sneaker laundry",
    "suede cleaning johannesburg",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Clean Wave Kicks",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Clean Wave Kicks - Mobile Sneaker Laundry, Johannesburg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/logo.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CleaningService",
  "@id": `${siteUrl}/#business`,
  name: "Clean Wave Kicks",
  image: `${siteUrl}/logo.jpg`,
  description: siteDescription,
  url: siteUrl,
  telephone: "+27728918458",
  email: "Cleanwavekicks@gmail.com",
  priceRange: "R60 - R250",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2 Van Blerk Close, Willowbrook",
    addressLocality: "Roodepoort",
    addressRegion: "Gauteng",
    postalCode: "1724",
    addressCountry: "ZA",
  },
  areaServed: {
    "@type": "City",
    name: "Johannesburg",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-navy text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
