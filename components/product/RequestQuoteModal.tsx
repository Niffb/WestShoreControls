'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, CheckCircleIcon, EnvelopeIcon, BuildingOfficeIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline'

interface RequestQuoteModalProps {
  isOpen: boolean
  onClose: () => void
  productName?: string
  productModel?: string
  productBrand?: string
}

function buildDefaultMessage(productName?: string, productModel?: string, productBrand?: string) {
  const lines = ['Hello,', '', 'I would like to request a quote for the following product:', '']
  if (productBrand) lines.push(`Brand: ${productBrand}`)
  if (productName) lines.push(`Product: ${productName}`)
  if (productModel) lines.push(`Model: ${productModel}`)
  lines.push('', 'Quantity needed: ', 'Application / project details: ', '', 'Please provide pricing and availability.', '', 'Thank you')
  return lines.join('\n')
}

export default function RequestQuoteModal({
  isOpen,
  onClose,
  productName,
  productModel,
  productBrand,
}: RequestQuoteModalProps) {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (isOpen) {
      setForm(prev => ({ ...prev, message: buildDefaultMessage(productName, productModel, productBrand) }))
    }
  }, [isOpen, productName, productModel, productBrand])

  if (!isOpen) return null

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, productName, productModel, productBrand }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      } else {
        setStatus('sent')
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setStatus('idle')
      setForm({ name: '', email: '', company: '', phone: '', message: buildDefaultMessage(productName, productModel, productBrand) })
      setErrorMsg('')
    }, 300)
  }

  return (
    <div
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Request a Quote</h2>
            <p className="text-sm text-gray-500 mt-0.5">Fill in your details and we'll get back to you promptly</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {status === 'sent' ? (
          <div className="flex flex-col items-center justify-center gap-6 py-24 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircleIcon className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">Quote request sent!</p>
              <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                Our team will review your request and get back to you as soon as possible.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row flex-1 overflow-hidden">

            {/* Left column — product + contact */}
            <div className="flex flex-col gap-6 p-8 lg:w-1/2 overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-100">

              {/* Product card */}
              {(productName || productModel || productBrand) && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">Product</p>
                  {productBrand && (
                    <span className="inline-block px-2.5 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-lg mb-2">
                      {productBrand}
                    </span>
                  )}
                  {productName && <p className="text-base font-semibold text-gray-900 leading-snug">{productName}</p>}
                  {productModel && (
                    <p className="mt-1 text-sm text-gray-500 font-mono">{productModel}</p>
                  )}
                </div>
              )}

              {/* Contact fields */}
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Your Details</p>

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
            </div>

            {/* Right column — message + submit */}
            <div className="flex flex-col gap-6 p-8 lg:w-1/2 overflow-y-auto">
              <div className="flex flex-col flex-1 gap-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Message</p>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  rows={14}
                  className="w-full flex-1 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-white font-mono leading-relaxed"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{errorMsg}</p>
              )}

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
                  disabled={status === 'sending'}
                  className="flex-2 px-8 py-3 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    'Send Quote Request'
                  )}
                </button>
              </div>

              <p className="text-xs text-center text-gray-400">
                We will get back to you as soon as possible.
              </p>
            </div>

          </form>
        )}
      </div>
    </div>
  )
}
