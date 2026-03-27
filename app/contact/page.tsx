import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  PrinterIcon,
  BuildingOfficeIcon,
  TruckIcon,
  GlobeAmericasIcon
} from '@heroicons/react/24/outline'
import { 
  CheckCircleIcon
} from '@heroicons/react/24/solid'
import ContactCard from '@/components/ui/ContactCard'

// Enhanced Intersection Observer hook for smooth scroll animations
function useIntersectionObserver() {
  if (typeof window !== 'undefined') {
    const observeElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the visible class which triggers the animation
            entry.target.classList.add('animate-visible')
            // Remove the observer after animation triggers
            observer.unobserve(entry.target)
          }
        })
      }, { 
        threshold: 0.1, 
        rootMargin: '50px 0px -50px 0px' 
      })
      
      elements.forEach(el => {
        // Set initial state
        el.classList.add('animate-hidden')
        observer.observe(el)
      })
      
      return () => observer.disconnect()
    }
    
    // Run on mount with proper timing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeElements)
    } else {
      requestAnimationFrame(observeElements)
    }
  }
}

export const metadata = {
  title: 'Contact Us - Westshore Controls | Electrical Equipment Support',
  description: 'Contact Westshore Controls for electrical and automation equipment support. Phone: (604) 817-0987, Email: info@westshorecontrols.com. Serving US, Canada & Global markets.',
  keywords: [
    'contact Westshore Controls',
    'electrical equipment support',
    'automation equipment help',
    'technical support',
    'industrial equipment contact',
    'electrical distributor contact',
    'VAR support',
    'product inquiries',
    'custom solutions',
    'electrical equipment quotes',
    'automation quotes',
    'industrial controls support'
  ],
  openGraph: {
    title: 'Contact Westshore Controls - Expert Electrical & Automation Support',
    description: 'Get expert support for electrical and automation equipment. Phone: (604) 817-0987, Email: info@westshorecontrols.com',
    type: 'website',
    url: 'https://westshorecontrols.com/contact/',
  },
  alternates: {
    canonical: '/contact/',
  },
}

