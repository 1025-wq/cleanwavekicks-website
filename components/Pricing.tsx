"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";

const adultPricing = [
  { service: "Standard Sneakers", price: "R100" },
  { service: "Suede / Nubuck", price: "R150" },
  { service: "Leather", price: "R180" },
  { service: "Colour Restoration", price: "R250" },
];

const kidsPricing = [
  { service: "Standard Sneakers", price: "R60" },
  { service: "Suede / Nubuck", price: "R100" },
  { service: "Leather", price: "R120" },
];

const extras = [
  { service: "Standard Turnaround (2 days)", price: "Free" },
  { service: "Express Same Day", price: "+R50 per pair" },
  { service: "Delivery / Pickup", price: "From R70" },
];

export default function Pricing() {
  const [category, setCategory] = useState<"adults" | "kids">("adults");
  const pricing = category === "adults" ? adultPricing : kidsPricing;

  return (
    <section id="pricing" className="relative py-20 sm:py-28 bg-navy-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            Simple, <span className="text-cyan">Transparent</span> Pricing
          </h2>
          <p className="font-body text-white/50 text-base sm:text-lg max-w-xl mx-auto">
            Quality cleaning that won&apos;t break the bank.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-navy/60 rounded-full p-1 border border-white/10">
            <button
              onClick={() => setCategory("adults")}
              className={`px-6 py-2.5 rounded-full text-sm font-display font-bold transition-all duration-300 ${
                category === "adults"
                  ? "bg-pink text-white glow-pink"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Adults
            </button>
            <button
              onClick={() => setCategory("kids")}
              className={`px-6 py-2.5 rounded-full text-sm font-display font-bold transition-all duration-300 ${
                category === "kids"
                  ? "bg-pink text-white glow-pink"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Kids
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Main pricing */}
          <motion.div
            key={category}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="card-glow rounded-2xl p-6 sm:p-8"
          >
            <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-pink" />
              {category === "adults" ? "Adult" : "Kids"} Pricing
            </h3>
            <div className="space-y-0">
              {pricing.map((item, i) => (
                <div
                  key={item.service}
                  className={`flex items-center justify-between py-4 ${
                    i < pricing.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <span className="font-body text-white/70 text-sm sm:text-base">
                    {item.service}
                  </span>
                  <span className="font-display font-bold text-lg text-white">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Extras */}
          <div className="card-glow rounded-2xl p-6 sm:p-8">
            <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-cyan" />
              Extras & Turnaround
            </h3>
            <div className="space-y-0">
              {extras.map((item, i) => (
                <div
                  key={item.service}
                  className={`flex items-center justify-between py-4 ${
                    i < extras.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <span className="font-body text-white/70 text-sm sm:text-base">
                    {item.service}
                  </span>
                  <span
                    className={`font-display font-bold text-lg ${
                      item.price === "Free" ? "text-green-400" : "text-white"
                    }`}
                  >
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promo banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl bg-gradient-to-r from-pink/20 via-pink/10 to-cyan/10 border border-pink/30 p-5 sm:p-6 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink/5 to-transparent" />
            <p className="relative font-display font-bold text-lg sm:text-xl text-white">
              🔥 10% discount when you bring 3 or more pairs!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
