import type { Metadata } from 'next'
import DownloadDemo from '@/components/ui/DownloadDemo'

export const metadata: Metadata = {
  title: 'PDF Download Methods Demo | Westshore Controls',
  description: 'Interactive demonstration of different PDF download implementation methods for catalogs and technical documents.',
  robots: 'noindex, nofollow', // This is a demo page
}

export default function DownloadDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <DownloadDemo />
    </div>
  )
} 