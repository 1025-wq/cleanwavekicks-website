"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function WaveSVG() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
      <div className="animate-wave-drift" style={{ width: "200%" }}>
        <svg
          viewBox="0 0 2880 320"
          preserveAspectRatio="none"
          className="block w-full h-[80px] sm:h-[120px]"
        >
          <path
            d="M0,160 C360,260 720,60 1080,160 C1440,260 1800,60 2160,160 C2520,260 2880,120 2880,160 L2880,320 L0,320 Z"
            fill="rgba(91, 200, 245, 0.06)"
          />
          <path
            d="M0,200 C360,280 720,120 1080,200 C1440,280 1800,120 2160,200 C2520,280 2880,160 2880,200 L2880,320 L0,320 Z"
            fill="rgba(255, 79, 158, 0.04)"
          />
          <path
            d="M0,240 C360,300 720,180 1080,240 C1440,300 1800,180 2160,240 C2520,300 2880,200 2880,240 L2880,320 L0,320 Z"
            fill="#0A0E2E"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[88vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light to-navy" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 mb-4 sm:mb-6"
        >
          <Sparkles className="w-5 h-5 text-cyan" />
          <span className="text-cyan/80 font-body text-sm sm:text-base uppercase tracking-[0.2em] font-medium">
            Professional Mobile Sneaker Laundry
          </span>
          <Sparkles className="w-5 h-5 text-cyan" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="font-display font-extrabold text-pink text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-4 sm:mb-6"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
        >
          Your Sneakers Deserve
          <br />
          <span className="text-pink">
            a Clean Wave
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="font-body text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed"
        >
          Professional mobile sneaker laundry - we come to you, or you drop off
          at our locations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#booking"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-pink text-white font-display font-bold text-base sm:text-lg hover:bg-pink-dark hover:shadow-[0_0_20px_rgba(255,79,158,0.5)] transition-all duration-300 hover:scale-105"
          >
            Book Now
          </a>
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/20 text-white font-display font-bold text-base sm:text-lg hover:border-cyan/50 hover:text-cyan transition-all duration-300 hover:scale-105"
          >
            See Pricing
          </a>
        </motion.div>
      </div>

      <WaveSVG />
    </section>
  );
}
