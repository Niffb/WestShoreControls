'use client'

import { useState } from 'react'
import Image from 'next/image'
import { XMarkIcon, EnvelopeIcon, BuildingOfficeIcon, PhoneIcon, UserIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'

const RECIPIENTS = 'mmarelic@westshorecontrols.com,mjesty@westshorecontrols.com'
const PHONE_DISPLAY = '(604) 817-0987'
const PHONE_TEL = '+16048170987'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

function buildEmailBody(form: { name: string; email: string; company: string; phone: string; message: string }) {
  const lines: string[] = []
  lines.push('── Contact ──────────────────────')
  lines.push(`Name:    ${form.name}`)
  lines.push(`Email:   ${form.email}`)
  if (form.company) lines.push(`Company: ${form.company}`)
  if (form.phone) lines.push(`Phone:   ${form.phone}`)
  lines.push('')
  lines.push('── Message ──────────────────────')
  lines.push(form.message)
  return lines.join('\n')
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [mode, setMode] = useState<'choose' | 'email'>('choose')
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')
  const [sentLinks, setSentLinks] = useState<{ mailto: string; gmail: string; outlook: string; yahoo: string } | null>(null)

  if (!isOpen) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const subject = `Website Inquiry — ${form.name}`
    const body = buildEmailBody(form)

    const mailto = `mailto:${RECIPIENTS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENTS)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const outlook = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${encodeURIComponent(RECIPIENTS)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    const yahoo = `https://compose.mail.yahoo.com/?to=${encodeURIComponent(RECIPIENTS)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    setSentLinks({ mailto, gmail, outlook, yahoo })
    window.location.href = mailto
    setStatus('sent')
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setMode('choose')
      setStatus('idle')
      setSentLinks(null)
      setForm({ name: '', email: '', company: '', phone: '', message: '' })
    }, 300)
  }

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Get in touch</h2>
            <p className="text-sm text-gray-500 mt-0.5">Call us directly or send a message</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {status === 'sent' && sentLinks ? (
          <div className="flex flex-col items-center gap-8 py-14 px-8 text-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">Your email client should have opened</p>
              <p className="mt-1.5 text-sm text-gray-500 max-w-sm mx-auto">
                Review the pre-filled message and hit send. If it didn't open, choose another option below.
              </p>
            </div>

            <div className="w-full max-w-sm space-y-2">
              <a
                href={sentLinks.gmail}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm text-gray-700"
              >
                <Image src="/images/email-clients/gmail.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                Open in Gmail
              </a>
              <a
                href={sentLinks.outlook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm text-gray-700"
              >
                <Image src="/images/email-clients/outlook.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                Open in Outlook
              </a>
              <a
                href={sentLinks.mailto}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm text-gray-700"
              >
                <Image src="/images/email-clients/apple-mail.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                Open in Mail app
              </a>
              <a
                href={sentLinks.yahoo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm text-gray-700"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="#6001D2">
                  <path d="M2 4l6 9-6 7h3l4.5-5.5L14 20h3l-6-9 6-7h-3l-4 5-4-5H2z" />
                </svg>
                Open in Yahoo Mail
              </a>
            </div>

            <button
              onClick={handleClose}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Close
            </button>
          </div>
        ) : mode === 'choose' ? (
          <div className="p-8 space-y-4 overflow-y-auto">
            <a
              href={`tel:${PHONE_TEL}`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-200 hover:border-red-300 hover:bg-red-50/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                <PhoneIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Call us</p>
                <p className="text-base font-medium text-gray-700">{PHONE_DISPLAY}</p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-red-600 group-hover:translate-x-0.5 transition-transform">
                Call →
              </span>
            </a>

            <button
              type="button"
              onClick={() => setMode('email')}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors w-full text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                <EnvelopeIcon className="h-6 w-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Send a message</p>
                <p className="text-sm text-gray-500">We'll get back to you promptly</p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-all">
                Email →
              </span>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
                Vancouver, BC
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon className="h-3.5 w-3.5 text-gray-400" />
                Mon–Fri 8:00–17:00
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 overflow-y-auto">
            <button
              type="button"
              onClick={() => setMode('choose')}
              className="self-start text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-colors"
            >
              ← Back
            </button>

            <div className="space-y-4">
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name *"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                />
              </div>

              <div className="relative">
                <EnvelopeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address *"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <BuildingOfficeIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <input
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                  />
                </div>

                <div className="relative">
                  <PhoneIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>

              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="How can we help? *"
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-white leading-relaxed"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-8 py-3 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
