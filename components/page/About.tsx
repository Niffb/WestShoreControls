'use client'

import { 
  CheckCircleIcon, 
  TruckIcon, 
  PhoneIcon, 
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CalculatorIcon,
  WrenchScrewdriverIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import ContactCard from '@/components/ui/ContactCard'

interface TeamMember {
  name: string
  position: string
  phone: string
  email: string
  image?: string
  specialties?: string[]
}

interface Department {
  name: string
  icon: any
  description: string
  members: TeamMember[]
  generalPhone?: string
  generalEmail?: string
}

// Animated counter component
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView && !started) {
      setStarted(true)
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, end, duration, started])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const departments: Department[] = [
    {
      name: 'Sales Team',
      icon: UserGroupIcon,
      description: 'Our knowledgeable sales agents work with you to provide accessible, economical, and high quality electrical and automation equipment.',
      generalPhone: '(604) 817-0987',
      generalEmail: 'info@westshorecontrols.com',
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
          name: 'Jose Torrecampo',
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
      generalPhone: '(604) 817-0987',
      generalEmail: 'info@westshorecontrols.com',
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
      generalPhone: '(604) 817-0987',
      generalEmail: 'info@westshorecontrols.com',
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
    { number: 5000, suffix: '+', label: 'Products in Stock' },
    { number: 6, suffix: '', label: 'Major Brand Partners' },
    { number: 25, suffix: '+', label: 'Years Experience' },
    { number: 100, suffix: '%', label: 'Certified Products' }
  ]

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Your VAR for TMEIC & 
              <motion.span 
                className="text-primary-500 block"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Electrical & Automation Equipment
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Westshore Controls Ltd. is an American and Canadian VAR (Value-Added Reseller) for TMEIC products and authorized 
              distributor of Electrical and Automation equipment & systems. We work directly with TMEIC, Erico, Elsteel, 
              Katko, LS and Noark product lines to deliver throughout the United States, Canada and Globally.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Our company strives to reduce both manufacturing and maintenance costs in the Electrical and 
              Automation sectors while offering maximum value. We source from internationally recognized 
              companies with UL, CSA, and ETL approved certifications to provide competitive prices and 
              maximum customer satisfaction.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              To achieve our company goals of excellence, our knowledgeable sales agents and technicians 
              work together to offer accessible, economical, and high quality electrical and automation 
              equipment. Our excellent technical support and customer service is always available to guide you.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.button 
                className="btn-primary relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative">Contact Our Team</span>
              </motion.button>
              <motion.button 
                className="btn-secondary relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-50 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative">View Our Products</span>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background elements */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200/50 to-transparent rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />
              
              <div className="grid grid-cols-2 gap-6 relative z-10">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center group cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-3xl font-bold text-primary-500 mb-2">
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-gray-600 font-medium group-hover:text-primary-600 transition-colors">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Enhanced decorative elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500 rounded-full opacity-10"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 90, 0] 
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-orange rounded-full opacity-10"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -90, 0] 
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </div>

        {/* Meet Our Expert Team Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-2 text-sm text-primary-700 mb-6"
              whileHover={{ scale: 1.05 }}
            >
                              <UserGroupIcon className="w-4 h-4" />
              Expert Team
            </motion.div>
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Meet Our <span className="text-transparent bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text">Expert Team</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our dedicated professionals bring decades of experience in electrical and automation solutions. 
              From technical support to sales expertise, we're here to guide you every step of the way.
            </p>
          </motion.div>

          {/* Team Leaders Section */}
          <div className="mb-12">
            <motion.h4 
              className="text-2xl font-bold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              Leadership Team
            </motion.h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Robert Oldham */}
              <motion.div
                className="group bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ delay: 2.0, duration: 0.7 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Background decoration */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-red-100 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500"
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-white font-bold text-2xl">RO</span>
                  </motion.div>
                  
                  <h5 className="text-xl font-bold text-gray-900 mb-2">Robert Oldham</h5>
                  <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    President
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Leading Westshore Controls with extensive expertise in Industrial Control Equipment 
                    Distribution and Sales. Committed to delivering exceptional customer service.
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                    <motion.a
                      href="tel:(604) 817-0987"
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PhoneIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Call</span>
                    </motion.a>
                    <motion.a
                      href="mailto:info@westshorecontrols.com"
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <EnvelopeIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Email</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* John Oldham */}
              <motion.div
                className="group bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ delay: 2.2, duration: 0.7 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Background decoration */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500"
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-white font-bold text-2xl">JO</span>
                  </motion.div>
                  
                  <h5 className="text-xl font-bold text-gray-900 mb-2">John Oldham</h5>
                  <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    VFD Specialist
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Expert in Variable Frequency Drives with specialized knowledge in Mining and 
                    Forestry Industries automation systems and solutions.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">VFDs</span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">Mining</span>
                    <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">Forestry</span>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <motion.a
                      href="tel:(604) 817-0987"
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PhoneIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Call</span>
                    </motion.a>
                    <motion.a
                      href="mailto:info@westshorecontrols.com"
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <EnvelopeIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Email</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Jose Torrecampo */}
              <motion.div
                className="group bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ delay: 2.4, duration: 0.7 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Background decoration */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 bg-green-100 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-500"
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-white font-bold text-xl">JT</span>
                  </motion.div>
                  
                  <h5 className="text-xl font-bold text-gray-900 mb-2">Jose Torrecampo</h5>
                  <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    Technical Service
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Technical service specialist providing technical consulting and engineering solutions 
                    for complex automation projects and system integrations.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">Engineering</span>
                    <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">Consulting</span>
                    <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">Automation</span>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <motion.a
                      href="tel:(604) 817-0987"
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PhoneIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Call</span>
                    </motion.a>
                    <motion.a
                      href="mailto:info@westshorecontrols.com"
                      className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <EnvelopeIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Email</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Support Departments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 2.6, duration: 0.8 }}
          >
            <h4 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Support Teams</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, deptIndex) => {
                const IconComponent = dept.icon
                return (
                  <motion.div
                    key={deptIndex}
                    className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 2.8 + deptIndex * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    {/* Background decoration */}
                    <motion.div
                      className="absolute -top-10 -right-10 w-20 h-20 bg-primary-100 rounded-full opacity-30 group-hover:scale-150 transition-transform duration-500"
                    />
                    
                    <div className="relative z-10">
                      <motion.div 
                        className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 10 }}
                      >
                        <IconComponent className="h-6 w-6 text-primary-600" />
                      </motion.div>
                      
                      <h5 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                        {dept.name}
                      </h5>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {dept.description}
                      </p>
                      
                      {dept.members[0]?.specialties && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {dept.members[0].specialties.slice(0, 3).map((specialty, specIndex) => (
                            <span 
                              key={specIndex}
                              className="inline-block bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-gray-200">
                        <ContactCard variant="compact" showEmail={false} showHours={false} className="!p-3" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 2.4, duration: 0.8 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Westshore Controls?
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We go beyond just supplying products. We're your partner in electrical solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer relative overflow-hidden touch-manipulation"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 2.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(249, 250, 251, 0.8)'
                  }}
                >
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary-500" />
                  </motion.div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 3.0, duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Enhanced animated background effects */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-400/50 to-primary-700/50"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(239, 68, 68, 0.5), rgba(220, 38, 38, 0.5))',
                'linear-gradient(90deg, rgba(239, 68, 68, 0.5), rgba(220, 38, 38, 0.5))',
                'linear-gradient(135deg, rgba(239, 68, 68, 0.5), rgba(220, 38, 38, 0.5))',
                'linear-gradient(45deg, rgba(239, 68, 68, 0.5), rgba(220, 38, 38, 0.5))',
              ]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
          />
          
          {/* Geometric texture overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, white 1px, transparent 1px),
                linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)
              `,
              backgroundSize: '40px 40px, 20px 20px, 60px 60px'
            }}></div>
          </div>
          
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2
            }}
          />
          
          {/* Floating decorative elements */}
          <motion.div 
            className="absolute top-4 left-8 w-3 h-3 bg-white/20 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0
            }}
          />
          <motion.div 
            className="absolute top-8 right-12 w-2 h-2 bg-white/30 rounded-full"
            animate={{
              y: [0, 12, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: 1
            }}
          />
          <motion.div 
            className="absolute bottom-6 left-16 w-4 h-1 bg-white/15 rounded-full"
            animate={{
              x: [0, 20, 0],
              opacity: [0.15, 0.5, 0.15]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 2
            }}
          />
          
          <div className="relative z-10">
            <motion.h3 
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 3.2, duration: 0.6 }}
            >
              Ready to Get Started?
            </motion.h3>
            <motion.p 
              className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 3.4, duration: 0.6 }}
            >
              Contact our team of experts to discuss your electrical component needs. 
              We'll help you find the perfect solution for your project with industry-proven products.
            </motion.p>
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 3.6, duration: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md w-full">
                <ContactCard variant="inline" showEmail={true} className="w-full" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 