import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_KEY

  if (!accessKey) {
    console.error('Email Error: WEB3FORMS_KEY is not configured')
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

  const productDetails = [
    productName && `Product: ${productName}`,
    productModel && `Model: ${productModel}`,
    productBrand && `Brand: ${productBrand}`,
  ].filter(Boolean).join('\n')

  const fullMessage = [
    productDetails,
    productDetails && '---',
    message,
    '---',
    company && `Company: ${company}`,
    phone && `Phone: ${phone}`,
    `Email: ${email}`,
  ].filter(Boolean).join('\n')

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Quote Request: ${productName || 'Product Inquiry'} — ${name}`,
        from_name: name,
        replyto: email,
        name,
        email,
        message: fullMessage,
      }),
    })

    const data = await res.json()

    if (!data.success) {
      console.error('Web3Forms error:', data)
      return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Web3Forms fetch error:', err)
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
  }
}
