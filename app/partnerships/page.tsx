import Link from 'next/link'
import Image from 'next/image'
import { StarIcon, ShieldCheckIcon, TrophyIcon, CheckCircleIcon, CogIcon, BoltIcon } from '@heroicons/react/24/solid'
import type { Metadata } from 'next'
import { getImageUrl } from '@/lib/config/image-config'

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

export const metadata: Metadata = {
  title: 'Partnerships | Westshore Controls - Authorized Industrial Partners',
  description: 'Discover our trusted partnerships with leading manufacturers like Mitsubishi Electric, Erico, LS Industrial, Noark, Katko, and Elsteel. VAR (Value-Added Distributor) of premium industrial automation solutions.',
  keywords: [
    'industrial partnerships',
    'VAR distributor',
    'value-added distributor',
    'Mitsubishi Electric partner',
    'Erico distributor',
    'LS Industrial',
    'Noark electrical',
    'Katko controls',
    'industrial automation partners',
    'electrical equipment distributors',
    'manufacturer partnerships'
  ],
  openGraph: {
    title: 'Trusted Industrial Partnerships | Westshore Controls',
    description: 'Partnering with world-leading manufacturers to deliver premium industrial automation and electrical solutions.',
    type: 'website',
    url: 'https://westshorecontrols.com/partnerships',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trusted Industrial Partnerships | Westshore Controls',
    description: 'Partnering with world-leading manufacturers to deliver premium industrial automation and electrical solutions.',
  }
}

