import { Metadata } from 'next'
import Link from 'next/link'
import ProductCategoriesGrid from '@/components/product/ProductCategoriesGrid'
import ContactCard from '@/components/ui/ContactCard'

export const metadata: Metadata = {
  title: 'Industrial Electrical Products | West Shore Controls',
  description: 'Browse our comprehensive selection of industrial electrical products including VFDs, servo motors, circuit breakers, contactors, PLCs, and more from leading manufacturers.',
  keywords: 'industrial electrical products, VFDs, servo motors, circuit breakers, contactors, PLCs, motor starters, power distribution, control panels',
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Heading */}
      <section className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Industrial <span className="text-primary-600">Electrical Products</span>
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            VFDs, servo motors, circuit breakers, contactors, PLCs and more from leading manufacturers.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our extensive catalog organized by product category.
              Each category features products from trusted industry leaders.
            </p>
          </div>
          <ProductCategoriesGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Finding the Right Product?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Our technical experts are here to help you select the perfect components
            for your industrial applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition-colors"
            >
              Contact Our Experts
            </Link>
            <Link
              href="/catalogs"
              className="px-8 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-gray-900 transition-colors"
            >
              Download Catalogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
