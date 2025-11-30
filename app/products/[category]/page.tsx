import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRightIcon, HomeIcon, CogIcon } from '@heroicons/react/24/outline'
import ProductGridWrapper from '@/components/product/ProductGridWrapper'

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

// Category configuration
const categoryConfig = {
  'drives-vfds': {
    name: 'Drives / VFDs',
    description: 'Variable frequency drives for precise motor speed control and energy efficiency',
    longDescription: 'Our comprehensive selection of Variable Frequency Drives (VFDs) from leading manufacturers provides precise motor speed control, energy savings, and enhanced system performance. Perfect for pumps, fans, conveyors, and other motor-driven applications.',
  },
  'servo-motors': {
    name: 'Servo Motors',
    description: 'High-precision servo motors for accurate positioning and motion control',
    longDescription: 'Precision servo motors designed for applications requiring accurate positioning, high torque, and reliable performance. Ideal for robotics, CNC machines, packaging equipment, and automated manufacturing systems.',
  },
  'circuit-breakers-protection': {
    name: 'Circuit Breakers / Protection',
    description: 'Circuit protection devices including MCBs, MCCBs, and motor protection',
    longDescription: 'Complete range of circuit protection devices including miniature circuit breakers, molded case circuit breakers, motor circuit protectors, and specialized protection equipment for industrial applications.',
  },
  'contactors': {
    name: 'Contactors',
    description: 'Electromagnetic switches for motor control and power switching applications',
    longDescription: 'Industrial contactors for motor control, lighting, and power switching applications. Available in various current ratings and coil voltages to meet your specific application requirements.',
  },
  'overload-relays': {
    name: 'Overload Relays',
    description: 'Motor protection relays to prevent damage from overcurrent conditions',
    longDescription: 'Thermal and electronic overload relays designed to protect motors from damage due to overcurrent conditions, phase loss, and other electrical faults.',
  },
  'plcs': {
    name: 'PLCs',
    description: 'Programmable logic controllers for industrial automation and control',
    longDescription: 'Programmable Logic Controllers (PLCs) for industrial automation, process control, and system integration. From compact units to high-performance systems for complex applications.',
  },
  'manual-motor-starters': {
    name: 'Manual Motor Starters',
    description: 'Manual motor starting switches with integrated overload protection',
    longDescription: 'Manual motor starters combining disconnect switches with overload protection in a single compact unit. Ideal for simple motor control applications.',
  },
  'power-distribution': {
    name: 'Power Distribution',
    description: 'Power distribution equipment including panels, busbars, and switchgear',
    longDescription: 'Power distribution solutions including distribution panels, busbars, switchgear, and related accessories for safe and efficient electrical power distribution.',
  },
  'custom-control-panels': {
    name: 'Custom Control Panels',
    description: 'Custom-engineered control panels designed for your specific applications',
    longDescription: 'Custom-designed and manufactured control panels engineered to meet your specific application requirements. From simple motor control to complex automation systems.',
  },
  'led-indicators': {
    name: 'LED Indicators',
    description: 'LED pilot lights and indicators for status indication and signaling',
    longDescription: 'LED indicators, pilot lights, and signaling devices for status indication, alarm signaling, and operator interface applications in industrial environments.',
  },
  'push-buttons': {
    name: 'Push Buttons',
    description: 'Industrial push buttons, switches, and operator interface devices',
    longDescription: 'Industrial push buttons, selector switches, emergency stops, and operator interface devices designed for reliable operation in demanding industrial environments.',
  },
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categoryConfig[params.category as keyof typeof categoryConfig]
  
  if (!category) {
    return {
      title: 'Category Not Found | West Shore Controls'
    }
  }

  return {
    title: `${category.name} | West Shore Controls`,
    description: category.description,
    keywords: `${category.name.toLowerCase()}, industrial electrical, ${params.category}`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categoryConfig[params.category as keyof typeof categoryConfig]
  
  // Initialize scroll animations
  useIntersectionObserver()
  
  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center">
              <HomeIcon className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <Link href="/products" className="text-gray-500 hover:text-gray-700">
              Products
            </Link>
            <ChevronRightIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-red-50 via-white to-red-900/5 overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-red-800/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-800/30 to-red-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-red-100/20 to-red-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 text-sm text-red-700 mb-6 hero-element animate-fade-in-up hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CogIcon className="w-4 h-4 animate-bounce-soft" />
              {category.name}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight hero-element animate-fade-in-up">
              <span className="inline-block hero-element animate-fade-in-up" style={{animationDelay: '0.1s'}}>{category.name.split(' ')[0]}</span>{' '}
              {category.name.split(' ').length > 1 && (
                <span className="text-transparent bg-gradient-to-r from-red-500 to-red-900 bg-clip-text inline-block hero-element animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                  {category.name.split(' ').slice(1).join(' ')}
                </span>
              )}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-900 mx-auto mb-8 rounded-full hero-element animate-fade-in-up" style={{animationDelay: '0.7s'}}></div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed hero-element animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            {category.longDescription}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll">
            <ProductGridWrapper 
              categorySlug={params.category} 
              categoryName={category.name}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

// Generate static params for all categories
export async function generateStaticParams() {
  return Object.keys(categoryConfig).map((category) => ({
    category,
  }))
}
