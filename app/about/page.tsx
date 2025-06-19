import { 
  BuildingOfficeIcon,
  GlobeAmericasIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'
import ContactCard from '@/components/ui/ContactCard'
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

export const metadata = {
  title: 'About Us - Westshore Controls | 25+ Years Industrial Experience',
  description: 'Learn about Westshore Controls Ltd., an American and Canadian VAR (Value-Added Reseller) for TMEIC products and authorized distributor of electrical and automation equipment & systems.',
  keywords: [
    'about Westshore Controls',
    'electrical equipment distributor',
    'VAR TMEIC',
    'value-added reseller',
    'industrial automation company',
    'electrical distributor history',
    'automation equipment distributor',
    'UL certified distributor',
    'CSA approved distributor',
    'ETL listed products',
    'North American distributor',
    'global electrical distributor'
  ],
  openGraph: {
    title: 'About Westshore Controls - 25+ Years Industrial Experience',
    description: 'Trusted VAR for TMEIC and authorized distributor serving North America and globally with premium electrical and automation solutions.',
    type: 'website',
    url: 'https://westshorecontrols.com/about/',
  },
  alternates: {
    canonical: '/about/',
  },
}

export default function AboutPage() {
  // Initialize scroll animations
  useIntersectionObserver()

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-900/5 py-20 overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-red-800/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-800/30 to-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 text-sm text-red-700 mb-6 hero-element animate-fade-in-up hover:shadow-lg hover:scale-105 transition-all duration-300">
              <BuildingOfficeIcon className="w-4 h-4 animate-bounce-soft" />
              Est. 25+ Years
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 hero-element animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <span className="inline-block hero-element animate-fade-in-up" style={{animationDelay: '0.3s'}}>About</span>{' '}
              <span className="text-transparent bg-gradient-to-r from-red-500 to-red-900 bg-clip-text inline-block hero-element animate-fade-in-up" style={{animationDelay: '0.5s'}}>Westshore Controls</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-900 mx-auto mb-8 rounded-full hero-element animate-fade-in-up" style={{animationDelay: '0.7s'}}></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed hero-element animate-fade-in-up" style={{animationDelay: '0.9s'}}>
              Your trusted partner for electrical and automation equipment across North America and beyond
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Company Story */}
            <div className="space-y-8 animate-on-scroll">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-900">Westshore Controls Ltd.</strong> is an American and Canadian VAR (Value-Added Reseller) for TMEIC products and authorized distributor of Electrical and Automation equipment & systems. We carry <strong className="text-gray-900">all factory and automation products</strong> from our partner brands including TMEIC, Erico, Elsteel, Katko, LS Industrial, Mitsubishi, Klemsan, and Noark, delivering throughout the United States, Canada and Globally.
                  </p>
                  <p>
                    Our comprehensive product portfolio includes complete automation solutions, electrical components, motor control systems, circuit protection devices, and industrial controls. We work daily to guarantee the most up to date and technical information on our products. Our company strives to reduce both manufacturing and maintenance costs in the Electrical and Automation sectors while offering maximum value.
                  </p>
                  <p>
                    In order to offer competitive prices and provide maximum satisfaction and assistance to our customers, we source <strong className="text-gray-900">complete product lines</strong> from internationally recognized companies with UL, CSA, and ETL approved certifications.
                  </p>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-slate-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckBadgeIcon className="w-6 h-6 text-green-600 mr-2" />
                  Certified & Approved
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                    <div className="font-semibold text-gray-900">UL</div>
                    <div className="text-sm text-gray-600">Listed</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                    <div className="font-semibold text-gray-900">CSA</div>
                    <div className="text-sm text-gray-600">Certified</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
                    <div className="font-semibold text-gray-900">ETL</div>
                    <div className="text-sm text-gray-600">Approved</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features & Stats */}
            <div className="space-y-8 animate-on-scroll">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  To achieve our company goals of excellence, our knowledgeable sales agents and technicians work together to offer accessible, economical, and high quality electrical and automation equipment.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <GlobeAmericasIcon className="w-6 h-6 text-primary-500 group-hover:animate-bounce-soft" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">Global Reach</h3>
                  <p className="text-sm text-gray-600">Delivering throughout the United States, Canada, and internationally</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheckIcon className="w-6 h-6 text-green-600 group-hover:animate-pulse" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Quality Assured</h3>
                  <p className="text-sm text-gray-600">Industry proven products with comprehensive certifications</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <UserGroupIcon className="w-6 h-6 text-blue-600 group-hover:animate-wiggle" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Expert Support</h3>
                  <p className="text-sm text-gray-600">Knowledgeable sales agents and technical support team</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-accent-orange/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <BuildingOfficeIcon className="w-6 h-6 text-accent-orange group-hover:animate-bounce-soft" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-accent-orange transition-colors">Trusted Partners</h3>
                  <p className="text-sm text-gray-600">Direct partnerships with leading manufacturers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Brands */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We partner with world-leading manufacturers to deliver premium industrial automation and electrical solutions. 
              VAR (Value-Added Reseller) for TMEIC products and authorized distributor for other premium brands.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                name: "TMEIC",
                logo: getImageUrl("brands/TMEIC_logo.svg"),
                type: "VAR (Value-Added Reseller)",
                since: "2019",
                badge: "Technology Partner",
                description: "Leading manufacturer of high-power electrical and industrial systems including generators, drives, motors, PV inverters, and advanced control systems.",
                specialties: ["Medium Voltage Drives", "PV Inverters", "Generators", "Motors"],
                color: "indigo"
              },
              {
                name: "Mitsubishi Electric",
                logo: getImageUrl("brands/Mitsubishi-Electric.png"),
                type: "Authorized Distributor",
                since: "2010",
                badge: "Diamond Partner",
                description: "World-leading industrial automation and control solutions, including PLCs, HMIs, variable frequency drives, and motion control systems.",
                specialties: ["PLCs & Controllers", "HMI & Displays", "Variable Frequency Drives", "Motion Control"],
                color: "red"
              },
              {
                name: "Noark",
                logo: getImageUrl("brands/Noark.jpg"),
                type: "Stocking Distributor",
                since: "2014",
                badge: "Certified Partner",
                description: "High-quality electrical components including contactors, circuit breakers, and motor protection devices for industrial applications.",
                specialties: ["IEC Contactors", "Thermal Overload Relays", "Manual Motor Starters", "Circuit Breakers"],
                color: "orange"
              },
              {
                name: "LS Industrial",
                logo: getImageUrl("brands/LS.webp"),
                type: "Stocking Distributor",
                since: "2012",
                badge: "Strategic Partner",
                description: "Comprehensive industrial automation solutions including contactors, circuit breakers, motor protection, and drives.",
                specialties: ["Contactors & Relays", "Circuit Breakers", "Motor Starters", "Variable Frequency Drives"],
                color: "green"
              },
              {
                name: "Erico",
                logo: getImageUrl("brands/Erico.jpg"),
                type: "Stocking Distributor",
                since: "2015",
                badge: "Premium Partner",
                description: "Global leader in electrical and industrial metal joining solutions, grounding and bonding systems, and electrical protection products.",
                specialties: ["Grounding Systems", "Flexible Conductors", "Distribution Blocks", "Busbars"],
                color: "blue"
              },
              {
                name: "Katko",
                logo: getImageUrl("brands/Katko.webp"),
                type: "Stocking Distributor",
                since: "2016",
                badge: "Trusted Partner",
                description: "UL Listed manual motor controllers and industrial control solutions designed for safety and reliability in demanding environments.",
                specialties: ["Manual Motor Controllers", "UL Listed Products", "Safety Switches", "Industrial Controls"],
                color: "purple"
              },
              {
                name: "Klemsan",
                logo: getImageUrl("brands/klemsan-logo.png"),
                type: "Stocking Distributor",
                since: "2017",
                badge: "Technology Partner",
                description: "Turkish manufacturer specializing in terminal blocks, industrial automation components, and electrical connection solutions.",
                specialties: ["Terminal Blocks", "Industrial Connectors", "Cable Ties", "Marking Solutions"],
                color: "blue"
              },
              {
                name: "Elsteel",
                logo: getImageUrl("brands/Elsteel.png"),
                type: "Stocking Distributor",
                since: "2018",
                badge: "Approved Partner",
                description: "Specialized electrical steel and industrial metal solutions for electrical infrastructure and industrial applications.",
                specialties: ["Electrical Steel", "Industrial Metals", "Custom Fabrication", "Electrical Infrastructure"],
                color: "slate"
              }
            ].map((partner, index) => {
              const getColorClasses = (color: string) => {
                const colors = {
                  red: "border-red-200 hover:border-red-400 bg-red-50/50",
                  blue: "border-blue-200 hover:border-blue-400 bg-blue-50/50",
                  green: "border-green-200 hover:border-green-400 bg-green-50/50",
                  orange: "border-orange-200 hover:border-orange-400 bg-orange-50/50",
                  purple: "border-purple-200 hover:border-purple-400 bg-purple-50/50",
                  slate: "border-slate-200 hover:border-slate-400 bg-slate-50/50",
                  indigo: "border-indigo-200 hover:border-indigo-400 bg-indigo-50/50"
                }
                return colors[color as keyof typeof colors] || colors.slate
              }

              const getBadgeColor = (color: string) => {
                const colors = {
                  red: "bg-red-100 text-red-800",
                  blue: "bg-blue-100 text-blue-800",
                  green: "bg-green-100 text-green-800",
                  orange: "bg-orange-100 text-orange-800",
                  purple: "bg-purple-100 text-purple-800",
                  slate: "bg-slate-100 text-slate-800",
                  indigo: "bg-indigo-100 text-indigo-800"
                }
                return colors[color as keyof typeof colors] || colors.slate
              }

              return (
                <div 
                  key={partner.name} 
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-2 animate-on-scroll group ${getColorClasses(partner.color)}`}
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  {/* Partner Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(partner.color)}`}>
                      {partner.badge}
                    </span>
                    <span className="text-xs text-gray-500">Since {partner.since}</span>
                  </div>

                  {/* Partner Logo/Name */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">{partner.type}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {partner.description}
                  </p>

                  {/* Key Specialties */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Key Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {partner.specialties.slice(0, 3).map((specialty, idx) => (
                        <span 
                          key={idx}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {specialty}
                        </span>
                      ))}
                      {partner.specialties.length > 3 && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                          +{partner.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Partnership Benefits Summary */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-200 animate-on-scroll">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnership Benefits</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our strategic partnerships enable us to deliver exceptional value and support to our customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100 border border-red-200">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">VAR & Distribution Services</h4>
                <p className="text-sm text-gray-600">Value-Added Reseller for TMEIC and authorized distribution ensuring authentic products with enhanced support</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
                <p className="text-sm text-gray-600">Direct access to manufacturer technical teams and application engineers for complex projects</p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckBadgeIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance</h4>
                <p className="text-sm text-gray-600">Rigorous quality standards and testing ensure reliable performance in demanding industrial environments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are dedicated to providing exceptional service and technical expertise
            </p>
          </div>

          {/* Management Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Leadership Team</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-on-scroll group">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <span className="text-white font-bold text-xl group-hover:animate-pulse">RO</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Robert Oldham</h4>
                <p className="text-red-600 font-medium mb-3">President</p>
                <p className="text-gray-600 text-sm mb-4">Leading Westshore Controls with expertise in Industrial Control Equipment Distribution and Sales.</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span>(+1) 604 817 0987</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>info@westshorecontrols.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 animate-on-scroll group" style={{animationDelay: '0.2s'}}>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <span className="text-white font-bold text-xl group-hover:animate-pulse">JO</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">John Oldham</h4>
                <p className="text-blue-600 font-medium mb-3">VFD Specialist</p>
                <p className="text-gray-600 text-sm mb-4">Expert in Variable Frequency Drives with specialization in Mining and Forestry Industries automation systems.</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span>(+1) 604 817 0987</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>info@westshorecontrols.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">JT</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Jose Torrecampo, FEC, P.Eng.</h4>
                <p className="text-green-600 font-medium mb-3">Principal Engineer</p>
                <p className="text-gray-600 text-sm mb-4">Principal engineer providing technical consulting and engineering solutions for complex automation projects.</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span>(+1) 604 817 0987</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>info@westshorecontrols.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Our Team */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Dedicated Support</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Sales & Customer Service</h4>
                <p className="text-gray-600 mb-4">Our knowledgeable sales agents work with you to provide accessible, economical, and high quality electrical and automation equipment.</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span>(+1) 604 817 0987</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>info@westshorecontrols.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Technical Support</h4>
                <p className="text-gray-600 mb-4">Excellent technical support and customer service is always available to guide you in choosing, purchasing, and maintaining your equipment.</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <span>(+1) 604 817 0987</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>info@westshorecontrols.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support & Contact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Always Here to Help</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  To assist you in choosing, purchasing, and maintaining your items, our excellent technical support and customer service is always available to guide you.
                </p>
                <p>
                  You can contact us anytime via phone, fax, mail, e-mail or simply through our website for immediate assistance. By purchasing from our product line, your company will be reassured in knowing that our product is industry proven.
                </p>
                <p className="text-gray-900 font-semibold">
                  We thank you very much for your business and interest in our family of exceptional certified electrical products.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Phone Support</div>
                    <div className="text-sm text-gray-600">Available during business hours</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                    <EnvelopeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Email Support</div>
                    <div className="text-sm text-gray-600">24/7 response within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                    <GlobeAmericasIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Website Support</div>
                    <div className="text-sm text-gray-600">Immediate online assistance</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <ContactCard variant="compact" showEmail={true} showHours={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 