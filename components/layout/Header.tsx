'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { getImageUrl } from '@/lib/config/image-config'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showTopBar, setShowTopBar] = useState(true)
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
      setShowTopBar(currentScrollY < 50)
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-sm border-b border-gray-100'
          : 'bg-white'
      }`}
    >
      {/* Top Utility Bar */}
      <div
        className={`bg-gray-900 text-white overflow-hidden transition-all duration-300 ${
          showTopBar ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6 text-xs py-2 px-4">
          <div className="hidden md:flex items-center space-x-1.5">
            <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-gray-300">Vancouver, BC</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <PhoneIcon className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-gray-300">(604) 817-0987</span>
          </div>
          <div className="hidden sm:block text-gray-400">
            Mon-Fri 8:00-17:00
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="relative w-36 h-12">
                <Image
                  src={getImageUrl("brands/westlogo.webp")}
                  alt="Westshore Controls"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop — underline only (no background pill) */}
          <nav className="hidden lg:flex items-stretch h-full" aria-label="Main">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex h-full items-center border-b-2 px-3.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <a
              href="tel:+16048170987"
              className="hidden lg:inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors duration-150"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>Call Now</span>
            </a>

            <a
              href="tel:+16048170987"
              className="hidden sm:flex lg:hidden items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              <PhoneIcon className="h-5 w-5" />
              <span className="hidden md:inline">(604) 817-0987</span>
            </a>

            <button
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-150"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="lg:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="divide-y divide-gray-100">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block py-3 font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-primary-700 underline decoration-2 decoration-primary-600 underline-offset-4'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </div>
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="text-center text-sm text-gray-500 mb-3">
                  <MapPinIcon className="h-4 w-4 inline mr-1" />
                  Vancouver, BC &middot; Mon-Fri 8:00-17:00
                </div>
                <a
                  href="tel:+16048170987"
                  className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-150 w-full"
                >
                  <PhoneIcon className="h-5 w-5" />
                  <span>Call (604) 817-0987</span>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
