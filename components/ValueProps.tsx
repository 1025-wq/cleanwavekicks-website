"use client";

import { motion } from "framer-motion";
import { Car, Sparkles, Zap } from "lucide-react";

const props = [
  {
    icon: Car,
    title: "Mobile Service",
    description: "We pick up and drop off your sneakers — right at your door.",
    color: "cyan" as const,
  },
  {
    icon: Sparkles,
    title: "Expert Cleaning",
    description:
      "Specialists in all materials: standard, suede, leather and more.",
    color: "pink" as const,
  },
  {
    icon: Zap,
    title: "Express Available",
    description: "Same-day turnaround when you need it fast.",
    color: "cyan" as const,
  },
];

const colorMap = {
  cyan: {
    bg: "bg-cyan/10",
    text: "text-cyan",
    border: "border-cyan/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(91,200,245,0.15)]",
  },
  pink: {
    bg: "bg-pink/10",
    text: "text-pink",
    border: "border-pink/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(255,79,158,0.15)]",
  },
};

export default function ValueProps() {
  return (
    <section id="services" className="relative py-20 sm:py-28 bg-navy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            Why <span className="text-pink">Clean Wave</span> Kicks?
          </h2>
          <p className="font-body text-white/50 text-base sm:text-lg max-w-xl mx-auto">
            We make sneaker care effortless so your kicks always look fresh.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {props.map((prop, i) => {
            const colors = colorMap[prop.color];
            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group card-glow rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 ${colors.glow}`}
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${colors.bg} mb-5`}
                >
                  <prop.icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl mb-3">
                  {prop.title}
                </h3>
                <p className="font-body text-white/50 text-sm sm:text-base leading-relaxed">
                  {prop.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
