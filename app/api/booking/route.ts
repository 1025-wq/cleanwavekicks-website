import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { bookingSchema, calculateTotal } from '@/lib/booking-schema'

const resend = new Resend(process.env.RESEND_API_KEY)

// Normalize a SA number to international wa.me format: strip non-digits,
// then convert a leading 0 (e.g. 0635780647) to the 27 country code (27635780647).
function toInternational(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  return digits.startsWith('0') ? '27' + digits.slice(1) : digits
}

// Simple in-memory rate limiter (per IP, max 5 requests per 10 minutes)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 })
    return false
  }
  if (entry.count >= 5) return true
  entry.count++
  return false
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  // Parse body safely
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot check — bots fill hidden fields, humans don't
  if (typeof body === 'object' && body !== null && 'website' in body && (body as Record<string, unknown>).website) {
    return NextResponse.json({ success: true }) // Silent reject
  }

  // Validate with Zod
  const result = bookingSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid booking data' }, { status: 400 })
  }

  const data = result.data
  const phone = toInternational(data.whatsappNumber)
  const total = calculateTotal({
    category: data.category,
    sneakerType: data.sneakerType,
    numberOfPairs: data.numberOfPairs,
    turnaround: data.turnaround,
    addDelivery: data.addDelivery,
  })

  // Save to Supabase
  const { error: dbError } = await supabaseAdmin
    .from('bookings')
    .insert({
      full_name: data.fullName,
      whatsapp_number: phone,
      email: data.email || null,
      drop_off_location: data.dropOff,
      sneaker_type: data.sneakerType,
      category: data.category,
      number_of_pairs: data.numberOfPairs,
      turnaround: data.turnaround,
      add_delivery: data.addDelivery,
      notes: data.notes || null,
      estimated_total: total,
    })

  if (dbError) {
    console.error('Supabase insert error:', dbError.message)
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
  }

  // Send email notification to Binny
  const sneakerLabels: Record<string, string> = {
    standard: 'Standard Sneakers',
    suede: 'Suede / Nubuck',
    leather: 'Leather',
    'colour-restoration': 'Colour Restoration',
  }
  const locationLabels: Record<string, string> = {
    'littlefalls-northgate': 'Little Falls / Northgate',
    'pickup-delivery': 'Pickup / Delivery',
  }

  try {
    const emailResponse = await resend.emails.send({
      // Use the verified Resend sender. onboarding@resend.dev only delivers to
      // the Resend account owner's address, so the recipient must match it.
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: ['Cleanwavekicks@gmail.com'],
      subject: `🧼 New Booking — ${data.fullName} | ${data.numberOfPairs} pair(s) | R${total}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 8px;">
          <div style="background: #0A0E2E; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: #FF4F9E; margin: 0; font-size: 22px;">New Booking Received!</h1>
            <p style="color: #5BC8F5; margin: 8px 0 0;">Clean Wave Kicks</p>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Customer</td><td style="padding: 8px 0; font-weight: bold;">${data.fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">WhatsApp</td><td style="padding: 8px 0;"><a href="https://wa.me/${phone}" style="color: #25D366;">${data.whatsappNumber}</a></td></tr>
              ${data.email ? `<tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;">${data.email}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; color: #6b7280;">Sneaker Type</td><td style="padding: 8px 0;">${sneakerLabels[data.sneakerType] ?? data.sneakerType}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Category</td><td style="padding: 8px 0; text-transform: capitalize;">${data.category}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Pairs</td><td style="padding: 8px 0;">${data.numberOfPairs}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Turnaround</td><td style="padding: 8px 0;">${data.turnaround === 'express' ? 'Express Same Day (+R50/pair)' : 'Standard 2 Days (Free)'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Delivery</td><td style="padding: 8px 0;">${data.addDelivery ? 'Yes (+R70)' : 'No'}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Drop-off</td><td style="padding: 8px 0;">${locationLabels[data.dropOff] ?? data.dropOff}</td></tr>
              ${data.notes ? `<tr><td style="padding: 8px 0; color: #6b7280;">Notes</td><td style="padding: 8px 0;">${data.notes}</td></tr>` : ''}
            </table>
            <div style="margin-top: 20px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 16px; text-align: center;">
              <span style="font-size: 20px; font-weight: bold; color: #16a34a;">Estimated Total: R${total}</span>
            </div>
            <div style="margin-top: 16px; text-align: center;">
              <a href="https://wa.me/${phone}?text=Hi+${encodeURIComponent(data.fullName)}!+This+is+Clean+Wave+Kicks+confirming+your+booking."
                style="background: #25D366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; margin-right: 8px;">
                Reply on WhatsApp (Binny)
              </a>
              <a href="https://wa.me/27728918458?text=New+booking+from+${encodeURIComponent(data.fullName)}+for+${data.numberOfPairs}+pair(s)."
                style="background: #128C7E; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                Notify Partner
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">Clean Wave Kicks · Roodepoort, Johannesburg</p>
        </div>
      `,
    })

    // Resend returns { data, error } instead of throwing — log the full
    // response so failures (unverified sender/recipient, bad key) are visible.
    if (emailResponse.error) {
      console.error('Resend email error (full response):', JSON.stringify(emailResponse, null, 2))
    } else {
      console.log('Resend email sent:', JSON.stringify(emailResponse.data))
    }
  } catch (emailError) {
    // Don't fail the booking if email fails — log it and continue
    console.error('Resend email exception (full response):', JSON.stringify(emailError, Object.getOwnPropertyNames(emailError), 2))
  }

  return NextResponse.json({ success: true })
}
