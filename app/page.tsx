import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Hero from '@/components/layout/Hero'
import { BrandSelectionSkeleton, PageHeaderSkeleton } from '@/components/ui/LoadingSkeletons'

// Lazy load non-critical components for better initial page load
const PartnershipsHero = dynamic(() => import('@/components/page/PartnershipsHero'), {
  loading: () => <PageHeaderSkeleton />,
  ssr: true
})



const BrandSelection = dynamic(() => import('@/components/brand/BrandSelection'), {
  loading: () => <BrandSelectionSkeleton />,
  ssr: true
})

const About = dynamic(() => import('@/components/page/About'), {
  loading: () => <PageHeaderSkeleton />,
  ssr: true
})

const Partnership = dynamic(() => import('@/components/page/Partnership'), {
  loading: () => <PageHeaderSkeleton />,
  ssr: true
})

// Enhanced metadata for the home page
export const metadata: Metadata = {
  title: 'Westshore Controls - Complete Factory & Automation Product Lines',
  description: 'Complete product lines from leading brands: TMEIC (VAR), Mitsubishi, LS Industrial, Noark, ERICO, Katko, Klemsan, and Elsteel. All factory and automation products available. Delivering throughout the United States, Canada and Globally.',
  keywords: [
    'complete electrical equipment lines',
    'full industrial automation catalogs',
    'TMEIC VAR distributor',
    'complete Mitsubishi product line',
    'full Noark electrical catalog',
    'complete LS Industrial equipment',
    'full Katko motor controller line',
    'complete ERICO product range',
    'full Klemsan terminal solutions',
    'complete Elsteel equipment',
    'electrical control systems',
    'industrial motor controls',
    'complete circuit breaker lines',
    'full contactor catalog',
    'automation solutions',
    'electrical infrastructure',
    'power distribution',
    'complete motor protection devices'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Westshore Controls - Complete Factory & Automation Product Lines',
    description: 'Complete product catalogs from TMEIC, Mitsubishi, LS Industrial, Noark, ERICO, Katko, Klemsan, and Elsteel. Your source for all factory and automation products.',
    type: 'website',
    url: 'https://westshorecontrols.com/',
    siteName: 'Westshore Controls',
  },
  other: {
    'google-site-verification': 'your-google-verification-code-here'
  }
}

export default function Home() {
  // Structured data for the home page
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Westshore Controls",
    "url": "https://westshorecontrols.com",
    "description": "Complete product lines from leading factory and automation brands. VAR (Value-Added Reseller) for TMEIC products and authorized distributor carrying all products from Mitsubishi, LS Industrial, Noark, ERICO, Katko, Klemsan, and Elsteel.",
    "publisher": {
      "@type": "Organization",
      "name": "Westshore Controls Ltd.",
      "url": "https://westshorecontrols.com"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://westshorecontrols.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/westshore-controls"
    ]
  }

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://westshorecontrols.com"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      
      {/* Critical above-the-fold content */}
      <Hero />
      
      {/* Lazy-loaded sections with loading states */}
      <Suspense fallback={<PageHeaderSkeleton />}>
        <PartnershipsHero />
      </Suspense>
      
      <section id="brands">
        <Suspense fallback={<BrandSelectionSkeleton />}>
          <BrandSelection />
        </Suspense>
      </section>
      
      <Suspense fallback={<PageHeaderSkeleton />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<PageHeaderSkeleton />}>
        <Partnership />
      </Suspense>
    </>
  )
} 