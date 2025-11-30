import { Metadata } from 'next'
import ProductCategoriesGrid from '@/components/product/ProductCategoriesGrid'
import { CogIcon } from '@heroicons/react/24/outline'

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
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-red-50 via-white to-red-900/5 overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-red-800/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-800/30 to-red-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-red-100/20 to-red-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 text-sm text-red-700 mb-6 hero-element animate-fade-in-up hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CogIcon className="w-4 h-4 animate-bounce-soft" />
              Industrial Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight hero-element animate-fade-in-up">
              <span className="inline-block hero-element animate-fade-in-up" style={{animationDelay: '0.1s'}}>Industrial</span>{' '}
              <span className="text-transparent bg-gradient-to-r from-red-500 to-red-900 bg-clip-text inline-block hero-element animate-fade-in-up" style={{animationDelay: '0.3s'}}>Electrical</span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-red-900 to-red-500 bg-clip-text inline-block hero-element animate-fade-in-up" style={{animationDelay: '0.5s'}}>Products</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-900 mx-auto mb-8 rounded-full hero-element animate-fade-in-up" style={{animationDelay: '0.7s'}}></div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed hero-element animate-fade-in-up" style={{animationDelay: '0.9s'}}>
            Discover our comprehensive range of high-quality industrial electrical components 
            from leading manufacturers worldwide. From VFDs and servo motors to circuit breakers and PLCs.
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