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
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import ContactCard from '@/components/ui/ContactCard'

export const metadata = {
  title: 'Contact Us - Westshore Controls | Electrical Equipment Support',
  description: 'Contact Westshore Controls for electrical and automation equipment support. Phone: (604) 817-0987, Email: info@westshorecontrols.com.',
  keywords: [
    'contact Westshore Controls',
    'electrical equipment support',
    'automation equipment help',
    'technical support',
  ],
  openGraph: {
    title: 'Contact Westshore Controls - Expert Electrical & Automation Support',
    description: 'Get expert support for electrical and automation equipment. Phone: (604) 817-0987',
    type: 'website',
    url: 'https://westshorecontrols.com/contact/',
  },
  alternates: { canonical: '/contact/' },
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Page Heading */}
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
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Reach Us</h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Our knowledgeable sales agents and technicians are ready to assist you with product selection,
                technical support, and pricing information.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: PhoneIcon, title: 'Phone Support', desc: 'Direct line for immediate assistance', value: '(+1) 604 817 0987', href: 'tel:+16048170987' },
                { icon: EnvelopeIcon, title: 'Email Support', desc: 'Send detailed inquiries and documentation', value: 'info@westshorecontrols.com', href: 'mailto:info@westshorecontrols.com' },
                { icon: PrinterIcon, title: 'Fax Documents', desc: 'For technical drawings and specifications', value: '(+1) 604 943 1661', href: null },
              ].map((method) => (
                <div key={method.title} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow text-center">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{method.desc}</p>
                  {method.href ? (
                    <a href={method.href} className="text-primary-600 hover:text-primary-700 font-semibold text-lg transition-colors">
                      {method.value}
                    </a>
                  ) : (
                    <span className="text-gray-900 font-semibold text-lg">{method.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-sm text-gray-600">Pacific Standard Time (PST)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', time: '8:00 AM - 6:00 PM', note: '10 hours', active: true },
                  { day: 'Saturday', time: '9:00 AM - 4:00 PM', note: '7 hours', active: true },
                  { day: 'Sunday', time: 'Closed', note: 'Rest day', active: false },
                ].map((row) => (
                  <div key={row.day} className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">{row.day}</span>
                      <div className="text-right">
                        <span className={`font-bold text-lg ${row.active ? 'text-gray-800' : 'text-gray-500'}`}>{row.time}</span>
                        <p className="text-xs text-gray-500">{row.note}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900">Need immediate assistance?</p>
                  <p className="text-xs text-gray-600">Call or email us and we&apos;ll respond promptly during business hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Sales Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced sales professionals are here to help you find the right solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { initials: 'MM', name: 'Mike Marelic', role: 'Sales', desc: 'Dedicated sales professional helping customers find the perfect electrical and automation solutions.', phone: '+17789956473', phoneDisplay: '(+1) 778 995 6473', email: 'mmarelic@westshorecontrols.com' },
              { initials: 'MJ', name: 'Mark Jesty', role: 'Sales Manager', desc: 'Experienced sales manager leading our team to deliver exceptional customer service and technical expertise.', phone: '+16043740918', phoneDisplay: '(+1) 604 374 0918', email: 'mjesty@westshorecontrols.com' },
              { initials: 'JO', name: 'John Oldham', role: 'Sales', desc: 'Experienced sales professional providing expert guidance for industrial automation and electrical solutions.', phone: '+16043774977', phoneDisplay: '(+1) 604 377 4977', email: 'joldham@westshorecontrols.com' },
            ].map((member) => (
              <div key={member.initials} className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{member.initials}</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-sm text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.desc}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <PhoneIcon className="w-4 h-4" />
                    <a href={`tel:${member.phone}`} className="text-primary-600 hover:text-primary-700 transition-colors">{member.phoneDisplay}</a>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <EnvelopeIcon className="w-4 h-4" />
                    <a href={`mailto:${member.email}`} className="text-primary-600 hover:text-primary-700 transition-colors break-all">{member.email}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Service */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Service</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Expert engineering support and consultation for complex automation projects
            </p>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow max-w-sm">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">JT</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Jose Torrecampo, FEC, P.Eng</h4>
              <p className="text-sm text-primary-600 font-medium mb-3">Technical Service</p>
              <p className="text-gray-600 text-sm mb-4">Technical consulting and engineering solutions for complex automation projects.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4" />
                  <a href="tel:+16048050175" className="text-primary-600 hover:text-primary-700 transition-colors">(+1) 604 805 0175</a>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <EnvelopeIcon className="w-4 h-4" />
                  <a href="mailto:jtorrecampo@westshorecontrols.com" className="text-primary-600 hover:text-primary-700 transition-colors break-all">jtorrecampo@westshorecontrols.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Strategically positioned to serve customers throughout North America and beyond
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: BuildingOfficeIcon, title: 'Sales Office', subtitle: 'Main Operations Center',
                address: ['Westshore Controls Ltd.', '1431 Duncan Drive', 'Delta, BC V4L 1R5', 'Canada'],
                phone: '(+1) 604 817 0987', email: 'info@westshorecontrols.com',
                note: 'Primary sales and technical support'
              },
              {
                icon: BuildingOfficeIcon, title: 'Burnaby Office', subtitle: 'Secondary Operations',
                address: ['Westshore Controls Ltd.', '#104-7450 Lowland Drive', 'Burnaby, BC V5J 5A4', 'Canada'],
                phone: '(+1) 604 817 0987', email: 'info@westshorecontrols.com',
                note: 'Additional support and operations'
              },
              {
                icon: TruckIcon, title: 'USA Shipping', subtitle: 'US Distribution Center',
                address: ['Unit# 944', '1582 Gulf Road', 'Point Roberts, WA 98281', 'United States'],
                note: 'Fast shipping throughout North America'
              },
            ].map((loc) => (
              <div key={loc.title} className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <loc.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{loc.title}</h3>
                    <p className="text-gray-600 text-sm">{loc.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div className="text-gray-700">
                      {loc.address.map((line, i) => <p key={i} className={i === 0 ? 'font-semibold text-gray-900' : ''}>{line}</p>)}
                    </div>
                  </div>
                  {loc.phone && (
                    <div className="flex items-start space-x-3">
                      <PhoneIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <a href="tel:+16048170987" className="text-primary-600 hover:text-primary-700 font-medium">{loc.phone}</a>
                    </div>
                  )}
                  {loc.email && (
                    <div className="flex items-start space-x-3">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <a href={`mailto:${loc.email}`} className="text-primary-600 hover:text-primary-700 font-medium">{loc.email}</a>
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircleIcon className="w-4 h-4 text-gray-500 mr-2" />
                    <span>{loc.note}</span>
                  </div>
                </div>
              </div>
            ))}
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
            {[
              { title: 'United States', desc: 'Comprehensive coverage across all US states with fast shipping and local support.' },
              { title: 'Canada', desc: 'Native Canadian operations with deep understanding of local electrical standards and regulations.' },
              { title: 'Global', desc: 'International shipping capabilities to serve customers worldwide with reliable delivery.' },
            ].map((area) => (
              <div key={area.title} className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GlobeAmericasIcon className="w-7 h-7 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-gray-600">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Our team of experts is standing by to help you find the perfect electrical and automation solutions.
          </p>
          <div className="flex justify-center">
            <ContactCard variant="inlineNeutral" showEmail={true} className="w-full max-w-md" />
          </div>
        </div>
      </section>
    </div>
  )
}
