"use client";

import Image from "next/image";
import { MessageCircle, Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.18 8.18 0 005.58 2.18v-3.45a4.84 4.84 0 01-3.77-1.47V6.69h3.77z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-navy-light border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.jpg"
                alt="Clean Wave Kicks"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="font-display text-lg font-bold">
                Clean Wave <span className="text-pink">Kicks</span>
              </span>
            </div>
            <p className="font-body text-white/40 text-sm leading-relaxed">
              Professional mobile sneaker laundry in Johannesburg. Your kicks,
              our care.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/60 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/27728918458"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-white/50 hover:text-cyan transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  +27 72 891 8458
                </a>
              </li>
              <li>
                <a
                  href="mailto:Cleanwavekicks@gmail.com"
                  className="flex items-center gap-2 font-body text-sm text-white/50 hover:text-cyan transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  Cleanwavekicks@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/60 mb-4">
              Follow Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com/_cleanwavekicks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-white/50 hover:text-pink transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 shrink-0" />
                  @_cleanwavekicks
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@cleanwavekicks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-white/50 hover:text-pink transition-colors"
                >
                  <TikTokIcon className="w-4 h-4 shrink-0" />
                  @cleanwavekicks
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white/60 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Services", "Pricing", "Gallery", "Book Now"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="font-body text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="font-body text-white/30 text-sm">
            &copy; 2025 Clean Wave Kicks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
