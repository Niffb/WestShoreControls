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

  const getColorClasses = (color: string) => {
    const colors = {
      red: "border-red-200 hover:border-red-400 hover:shadow-red-100/50",
      blue: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100/50",
      green: "border-green-200 hover:border-green-400 hover:shadow-green-100/50",
      orange: "border-orange-200 hover:border-orange-400 hover:shadow-orange-100/50",
      purple: "border-purple-200 hover:border-purple-400 hover:shadow-purple-100/50",
      slate: "border-slate-200 hover:border-slate-400 hover:shadow-slate-100/50",
      indigo: "border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100/50"
    }
    return colors[color as keyof typeof colors] || colors.slate
  }

  const getBadgeClasses = (color: string) => {
    const colors = {
      red: "bg-gradient-to-r from-red-100 to-red-200 text-red-800 shadow-lg",
      blue: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 shadow-lg",
      green: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-lg",
      orange: "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 shadow-lg",
      purple: "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 shadow-lg",
      slate: "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 shadow-lg",
      indigo: "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 shadow-lg"
    }
    return colors[color as keyof typeof colors] || colors.slate
  }

  // Initialize scroll animations
  useIntersectionObserver()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-red-50 via-white to-red-900/5 overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-red-800/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-800/30 to-red-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-red-100/20 to-red-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight hero-element animate-fade-in-up">
              <span className="inline-block hero-element animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Our</span>{' '}
              <span className="text-transparent bg-gradient-to-r from-red-500 to-red-900 bg-clip-text inline-block hero-element animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Trusted</span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-red-900 to-red-500 bg-clip-text inline-block hero-element animate-fade-in-up" style={{ animationDelay: '0.5s' }}>Partners</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-900 mx-auto mb-8 rounded-full hero-element animate-fade-in-up" style={{ animationDelay: '0.7s' }}></div>
          </div>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed hero-element animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            We partner with the world's leading manufacturers to deliver the highest quality
            industrial automation and electrical solutions. VAR (Value-Added Reseller) for TMEIC products and authorized distributor for other premium brands.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 mb-12">
            <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hero-element animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
              <CheckCircleIcon className="h-5 w-5 text-primary-500 mr-2 animate-pulse" />
              <span className="font-medium">VAR for TMEIC & Authorized Distribution</span>
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hero-element animate-fade-in-up" style={{ animationDelay: '1.3s' }}>
              <TrophyIcon className="h-5 w-5 text-blue-500 mr-2 animate-bounce-soft" />
              <span className="font-medium">Premium Partners</span>
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hero-element animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
              <StarIcon className="h-5 w-5 text-primary-500 mr-2 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span className="font-medium">Expert Support</span>
            </div>
          </div>

          {/* Partner Logos Preview */}
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
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
                className={`group relative bg-white rounded-3xl p-8 border-2 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 ${getColorClasses(partner.color)}`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Gradient Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${partner.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>

                {/* Floating Badge */}
                <div className={`absolute -top-3 -right-3 px-4 py-2 rounded-full text-xs font-bold ${getBadgeClasses(partner.color)} transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
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
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${partner.gradient} mr-2`}></div>
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
                    <CheckCircleIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span className="font-medium">Authorized Partner</span>
                  </div>
                  {partner.website !== "#" && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 bg-gradient-to-r ${partner.gradient} text-white rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
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
              const gradients = [
                'from-red-500 to-pink-500',
                'from-blue-500 to-cyan-500',
                'from-green-500 to-emerald-500',
                'from-purple-500 to-violet-500',
                'from-orange-500 to-yellow-500',
                'from-indigo-500 to-blue-500'
              ]
              const gradient = gradients[index % gradients.length]

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
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
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
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        {/* Animated texture backgrounds */}
        <div className="absolute inset-0">
          {/* Moving gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/80 via-primary-600/90 to-primary-700/80"></div>

          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 2px, transparent 2px),
              radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)
            `,
            backgroundSize: '50px 50px, 25px 25px, 80px 80px'
          }}></div>

          {/* Animated diagonal stripes */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
          }}></div>
        </div>

        {/* Floating animated elements */}
        <div className="absolute top-10 left-20 w-4 h-4 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-32 right-16 w-3 h-3 bg-white/25 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-32 w-2 h-6 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-24 w-5 h-2 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Work with Industry Leaders?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact us today to learn how our manufacturer partnerships can benefit your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="group px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">Get a Quote</span>
            </a>
            <a
              href="/products"
              className="group px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border-2 border-white/50 rounded-lg scale-110 opacity-0 group-hover:opacity-50 group-hover:scale-100 transition-all duration-300"></div>
              <span className="relative z-10">Browse Products</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 