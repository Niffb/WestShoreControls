import { Metadata } from 'next'
import ProductCategoriesGrid from '@/components/product/ProductCategoriesGrid'

// Enhanced Intersection Observer hook for smooth scroll animations
function useIntersectionObserver() {
  if (typeof window !== 'undefined') {
    const observeElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the visible class which triggers the animation
            entry.target.classList.add('animate-visible')
            // Remove the observer after animation triggers
            observer.unobserve(entry.target)
          }
        })
      }, { 
        threshold: 0.1, 
        rootMargin: '50px 0px -50px 0px' 
      })
      
      elements.forEach(el => {
        // Set initial state
        el.classList.add('animate-hidden')
        observer.observe(el)
      })
      
      return () => observer.disconnect()
    }
    
    // Run on mount with proper timing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeElements)
    } else {
      requestAnimationFrame(observeElements)
    }
  }
}

export const metadata: Metadata = {
  title: 'Industrial Electrical Products | West Shore Controls',
  description: 'Browse our comprehensive selection of industrial electrical products including VFDs, servo motors, circuit breakers, contactors, PLCs, and more from leading manufacturers.',
  keywords: 'industrial electrical products, VFDs, servo motors, circuit breakers, contactors, PLCs, motor starters, power distribution, control panels',
}

export default function ProductsPage() {
  // Initialize scroll animations
  useIntersectionObserver()

  return (
    <div className="min-h-screen bg-white">
      {/* Page Heading - Minimal */}
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
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Product Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our extensive catalog organized by product category. 
              Each category features products from trusted industry leaders.
            </p>
          </div>

          <div className="animate-on-scroll">
            <ProductCategoriesGrid />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        {/* Animated texture backgrounds */}
        <div className="absolute inset-0">
          {/* Moving gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/80 via-primary-600/90 to-primary-700/80"></div>
          
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 2px, transparent 2px),
              radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)
            `,
            backgroundSize: '50px 50px, 25px 25px, 80px 80px'
          }}></div>
          
          {/* Animated diagonal stripes */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
          }}></div>
        </div>
        
        {/* Floating animated elements */}
        <div className="absolute top-10 left-20 w-4 h-4 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-32 right-16 w-3 h-3 bg-white/25 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-20 left-32 w-2 h-6 bg-white/15 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 right-24 w-5 h-2 bg-white/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Finding the Right Product?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Our technical experts are here to help you select the perfect components 
            for your industrial applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="group px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-50/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">Contact Our Experts</span>
            </a>
            <a
              href="/catalogs"
              className="group px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border-2 border-white/50 rounded-lg scale-110 opacity-0 group-hover:opacity-50 group-hover:scale-100 transition-all duration-300"></div>
              <span className="relative z-10">Download Catalogs</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}