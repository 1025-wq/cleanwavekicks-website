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

export const metadata: Metadata = {
  title: "Clean Wave Kicks | Professional Mobile Sneaker Laundry - Johannesburg",
  description:
    "Professional mobile sneaker laundry service in Johannesburg. We clean standard, suede, leather sneakers with pickup & delivery. Book your clean today!",
  keywords: [
    "sneaker cleaning",
    "shoe laundry",
    "Johannesburg",
    "mobile sneaker cleaner",
    "Clean Wave Kicks",
  ],
  openGraph: {
    title: "Clean Wave Kicks | Professional Mobile Sneaker Laundry",
    description:
      "Your sneakers deserve a Clean Wave. Professional mobile sneaker laundry in Johannesburg.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-navy text-white antialiased">
        {children}
      </body>
    </html>
  );
}
