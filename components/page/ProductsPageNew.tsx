'use client'

import { useState, useMemo, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  XMarkIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
  ListBulletIcon,
  StarIcon,
  HeartIcon,
  EyeIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { 
  CheckCircleIcon,
  ShieldCheckIcon 
} from '@heroicons/react/24/solid'
import { getImageUrl, getFallbackImageUrl } from '@/lib/config/image-config'
import ProductModal from '@/components/product/ProductModal'

import { cleanProducts, productCategories, productBrands, cleanProductsWithMitsubishi, getProductsByBrandEnhanced } from '@/lib/products/products'
import { mitsubishiProducts } from '@/lib/products/mitsubishi-products'
import { tmeicProducts } from '@/lib/products/tmeic-products'
import { getAllKatkoProducts } from '@/lib/products/katko-products'
import { noarkMCPProducts } from '@/lib/products/noark-mcp-products'
import { noarkMCBProducts } from '@/lib/products/noark-mcb-products'
import { noarkSwitchesProducts } from '@/lib/products/noark-switches-products'
import { noarkSPDProducts } from '@/lib/products/noark-spd-products'
import { noarkFuseHoldersProducts } from '@/lib/products/noark-fuse-holders-products'
import { noarkEnclosedBreakersProducts } from '@/lib/products/noark-enclosed-breakers-products'
import { noarkB1NProducts } from '@/lib/products/noark-b1n-products'
import { klemsanProducts } from '@/lib/products/klemsan-products'
import { ericoProducts } from '@/lib/products/erico-products'
import { lsIndustrialProducts } from '@/lib/products/ls-industrial-products'
import { allPCBProducts } from '@/lib/products/noark-pcb-products'
import DynamicProductGrid from '@/components/product/DynamicProductGrid'
import { 
  useDebouncedSearch, 
  usePerformanceMonitor,
  useCachedData
} from '@/lib/utils/performance-utils'

type ViewMode = 'grid' | 'list'
type SortOption = 'name' | 'newest'

interface Props {
  selectedBrand: string
  selectedCategory: string
}

// Animated background particles
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, color: string}>>([])
  
  useEffect(() => {
    const particleCount = 15
    const newParticles = Array.from({length: particleCount}, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: ['#ef4444', '#f97316', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)]
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default function ProductsPageNew({ selectedBrand, selectedCategory }: Props) {
  // Use debounced search for better performance
  const { searchTerm, debouncedSearchTerm, setSearchTerm } = useDebouncedSearch('', 300)
  const { startMeasure } = usePerformanceMonitor()
  
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [showFilters, setShowFilters] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const filterOriginalTopRef = useRef<number>(0)

  // Handle window resize and detect if desktop
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle scroll effect for sticky filters
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current || !isDesktop) return
      
      if (filterOriginalTopRef.current === 0) {
        const rect = filterRef.current.getBoundingClientRect()
        filterOriginalTopRef.current = rect.top + window.scrollY
      }
      
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > filterOriginalTopRef.current - 96)
    }

    const initPosition = () => {
      if (filterRef.current && filterOriginalTopRef.current === 0 && isDesktop) {
        const rect = filterRef.current.getBoundingClientRect()
        filterOriginalTopRef.current = rect.top + window.scrollY
      }
    }

    setTimeout(initPosition, 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDesktop])

  const filteredProducts = useMemo(() => {
    const endMeasure = startMeasure('product-filtering')
    
    try {
      // Use enhanced product array that includes all products including scraped products
      let productsToFilter = cleanProductsWithMitsubishi
      
      // Special handling for brands that have specific product arrays
      if (selectedBrand === 'Mitsubishi') {
        // For Mitsubishi, combine both the manually curated products and scraped products
        productsToFilter = [...mitsubishiProducts, ...cleanProductsWithMitsubishi.filter(p => p.brand === 'Mitsubishi')]
        console.log('Filtering Mitsubishi products for category:', selectedCategory)
        console.log('Total Mitsubishi products:', productsToFilter.length)
        
        // Debug: check what products have the FR-F800 subcategory
        const f800Products = productsToFilter.filter(p => (p as any).subcategory === 'FR-F800 Series Inverters')
        console.log('Products with FR-F800 Series Inverters subcategory:', f800Products.length)
        
        const a800Products = productsToFilter.filter(p => (p as any).subcategory === 'FR-A800 Plus Series Inverters')
        console.log('Products with FR-A800 Plus Series Inverters subcategory:', a800Products.length)
      } else if (selectedBrand === 'TMEIC') {
        productsToFilter = tmeicProducts
      } else if (selectedBrand === 'Noark') {
        // Handle MCP products for Noark
        if (selectedCategory === 'Motor Circuit Protectors' || selectedCategory === 'Circuit Protection' || selectedCategory.includes('Series')) {
                  productsToFilter = noarkMCPProducts.map((product, index) => ({
          id: typeof product.id === 'number' ? product.id : parseInt(String(product.id).replace(/\D/g, '')) || index + 1000, // Handle both string and number IDs
            name: product.name,
            model: product.model || '',
            brand: 'Noark',
            category: product.category,
            description: product.description,
            
            rating: product.rating || 4.5,
            reviews: product.reviews || 0,
            images: product.images || ['placeholder.jpg'],
            inStock: product.inStock !== false,
            badge: undefined,
            url: product.url || `/noark/circuit-protection/motor-circuit-protectors/${(product as any).series?.toLowerCase() || 'mcp'}`,
            specs: (product as any).specifications ? Object.entries((product as any).specifications).map(([key, value]) => `${key}: ${value}`) : []
          }))
          
          // Filter by specific series if category contains series info
          if (selectedCategory.includes('M1N')) {
            productsToFilter = productsToFilter.filter(p => p.url.includes('m1n'))
          } else if (selectedCategory.includes('M2N')) {
            productsToFilter = productsToFilter.filter(p => p.url.includes('m2n'))
          } else if (selectedCategory.includes('M3N')) {
            productsToFilter = productsToFilter.filter(p => p.url.includes('m3n'))
          } else if (selectedCategory.includes('M4N')) {
            productsToFilter = productsToFilter.filter(p => p.url.includes('m4n'))
          } else if (selectedCategory.includes('M5N')) {
            productsToFilter = productsToFilter.filter(p => p.url.includes('m5n'))
          } else if (selectedCategory.includes('M6N')) {
            productsToFilter = productsToFilter.filter(p => p.url.includes('m6n'))
          }
        } else if (selectedCategory === 'Power Circuit Breakers') {
          productsToFilter = allPCBProducts.map((product, index) => ({
            id: parseInt(product.id.replace(/\D/g, '')) || index + 2000,
            name: product.name,
            model: product.model || '',
            brand: 'Noark',
            category: product.subcategory,
            description: product.description,
            rating: product.rating || 4.5,
            reviews: product.reviews || 0,
            images: product.images || ['placeholder.jpg'],
            inStock: product.inStock !== false,
            badge: undefined,
            url: product.url || `/noark/power-circuit-breakers/${product.model.toLowerCase()}`,
            specs: (product as any).specifications ? Object.entries((product as any).specifications).map(([key, value]) => `${key}: ${value}`) : []
          }))
        } else if (selectedCategory === 'Miniature Circuit Breakers') {
          // Combine both MCB and B1N products
          const mcbProducts = noarkMCBProducts.map((product, index) => ({
            id: typeof product.id === 'number' ? product.id : parseInt(String(product.id).replace(/\D/g, '')) || index + 4000,
            name: product.name,
            model: product.model || '',
            brand: 'Noark',
            category: product.category,
            description: product.description,
            rating: product.rating || 4.5,
            reviews: product.reviews || 0,
            images: product.images || ['placeholder.jpg'],
            inStock: product.inStock !== false,
            badge: undefined,
            url: product.url || `/noark/circuit-protection/miniature-circuit-breakers`,
            specs: product.specs || []
          }));
          
          const b1nProducts = noarkB1NProducts.map((product, index) => ({
            id: typeof product.id === 'number' ? product.id : parseInt(String(product.id).replace(/\D/g, '')) || index + 5000,
            name: product.name,
            model: product.model || '',
            brand: 'Noark',
            category: product.category,
            description: product.description,
            rating: product.rating || 4.5,
            reviews: product.reviews || 0,
            images: product.images || ['placeholder.jpg'],
            inStock: product.inStock !== false,
            badge: undefined,
            url: product.url || `/noark/circuit-protection/miniature-circuit-breakers/b1n`,
            specs: product.specs || []
          }));
          
          productsToFilter = [...mcbProducts, ...b1nProducts];
        } else if (selectedCategory === 'Molded Case Switches') {
          productsToFilter = noarkSwitchesProducts.map((product, index) => ({
            id: typeof product.id === 'number' ? product.id : parseInt(String(product.id).replace(/\D/g, '')) || index + 3000,
            name: product.name,
            model: product.model || '',
            brand: 'Noark',
            category: product.category,
            description: product.description,
            price: product.price,
            originalPrice: product.originalPrice,
            rating: product.rating,
            reviews: product.reviews,
            images: product.images,
            badge: product.badge,
            inStock: product.inStock,
            url: product.url || `/noark/circuit-protection/molded-case-switches`,
            specs: product.specs || []
          }));
        } else if (selectedCategory === 'Surge Protective Device') {
          productsToFilter = noarkSPDProducts.map((product, index) => ({
            id: typeof product.id === 'number' ? product.id : parseInt(String(product.id).replace(/\D/g, '')) || index + 5000,
            name: product.name,
            model: product.model || '',
            brand: 'Noark',
            category: product.category,
            description: product.description,
            rating: product.rating || 4.5,
            reviews: product.reviews || 0,
            images: product.images || ['placeholder.jpg'],
            inStock: product.inStock !== false,
            badge: undefined,
            url: product.url || `/noark/circuit-protection/surge-protective-device`,
            specs: product.specs || []
          }));
        } else if (selectedCategory === 'DIN Rail Fuse Holders and Fuses') {
          productsToFilter = noarkFuseHoldersProducts.map((product, index) => ({
            id: typeof product.id === 'number' ? product.id : parseInt(String(product.id).replace(/\D/g, '')) || index + 6000,
            name: product.name,
            model: product.model || '',
            brand: 'Noark',
            category: product.category,
            description: product.description,
            rating: product.rating || 4.5,
            reviews: product.reviews || 0,
            images: product.images || ['/images/placeholder.jpg'],
            inStock: product.inStock !== false,
            badge: undefined,
            url: product.url || `/noark/circuit-protection/din-rail-fuse-holders-and-fuses`,
            specs: product.specs || []
          }));
        } else if (selectedCategory === 'Enclosed Breakers') {
          productsToFilter = noarkEnclosedBreakersProducts.map((product, index) => ({
            id: typeof product.id === 'number' ? product.id : parseInt(String(product.id).replace(/\D/g, '')) || index + 7000,
            name: product.name,
            model: product.model || '',
            brand: 'Noark',
            category: product.category,
            description: product.description,
            rating: product.rating || 4.5,
            reviews: product.reviews || 0,
            images: product.images || ['/images/placeholder.jpg'],
            inStock: product.inStock !== false,
            badge: undefined,
            url: product.url || `/noark/circuit-protection/enclosed-breakers`,
            specs: product.specs || []
          }));
        } else {
          // For other Noark categories, use basic products or show empty state
          productsToFilter = cleanProducts.filter(product => product.brand === selectedBrand)
        }
      } else if (selectedBrand === 'Klemsan') {
        // Use Klemsan products
        productsToFilter = klemsanProducts
      } else if (selectedBrand === 'ERICO') {
        // Use ERICO products
        productsToFilter = ericoProducts
      } else if (selectedBrand === 'LS Industrial') {
        // Use LS Industrial products
        productsToFilter = lsIndustrialProducts
      }

      let filtered = productsToFilter.filter(product => {
        const matchesSearch = debouncedSearchTerm === '' || 
          product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        
        const matchesCategory = selectedCategory === 'All Products' || 
          product.category === selectedCategory ||
          // Check subcategory field if present
          ((product as any).subcategory && (product as any).subcategory === selectedCategory) ||
          // Special handling for Noark Circuit Protection - show all MCP products
          (selectedBrand === 'Noark' && selectedCategory === 'Circuit Protection' && product.category === 'Motor-Circuit Protectors') ||
          // Special handling for Noark Motor Circuit Protectors - show all MCP products
          (selectedBrand === 'Noark' && selectedCategory === 'Motor Circuit Protectors' && product.category === 'Motor-Circuit Protectors') ||
          // Special handling for Noark Miniature Circuit Breakers
          (selectedBrand === 'Noark' && selectedCategory === 'Miniature Circuit Breakers' && product.category === 'Miniature Circuit Breakers') ||
          // Special handling for Noark Power Circuit Breakers
          (selectedBrand === 'Noark' && selectedCategory === 'Power Circuit Breakers' && product.category === 'Air Circuit Breakers') ||
          // Special handling for Noark Molded Case Switches
          (selectedBrand === 'Noark' && selectedCategory === 'Molded Case Switches' && product.category === 'Molded Case Switches') ||
          // Special handling for Noark Surge Protective Device
          (selectedBrand === 'Noark' && selectedCategory === 'Surge Protective Device' && product.category === 'Surge Protective Device') ||
          // Special handling for Noark DIN Rail Fuse Holders and Fuses
          (selectedBrand === 'Noark' && selectedCategory === 'DIN Rail Fuse Holders and Fuses' && product.category === 'DIN Rail Fuse Holders and Fuses') ||
          // Special handling for Noark Enclosed Breakers
          (selectedBrand === 'Noark' && selectedCategory === 'Enclosed Breakers' && product.category === 'Enclosed Breakers')
        const matchesBrand = selectedBrand === 'All Brands' || product.brand.trim() === selectedBrand

        return matchesSearch && matchesCategory && matchesBrand
      })

      // Sort products
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return b.id - a.id
          default:
            return a.name.localeCompare(b.name)
        }
      })

      return filtered
    } finally {
      endMeasure()
    }
  }, [selectedBrand, selectedCategory, debouncedSearchTerm, sortBy, startMeasure])

  const clearFilters = () => {
    setSearchTerm('')
  }

  // Convert brand name to URL slug
  const getBrandSlug = (brandName: string) => {
    return brandName.toLowerCase().replace(/\s+/g, '-')
  }

  const getCategorySlug = (categoryName: string) => {
    return categoryName
      .toLowerCase()
      .replace(/\s*&\s*/g, '-')  
      .replace(/\s+/g, '-')
      .replace(/[\(\)]/g, '')
  }

  // Check if current category has subcategories
  const hasSubcategories = () => {
    console.log('Checking subcategories for:', selectedBrand, selectedCategory)
    
    // Categories that have scraped families and should show subcategories
    const categoriesWithSubcategories = {
      'Mitsubishi': [
        'Variable Frequency Drives',
        'Programmable Logic Controllers', 
        'Servo Motors',
        'Cables & Accessories',
        'Batteries & Power'
      ],
      'Noark': [
        'Circuit Protection',
        'Miniature Circuit Breakers',
        'Circuit Breakers',
        'Contactors',
        'Overload Relays',
        'Push Buttons',
        'LED Indicators'
      ],
      'LS Industrial': [
        'Variable Frequency Drives',
        'Contactors',
        'Magnetic Contactor'
      ],
      'Schneider Electric': [
        'Manual Motor Starters',
        'Servo Motors',
        'Overload Relays'
      ],
      'ABB': [
        'Power Distribution'
      ],
      'General Electric': [
        'Circuit Breakers',
        'Contactors',
        'Programmable Logic Controllers',
        'Power Distribution',
        'Overload Relays'
      ]
    }
    
    const brandCategories = categoriesWithSubcategories[selectedBrand]
    return brandCategories ? brandCategories.includes(selectedCategory) : false
  }

  // Get subcategories for current category
  const getSubcategories = () => {
    // Define subcategories based on scraped families and product patterns
    const subcategoryMappings: Record<string, Record<string, Array<{name: string, slug: string}>>> = {
      'Mitsubishi': {
        'Variable Frequency Drives': [
          { name: 'A800 Series', slug: 'a800-series' },
          { name: 'F800 Series', slug: 'f800-series' },
          { name: 'E800 Series', slug: 'e800-series' },
          { name: 'D700 Series', slug: 'd700-series' },
          { name: 'E700 Series', slug: 'e700-series' }
        ],
        'Programmable Logic Controllers': [
          { name: 'MELSEC-Q Series', slug: 'melsec-q-series' },
          { name: 'MELSEC-FX Series', slug: 'melsec-fx-series' },
          { name: 'MELSEC-iQ-R Series', slug: 'melsec-iq-r-series' }
        ],
        'Servo Motors': [
          { name: 'MELSERVO-J5 Series', slug: 'melservo-j5-series' },
          { name: 'MELSERVO-J4 Series', slug: 'melservo-j4-series' },
          { name: 'MELSERVO-JN Series', slug: 'melservo-jn-series' }
        ],
        'Batteries & Power': [
          { name: 'MR-J3BAT Battery Units', slug: 'mr-j3bat-series' },
          { name: 'Power Supply Units', slug: 'power-supply-units' }
        ]
      },
      'Noark': {
        'Circuit Protection': [
          { name: 'Miniature Circuit Breakers', slug: 'miniature-circuit-breakers' },
          { name: 'Motor Circuit Protectors (MCPs)', slug: 'motor-circuit-protectors-mcps' },
          { name: 'Enclosed Breakers', slug: 'enclosed-breakers' },
          { name: 'DIN Rail Fuse Holders and Fuses', slug: 'din-rail-fuse-holders-and-fuses' },
          { name: 'Surge Protective Device', slug: 'surge-protective-device' }
        ],
        'Miniature Circuit Breakers': [
          { name: 'B1N Series', slug: 'b1n-series' },
          { name: 'B1H Series', slug: 'b1h-series' },
          { name: 'B1E Series', slug: 'b1e-series' },
          { name: 'B1D Series', slug: 'b1d-series' }
        ],
        'Contactors': [
          { name: 'Ex9C Series', slug: 'ex9c-series' },
          { name: 'Ex9CK Series', slug: 'ex9ck-series' },
          { name: 'Ex9CDR Series', slug: 'ex9cdr-series' }
        ],
        'Overload Relays': [
          { name: 'Ex9R Series', slug: 'ex9r-series' },
          { name: 'Thermal Overload Relays', slug: 'thermal-overload-relays' }
        ],
        'Push Buttons': [
          { name: 'Ex9PB Series', slug: 'ex9pb-series' },
          { name: '22mm Push Buttons', slug: '22mm-push-buttons' }
        ],
        'LED Indicators': [
          { name: 'Ex9IL Series', slug: 'ex9il-series' },
          { name: '22mm LED Indicators', slug: '22mm-led-indicators' }
        ]
      },
      'LS Industrial': {
        'Variable Frequency Drives': [
          { name: 'Starvert iE5 Series', slug: 'starvert-ie5-series' },
          { name: 'Starvert iC5 Series', slug: 'starvert-ic5-series' },
          { name: 'Starvert iG5A Series', slug: 'starvert-ig5a-series' }
        ],
        'Contactors': [
          { name: 'METASOL Series', slug: 'metasol-series' },
          { name: 'MC Series', slug: 'mc-series' }
        ]
      },
      'Schneider Electric': {
        'Manual Motor Starters': [
          { name: 'GV2 Series', slug: 'gv2-series' },
          { name: 'GV3 Series', slug: 'gv3-series' }
        ],
        'Servo Motors': [
          { name: 'Lexium Series', slug: 'lexium-series' },
          { name: 'BMH Series', slug: 'bmh-series' }
        ]
      },
      'ABB': {
        'Power Distribution': [
          { name: 'System Pro M Compact', slug: 'system-pro-m-compact' },
          { name: 'Distribution Boards', slug: 'distribution-boards' }
        ]
      }
    }
    
    const brandSubcategories = subcategoryMappings[selectedBrand]
    return brandSubcategories ? (brandSubcategories[selectedCategory] || []) : []
  }

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <>
      <FloatingParticles />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5 relative">
        {/* Hero Section */}
        <motion.section   
          className="relative pt-24 pb-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-red-800/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-800/30 to-red-200/30 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.nav 
              className="flex items-center space-x-2 text-sm mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                href="/" 
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link 
                href={`/${getBrandSlug(selectedBrand)}`}
                className="text-gray-500 hover:text-red-600 transition-colors flex items-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                {selectedBrand}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-red-600 font-medium">{selectedCategory}</span>
            </motion.nav>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
              <div>
                <motion.h1 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="text-transparent bg-gradient-to-r from-red-500 to-red-900 bg-clip-text">
                    {selectedBrand}
                  </span>
                  <br />
                  {selectedCategory}
                </motion.h1>
                
                <motion.p 
                  className="text-lg text-gray-600 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Explore our {selectedCategory.toLowerCase()} from {selectedBrand}
                </motion.p>
              </div>

              {/* Quick Stats */}
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="font-medium text-gray-700">{filteredProducts.length} Products</span>
                </div>
                <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="font-medium text-gray-700">{selectedBrand}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Subcategories Section - Only shown when subcategories exist */}
        {hasSubcategories() && (
          <section className="relative bg-white/80 backdrop-blur-sm mb-4 py-4 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-sm font-medium text-gray-500 mr-2">Subcategories:</h3>
                {getSubcategories().map((subcategory) => (
                  <Link
                    key={subcategory.slug}
                    href={`/${getBrandSlug(selectedBrand)}/${getCategorySlug(selectedCategory)}/${subcategory.slug}`}
                    className="px-4 py-1.5 bg-white text-sm text-gray-800 border border-gray-300 hover:border-red-500 hover:text-red-600 rounded-full transition-colors flex items-center gap-1 shadow-sm hover:shadow"
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Filters Section */}
        <section 
          ref={filterRef}
          className={`${
            isScrolled && isDesktop 
              ? 'fixed top-24 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200' 
              : 'relative bg-white/60 backdrop-blur-sm'
          } transition-all duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              {/* Search and Filter Toggle */}
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <FunnelIcon className="h-5 w-5" />
                  Filters
                </button>
              </div>

              {/* View Controls and Sort */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <Squares2X2Icon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <ListBulletIcon className="h-4 w-4" />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="newest">Sort by Newest</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden mt-4 overflow-hidden"
                >
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900">Filters</h3>
                      <button
                        onClick={clearFilters}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Clear all
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600">
                        Additional filters can be added here if needed for catalog browsing.
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Products Grid - Using Dynamic Grid Component */}
        <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isScrolled && isDesktop ? 'mt-20' : ''}`}>
          <Suspense 
            fallback={
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading products...</p>
              </div>
            }
          >
            <DynamicProductGrid
              products={filteredProducts}
              onProductClick={handleViewDetails}
              viewMode={viewMode}
              initialLoadCount={12}
              loadIncrement={8}
              enableProgressiveLoading={true}
              enableVirtualScroll={false}
            />
          </Suspense>
        </section>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  )
} 