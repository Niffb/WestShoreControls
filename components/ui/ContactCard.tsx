'use client'

import { PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'

interface ContactCardProps {
  variant?: 'default' | 'compact' | 'compactNeutral' | 'inline' | 'inlineNeutral'
  showEmail?: boolean
  showHours?: boolean
  className?: string
}

export default function ContactCard({
  variant = 'default',
  showEmail = true,
  showHours = false,
  className = ""
}: ContactCardProps) {
  const phone = "(604) 817-0987"
  const email = "info@westshorecontrols.com"
  const hours = "Mon-Fri 8AM-5PM PST"

  if (variant === 'inline' || variant === 'inlineNeutral') {
    const isNeutral = variant === 'inlineNeutral'
    return (
      <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        <a
          href="tel:+16048170987"
          className={`font-semibold px-6 py-3 rounded-md transition-colors duration-200 flex items-center justify-center ${
            isNeutral
              ? 'bg-white text-gray-900 hover:bg-gray-100'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          <PhoneIcon className="w-5 h-5 mr-2" />
          <span>Call Now: {phone}</span>
        </a>

        {showEmail && (
          <a
            href={`mailto:${email}`}
            className={`font-semibold px-6 py-3 rounded-md transition-colors duration-200 flex items-center justify-center ${
              isNeutral
                ? 'bg-transparent border border-white text-white hover:bg-white/10'
                : 'bg-white border border-primary-600 text-primary-600 hover:bg-primary-50'
            }`}
          >
            <EnvelopeIcon className="w-5 h-5 mr-2" />
            <span>Send Email</span>
          </a>
        )}
      </div>
    )
  }

  if (variant === 'compact' || variant === 'compactNeutral') {
    const isNeutral = variant === 'compactNeutral'
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
        <div className="text-center">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isNeutral ? 'bg-gray-900' : 'bg-primary-600'
          }`}>
            <PhoneIcon className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
          <p className="text-gray-600 text-sm mb-4">Get expert support for your electrical needs</p>

          <div className="space-y-3">
            <a
              href="tel:+16048170987"
              className={`block font-medium py-2 px-4 rounded-md transition-colors duration-200 ${
                isNeutral ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              <div className="flex items-center justify-center">
                <PhoneIcon className="w-4 h-4 mr-2" />
                <span>{phone}</span>
              </div>
            </a>

            {showEmail && (
              <a
                href={`mailto:${email}`}
                className="block bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                <div className="flex items-center justify-center">
                  <EnvelopeIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">Email Us</span>
                </div>
              </a>
            )}

            {showHours && (
              <div className="flex items-center justify-center text-xs text-gray-500 mt-2">
                <ClockIcon className="w-3 h-3 mr-1" />
                <span>{hours}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-8 ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <PhoneIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Get In Touch</h3>
        <p className="text-gray-600 mb-6">Ready to help with your electrical and automation needs</p>

        <div className="space-y-4">
          <a
            href="tel:+16048170987"
            className="block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-6 rounded-md transition-colors duration-200"
          >
            <div className="flex items-center justify-center">
              <PhoneIcon className="w-5 h-5 mr-3" />
              <div>
                <div className="font-bold">Call Now</div>
                <div className="text-sm opacity-90">{phone}</div>
              </div>
            </div>
          </a>

          {showEmail && (
            <a
              href={`mailto:${email}`}
              className="block bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-md transition-colors duration-200"
            >
              <div className="flex items-center justify-center">
                <EnvelopeIcon className="w-5 h-5 mr-3" />
                <div>
                  <div className="font-medium">Send Email</div>
                  <div className="text-xs text-gray-500">{email}</div>
                </div>
              </div>
            </a>
          )}

          {showHours && (
            <div className="bg-gray-50 rounded-md p-3 mt-4">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <ClockIcon className="w-4 h-4 mr-2" />
                <div>
                  <div className="font-medium">Business Hours</div>
                  <div className="text-xs">{hours}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
