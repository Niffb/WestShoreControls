'use client'

import {
  CheckCircleIcon,
  TruckIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import ContactCard from '@/components/ui/ContactCard'

interface TeamMember {
  name: string
  position: string
  phone: string
  email: string
  specialties?: string[]
}

interface Department {
  name: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description: string
  members: TeamMember[]
}

export default function About() {
  const departments: Department[] = [
    {
      name: 'Sales Team',
      icon: UserGroupIcon,
      description: 'Our knowledgeable sales agents work with you to provide accessible, economical, and high quality electrical and automation equipment.',
      members: [
        {
          name: 'Robert Oldham',
          position: 'President',
          phone: '(604) 817-0987',
          email: 'info@westshorecontrols.com',
          specialties: ['Industrial Control Equipment', 'Distribution & Sales']
        },
        {
          name: 'John Oldham',
          position: 'VFD Specialist',
          phone: '(604) 817-0987',
          email: 'info@westshorecontrols.com',
          specialties: ['Variable Frequency Drives', 'Mining & Forestry Industries']
        },
        {
          name: 'Jose Torrecampo, FEC, P.Eng',
          position: 'Technical Service',
          phone: '(604) 817-0987',
          email: 'info@westshorecontrols.com',
          specialties: ['Engineering Solutions', 'Technical Consulting']
        }
      ]
    },
    {
      name: 'Technical Support',
      icon: WrenchScrewdriverIcon,
      description: 'Excellent technical support and customer service is always available to guide you in choosing, purchasing, and maintaining your equipment.',
      members: [
        {
          name: 'Technical Support Team',
          position: 'Technical Specialists',
          phone: '(604) 817-0987',
          email: 'info@westshorecontrols.com',
          specialties: ['Product Selection', 'Installation Guidance', 'Troubleshooting']
        }
      ]
    },
    {
      name: 'Customer Service',
      icon: ChatBubbleLeftRightIcon,
      description: 'Order processing, shipping inquiries, and general customer assistance for all your electrical component needs.',
      members: [
        {
          name: 'Customer Service Team',
          position: 'Customer Representatives',
          phone: '(604) 817-0987',
          email: 'info@westshorecontrols.com',
          specialties: ['Order Management', 'Shipping Coordination', 'Customer Relations']
        }
      ]
    }
  ]

  const features = [
    {
      icon: CheckCircleIcon,
      title: 'UL, CSA & ETL Certified',
      description: 'All products sourced from internationally recognized companies with proper certifications'
    },
    {
      icon: TruckIcon,
      title: 'North American Distribution',
      description: 'Delivering throughout the United States, Canada and Globally'
    },
    {
      icon: PhoneIcon,
      title: 'Expert Technical Support',
      description: 'Knowledgeable technicians provide guidance on product selection and maintenance'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Industry Proven Products',
      description: 'VAR for TMEIC products and authorized distributor of Erico, Elsteel, Katko, LS and Noark product lines'
    },
    {
      icon: ClockIcon,
      title: 'Competitive Pricing',
      description: 'Maximum value with reduced manufacturing and maintenance costs'
    },
    {
      icon: UserGroupIcon,
      title: 'Direct Manufacturer Relations',
      description: 'Working directly with manufacturers to guarantee up-to-date technical information'
    }
  ]

  const stats = [
    { number: '5,000+', label: 'Products in Stock' },
    { number: '6', label: 'Major Brand Partners' },
    { number: '25+', label: 'Years Experience' },
    { number: '100%', label: 'Certified Products' }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Your VAR for TMEIC &
              <span className="text-primary-500 block">
                Electrical & Automation Equipment
              </span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              Westshore Controls Ltd. is an American and Canadian VAR (Value-Added Reseller) for TMEIC products and authorized
              distributor of Electrical and Automation equipment & systems. We work directly with TMEIC, Erico, Elsteel,
              Katko, LS and Noark product lines to deliver throughout the United States, Canada and Globally.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Our company strives to reduce both manufacturing and maintenance costs in the Electrical and
              Automation sectors while offering maximum value. We source from internationally recognized
              companies with UL, CSA, and ETL approved certifications to provide competitive prices and
              maximum customer satisfaction.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              To achieve our company goals of excellence, our knowledgeable sales agents and technicians
              work together to offer accessible, economical, and high quality electrical and automation
              equipment. Our excellent technical support and customer service is always available to guide you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact" className="btn-primary text-center">Contact Our Team</Link>
              <Link href="/products" className="btn-secondary text-center">View Our Products</Link>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary-500 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Meet Our Expert Team Section */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-2 text-sm text-primary-700 mb-6">
              <UserGroupIcon className="w-4 h-4" />
              Expert Team
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Meet Our <span className="text-primary-500">Expert Team</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our dedicated professionals bring decades of experience in electrical and automation solutions.
              From technical support to sales expertise, we&apos;re here to guide you every step of the way.
            </p>
          </div>

          {/* Team Leaders Section */}
          <div className="mb-12">
            <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Leadership Team
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  initials: 'RO', name: 'Robert Oldham', role: 'President',
                  bio: 'Leading Westshore Controls with extensive expertise in Industrial Control Equipment Distribution and Sales. Committed to delivering exceptional customer service.'
                },
                {
                  initials: 'JO', name: 'John Oldham', role: 'VFD Specialist',
                  bio: 'Expert in Variable Frequency Drives with specialized knowledge in Mining and Forestry Industries automation systems and solutions.',
                  tags: ['VFDs', 'Mining', 'Forestry']
                },
                {
                  initials: 'JT', name: 'Jose Torrecampo, FEC, P.Eng', role: 'Technical Service',
                  bio: 'Technical service specialist providing technical consulting and engineering solutions for complex automation projects and system integrations.',
                  tags: ['Engineering', 'Consulting', 'Automation']
                }
              ].map((member) => (
                <div key={member.initials} className="bg-white rounded-xl border border-gray-200 p-8 text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-lg">{member.initials}</span>
                  </div>
                  <h5 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h5>
                  <div className="text-sm text-primary-600 font-medium mb-4">{member.role}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>
                  {member.tags && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {member.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-center space-x-4">
                    <a href="tel:(604) 817-0987" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                      <PhoneIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Call</span>
                    </a>
                    <a href="mailto:info@westshorecontrols.com" className="flex items-center text-primary-600 hover:text-primary-700 transition-colors">
                      <EnvelopeIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Email</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Departments */}
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Support Teams</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, deptIndex) => {
                const IconComponent = dept.icon
                return (
                  <div
                    key={deptIndex}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-primary-600" />
                    </div>
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">{dept.name}</h5>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{dept.description}</p>
                    {dept.members[0]?.specialties && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {dept.members[0].specialties.slice(0, 3).map((specialty, specIndex) => (
                          <span key={specIndex} className="inline-block bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="pt-4 border-t border-gray-200">
                      <ContactCard variant="compact" showEmail={false} showHours={false} className="!p-3 !border-0" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Westshore Controls?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We go beyond just supplying products. We&apos;re your partner in electrical solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex-shrink-0">
                    <IconComponent className="h-7 w-7 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-900 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Contact our team of experts to discuss your electrical component needs.
            We&apos;ll help you find the perfect solution for your project with industry-proven products.
          </p>
          <div className="flex justify-center">
            <ContactCard variant="inlineNeutral" showEmail={true} className="w-full max-w-md" />
          </div>
        </div>
      </div>
    </section>
  )
}
