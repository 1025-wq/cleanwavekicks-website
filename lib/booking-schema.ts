import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  whatsappNumber: z
    .string()
    .min(1, "WhatsApp number is required")
    .regex(
      /^(\+27|0)\d{9}$/,
      "Enter a valid SA number: 07XXXXXXXX or +27XXXXXXXXX"
    ),
  email: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  dropOff: z.enum(["littlefalls-northgate", "pickup-delivery"], {
    message: "Please select a drop-off option",
  }),
  sneakerType: z.enum(["standard", "suede", "leather", "colour-restoration"], {
    message: "Please select a sneaker type",
  }),
  category: z.enum(["adults", "kids"]),
  numberOfPairs: z
    .number({ message: "Enter number of pairs" })
    .min(1, "At least 1 pair")
    .max(20, "Maximum 20 pairs per booking"),
  turnaround: z.enum(["standard", "express"]),
  addDelivery: z.boolean(),
  notes: z.string().max(500, "Notes too long").optional().or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot
});

export type BookingFormData = z.infer<typeof bookingSchema>;

const priceMap = {
  adults: {
    standard: 100,
    suede: 150,
    leather: 180,
    "colour-restoration": 250,
  },
  kids: {
    standard: 60,
    suede: 100,
    leather: 120,
    "colour-restoration": 250,
  },
} as const;

export function calculateTotal(data: {
  category: "adults" | "kids";
  sneakerType: "standard" | "suede" | "leather" | "colour-restoration";
  numberOfPairs: number;
  turnaround: "standard" | "express";
  addDelivery: boolean;
}): number {
  const base =
    priceMap[data.category][data.sneakerType] * data.numberOfPairs;
  const express =
    data.turnaround === "express" ? 50 * data.numberOfPairs : 0;
  const delivery = data.addDelivery ? 70 : 0;
  return base + express + delivery;
}

export function buildWhatsAppMessage(data: BookingFormData, total: number): string {
  const sneakerLabels: Record<string, string> = {
    standard: "Standard Sneakers",
    suede: "Suede / Nubuck",
    leather: "Leather",
    "colour-restoration": "Colour Restoration",
  };

  const dropOffLabels: Record<string, string> = {
    "littlefalls-northgate": "Little Falls / Northgate",
    "pickup-delivery": "Request Pickup/Delivery",
  };

  const lines = [
    "Hi Clean Wave Kicks! I'd like to book a clean:",
    `Name: ${data.fullName}`,
    `Sneaker type: ${sneakerLabels[data.sneakerType]}`,
    `Category: ${data.category}`,
    `Pairs: ${data.numberOfPairs}`,
    `Turnaround: ${data.turnaround === "express" ? "Express Same Day" : "Standard (2 days)"}`,
    `Drop-off: ${dropOffLabels[data.dropOff]}`,
    `Delivery: ${data.addDelivery ? "Yes" : "No"}`,
  ];

  if (data.notes) {
    lines.push(`Notes: ${data.notes}`);
  }

  lines.push(`Estimated total: R${total}`);

  return lines.join("\n");
}
