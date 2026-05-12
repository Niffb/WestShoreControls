import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const RECIPIENTS = ['mmarelic@westshorecontrols.com', 'mjesty@westshorecontrols.com']

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured.' }, { status: 500 })
  }

  let body: {
    name?: string
    email?: string
    company?: string
    phone?: string
    message?: string
    productName?: string
    productModel?: string
    productBrand?: string
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { name, email, company, phone, message, productName, productModel, productBrand } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 422 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 422 })
  }

  const resend = new Resend(apiKey)

  const productSection = productName
    ? `<tr><td style="padding:16px 0 8px;border-top:1px solid #e5e7eb;">
        <p style="margin:0 0 4px;font-size:12px;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:0.05em;">Product</p>
        <p style="margin:0;font-size:15px;color:#111827;">${productName}</p>
        ${productModel ? `<p style="margin:4px 0 0;font-size:13px;color:#6b7280;">Model: ${productModel}</p>` : ''}
        ${productBrand ? `<p style="margin:2px 0 0;font-size:13px;color:#6b7280;">Brand: ${productBrand}</p>` : ''}
      </td></tr>`
    : ''

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 16px;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
            <tr>
              <td style="background:#dc2626;padding:24px 32px;">
                <p style="margin:0;font-size:20px;font-weight:700;color:#fff;">New Quote Request</p>
                <p style="margin:4px 0 0;font-size:13px;color:#fca5a5;">Westshore Controls</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:16px;">
                      <p style="margin:0 0 4px;font-size:12px;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:0.05em;">From</p>
                      <p style="margin:0;font-size:15px;color:#111827;">${name}</p>
                      <p style="margin:2px 0 0;font-size:13px;color:#2563eb;">${email}</p>
                      ${company ? `<p style="margin:2px 0 0;font-size:13px;color:#6b7280;">${company}</p>` : ''}
                      ${phone ? `<p style="margin:2px 0 0;font-size:13px;color:#6b7280;">${phone}</p>` : ''}
                    </td>
                  </tr>
                  ${productSection}
                  <tr>
                    <td style="padding-top:16px;border-top:1px solid #e5e7eb;">
                      <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:0.05em;">Message</p>
                      <p style="margin:0;font-size:15px;color:#111827;line-height:1.6;white-space:pre-wrap;">${message}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">Reply directly to this email to respond to ${name}.</p>
              </td>
            </tr>
          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `

  try {
    await resend.emails.send({
      from: 'Westshore Controls <onboarding@resend.dev>',
      to: RECIPIENTS,
      replyTo: email,
      subject: `Quote Request: ${productName || 'Product Inquiry'} — ${name}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
  }
}