export default function ContactPage() {
  // Initialize scroll animations
  useIntersectionObserver()

  return (
    <div className="bg-white">
      {/* Page Heading - Minimal */}
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Contact <span className="text-gray-700">Our Team</span>
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Get expert support for electrical and automation equipment. Technical questions, product inquiries, and custom solutions.
          </p>
        </div>
      </section>

      {/* Main Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Contact Information */}
            <div className="space-y-8 animate-on-scroll">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Reach Us</h2>
                <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                  Our knowledgeable sales agents and technicians are ready to assist you with product selection, 
                  technical support, and pricing information. Choose the best way to connect with us.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Phone */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 group">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <PhoneIcon className="w-8 h-8 text-gray-700 group-hover:animate-bounce-soft" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                    <p className="text-gray-600 mb-4">Direct line for immediate assistance</p>
                    <a 
                      href="tel:+16048170987" 
                      className="text-gray-900 hover:text-gray-700 font-semibold text-lg transition-colors"
                    >
                      (+1) 604 817 0987
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 group">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <EnvelopeIcon className="w-8 h-8 text-gray-700 group-hover:animate-pulse" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-gray-600 mb-4">Send detailed inquiries and documentation</p>
                    <a 
                      href="mailto:info@westshorecontrols.com" 
                      className="text-gray-900 hover:text-gray-700 font-semibold transition-colors break-all"
                    >
                      info@westshorecontrols.com
                    </a>
                  </div>
                </div>

                {/* Fax */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 group">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <PrinterIcon className="w-8 h-8 text-gray-700 group-hover:animate-wiggle" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Fax Documents</h3>
                    <p className="text-gray-600 mb-4">For technical drawings and specifications</p>
                    <span className="text-gray-900 font-semibold text-lg">
                      (+1) 604 943 1661
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-on-scroll group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                      <ClockIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Business Hours</h3>
                      <p className="text-sm text-gray-600">Pacific Standard Time (PST)</p>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Weekdays */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span className="font-semibold text-gray-900">Monday - Friday</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-800 font-bold text-lg">8:00 AM - 6:00 PM</span>
                        <p className="text-xs text-gray-500">10 hours</p>
                      </div>
                    </div>
                  </div>

                  {/* Saturday */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span className="font-semibold text-gray-900">Saturday</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-800 font-bold text-lg">9:00 AM - 4:00 PM</span>
                        <p className="text-xs text-gray-500">7 hours</p>
                      </div>
                    </div>
                  </div>

                  {/* Sunday */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="font-semibold text-gray-900">Sunday</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-500 font-bold text-lg">Closed</span>
                        <p className="text-xs text-gray-400">Rest day</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Note */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-700 text-sm font-bold">!</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Need immediate assistance?</p>
                        <p className="text-xs text-gray-600">Call or email us and we'll respond promptly during business hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Sales Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced sales professionals are here to help you find the right solutions for your electrical and automation needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Mike Marelic */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-on-scroll group">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-bold text-xl group-hover:animate-pulse">MM</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Mike Marelic</h4>
              <p className="text-gray-600 font-medium mb-3">Sales</p>
              <p className="text-gray-600 text-sm mb-4">Dedicated sales professional helping customers find the perfect electrical and automation solutions.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4" />
                  <a href="tel:+17789956473" className="text-gray-900 hover:text-gray-700 transition-colors">
                    (+1) 778 995 6473
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <EnvelopeIcon className="w-4 h-4" />
                  <a href="mailto:mmarelic@westshorecontrols.com" className="text-gray-900 hover:text-gray-700 transition-colors break-all">
                    mmarelic@westshorecontrols.com
                  </a>
                </div>
              </div>
            </div>

            {/* Mark Jesty */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-on-scroll group" style={{animationDelay: '0.2s'}}>
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-bold text-xl group-hover:animate-pulse">MJ</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Mark Jesty</h4>
              <p className="text-gray-600 font-medium mb-3">Sales Manager</p>
              <p className="text-gray-600 text-sm mb-4">Experienced sales manager leading our team to deliver exceptional customer service and technical expertise.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4" />
                  <a href="tel:+16043740918" className="text-gray-900 hover:text-gray-700 transition-colors">
                    (+1) 604 374 0918
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <EnvelopeIcon className="w-4 h-4" />
                  <a href="mailto:mjesty@westshorecontrols.com" className="text-gray-900 hover:text-gray-700 transition-colors break-all">
                    mjesty@westshorecontrols.com
                  </a>
                </div>
              </div>
            </div>

            {/* John Oldham */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-on-scroll group" style={{animationDelay: '0.4s'}}>
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-bold text-xl group-hover:animate-pulse">JO</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">John Oldham</h4>
              <p className="text-gray-600 font-medium mb-3">Sales</p>
              <p className="text-gray-600 text-sm mb-4">Experienced sales professional providing expert guidance and support for industrial automation and electrical solutions.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4" />
                  <a href="tel:+16043774977" className="text-gray-900 hover:text-gray-700 transition-colors">
                    (+1) 604 377 4977
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <EnvelopeIcon className="w-4 h-4" />
                  <a href="mailto:joldham@westshorecontrols.com" className="text-gray-900 hover:text-gray-700 transition-colors break-all">
                    joldham@westshorecontrols.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Service Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Service</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our technical service team provides expert engineering support and consultation for complex automation projects
            </p>
          </div>

          <div className="flex justify-center">
            {/* Jose Torrecampo */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-on-scroll group max-w-sm">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-bold text-xl group-hover:animate-pulse">JT</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Jose Torrecampo, FEC, P.Eng</h4>
              <p className="text-gray-600 font-medium mb-3">Technical Service</p>
              <p className="text-gray-600 text-sm mb-4">Technical service specialist providing technical consulting and engineering solutions for complex automation projects.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4" />
                  <a href="tel:+16048050175" className="text-gray-900 hover:text-gray-700 transition-colors">
                    (+1) 604 805 0175
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <EnvelopeIcon className="w-4 h-4" />
                  <a href="mailto:jtorrecampo@westshorecontrols.com" className="text-gray-900 hover:text-gray-700 transition-colors break-all">
                    jtorrecampo@westshorecontrols.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Strategically positioned to serve customers throughout North America and beyond
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* Canadian Sales Office - Delta */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-on-scroll group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <BuildingOfficeIcon className="w-6 h-6 text-gray-700 group-hover:animate-bounce-soft" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Sales Office</h3>
                  <p className="text-gray-600">Main Operations Center</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-700">
                    <p className="font-semibold text-gray-900">Westshore Controls Ltd.</p>
                    <p>1431 Duncan Drive</p>
                    <p>Delta, BC V4L 1R5</p>
                    <p>Canada</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <a href="tel:+16048170987" className="text-gray-900 hover:text-gray-700 font-medium">
                      (+1) 604 817 0987
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <a href="mailto:info@westshorecontrols.com" className="text-gray-900 hover:text-gray-700 font-medium">
                      info@westshorecontrols.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircleIcon className="w-4 h-4 text-gray-500 mr-2" />
                  <span>Primary sales and technical support</span>
                </div>
              </div>
            </div>

            {/* Canadian Office - Burnaby */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-on-scroll group" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <BuildingOfficeIcon className="w-6 h-6 text-gray-700 group-hover:animate-bounce-soft" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Burnaby Office</h3>
                  <p className="text-gray-600">Secondary Operations</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-700">
                    <p className="font-semibold text-gray-900">Westshore Controls Ltd.</p>
                    <p>#104-7450 Lowland Drive</p>
                    <p>Burnaby, BC V5J 5A4</p>
                    <p>Canada</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <a href="tel:+16048170987" className="text-gray-900 hover:text-gray-700 font-medium">
                      (+1) 604 817 0987
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <a href="mailto:info@westshorecontrols.com" className="text-gray-900 hover:text-gray-700 font-medium">
                      info@westshorecontrols.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircleIcon className="w-4 h-4 text-gray-500 mr-2" />
                  <span>Additional support and operations</span>
                </div>
              </div>
            </div>

            {/* USA Shipping */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-on-scroll group" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <TruckIcon className="w-6 h-6 text-gray-700 group-hover:animate-wiggle" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">USA Shipping</h3>
                  <p className="text-gray-600">US Distribution Center</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-700">
                    <p className="font-semibold text-gray-900">Unit# 944</p>
                    <p>1582 Gulf Road</p>
                    <p>Point Roberts, WA 98281</p>
                    <p>United States</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <GlobeAmericasIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-gray-700">
                    <p>Strategic location for efficient</p>
                    <p>US and global shipping</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircleIcon className="w-4 h-4 text-gray-500 mr-2" />
                  <span>Fast shipping throughout North America</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Service Coverage</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We deliver high-quality electrical and automation equipment worldwide, with specialized focus on North American markets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GlobeAmericasIcon className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">United States</h3>
              <p className="text-gray-600">
                Comprehensive coverage across all US states with fast shipping and local support.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GlobeAmericasIcon className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Canada</h3>
              <p className="text-gray-600">
                Native Canadian operations with deep understanding of local electrical standards and regulations.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GlobeAmericasIcon className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global</h3>
              <p className="text-gray-600">
                International shipping capabilities to serve customers worldwide with reliable delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our team of experts is standing by to help you find the perfect electrical and automation solutions.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 max-w-md w-full border border-gray-700">
              <ContactCard variant="inlineNeutral" showEmail={true} className="w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 