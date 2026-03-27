import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Footer() {
  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Products', href: '/brands' },
    { name: 'Catalogs', href: '/catalogs' },
    { name: 'Partnerships', href: '/partnerships' }
  ]

  const manufacturers = [
    { name: 'TMEIC', href: '/tmeic' },
    { name: 'Noark', href: '/noark' },
    { name: 'LS Industrial', href: '/ls-industrial' },
    { name: 'Erico', href: '/erico' },
    { name: 'Katko', href: '/katko' },
    { name: 'Klemsan', href: '/klemsan' },
    { name: 'Mitsubishi', href: '/mitsubishi' },
    { name: 'Elsteel', href: '/partnerships' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="lg:col-span-1">
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">
                  <span className="text-primary-500">Westshore</span> Controls
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Professional electrical components and control systems.
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">(604) 817-0987</span>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="h-4 w-4 text-primary-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">info@westshorecontrols.com</span>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="h-4 w-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Delta, BC, Canada</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-sm font-semibold mb-3 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold mb-3 text-white">Our Brands</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {manufacturers.map((manufacturer) => (
                  <Link
                    key={manufacturer.name}
                    href={manufacturer.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors py-1"
                  >
                    {manufacturer.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-gray-400 text-xs">
              &copy; {new Date().getFullYear()} Westshore Controls. All rights reserved.
            </div>
            <div className="flex space-x-4 text-xs">
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
