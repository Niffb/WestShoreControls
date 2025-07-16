import Link from 'next/link'
import { PhoneIcon, HomeIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center">
        {/* 404 Error Section */}
        <div className="mb-12">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            The page you're looking for doesn't exist. But don't worry - our team is here to help you find the right electrical components and solutions for your needs.
          </p>
        </div>

        {/* Contact Call-to-Action */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <PhoneIcon className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Need Help Finding What You're Looking For?
            </h3>
            <p className="text-gray-600 mb-6">
              Our experienced team is ready to assist with product inquiries, technical support, and custom solutions.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Phone */}
            <a
              href="tel:+16048170987"
              className="group bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
            >
              <PhoneIcon className="w-8 h-8 text-primary-600 mx-auto mb-3 group-hover:animate-bounce" />
              <h4 className="font-semibold text-gray-900 mb-2">Call Now</h4>
              <p className="text-primary-600 font-medium">(604) 817-0987</p>
              <p className="text-sm text-gray-500 mt-1">Immediate assistance</p>
            </a>

            {/* Email */}
            <a
              href="mailto:info@westshorecontrols.com"
              className="group bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
            >
              <EnvelopeIcon className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:animate-bounce" />
              <h4 className="font-semibold text-gray-900 mb-2">Email Us</h4>
              <p className="text-blue-600 font-medium">info@westshorecontrols.com</p>
              <p className="text-sm text-gray-500 mt-1">Detailed inquiries</p>
            </a>

            {/* Hours */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <ClockIcon className="w-8 h-8 text-gray-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
              <p className="text-gray-600 font-medium">Mon-Fri 8:00-17:00</p>
              <p className="text-sm text-gray-500 mt-1">Vancouver, BC</p>
            </div>
          </div>

          {/* Services */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">We Can Help With:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div>• Product Selection</div>
              <div>• Technical Specifications</div>
              <div>• Custom Solutions</div>
              <div>• Pricing & Availability</div>
              <div>• Installation Support</div>
              <div>• Warranty Information</div>
              <div>• Bulk Orders</div>
              <div>• Shipping Details</div>
            </div>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/"
            className="group bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
          >
            <HomeIcon className="w-8 h-8 text-gray-600 mx-auto mb-3 group-hover:text-primary-600 transition-colors" />
            <h4 className="font-semibold text-gray-900 mb-2">Return Home</h4>
            <p className="text-sm text-gray-500">Explore our products and services</p>
          </Link>

          <Link
            href="/brands"
            className="group bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
          >
            <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-3 group-hover:bg-primary-100 transition-colors flex items-center justify-center">
              <span className="text-sm font-bold text-gray-600 group-hover:text-primary-600">B</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Browse Brands</h4>
            <p className="text-sm text-gray-500">View our trusted manufacturers</p>
          </Link>

          <Link
            href="/products"
            className="group bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg"
          >
            <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-3 group-hover:bg-primary-100 transition-colors flex items-center justify-center">
              <span className="text-sm font-bold text-gray-600 group-hover:text-primary-600">P</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">View Products</h4>
            <p className="text-sm text-gray-500">Find electrical components</p>
          </Link>
        </div>

        {/* Footer Message */}
        <p className="text-gray-500 mt-12 text-sm">
          Westshore Controls - Your trusted partner for electrical components and industrial automation solutions.
        </p>
      </div>
    </div>
  )
} 