import { Metadata } from 'next'

export const SITE_CONFIG = {
  name: 'Westshore Controls',
  url: 'https://westshorecontrols.com',
  description: 'VAR (Value-Added Reseller) for TMEIC products and authorized distributor of Erico, Elsteel, Katko, and LS product lines. Delivering throughout the United States, Canada and Globally.',
  company: 'Westshore Controls Ltd.',
  foundingYear: '1999',
  logo: '/images/brands/westlogo.webp',
  ogImage: '/images/brands/hero-background.webp',
  twitterHandle: '@westshorecontrols',
  linkedinUrl: 'https://www.linkedin.com/company/westshore-controls'
}

export const DEFAULT_KEYWORDS = [
  'electrical equipment distributor',
  'industrial automation equipment',
  'TMEIC VAR distributor',
  'electrical controls',
  'motor controls',
  'circuit breakers',
  'contactors',
  'automation solutions',
  'electrical infrastructure',
  'power distribution',
  'industrial controls',
  'electrical distributor',
  'automation distributor'
]

// Generate metadata for pages
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = '/',
  images = [],
  noIndex = false
}: {
  title: string
  description: string
  keywords?: string[]
  path?: string
  images?: Array<{ url: string; width?: number; height?: number; alt?: string }>
  noIndex?: boolean
}): Metadata {
  const url = `${SITE_CONFIG.url}${path}`
  const allKeywords = [...DEFAULT_KEYWORDS, ...keywords]
  const defaultImages = images.length > 0 ? images : [{ 
    url: SITE_CONFIG.ogImage, 
    width: 1200, 
    height: 630, 
    alt: `${title} - ${SITE_CONFIG.name}` 
  }]

  return {
    title,
    description,
    keywords: allKeywords,
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.company,
    publisher: SITE_CONFIG.company,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: defaultImages
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: defaultImages.map(img => img.url)
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// Generate Organization structured data
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.company,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    "description": SITE_CONFIG.description,
    "foundingDate": SITE_CONFIG.foundingYear,
    "areaServed": ["United States", "Canada", "Global"],
    "sameAs": [SITE_CONFIG.linkedinUrl],
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
}

// Generate WebSite structured data
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "description": SITE_CONFIG.description,
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.company,
      "url": SITE_CONFIG.url
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_CONFIG.url}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "sameAs": [SITE_CONFIG.linkedinUrl]
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_CONFIG.url
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": `${SITE_CONFIG.url}${item.href}`
      }))
    ]
  }
}

// Generate product structured data
export function generateProductStructuredData(product: {
  name: string
  description: string
  brand: string
  category: string
  image?: string
  sku?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "category": product.category,
    ...(product.image && { 
      "image": `${SITE_CONFIG.url}${product.image}` 
    }),
    ...(product.sku && { "sku": product.sku }),
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "USD",
      "seller": {
        "@type": "Organization",
        "name": SITE_CONFIG.company
      }
    }
  }
}

// Brand-specific SEO data
export const BRAND_SEO_DATA = {
  'mitsubishi': {
    title: 'Mitsubishi Electric Products & Solutions',
    description: 'Explore Mitsubishi Electric industrial automation solutions including PLCs, HMIs, variable frequency drives, and motion control systems. Authorized distributor with expert support.',
    keywords: ['Mitsubishi Electric', 'PLC', 'HMI', 'variable frequency drives', 'motion control', 'industrial automation', 'servo motors']
  },

  'ls-industrial': {
    title: 'LS Industrial Automation Equipment',
    description: 'Browse LS Industrial automation equipment including contactors, circuit breakers, motor starters, and variable frequency drives. Comprehensive industrial control solutions.',
    keywords: ['LS Industrial', 'LSIS', 'contactors', 'circuit breakers', 'motor starters', 'VFD', 'industrial controls']
  },
  'tmeic': {
    title: 'TMEIC High-Power Electrical Systems',
    description: 'TMEIC high-power electrical systems - medium voltage drives, PV inverters, generators, motors, and advanced control systems. Westshore Controls is an authorized VAR.',
    keywords: ['TMEIC', 'medium voltage drives', 'PV inverters', 'generators', 'motors', 'VAR', 'value added reseller']
  },
  'erico': {
    title: 'ERICO Electrical Infrastructure Solutions',
    description: 'ERICO electrical and industrial metal joining solutions - grounding systems, flexible conductors, distribution blocks, and busbars. Premium electrical infrastructure.',
    keywords: ['ERICO', 'grounding systems', 'bonding', 'flexible conductors', 'busbars', 'electrical infrastructure', 'cable management']
  },
  'katko': {
    title: 'Katko Industrial Control Solutions',
    description: 'Katko UL Listed manual motor controllers and industrial control solutions. Safety switches, motor protection, and reliable industrial controls.',
    keywords: ['Katko', 'manual motor controllers', 'UL listed', 'safety switches', 'motor protection', 'industrial controls']
  },
  'klemsan': {
    title: 'Klemsan Terminal Blocks & Connection Solutions',
    description: 'Klemsan terminal blocks, industrial connectors, and electrical connection solutions. Turkish manufacturer of high-quality automation components.',
    keywords: ['Klemsan', 'terminal blocks', 'industrial connectors', 'cable ties', 'marking solutions', 'automation components']
  },
  'elsteel': {
    title: 'Elsteel Electrical Steel & Metal Solutions',
    description: 'Elsteel electrical steel and industrial metal solutions for electrical infrastructure. Custom fabrication and metal processing services.',
    keywords: ['Elsteel', 'electrical steel', 'industrial metals', 'custom fabrication', 'electrical infrastructure', 'metal processing']
  }
} 