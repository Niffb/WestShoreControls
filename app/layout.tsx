import './globals.css'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { PageSkeleton } from '@/components/ui/LoadingSkeletons'

// Dynamically import non-critical components
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'), {
  ssr: false,
  loading: () => null
})

const MobileScrollToTop = dynamic(() => import('@/components/ui/MobileScrollToTop'), {
  ssr: false,
  loading: () => null
})

const SEOAnalytics = dynamic(() => import('@/components/ui/SEOAnalytics'), {
  ssr: false,
  loading: () => null
})

// Optimized font loading with preload and display: swap
const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata = {
  title: 'Westshore Controls - High Quality Electrical & Automation Equipment',
  description: 'VAR (Value-Added Reseller) for TMEIC products and authorized distributor of Erico, Elsteel, Katko, LS and Noark product lines. Delivering throughout the United States, Canada and Globally.',
  keywords: [
    'electrical equipment',
    'automation equipment',
    'industrial controls',
    'TMEIC VAR',
    'value-added reseller',
    'Erico distributor',
    'Noark products',
    'LS Industrial',
    'Katko controls',
    'electrical distributor',
    'industrial automation',
    'motor controls',
    'circuit breakers',
    'contactors',
    'electrical solutions'
  ],
  authors: [{ name: 'Westshore Controls' }],
  creator: 'Westshore Controls Ltd.',
  publisher: 'Westshore Controls Ltd.',
  category: 'Industrial Equipment',
  metadataBase: new URL('https://westshorecontrols.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://westshorecontrols.com',
    siteName: 'Westshore Controls',
    title: 'Westshore Controls - High Quality Electrical & Automation Equipment',
    description: 'VAR (Value-Added Reseller) for TMEIC products and authorized distributor of Erico, Elsteel, Katko, LS and Noark product lines. Delivering throughout the United States, Canada and Globally.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Westshore Controls - Electrical & Automation Equipment'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Westshore Controls - High Quality Electrical & Automation Equipment',
    description: 'VAR (Value-Added Reseller) for TMEIC products and authorized distributor of electrical & automation equipment.',
    images: ['/images/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ef4444',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Structured data for the organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Westshore Controls Ltd.",
    "url": "https://westshorecontrols.com",
    "logo": "https://westshorecontrols.com/images/westshore-logo.png",
    "description": "VAR (Value-Added Reseller) for TMEIC products and authorized distributor of Erico, Elsteel, Katko, LS and Noark product lines. Delivering throughout the United States, Canada and Globally.",
    "foundingDate": "1999",
    "areaServed": ["United States", "Canada", "Global"],
    "sameAs": [
      "https://www.linkedin.com/company/westshore-controls"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": ["US", "CA"],
      "availableLanguage": "English"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Electrical & Automation Equipment",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Industrial Automation Equipment",
            "category": "Electrical Equipment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Motor Controls & Protection",
            "category": "Electrical Equipment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Circuit Breakers & Contactors",
            "category": "Electrical Equipment"
          }
        }
      ]
    }
  }

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/images/hero-background.png" as="image" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//raw.githubusercontent.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance hints */}
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Critical analytics - loaded immediately */}
        <SEOAnalytics />
        
        {/* Non-critical UI components - loaded asynchronously */}
        <ScrollProgress />
        
        {/* Main layout */}
        <Header />
        <main className="min-h-screen pt-[7rem]">
          <Suspense fallback={<PageSkeleton />}>
            {children}
          </Suspense>
        </main>
        <Footer />
        
        {/* Non-critical mobile component */}
        <MobileScrollToTop />
      </body>
    </html>
  )
} 