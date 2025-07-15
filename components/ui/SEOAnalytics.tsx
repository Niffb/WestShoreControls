'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface SEOAnalyticsProps {
  gtmId?: string
  gtagId?: string
}

export default function SEOAnalytics({ gtmId, gtagId }: SEOAnalyticsProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Core Web Vitals reporting
    const reportWebVitals = async () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const { onCLS, onFCP, onLCP, onTTFB } = await import('web-vitals')

        const sendToAnalytics = (metric: any) => {
          // Send to Google Analytics if available
          if (typeof window !== 'undefined' && (window as any).gtag) {
            ;(window as any).gtag('event', metric.name, {
              value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
              event_category: 'Web Vitals',
              event_label: metric.id,
              non_interaction: true,
            })
          }

          // Send to console in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`[SEO Analytics] ${metric.name}:`, metric.value)
          }
        }

        // Measure all Core Web Vitals
        onCLS(sendToAnalytics)
        onFCP(sendToAnalytics)
        onLCP(sendToAnalytics)
        onTTFB(sendToAnalytics)
      }
    }

    reportWebVitals()
  }, [])

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined') {
      // Google Analytics page view
      if ((window as any).gtag) {
        ;(window as any).gtag('config', gtagId, {
          page_path: pathname,
        })
      }

      // SEO performance tracking
      const trackSEOMetrics = () => {
        const seoMetrics = {
          url: pathname,
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
          openGraph: {
            title: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
            description: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
            image: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
          },
          structuredData: document.querySelectorAll('script[type="application/ld+json"]').length,
          headings: {
            h1: document.querySelectorAll('h1').length,
            h2: document.querySelectorAll('h2').length,
            h3: document.querySelectorAll('h3').length,
          },
          images: {
            total: document.querySelectorAll('img').length,
            withAlt: document.querySelectorAll('img[alt]').length,
            withoutAlt: document.querySelectorAll('img:not([alt])').length,
          },
          links: {
            internal: document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]').length,
            external: document.querySelectorAll('a[href^="http"]:not([href^="' + window.location.origin + '"])').length,
          }
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('[SEO Metrics]', seoMetrics)
          
          // SEO Warnings
          const warnings = []
          if (!seoMetrics.description) warnings.push('Missing meta description')
          if (!seoMetrics.canonical) warnings.push('Missing canonical URL')
          if (seoMetrics.headings.h1 !== 1) warnings.push(`Found ${seoMetrics.headings.h1} H1 tags (should be 1)`)
          if (seoMetrics.images.withoutAlt > 0) warnings.push(`${seoMetrics.images.withoutAlt} images missing alt text`)
          if (seoMetrics.structuredData === 0) warnings.push('No structured data found')
          if (!seoMetrics.openGraph.title) warnings.push('Missing Open Graph title')
          if (!seoMetrics.openGraph.description) warnings.push('Missing Open Graph description')
          
          if (warnings.length > 0) {
            console.warn('[SEO Warnings]', warnings)
          } else {
            console.log('[SEO] ✅ All basic SEO checks passed')
          }
        }
      }

      // Run SEO tracking after page load
      setTimeout(trackSEOMetrics, 1000)
    }
  }, [pathname, gtagId])

  return null
} 