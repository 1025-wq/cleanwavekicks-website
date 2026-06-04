"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Calculator } from "lucide-react";
import {
  bookingSchema,
  type BookingFormData,
  calculateTotal,
  buildWhatsAppMessage,
} from "@/lib/booking-schema";

const sneakerOptions = [
  { value: "standard", label: "Standard Sneakers" },
  { value: "suede", label: "Suede / Nubuck" },
  { value: "leather", label: "Leather" },
  { value: "colour-restoration", label: "Colour Restoration" },
];

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      whatsappNumber: "",
      email: "",
      dropOff: "littlefalls-northgate",
      sneakerType: "standard",
      category: "adults",
      numberOfPairs: 1,
      turnaround: "standard",
      addDelivery: false,
      notes: "",
      website: "",
    },
  });

  const watchedValues = watch();

  const total = useMemo(() => {
    if (!watchedValues.sneakerType || !watchedValues.numberOfPairs) return 0;
    return calculateTotal({
      category: watchedValues.category,
      sneakerType: watchedValues.sneakerType,
      numberOfPairs: watchedValues.numberOfPairs || 1,
      turnaround: watchedValues.turnaround,
      addDelivery: watchedValues.addDelivery,
    });
  }, [
    watchedValues.category,
    watchedValues.sneakerType,
    watchedValues.numberOfPairs,
    watchedValues.turnaround,
    watchedValues.addDelivery,
  ]);

  const onSubmit = async (data: BookingFormData) => {
    // Honeypot check
    if (data.website) return;

    setIsSubmitting(true);

    try {
      // POST to API - saves to DB and emails Binny
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("API error");
      }
    } catch (err) {
      console.error("Booking API error:", err);
      // Don't block the user - still open WhatsApp even if API fails
    }

    // Always open WhatsApp after (customer confirmation step)
    const message = buildWhatsAppMessage(data, total);
    const waUrl = `https://wa.me/27728918458?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => setIsSubmitting(false), 3000);
  };

  return (
    <section id="booking" className="relative py-12 sm:py-28 bg-navy-light">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            Book Your <span className="text-pink">Clean</span>
          </h2>
          <p className="font-body text-white/50 text-base sm:text-lg">
            Fill in the details and we&apos;ll confirm via WhatsApp.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="card-glow rounded-2xl p-6 sm:p-8 space-y-6"
          noValidate
        >
          {/* Honeypot */}
          <input
            type="text"
            {...register("website")}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Name */}
          <div>
            <label className="block font-display font-bold text-sm mb-2">
              Full Name <span className="text-pink">*</span>
            </label>
            <input
              type="text"
              {...register("fullName")}
              placeholder="Your full name"
              className="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3.5 font-body text-white placeholder:text-white/25 focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/30 transition-all"
            />
            {errors.fullName && (
              <p className="text-pink text-sm mt-1 font-body">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* WhatsApp & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-display font-bold text-sm mb-2">
                WhatsApp Number <span className="text-pink">*</span>
              </label>
              <input
                type="tel"
                {...register("whatsappNumber")}
                placeholder="07XXXXXXXX"
                className="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3.5 font-body text-white placeholder:text-white/25 focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/30 transition-all"
              />
              {errors.whatsappNumber && (
                <p className="text-pink text-sm mt-1 font-body">
                  {errors.whatsappNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="block font-display font-bold text-sm mb-2">
                Email <span className="text-white/30">(optional)</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@email.com"
                className="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3.5 font-body text-white placeholder:text-white/25 focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/30 transition-all"
              />
              {errors.email && (
                <p className="text-pink text-sm mt-1 font-body">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Drop-off */}
          <div>
            <label className="block font-display font-bold text-sm mb-3">
              Drop-off Location <span className="text-pink">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 bg-navy/40 border border-white/5 rounded-xl px-4 py-3.5 cursor-pointer hover:border-white/15 transition-colors">
                <input
                  type="radio"
                  value="littlefalls-northgate"
                  {...register("dropOff")}
                  className="w-4 h-4 text-pink accent-pink"
                />
                <span className="font-body text-sm text-white/70">
                  Little Falls / Northgate
                </span>
              </label>
              <label className="flex items-center gap-3 bg-navy/40 border border-white/5 rounded-xl px-4 py-3.5 cursor-pointer hover:border-white/15 transition-colors">
                <input
                  type="radio"
                  value="pickup-delivery"
                  {...register("dropOff")}
                  className="w-4 h-4 text-pink accent-pink"
                />
                <span className="font-body text-sm text-white/70">
                  Request Pickup / Delivery
                </span>
              </label>
            </div>
          </div>

          {/* Sneaker type & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-display font-bold text-sm mb-2">
                Sneaker Type <span className="text-pink">*</span>
              </label>
              <select
                {...register("sneakerType")}
                className="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3.5 font-body text-white focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/30 transition-all appearance-none"
              >
                {sneakerOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-navy text-white"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-display font-bold text-sm mb-2">
                Category
              </label>
              <div className="flex bg-navy/60 rounded-xl border border-white/10 p-1">
                <label
                  className={`flex-1 text-center py-3 rounded-lg font-display font-bold text-sm cursor-pointer transition-all ${
                    watchedValues.category === "adults"
                      ? "bg-pink text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    value="adults"
                    {...register("category")}
                    className="sr-only"
                  />
                  Adults
                </label>
                <label
                  className={`flex-1 text-center py-3 rounded-lg font-display font-bold text-sm cursor-pointer transition-all ${
                    watchedValues.category === "kids"
                      ? "bg-pink text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <input
                    type="radio"
                    value="kids"
                    {...register("category")}
                    className="sr-only"
                  />
                  Kids
                </label>
              </div>
            </div>
          </div>

          {/* Pairs & Turnaround */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-display font-bold text-sm mb-2">
                Number of Pairs <span className="text-pink">*</span>
              </label>
              <input
                type="number"
                min={1}
                max={20}
                {...register("numberOfPairs", { valueAsNumber: true })}
                className="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3.5 font-body text-white placeholder:text-white/25 focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/30 transition-all"
              />
              {errors.numberOfPairs && (
                <p className="text-pink text-sm mt-1 font-body">
                  {errors.numberOfPairs.message}
                </p>
              )}
            </div>
            <div>
              <label className="block font-display font-bold text-sm mb-2">
                Turnaround
              </label>
              <select
                {...register("turnaround")}
                className="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3.5 font-body text-white focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/30 transition-all appearance-none"
              >
                <option value="standard" className="bg-navy text-white">
                  Standard (2 days) - Free
                </option>
                <option value="express" className="bg-navy text-white">
                  Express Same Day - +R50/pair
                </option>
              </select>
            </div>
          </div>

          {/* Delivery checkbox */}
          <label className="flex items-center gap-3 bg-navy/40 border border-white/5 rounded-xl px-4 py-3.5 cursor-pointer hover:border-white/15 transition-colors">
            <input
              type="checkbox"
              {...register("addDelivery")}
              className="w-4 h-4 accent-pink rounded"
            />
            <span className="font-body text-sm text-white/70">
              Add Delivery / Pickup (+R70)
            </span>
          </label>

          {/* Notes */}
          <div>
            <label className="block font-display font-bold text-sm mb-2">
              Special Notes{" "}
              <span className="text-white/30">(optional)</span>
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="Any special requests or details about your sneakers..."
              className="w-full bg-navy/60 border border-white/10 rounded-xl px-4 py-3 font-body text-white placeholder:text-white/25 focus:outline-none focus:border-pink/50 focus:ring-1 focus:ring-pink/30 transition-all resize-none"
            />
          </div>

          {/* Total */}
          <div className="flex items-center justify-between bg-navy/60 border border-cyan/20 rounded-xl px-5 py-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan" />
              <span className="font-display font-bold text-base">
                Estimated Total
              </span>
            </div>
            <span className="font-display font-extrabold text-2xl text-cyan">
              R{total}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-pink hover:bg-pink-dark text-white font-display font-bold text-lg py-4 rounded-xl glow-pink transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? "Opening WhatsApp..." : "Book My Clean"}
          </button>

          <p className="text-center font-body text-white/30 text-xs">
            This will open WhatsApp with your booking details pre-filled.
          </p>
          <p className="text-center font-body text-white/30 text-xs">
            By booking, you agree we may use your details to arrange your clean
            and contact you about your order. See our{" "}
            <a href="/privacy" className="text-cyan underline hover:text-cyan-dark">
              Privacy Policy
            </a>
            .
          </p>
        </motion.form>
      </div>
    </section>
  );
}
