import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BrandCategoriesPageNew from '@/components/brand/BrandCategoriesPageNew'

// Performance optimization - enable static generation
export const revalidate = 3600 // 1 hour
export const dynamic = 'force-static'

// Define the valid brands
const validBrands = [
  'mitsubishi',
  'noark',
  'ls-industrial',
  'tmeic',
  'erico',
  'katko',
  'klemsan',
  'elsteel',
  'westshore-controls'
]

// Map URL slugs to display names
const brandDisplayNames: { [key: string]: string } = {
  'mitsubishi': 'Mitsubishi',
  'noark': 'Noark',
  'ls-industrial': 'LS Industrial', 
  'tmeic': 'TMEIC',
  'erico': 'ERICO',
  'katko': 'Katko',
  'klemsan': 'Klemsan',
  'elsteel': 'Elsteel',
  'westshore-controls': 'Westshore Controls'
}

// Brand descriptions for SEO
const brandDescriptions: { [key: string]: string } = {
  'mitsubishi': 'Complete Mitsubishi Electric industrial automation product line including PLCs, HMIs, variable frequency drives, and motion control systems. Full factory automation catalog available from authorized distributor.',
  'noark': 'Complete Noark electrical product line - contactors, circuit breakers, motor protection devices, and switchboards. Full range of industrial electrical solutions available.',
  'ls-industrial': 'Complete LS Industrial automation equipment catalog including contactors, circuit breakers, motor starters, and variable frequency drives. Full line of industrial control solutions.',
  'tmeic': 'Complete TMEIC high-power electrical systems catalog - medium voltage drives, PV inverters, generators, motors, and advanced control systems. Westshore Controls is an authorized VAR with access to all products.',
  'erico': 'Complete ERICO electrical and industrial metal joining solutions catalog - grounding systems, flexible conductors, distribution blocks, and busbars. Full electrical infrastructure product line.',
  'katko': 'Complete Katko UL Listed manual motor controllers and industrial control solutions catalog. Full range of safety switches, motor protection, and reliable industrial controls.',
  'klemsan': 'Complete Klemsan terminal blocks, industrial connectors, and electrical connection solutions catalog. Full product line from Turkish manufacturer of high-quality automation components.',
  'elsteel': 'Complete Elsteel electrical steel and industrial metal solutions catalog for electrical infrastructure. Full range including custom fabrication and metal processing services.',
  'westshore-controls': 'Westshore Controls complete product catalog - all electrical and automation equipment from leading manufacturers. Your trusted source for complete factory and automation product lines.'
}

// Brand keywords for SEO
const brandKeywords: { [key: string]: string[] } = {
  'mitsubishi': ['Mitsubishi Electric', 'complete product line', 'full catalog', 'PLC', 'HMI', 'variable frequency drives', 'motion control', 'industrial automation', 'servo motors', 'factory automation'],
  'noark': ['Noark', 'complete catalog', 'full product line', 'contactors', 'circuit breakers', 'motor protection', 'thermal overload relays', 'switchboards', 'IEC contactors'],
  'ls-industrial': ['LS Industrial', 'LSIS', 'complete range', 'full catalog', 'contactors', 'circuit breakers', 'motor starters', 'VFD', 'industrial controls'],
  'tmeic': ['TMEIC', 'complete product line', 'full range', 'medium voltage drives', 'PV inverters', 'generators', 'motors', 'VAR', 'value added reseller'],
  'erico': ['ERICO', 'complete catalog', 'full product line', 'grounding systems', 'bonding', 'flexible conductors', 'busbars', 'electrical infrastructure', 'cable management'],
  'katko': ['Katko', 'complete range', 'full catalog', 'manual motor controllers', 'UL listed', 'safety switches', 'motor protection', 'industrial controls'],
  'klemsan': ['Klemsan', 'complete product line', 'full catalog', 'terminal blocks', 'industrial connectors', 'cable ties', 'marking solutions', 'automation components'],
  'elsteel': ['Elsteel', 'complete range', 'full product line', 'electrical steel', 'industrial metals', 'custom fabrication', 'electrical infrastructure', 'metal processing'],
  'westshore-controls': ['Westshore Controls', 'complete catalogs', 'all products', 'electrical equipment', 'automation equipment', 'industrial distributor', 'VAR', 'electrical solutions', 'factory automation']
}

interface Props {
  params: {
    brand: string
  }
}

// Generate metadata for each brand page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brandSlug = params.brand.toLowerCase()
  
  if (!validBrands.includes(brandSlug)) {
    return {
      title: 'Brand Not Found - Westshore Controls',
      description: 'The requested brand page was not found. Browse our available brands and products.'
    }
  }

  const brandName = brandDisplayNames[brandSlug]
  const description = brandDescriptions[brandSlug]
  const keywords = brandKeywords[brandSlug]

  return {
    title: `${brandName} Products & Solutions | Westshore Controls`,
    description,
    keywords,
    openGraph: {
      title: `${brandName} Industrial Equipment | Westshore Controls`,
      description,
      type: 'website',
      url: `https://westshorecontrols.com/${brandSlug}/`,
      siteName: 'Westshore Controls',
      images: [
        {
          url: `/images/${brandSlug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${brandName} Industrial Equipment - Westshore Controls`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${brandName} Products | Westshore Controls`,
      description,
      images: [`/images/${brandSlug}-og.jpg`]
    },
    alternates: {
      canonical: `/${brandSlug}/`,
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}

export default function BrandPage({ params }: Props) {
  const brandSlug = params.brand.toLowerCase()
  
  // Check if the brand is valid
  if (!validBrands.includes(brandSlug)) {
    notFound()
  }

  const brandName = brandDisplayNames[brandSlug]

  // Enhanced loading skeleton
  const BrandPageSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5">
      {/* Hero Section Skeleton */}
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-64"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse mb-4 w-96"></div>
        </div>
      </div>
      
      {/* Categories Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6">
              <div className="h-12 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <Suspense fallback={<BrandPageSkeleton />}>
      <BrandCategoriesPageNew selectedBrand={brandName} />
    </Suspense>
  )
}

// Generate static params for all valid brands to enable static generation
export async function generateStaticParams() {
  return validBrands.map((brand) => ({
    brand: brand,
  }))
} 