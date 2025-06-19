import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon
} from '@heroicons/react/24/outline'

export default function Footer() {
  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Products', href: '/products' },
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
        {/* Main Footer Content */}
        <div className="py-8 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Company Info - Compact */}
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

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-semibold mb-3 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Manufacturers - Compact Grid */}
            <div className="lg:col-span-2">
              <h4 className="text-sm font-semibold mb-3 text-white">Our Brands</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {manufacturers.map((manufacturer) => (
                  <a 
                    key={manufacturer.name}
                    href={manufacturer.href} 
                    className="text-sm text-gray-400 hover:text-primary-500 transition-colors py-1"
                  >
                    {manufacturer.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer - Compact */}
        <div className="py-4 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="text-gray-400 text-xs">
              © 2024 Westshore Controls. All rights reserved.
            </div>
            <div className="flex space-x-4 text-xs">
              <a href="/contact" className="text-gray-400 hover:text-primary-500 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-primary-500 transition-colors">
                Terms and Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 