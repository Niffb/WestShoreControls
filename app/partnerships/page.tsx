import Link from 'next/link'
import Image from 'next/image'
import { StarIcon, ShieldCheckIcon, TrophyIcon, CheckCircleIcon, CogIcon, BoltIcon } from '@heroicons/react/24/solid'
import type { Metadata } from 'next'
import { getImageUrl } from '@/lib/config/image-config'
import ContactCard from '@/components/ui/ContactCard'

export const metadata: Metadata = {
  title: 'Partnerships | Westshore Controls - Authorized Industrial Partners',
  description: 'Discover our trusted partnerships with leading manufacturers like Mitsubishi Electric, Erico, LS Industrial, Noark, Katko, and Elsteel.',
  keywords: [
    'industrial partnerships',
    'VAR distributor',
    'Mitsubishi Electric partner',
    'Erico distributor',
    'LS Industrial',
    'Noark electrical',
    'Katko controls',
  ],
  openGraph: {
    title: 'Trusted Industrial Partnerships | Westshore Controls',
    description: 'Partnering with world-leading manufacturers to deliver premium industrial automation and electrical solutions.',
    type: 'website',
    url: 'https://westshorecontrols.com/partnerships',
  },
}

export default function PartnershipsPage() {
  const partners = [
    { name: "Mitsubishi Electric", logo: getImageUrl("brands/Mitsubishi-Electric.webp"), type: "Authorized Distributor", since: "2010", badge: "Diamond Partner", description: "World-leading industrial automation and control solutions, including PLCs, HMIs, variable frequency drives, and motion control systems.", specialties: ["PLCs & Controllers", "HMI & Displays", "Variable Frequency Drives", "Motion Control", "Safety Systems"], website: "https://www.mitsubishielectric.com" },
    { name: "Erico", logo: getImageUrl("brands/Erico.webp"), type: "Stocking Distributor", since: "2015", badge: "Premium Partner", description: "Global leader in electrical and industrial metal joining solutions, grounding and bonding systems, and electrical protection products.", specialties: ["Grounding Systems", "Flexible Conductors", "Distribution Blocks", "Busbars", "Cable Management"], website: "https://www.erico.com" },
    { name: "LS Industrial", logo: getImageUrl("LS.webp"), type: "Stocking Distributor", since: "2012", badge: "Strategic Partner", description: "Comprehensive industrial automation solutions including contactors, circuit breakers, motor protection, and drives.", specialties: ["Contactors & Relays", "Circuit Breakers", "Motor Starters", "Variable Frequency Drives", "HMI Systems"], website: "https://www.lsis.com" },
    { name: "Noark", logo: getImageUrl("brands/Noark.webp"), type: "Stocking Distributor", since: "2014", badge: "Certified Partner", description: "High-quality electrical components including contactors, circuit breakers, and motor protection devices.", specialties: ["IEC Contactors", "Thermal Overload Relays", "Manual Motor Starters", "Circuit Breakers"], website: "https://www.noark-electric.com" },
    { name: "Klemsan", logo: getImageUrl("brands/klemsan-logo.webp"), type: "Stocking Distributor", since: "2017", badge: "Technology Partner", description: "Turkish manufacturer specializing in terminal blocks, industrial automation components, and electrical connection solutions.", specialties: ["Terminal Blocks", "Industrial Connectors", "Cable Ties", "Marking Solutions"], website: "https://www.klemsan.com" },
    { name: "Katko", logo: getImageUrl("Katko.webp"), type: "Stocking Distributor", since: "2016", badge: "Trusted Partner", description: "UL Listed manual motor controllers and industrial control solutions designed for safety and reliability.", specialties: ["Manual Motor Controllers", "UL Listed Products", "Safety Switches", "Industrial Controls"], website: "https://www.katko.fi" },
    { name: "Elsteel", logo: getImageUrl("brands/Elsteel.webp"), type: "Stocking Distributor", since: "2018", badge: "Approved Partner", description: "Specialized electrical steel and industrial metal solutions for electrical infrastructure and industrial applications.", specialties: ["Electrical Steel", "Industrial Metals", "Custom Fabrication", "Electrical Infrastructure"], website: "https://www.elsteel.com" },
    { name: "TMEIC", logo: getImageUrl("brands/TMEIC_logo.png"), type: "VAR (Value-Added Reseller)", since: "2019", badge: "Technology Partner", description: "Leading manufacturer of high-power electrical and industrial systems including generators, drives, motors, PV inverters.", specialties: ["Medium Voltage Drives", "PV Inverters", "Generators", "Motors"], website: "https://www.tmeic.com" }
  ]

  const benefits = [
    { icon: ShieldCheckIcon, title: "VAR for TMEIC & Distribution Services", description: "Value-Added Reseller services for TMEIC products and authorized distribution for other premium brands ensuring authentic products with enhanced support" },
    { icon: TrophyIcon, title: "Premium Status", description: "Highest partnership levels with priority access to products, training, and technical resources" },
    { icon: StarIcon, title: "Expert Support", description: "Direct access to manufacturer technical teams and application engineers for complex projects" },
    { icon: CheckCircleIcon, title: "Quality Assurance", description: "Rigorous quality standards and testing ensure reliable performance in demanding industrial environments" },
    { icon: CogIcon, title: "Technical Training", description: "Ongoing certification and training programs keep our team current with latest technologies" },
    { icon: BoltIcon, title: "Fast Response", description: "Priority support channels and expedited service for urgent customer requirements" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Page Heading */}
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Our <span className="text-gray-700">Trusted Partners</span>
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            VAR for TMEIC and authorized distributor for premium brands. Partnering with world-leading manufacturers for industrial automation and electrical solutions.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-6 opacity-60">
            {partners.map((p) => (
              <div key={p.name} className="w-16 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-1.5">
                <Image src={p.logo} alt={p.name} width={48} height={36} className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry-Leading Manufacturer Partnerships</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each partnership represents our commitment to bringing you the most advanced, reliable, and innovative solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partners.map((partner) => (
              <div key={partner.name} className="relative bg-white rounded-xl p-8 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                  {partner.badge}
                </div>
                <div className="flex items-start space-x-6 mb-6">
                  <div className="relative w-24 h-16 bg-white rounded-lg p-2 border border-gray-100 flex-shrink-0">
                    <Image src={partner.logo} alt={`${partner.name} Logo`} fill className="object-contain p-1" sizes="96px" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                    <p className="text-sm text-gray-500 font-medium">{partner.type} since {partner.since}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{partner.description}</p>
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Key Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {partner.specialties.map((s) => (
                      <span key={s} className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-md text-xs font-medium border border-gray-200">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="font-medium">Authorized Partner</span>
                  </div>
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md text-sm font-medium transition-colors">
                    Learn More &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Partnerships Mean for You</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our strategic manufacturer relationships ensure you receive premium products, expert support, and industry-leading solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center p-8 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
                      <IconComponent className="h-7 w-7 text-gray-700" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Work with Industry Leaders?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us today to learn how our manufacturer partnerships can benefit your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition-colors">
              Get a Quote
            </Link>
            <Link href="/products" className="px-8 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-900 transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
