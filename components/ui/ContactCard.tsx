'use client'

import { motion } from 'framer-motion'
import { PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'

interface ContactCardProps {
  variant?: 'default' | 'compact' | 'inline'
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

  if (variant === 'inline') {
    return (
      <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
        <motion.a
          href={`tel:+16048170987`}
          className="group bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PhoneIcon className="w-5 h-5 mr-2 group-hover:animate-bounce" />
          <span>Call Now: {phone}</span>
        </motion.a>
        
        {showEmail && (
          <motion.a
            href={`mailto:${email}`}
            className="group bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <EnvelopeIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            <span>Send Email</span>
          </motion.a>
        )}
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <motion.div 
        className={`bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 ${className}`}
        whileHover={{ y: -5 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <PhoneIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
          <p className="text-gray-600 text-sm mb-4">Get expert support for your electrical needs</p>
          
          <div className="space-y-3">
            <motion.a
              href={`tel:+16048170987`}
              className="group block bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center">
                <PhoneIcon className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                <span>{phone}</span>
              </div>
            </motion.a>
            
            {showEmail && (
              <motion.a
                href={`mailto:${email}`}
                className="group block bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center">
                  <EnvelopeIcon className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  <span className="text-sm">Email Us</span>
                </div>
              </motion.a>
            )}
            
            {showHours && (
              <div className="flex items-center justify-center text-xs text-gray-500 mt-2">
                <ClockIcon className="w-3 h-3 mr-1" />
                <span>{hours}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // Default variant - full contact card
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 ${className}`}
      whileHover={{ y: -5 }}
    >
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <PhoneIcon className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Get In Touch</h3>
        <p className="text-gray-600 mb-6">Ready to help with your electrical and automation needs</p>
        
        <div className="space-y-4">
          <motion.a
            href={`tel:+16048170987`}
            className="group block bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center">
              <PhoneIcon className="w-5 h-5 mr-3 group-hover:animate-bounce" />
              <div>
                <div className="font-bold">Call Now</div>
                <div className="text-sm opacity-90">{phone}</div>
              </div>
            </div>
          </motion.a>
          
          {showEmail && (
            <motion.a
              href={`mailto:${email}`}
              className="group block bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center">
                <EnvelopeIcon className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                <div>
                  <div className="font-medium">Send Email</div>
                  <div className="text-xs text-gray-500">{email}</div>
                </div>
              </div>
            </motion.a>
          )}
          
          {showHours && (
            <div className="bg-gray-50 rounded-lg p-3 mt-4">
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
    </motion.div>
  )
} 