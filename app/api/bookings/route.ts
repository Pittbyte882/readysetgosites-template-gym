import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { isAdminAuthenticated } from '@/lib/auth'
import { siteConfig } from '@/lib/siteConfig'

// POST — public, submit a booking
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, phone, session_type, preferred_time, message } = body

  if (!name || !email || !session_type)
    return NextResponse.json({ error: 'Name, email and session type are required.' }, { status: 400 })

  const { error } = await supabase
    .from('bookings')
    .insert([{ name, email, phone, session_type, preferred_time, message }])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Send notification email via Resend
  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from:    `${siteConfig.name} <${siteConfig.fromEmail}>`,
        to:      [siteConfig.notifyEmail],
        subject: `New Booking Request: ${session_type} — ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#0a0a0a;padding:24px 32px">
              <h2 style="color:#dc2626;margin:0;font-size:20px">${siteConfig.name}</h2>
              <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:13px">New Booking Request</p>
            </div>
            <div style="padding:32px;background:#f9f9f9;border:1px solid #e5e5e5">
              <table style="width:100%;font-size:14px;border-collapse:collapse">
                <tr><td style="padding:8px 16px 8px 0;color:#666;white-space:nowrap">Name</td><td style="padding:8px 0;font-weight:500">${name}</td></tr>
                <tr><td style="padding:8px 16px 8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#dc2626">${email}</a></td></tr>
                <tr><td style="padding:8px 16px 8px 0;color:#666">Phone</td><td style="padding:8px 0">${phone || 'Not provided'}</td></tr>
                <tr><td style="padding:8px 16px 8px 0;color:#666">Session Type</td><td style="padding:8px 0;font-weight:500">${session_type}</td></tr>
                <tr><td style="padding:8px 16px 8px 0;color:#666">Preferred Time</td><td style="padding:8px 0">${preferred_time || 'Flexible'}</td></tr>
              </table>
              ${message ? `<div style="margin-top:16px;padding:16px;background:#fff;border-left:3px solid #dc2626"><p style="font-size:12px;color:#666;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.1em">Message</p><p style="margin:0;font-size:14px">${message}</p></div>` : ''}
              <div style="margin-top:24px">
                <a href="mailto:${email}" style="display:inline-block;background:#dc2626;color:#fff;padding:10px 24px;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none">Reply to ${name.split(' ')[0]}</a>
              </div>
            </div>
          </div>
        `,
        reply_to: email,
      }),
    })
  }

  return NextResponse.json({ success: true })
}

// GET — admin only, view all bookings
export async function GET(req: NextRequest) {
  if (!await isAdminAuthenticated())
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  let query = supabaseAdmin
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}