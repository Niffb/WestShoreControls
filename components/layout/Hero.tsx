'use client'

import {
  ArrowRightIcon,
  ShoppingCartIcon,
  TruckIcon,
  PhoneIcon,
  WrenchScrewdriverIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/lib/config/image-config'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-red-900/5" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[65vh] sm:min-h-[70vh]">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/90 border border-gray-200 rounded-full px-5 py-2.5 text-sm text-gray-700">
              <BuildingStorefrontIcon className="w-5 h-5 text-primary-500" />
              Your Motor Controls and Industrial Specialist
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              <span className="block">Complete</span>
              <span className="block text-transparent bg-gradient-to-r from-primary-500 to-red-900 bg-clip-text">
                Factory &amp; Automation
              </span>
              <span className="block">Product Lines</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
              We carry <strong className="text-gray-900">all factory and automation products</strong> from industry-leading brands including TMEIC, Mitsubishi, LS Industrial, Noark, ERICO, Katko, Klemsan, and Elsteel. Your complete source for electrical and automation solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-md transition-colors duration-200 min-h-[56px]"
              >
                Contact Our Team
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-md border border-gray-300 transition-colors duration-200 min-h-[56px]"
              >
                Browse Products
                <ShoppingCartIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl">
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
          </div>
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
