"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Navigation } from "lucide-react";

const locations = [
  {
    name: "Karee",
    address: "2 Van Blerk Close, Willowbrook, Roodepoort, 1724",
    mapsQuery: "2+Van+Blerk+Close,+Willowbrook,+Roodepoort,+1724",
  },
  {
    name: "Cascades Shopping Centre",
    address: "Waterval, Little Falls",
    mapsQuery: "Cascades+Shopping+Centre,+Waterval,+Little+Falls",
  },
];

export default function Locations() {
  return (
    <section className="relative py-12 sm:py-28 bg-navy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            Find <span className="text-cyan">Us</span>
          </h2>
          <div className="flex items-center justify-center gap-2 font-body text-white/50">
            <Clock className="w-4 h-4" />
            <span>Monday – Sunday, 09:00 – 18:00</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glow rounded-2xl p-6 sm:p-8 flex flex-col"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">
                    {loc.name}
                  </h3>
                  <p className="font-body text-white/50 text-sm mt-1">
                    {loc.address}
                  </p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${loc.mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-cyan/10 border border-white/10 hover:border-cyan/30 text-white font-display font-bold text-sm py-3 rounded-xl transition-all duration-300"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
