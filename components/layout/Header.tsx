'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { getImageUrl } from '@/lib/config/image-config'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Catalogs', href: '/catalogs' },
    { name: 'Partnerships', href: '/partnerships' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 10)
    }

    let ticking = false
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return (
    <motion.header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/97 backdrop-blur-lg shadow-lg border-b border-gray-100' 
          : 'bg-white/95 backdrop-blur-md'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Top Contact Bar - Only visible when not scrolled */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            className="bg-primary-600 text-white py-2 px-4 text-center"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6 text-sm">
              <div className="hidden md:flex items-center space-x-1.5">
                <MapPinIcon className="h-4 w-4" />
                <span>Vancouver, BC</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <PhoneIcon className="h-4 w-4" />
                <span>(604) 817-0987</span>
              </div>
              <div className="hidden sm:block text-xs opacity-90">
                Mon-Fri 8:00-17:00
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <div className="bg-white/95 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/" className="group">
                <motion.div 
                  className="relative w-36 h-12 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={getImageUrl("brands/westlogo.webp")}
                    alt="Westshore Controls"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <motion.div
                    key={item.name}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative px-3 py-2 font-medium text-sm transition-all duration-200 group ${
                        isActive
                          ? 'text-primary-600' 
                          : 'text-gray-700 hover:text-primary-600'
                      }`}
                    >
                      {item.name}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

            {/* Right Side - CTA & Menu */}
            <div className="flex items-center space-x-4">
              {/* Call Button - Desktop */}
              <motion.a
                href="tel:+16048170987"
                className="hidden lg:flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneIcon className="h-4 w-4" />
                <span>Call Now</span>
              </motion.a>

              {/* Mobile Phone - Tablet Only */}
              <motion.a
                href="tel:+16048170987"
                className="hidden sm:flex lg:hidden items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <PhoneIcon className="h-5 w-5" />
                <span className="hidden md:inline">(604) 817-0987</span>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Bars3Icon className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div 
              className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-xl"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="max-w-7xl mx-auto">
                {/* Navigation Links */}
                <div className="px-4 py-6 space-y-2">
                  {navigation.map((item, index) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isActive
                              ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-500' 
                              : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
                
                {/* Mobile Contact & CTA */}
                <div className="border-t border-gray-100 px-4 py-6 bg-gray-50/50">
                  <div className="space-y-4">
                    {/* Contact Info */}
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <MapPinIcon className="h-4 w-4 text-primary-500" />
                        <span>Vancouver, BC • Mon-Fri 8:00-17:00</span>
                      </div>
                    </div>
                    
                    {/* Call Button */}
                    <motion.a
                      href="tel:+16048170987"
                      className="flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 w-full"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PhoneIcon className="h-5 w-5" />
                      <span>Call (604) 817-0987</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
} 