import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import ProductGridWrapper from '@/components/product/ProductGridWrapper'

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
  
  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center space-x-2 text-sm mb-4">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {category.name}
          </h1>
          <p className="mt-2 text-gray-600 max-w-3xl">
            {category.longDescription}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGridWrapper 
            categorySlug={params.category} 
            categoryName={category.name}
          />
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
