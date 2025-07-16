import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PerformanceMonitorComponent from '@/components/ui/PerformanceMonitor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Westshore Controls - Industrial Automation & Electrical Products',
  description: 'Leading supplier of industrial automation and electrical products. Featuring Mitsubishi Electric, Noark, LS Industrial, and more. Quality components for industrial applications.',
  keywords: 'industrial automation, electrical products, Mitsubishi Electric, Noark, LS Industrial, variable frequency drives, circuit breakers, contactors, PLCs',
  authors: [{ name: 'Westshore Controls' }],
  openGraph: {
    title: 'Westshore Controls - Industrial Automation & Electrical Products',
    description: 'Leading supplier of industrial automation and electrical products.',
    url: 'https://westshorecontrols.com',
    siteName: 'Westshore Controls',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Westshore Controls - Industrial Automation & Electrical Products',
    description: 'Leading supplier of industrial automation and electrical products.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://westshorecontrols.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <PerformanceMonitorComponent />
      </body>
    </html>
  )
} 