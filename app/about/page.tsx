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

export const metadata = {
  title: 'About Us - Westshore Controls | 25+ Years Industrial Experience',
  description: 'Learn about Westshore Controls Ltd., an American and Canadian VAR (Value-Added Reseller) for TMEIC products and authorized distributor of electrical and automation equipment & systems.',
  keywords: [
    'about Westshore Controls',
    'electrical equipment distributor',
    'VAR TMEIC',
    'value-added reseller',
    'industrial automation company',
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
  return (
    <div className="bg-white">
      {/* Page Heading */}
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            About <span className="text-gray-700">Westshore Controls</span>
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Your trusted partner for electrical and automation equipment across North America and beyond. Est. 25+ years.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-900">Westshore Controls Ltd.</strong> is an American and Canadian VAR (Value-Added Reseller) for TMEIC products and authorized distributor of Electrical and Automation equipment & systems. We carry <strong className="text-gray-900">all factory and automation products</strong> from our partner brands including TMEIC, Erico, Elsteel, Katko, LS Industrial, Mitsubishi, Klemsan, and Noark, delivering throughout the United States, Canada and Globally.
                  </p>
                  <p>
                    Our comprehensive product portfolio includes complete automation solutions, electrical components, motor control systems, circuit protection devices, and industrial controls. We work daily to guarantee the most up to date and technical information on our products.
                  </p>
                  <p>
                    In order to offer competitive prices and provide maximum satisfaction and assistance to our customers, we source <strong className="text-gray-900">complete product lines</strong> from internationally recognized companies with UL, CSA, and ETL approved certifications.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckBadgeIcon className="w-6 h-6 text-gray-600 mr-2" />
                  Certified & Approved
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {['UL', 'CSA', 'ETL'].map((cert) => (
                    <div key={cert} className="bg-white rounded-lg p-4 text-center border border-gray-200">
                      <div className="font-semibold text-gray-900">{cert}</div>
                      <div className="text-sm text-gray-600">{cert === 'UL' ? 'Listed' : cert === 'CSA' ? 'Certified' : 'Approved'}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  To achieve our company goals of excellence, our knowledgeable sales agents and technicians work together to offer accessible, economical, and high quality electrical and automation equipment.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: GlobeAmericasIcon, title: 'Global Reach', desc: 'Delivering throughout the United States, Canada, and internationally' },
                  { icon: ShieldCheckIcon, title: 'Quality Assured', desc: 'Industry proven products with comprehensive certifications' },
                  { icon: UserGroupIcon, title: 'Expert Support', desc: 'Knowledgeable sales agents and technical support team' },
                  { icon: BuildingOfficeIcon, title: 'Trusted Partners', desc: 'Direct partnerships with leading manufacturers' },
                ].map((item) => (
                  <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Brands */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We partner with world-leading manufacturers to deliver premium industrial automation and electrical solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { name: "TMEIC", type: "VAR (Value-Added Reseller)", since: "2019", badge: "Technology Partner", description: "Leading manufacturer of high-power electrical and industrial systems.", specialties: ["Medium Voltage Drives", "PV Inverters", "Generators", "Motors"] },
              { name: "Mitsubishi Electric", type: "Authorized Distributor", since: "2010", badge: "Diamond Partner", description: "World-leading industrial automation and control solutions.", specialties: ["PLCs & Controllers", "HMI & Displays", "Variable Frequency Drives", "Motion Control"] },
              { name: "Noark", type: "Stocking Distributor", since: "2014", badge: "Certified Partner", description: "High-quality electrical components for industrial applications.", specialties: ["IEC Contactors", "Thermal Overload Relays", "Manual Motor Starters", "Circuit Breakers"] },
              { name: "LS Industrial", type: "Stocking Distributor", since: "2012", badge: "Strategic Partner", description: "Comprehensive industrial automation solutions.", specialties: ["Contactors & Relays", "Circuit Breakers", "Motor Starters", "Variable Frequency Drives"] },
              { name: "Erico", type: "Stocking Distributor", since: "2015", badge: "Premium Partner", description: "Global leader in electrical joining and protection products.", specialties: ["Grounding Systems", "Flexible Conductors", "Distribution Blocks", "Busbars"] },
              { name: "Katko", type: "Stocking Distributor", since: "2016", badge: "Trusted Partner", description: "UL Listed manual motor controllers and industrial control solutions.", specialties: ["Manual Motor Controllers", "UL Listed Products", "Safety Switches"] },
              { name: "Klemsan", type: "Stocking Distributor", since: "2017", badge: "Technology Partner", description: "Terminal blocks, industrial automation components.", specialties: ["Terminal Blocks", "Industrial Connectors", "Cable Ties"] },
              { name: "Elsteel", type: "Stocking Distributor", since: "2018", badge: "Approved Partner", description: "Specialized electrical steel and industrial metal solutions.", specialties: ["Electrical Steel", "Industrial Metals", "Custom Fabrication"] }
            ].map((partner) => (
              <div key={partner.name} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">{partner.badge}</span>
                  <span className="text-xs text-gray-500">Since {partner.since}</span>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-sm text-gray-600 font-medium">{partner.type}</p>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">{partner.description}</p>
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Key Specialties:</h4>
                  <div className="flex flex-wrap gap-1">
                    {partner.specialties.slice(0, 3).map((s) => (
                      <span key={s} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{s}</span>
                    ))}
                    {partner.specialties.length > 3 && (
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">+{partner.specialties.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Partnership Benefits Summary */}
          <div className="mt-16 bg-white rounded-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Partnership Benefits</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">Our strategic partnerships enable us to deliver exceptional value and support</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheckIcon, title: 'VAR & Distribution Services', desc: 'Value-Added Reseller for TMEIC and authorized distribution ensuring authentic products with enhanced support' },
                { icon: UserGroupIcon, title: 'Expert Support', desc: 'Direct access to manufacturer technical teams and application engineers for complex projects' },
                { icon: CheckBadgeIcon, title: 'Quality Assurance', desc: 'Rigorous quality standards and testing ensure reliable performance in demanding industrial environments' },
              ].map((item) => (
                <div key={item.title} className="text-center p-6 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are dedicated to providing exceptional service and technical expertise
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Leadership Team</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { initials: 'RO', name: 'Robert Oldham', role: 'President', desc: 'Leading Westshore Controls with expertise in Industrial Control Equipment Distribution and Sales.', phone: '(+1) 604 817 0987' },
                { initials: 'JO', name: 'John Oldham', role: 'VFD Specialist', desc: 'Expert in Variable Frequency Drives with specialization in Mining and Forestry Industries automation systems.', phone: '(+1) 604 817 0987' },
                { initials: 'JT', name: 'Jose Torrecampo, FEC, P.Eng', role: 'Technical Service', desc: 'Technical service specialist providing technical consulting and engineering solutions for complex automation projects.', phone: '(+1) 604 805 0175' },
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
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <EnvelopeIcon className="w-4 h-4" />
                      <span>info@westshorecontrols.com</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Dedicated Support</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: UserGroupIcon, title: 'Sales & Customer Service', desc: 'Our knowledgeable sales agents work with you to provide accessible, economical, and high quality electrical and automation equipment.' },
                { icon: ShieldCheckIcon, title: 'Technical Support', desc: 'Excellent technical support and customer service is always available to guide you in choosing, purchasing, and maintaining your equipment.' },
              ].map((dept) => (
                <div key={dept.title} className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <dept.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{dept.title}</h4>
                  <p className="text-gray-600 mb-4">{dept.desc}</p>
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
              ))}
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
                  You can contact us anytime via phone, fax, mail, e-mail or simply through our website for immediate assistance.
                </p>
                <p className="text-gray-900 font-semibold">
                  We thank you very much for your business and interest in our family of exceptional certified electrical products.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-4 mb-6">
                {[
                  { icon: PhoneIcon, title: 'Phone Support', desc: 'Available during business hours' },
                  { icon: EnvelopeIcon, title: 'Email Support', desc: '24/7 response within 24 hours' },
                  { icon: GlobeAmericasIcon, title: 'Website Support', desc: 'Immediate online assistance' },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <ContactCard variant="compactNeutral" showEmail={true} showHours={true} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
