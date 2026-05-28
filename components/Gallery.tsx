"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface SliderPair {
  label: string;
  before: string;
  after: string;
}

const pairs: SliderPair[] = [
  {
    label: "Nike Runner",
    before: "/gallery/before-nike.jpeg",
    after: "/gallery/after-nike.jpeg",
  },
  {
    label: "Custom Timbs",
    before: "/gallery/before-timbs.jpeg",
    after: "/gallery/after-timbs.jpeg",
  },
  {
    label: "Adidas USA 84",
    before: "/gallery/before-adidas.jpeg",
    after: "/gallery/after-adidas.jpeg",
  },
];

function BeforeAfterSlider({ pair }: { pair: SliderPair }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="card-glow rounded-2xl overflow-hidden group glow-pink-hover transition-all duration-300">
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <span className="font-display font-bold text-sm sm:text-base">
          {pair.label}
        </span>
        <div className="flex gap-3 text-[11px] font-body font-medium uppercase tracking-wider">
          <span className="text-white/40">Before</span>
          <span className="text-pink">After</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-square cursor-col-resize touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* After image (bottom layer) */}
        <Image
          src={pair.after}
          alt={`${pair.label} after cleaning`}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Before image (clipped layer) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={pair.before}
            alt={`${pair.label} before cleaning`}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-white z-10 pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg shadow-pink/30 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-navy"
            >
              <path
                d="M6 10L2 10M2 10L5 7M2 10L5 13M14 10L18 10M18 10L15 7M18 10L15 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-display font-bold px-3 py-1.5 rounded-full z-20 pointer-events-none">
          Before
        </div>
        <div className="absolute bottom-3 right-3 bg-pink/80 backdrop-blur-sm text-white text-xs font-display font-bold px-3 py-1.5 rounded-full z-20 pointer-events-none">
          After
        </div>
      </div>
    </div>
  );
}

const extraImages = [
  "/gallery/gallery-extra-1.jpeg",
  "/gallery/gallery-extra-2.jpeg",
  "/gallery/gallery-extra-3.jpeg",
  "/gallery/gallery-extra-4.jpeg",
  "/gallery/gallery-extra-5.jpeg",
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-20 sm:py-28 bg-navy">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            The <span className="text-pink">Results</span> Speak
          </h2>
          <p className="font-body text-white/50 text-base sm:text-lg max-w-xl mx-auto">
            Drag the slider to see the transformation.
          </p>
        </motion.div>

        {/* Before/After Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {pairs.map((pair, i) => (
            <motion.div
              key={pair.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <BeforeAfterSlider pair={pair} />
            </motion.div>
          ))}
        </div>

        {/* Showcase card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-glow rounded-2xl overflow-hidden group glow-pink-hover transition-all duration-300"
        >
          <div className="relative aspect-[21/9] sm:aspect-[3/1]">
            <Image
              src="/gallery/showcase-packaged.jpeg"
              alt="Jordan 1 sealed in Clean Wave Kicks branded bag"
              fill
              className="object-cover"
              loading="lazy"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="font-display font-bold text-xl sm:text-2xl text-white">
                Clean, sealed &amp; ready for pickup
              </p>
              <p className="font-body text-white/60 text-sm mt-1">
                Every pair gets the premium treatment
              </p>
            </div>
          </div>
        </motion.div>

        {/* Extra gallery images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {extraImages.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card-glow rounded-xl overflow-hidden group glow-pink-hover transition-all duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={src}
                  alt={`Clean Wave Kicks gallery ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
