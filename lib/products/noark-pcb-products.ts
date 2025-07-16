// Noark Power Circuit Breakers (PCBs) Product Data

export interface PCBProduct {
  id: string;
  name: string;
  model: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  specifications: { [key: string]: string };
  rating: number;
  reviews: number;
  images: string[];
  inStock: boolean;
  url: string;
  features: string[];
  part_number?: string;
}

export const pcbProducts: PCBProduct[] = [
  {
    id: 'A25',
    name: 'Noark A25 Power Circuit Breaker',
    model: 'A25',
    brand: 'Noark',
    category: 'Power Circuit Breakers',
    subcategory: 'Air Circuit Breakers',
    description: 'The Noark A25 Power Circuit Breaker is designed for medium to high current applications from 600A through 2500A. Features IC ratings up to 85kA at 847V with short-time withstand capability. Available in both fixed and drawout mounting configurations.',
    specifications: {
      'Frame Size': 'A25',
      'Rated Current': '600A - 2500A',
      'Voltage': 'Up to 847V',
      'Interrupting Capacity': 'Up to 85kA at 847V',
      'Short-Time Withstand': '100kA at 635V',
      'Poles': '3P, 4P',
      'Mounting': 'Fixed or Drawout',
      'Standards': 'UL 1066, ANSI C37.50'
    },
    rating: 4.8,
    reviews: 8,
    images: ['/assets/images/categories/Power Curcuit /Power Circuit Breakers NOARK.avif'],
    inStock: true,
    url: '/noark/power-circuit-breakers/a25',
    features: ['High breaking capacity up to 85kA', 'Fixed or drawout mounting', 'Short-time withstand capability', '3 and 4 pole designs', 'UL 1066 certified'],
    part_number: 'A25-2500'
  },
  {
    id: 'A32',
    name: 'Noark A32 Power Circuit Breaker',
    model: 'A32',
    brand: 'Noark',
    category: 'Power Circuit Breakers',
    subcategory: 'Air Circuit Breakers',
    description: 'The Noark A32 Power Circuit Breaker provides reliable protection for high current applications from 800A through 3200A. Features IC ratings up to 100kA at 635 Vac with short-time withstand capability. Available in both fixed and drawout mounting configurations.',
    specifications: {
      'Frame Size': 'A32',
      'Rated Current': '800A - 3200A',
      'Voltage': 'Up to 635Vac',
      'Interrupting Capacity': 'Up to 100kA at 635 Vac',
      'Short-Time Withstand': '100kA at 635 Vac',
      'Poles': '3P, 4P',
      'Mounting': 'Fixed or Drawout',
      'Standards': 'UL 1066, ANSI C37.50'
    },
    rating: 4.8,
    reviews: 10,
    images: ['/assets/images/categories/Power Curcuit /Power Circuit Breakers NOARK (1).avif'],
    inStock: true,
    url: '/noark/power-circuit-breakers/a32',
    features: ['High breaking capacity up to 100kA', 'Fixed or drawout mounting', 'Short-time withstand capability', '3 and 4 pole designs', 'UL 1066 certified'],
    part_number: 'A32-3200'
  },
  {
    id: 'A40',
    name: 'Noark A40 Power Circuit Breaker',
    model: 'A40',
    brand: 'Noark',
    category: 'Power Circuit Breakers',
    subcategory: 'Air Circuit Breakers',
    description: 'The Noark A40 Power Circuit Breaker is engineered for the highest current industrial applications at 4000A. Features interrupting capacity ratings up to 100kA @ 635 Vac and 85kA at 847 Vac with short-time withstand capability. Fixed mounting design for maximum reliability.',
    specifications: {
      'Frame Size': 'A40',
      'Rated Current': '4000A',
      'Voltage': 'Up to 847Vac',
      'Interrupting Capacity': 'Up to 100kA @ 635 Vac, 85kA at 847 Vac',
      'Short-Time Withstand': '100kA @ 635 Vac, 85kA at 847Vac',
      'Poles': '3P, 4P',
      'Mounting': 'Fixed mounting',
      'Standards': 'UL 1066, ANSI C37.50'
    },
    rating: 4.9,
    reviews: 12,
    images: ['/assets/images/categories/Power Curcuit /Power Circuit Breaker NOARK A40.avif'],
    inStock: true,
    url: '/noark/power-circuit-breakers/a40',
    features: ['High breaking capacity up to 100kA', 'Advanced LSIG electronic trip unit', 'Fixed mounting design', '3 and 4 pole designs', 'UL 1066 certified'],
    part_number: 'A40-4000'
  },
  {
    id: 'PCB-SERIES-1',
    name: 'Noark Power Circuit Breaker Series',
    model: 'PCB-Series',
    brand: 'Noark',
    category: 'Power Circuit Breakers',
    subcategory: 'Air Circuit Breakers',
    description: 'Comprehensive range of Noark Power Circuit Breakers designed for industrial and commercial applications. These breakers offer exceptional performance with advanced protection features, reliable operation, and flexible configuration options to meet diverse electrical distribution requirements.',
    specifications: {
      'Frame Sizes': 'A08, A16, A25, A40',
      'Rated Current': '100A - 4000A',
      'Voltage': '415V - 690Vac',
      'Interrupting Capacity': '50kA - 100kA',
      'Poles': '3P, 4P',
      'Trip Units': 'Thermal-Magnetic, Electronic',
      'Standards': 'IEC 60947-2, UL 1066',
      'Protection': 'LSIG functions'
    },
    rating: 4.8,
    reviews: 8,
    images: ['/assets/images/products/noark/Power Circuit Breakers NOARK.avif'],
    inStock: true,
    url: '/noark/power-circuit-breakers/series',
    features: ['Multiple frame sizes available', 'Flexible trip unit options', 'High interrupting capacity', 'Comprehensive protection functions', 'International standards compliance'],
    part_number: 'PCB-SERIES'
  },
  {
    id: 'PCB-ADVANCED',
    name: 'Noark Advanced Power Circuit Breakers',
    model: 'PCB-Advanced',
    brand: 'Noark',
    category: 'Power Circuit Breakers',
    subcategory: 'Air Circuit Breakers',
    description: 'Advanced Power Circuit Breakers from Noark featuring state-of-the-art electronic trip units with comprehensive protection and monitoring capabilities. Ideal for critical applications requiring precise protection coordination and system monitoring in industrial facilities, data centers, and commercial buildings.',
    specifications: {
      'Frame Sizes': 'A25, A40, A63',
      'Rated Current': '630A - 6300A',
      'Voltage': '415V - 1000Vac',
      'Interrupting Capacity': '65kA - 150kA',
      'Poles': '3P, 4P',
      'Trip Units': 'Microprocessor-based Electronic',
      'Communication': 'Modbus, Profibus',
      'Standards': 'IEC 60947-2, UL 1066, ANSI C37.50'
    },
    rating: 4.9,
    reviews: 15,
    images: ['/assets/images/products/noark/Power Circuit Breakers NOARK (1).avif'],
    inStock: true,
    url: '/noark/power-circuit-breakers/advanced',
    features: ['Microprocessor-based protection', 'Communication capabilities', 'Advanced monitoring functions', 'Selective coordination', 'Energy measurement', 'Remote operation capability'],
    part_number: 'PCB-ADV'
  }
];

export const allPCBProducts = [...pcbProducts]; 