export default function PartnershipsPage() {
  const partners = [
    {
      name: "Mitsubishi Electric",
      logo: getImageUrl("brands/Mitsubishi-Electric.webp"),
      type: "Authorized Distributor",
      since: "2010",
      badge: "Diamond Partner",
      description: "World-leading industrial automation and control solutions, including PLCs, HMIs, variable frequency drives, and motion control systems.",
      specialties: ["PLCs & Controllers", "HMI & Displays", "Variable Frequency Drives", "Motion Control", "Safety Systems"],
      website: "https://www.mitsubishielectric.com",
      color: "red",
      gradient: "from-red-500 to-red-600"
    },
    {
      name: "Erico",
      logo: getImageUrl("brands/Erico.webp"),
      type: "Stocking Distributor",
      since: "2015",
      badge: "Premium Partner",
      description: "Global leader in electrical and industrial metal joining solutions, grounding and bonding systems, and electrical protection products.",
      specialties: ["Grounding Systems", "Flexible Conductors", "Distribution Blocks", "Busbars", "Cable Management"],
      website: "https://www.erico.com",
      color: "blue",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      name: "LS Industrial",
      logo: getImageUrl("LS.webp"),
      type: "Stocking Distributor",
      since: "2012",
      badge: "Strategic Partner",
      description: "Comprehensive industrial automation solutions including contactors, circuit breakers, motor protection, and drives.",
      specialties: ["Contactors & Relays", "Circuit Breakers", "Motor Starters", "Variable Frequency Drives", "HMI Systems"],
      website: "https://www.lsis.com",
      color: "green",
      gradient: "from-green-500 to-green-600"
    },
    {
      name: "Noark",
      logo: getImageUrl("brands/Noark.webp"),
      type: "Stocking Distributor",
      since: "2014",
      badge: "Certified Partner",
      description: "High-quality electrical components including contactors, circuit breakers, and motor protection devices for industrial applications.",
      specialties: ["IEC Contactors", "Thermal Overload Relays", "Manual Motor Starters", "Circuit Breakers"],
      website: "https://www.noark-electric.com",
      color: "orange",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      name: "Klemsan",
      logo: getImageUrl("brands/klemsan-logo.webp"),
      type: "Stocking Distributor",
      since: "2017",
      badge: "Technology Partner",
      description: "Turkish manufacturer specializing in terminal blocks, industrial automation components, and electrical connection solutions.",
      specialties: ["Terminal Blocks", "Industrial Connectors", "Cable Ties", "Marking Solutions"],
      website: "https://www.klemsan.com",
      color: "blue",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      name: "Katko",
      logo: getImageUrl("Katko.webp"),
      type: "Stocking Distributor",
      since: "2016",
      badge: "Trusted Partner",
      description: "UL Listed manual motor controllers and industrial control solutions designed for safety and reliability in demanding environments.",
      specialties: ["Manual Motor Controllers", "UL Listed Products", "Safety Switches", "Industrial Controls"],
      website: "https://www.katko.fi",
      color: "purple",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      name: "Elsteel",
      logo: getImageUrl("brands/Elsteel.webp"),
      type: "Stocking Distributor",
      since: "2018",
      badge: "Approved Partner",
      description: "Specialized electrical steel and industrial metal solutions for electrical infrastructure and industrial applications.",
      specialties: ["Electrical Steel", "Industrial Metals", "Custom Fabrication", "Electrical Infrastructure"],
      website: "https://www.elsteel.com",
      color: "slate",
      gradient: "from-slate-500 to-slate-600"
    },
    {
      name: "TMEIC",
      logo: getImageUrl("brands/TMEIC_logo.png"),
      type: "VAR (Value-Added Reseller)",
      since: "2019",
      badge: "Technology Partner",
      description: "Leading manufacturer of high-power electrical and industrial systems including generators, drives, motors, PV inverters, and advanced control systems.",
      specialties: ["Medium Voltage Drives", "PV Inverters", "Generators", "Motors"],
      website: "https://www.tmeic.com",
      color: "indigo",
      gradient: "from-indigo-500 to-indigo-600"
    }
  ]

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: "VAR for TMEIC & Distribution Services",
      description: "Value-Added Reseller services specifically for TMEIC products and authorized distribution for other premium brands ensuring authentic products with enhanced support"
    },
    {
      icon: TrophyIcon,
      title: "Premium Status",
      description: "Highest partnership levels with priority access to products, training, and technical resources"
    },
    {
      icon: StarIcon,
      title: "Expert Support",
      description: "Direct access to manufacturer technical teams and application engineers for complex projects"
    },
    {
      icon: CheckCircleIcon,
      title: "Quality Assurance",
      description: "Rigorous quality standards and testing ensure reliable performance in demanding industrial environments"
    },
    {
      icon: CogIcon,
      title: "Technical Training",
      description: "Ongoing certification and training programs keep our team current with latest technologies"
    },
    {
      icon: BoltIcon,
      title: "Fast Response",
      description: "Priority support channels and expedited service for urgent customer requirements"
    }
  ]

  // Initialize scroll animations
  useIntersectionObserver()

  return (
    <div className="min-h-screen bg-white">
      {/* Page Heading - Minimal */}
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Our <span className="text-gray-700">Trusted Partners</span>
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            VAR for TMEIC and authorized distributor for premium brands. Partnering with world-leading manufacturers for industrial automation and electrical solutions.
          </p>

          {/* Partner Logos Preview */}
          <div className="flex flex-wrap items-center gap-6 mt-6 opacity-60">
            <div className="w-20 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
              <Image src={getImageUrl("brands/Mitsubishi-Electric.webp")} alt="Mitsubishi Electric" width={64} height={48} className="object-contain" />
            </div>
            <div className="w-20 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
              <Image src={getImageUrl("brands/Erico.webp")} alt="Erico" width={64} height={48} className="object-contain" />
            </div>
            <div className="w-20 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
              <Image src={getImageUrl("brands/LS.webp")} alt="LS Industrial" width={64} height={48} className="object-contain" />
            </div>
            <div className="w-20 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
              <Image src={getImageUrl("brands/Noark.webp")} alt="Noark" width={64} height={48} className="object-contain" />
            </div>
            <div className="w-20 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
              <Image src={getImageUrl("brands/klemsan-logo.webp")} alt="Klemsan" width={64} height={48} className="object-contain" />
            </div>
            <div className="w-20 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
              <Image src={getImageUrl("brands/Katko.webp")} alt="Katko" width={64} height={48} className="object-contain" />
            </div>
            <div className="w-20 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
              <Image src={getImageUrl("brands/Elsteel.webp")} alt="Elsteel" width={64} height={48} className="object-contain" />
            </div>
            <div className="w-20 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center p-2">
              <Image src={getImageUrl("brands/TMEIC_logo.png")} alt="TMEIC" width={64} height={48} className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Industry-Leading Manufacturer Partnerships
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each partnership represents our commitment to bringing you the most advanced,
              reliable, and innovative solutions in industrial automation and control.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="group relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3 px-4 py-2 rounded-full text-xs font-bold bg-gray-100 text-gray-800 transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                  {partner.badge}
                </div>

                {/* Partner Header */}
                <div className="relative flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-8">
                    <div className="relative w-32 h-24 bg-white rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} Logo`}
                        fill
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                        sizes="128px"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">
                        {partner.type} since {partner.since}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                  {partner.description}
                </p>

                {/* Specialties */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                    Key Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl text-xs font-medium border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircleIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="font-medium">Authorized Partner</span>
                  </div>
                  {partner.website !== "#" && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Partnerships Mean for You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our strategic manufacturer relationships ensure you receive premium products,
              expert support, and industry-leading solutions for your automation needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon

              return (
                <div
                  key={index}
                  className="group text-center p-8 rounded-2xl bg-white hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2 animate-on-scroll"
                  style={{
                    animationDelay: `${index * 200}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="relative flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 p-0.5 group-hover:scale-110 transition-transform duration-300 border border-gray-200">
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-gray-700" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Work with Industry Leaders?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today to learn how our manufacturer partnerships can benefit your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="group px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span className="relative z-10">Get a Quote</span>
            </a>
            <a
              href="/products"
              className="group px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <span className="relative z-10">Browse Products</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 