import type { Metadata } from 'next'
import CatalogsPageComponent from '@/components/page/CatalogsPage'

export const metadata: Metadata = {
  title: 'Product Catalogs & Downloads | Westshore Controls - Industrial Equipment',
  description: 'Download comprehensive product catalogs from leading manufacturers including Mitsubishi Electric, ERICO, LS Industrial, Noark, Klemsan, Katko, TMEIC, and Elsteel. Technical specifications, product guides, and installation manuals.',
  keywords: [
    'product catalogs',
    'industrial equipment catalogs',
    'technical documentation',
    'product manuals',
    'Mitsubishi Electric catalog',
    'ERICO catalog',
    'Noark catalog',
    'electrical equipment downloads',
    'industrial automation catalogs',
    'technical specifications',
    'installation guides'
  ],
  openGraph: {
    title: 'Product Catalogs & Downloads | Westshore Controls',
    description: 'Access comprehensive product catalogs and technical documentation from leading industrial equipment manufacturers.',
    type: 'website',
    url: 'https://westshorecontrols.com/catalogs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Catalogs & Downloads | Westshore Controls',
    description: 'Access comprehensive product catalogs and technical documentation from leading industrial equipment manufacturers.',
  }
}

export default function CatalogsPage() {
  return <CatalogsPageComponent />
} 