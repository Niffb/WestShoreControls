import Link from 'next/link'
import Image from 'next/image'
import { MapPinIcon, PhoneIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { getImageUrl } from '@/lib/config/image-config'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Catalogs', href: '/catalogs' },
  { name: 'Partnerships', href: '/partnerships' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

/**
 * Static shell for <Suspense> while the client Header (usePathname) resolves.
 * Keeps layout height aligned with the real header to avoid hydration / CLS issues.
 */
export default function HeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300">
      <div className="bg-gray-900 text-white overflow-hidden max-h-10 opacity-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6 text-xs py-2 px-4">
          <div className="hidden md:flex items-center space-x-1.5">
            <MapPinIcon className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-gray-300">Vancouver, BC</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <PhoneIcon className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-gray-300">(604) 817-0987</span>
          </div>
          <div className="hidden sm:block text-gray-400">Mon-Fri 8:00-17:00</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="relative w-36 h-12">
                <Image
                  src={getImageUrl('brands/westlogo.webp')}
                  alt="Westshore Controls"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-stretch h-full" aria-label="Main">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex h-full items-center border-b-2 border-transparent px-3.5 text-sm font-medium text-gray-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <a
              href="tel:+16048170987"
              className="hidden lg:inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md font-medium text-sm"
            >
              <PhoneIcon className="h-4 w-4" />
              <span>Call Now</span>
            </a>
            <a
              href="tel:+16048170987"
              className="hidden sm:flex lg:hidden items-center space-x-2 text-primary-600 font-medium text-sm"
            >
              <PhoneIcon className="h-5 w-5" />
              <span className="hidden md:inline">(604) 817-0987</span>
            </a>
            <span className="lg:hidden p-2 text-gray-400" aria-hidden>
              <Bars3Icon className="h-6 w-6" />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
