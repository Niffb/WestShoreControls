'use client'

import { 
  ArrowRightIcon, 
  ShoppingCartIcon, 
  TruckIcon,
  PhoneIcon,
  WrenchScrewdriverIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline'
import { 
  StarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import ContactCard from '@/components/ui/ContactCard'
import { getImageUrl } from '@/lib/config/image-config'

// Custom hook to detect platform (e.g., Windows) for performance optimizations
const usePlatform = () => {
  const [isWindows, setIsWindows] = useState(false)

  useEffect(() => {
    // This check should only run on the client-side
    setIsWindows(/Win/.test(navigator.platform))
  }, [])

  return { isWindows }
}

// --- Sub-components with simplified props & animations ---

const CompanyBadge = ({ isWindows }: { isWindows: boolean }) => (
  <motion.div 
    className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 text-sm text-gray-700 shadow-lg cursor-pointer"
    whileHover={!isWindows ? { 
      scale: 1.05, 
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      backgroundColor: 'rgba(255,255,255,0.95)'
    } : {}}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
  >
    <BuildingStorefrontIcon className="w-5 h-5 text-primary-500" />
    Your Motor Controls and Industrial Specialist
  </motion.div>
)

const MainHeadlines = () => (
  <>
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
      <motion.span 
        className="block"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Complete
      </motion.span>
      <motion.span 
        className="block text-transparent bg-gradient-to-r from-primary-500 to-red-900 bg-clip-text"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Factory & Automation
      </motion.span>
      <motion.span 
        className="block"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Product Lines
      </motion.span>
    </h1>
    <motion.p 
      className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      We carry <strong className="text-gray-900">all factory and automation products</strong> from industry-leading brands including TMEIC, Mitsubishi, LS Industrial, Noark, ERICO, Katko, Klemsan, and Elsteel. Your complete source for electrical and automation solutions.
    </motion.p>
  </>
)

const ActionButtons = ({ isWindows }: { isWindows: boolean }) => (
  <motion.div 
    className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start w-full sm:w-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0, duration: 0.6 }}
  >
    <motion.button 
      className="group relative overflow-hidden bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center min-h-[56px] touch-manipulation"
      whileHover={!isWindows ? { scale: 1.05 } : {}}
      whileTap={!isWindows ? { scale: 0.95 } : {}}
    >
      <span className="relative flex items-center justify-center">
        Contact Our Team
        <ArrowRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </motion.button>
    <motion.button 
      className="group relative overflow-hidden bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-lg border-2 border-gray-300 hover:border-primary-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-h-[56px] touch-manipulation"
      whileHover={!isWindows ? { scale: 1.05 } : {}}
      whileTap={!isWindows ? { scale: 0.95 } : {}}
    >
      <span className="relative flex items-center justify-center">
        View All Products
        <ShoppingCartIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </motion.button>
  </motion.div>
)

const Background = ({ isWindows }: { isWindows: boolean }) => useMemo(() => {
  if (isWindows) {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-red-900/5" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/20 to-red-800/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-800/20 to-red-200/20 rounded-full blur-3xl opacity-60" />
      </div>
    )
  }
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-red-900/5" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500/2 to-blue-500/2"
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}, [isWindows])

const FloatingElements = ({ isWindows }: { isWindows: boolean }) => useMemo(() => {
  if (isWindows) {
    return (
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-6 h-6 bg-primary-500/30 rounded-full" />
        <div className="absolute bottom-40 left-10 w-4 h-8 bg-accent-orange/30 rounded" />
      </div>
    )
  }
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <motion.div 
        className="absolute top-20 right-20 w-6 h-6 bg-primary-500/40 rounded-full"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-40 left-10 w-4 h-8 bg-accent-orange/40 rounded"
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  )
}, [isWindows])


// --- Main Hero Component ---

export default function Hero() {
  const { isWindows } = usePlatform()

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Removed background image, keeping only gradient background */}
      <Background isWindows={isWindows} />
      
      <FloatingElements isWindows={isWindows} />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[65vh] sm:min-h-[70vh]">
          
          <motion.div 
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <CompanyBadge isWindows={isWindows} />
            <MainHeadlines />
            <ActionButtons isWindows={isWindows} />
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={getImageUrl("brands/hero-background.webp")}
                alt="Industrial Automation Equipment"
                fill
                className="object-cover"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <TruckIcon className="w-5 h-5 text-primary-500" />
            <span>Fast Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-primary-500" />
            <span>Authorized Distributor</span>
          </div>
          <div className="flex items-center gap-2">
            <WrenchScrewdriverIcon className="w-5 h-5 text-primary-500" />
            <span>Expert Support</span>
          </div>
        </div>
      </div>
    </section>
  )
} 