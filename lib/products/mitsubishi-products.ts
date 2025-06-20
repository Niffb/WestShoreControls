import { Product } from './products'
import { getImageUrl } from '@/lib/config/image-config'

// Mitsubishi Electric Factory Automation Products
// Enhanced with deep scraped data from official Mitsubishi website
export const mitsubishiProducts: Product[] = [
  // Controllers - Programmable Controllers (MELSEC)
  {
    id: 50001,
    name: "MELSEC iQ-R Series",
    model: "iQ-R Series",
    brand: "Mitsubishi",
    category: "Controllers",
    description: "The core for next-generation automation environment. Programmable automation controllers suitable for various different applications with high speed, high accuracy and data processing capacities.",
    price: 3850,
    rating: 4.9,
    reviews: 156,
    images: [getImageUrl("mitsubishi/controllers/melsec-iq-r-series.webp")],
    inStock: true,
    badge: "Featured",
    specs: [
      "High speed, high accuracy processing",
      "Advanced data processing capacities",
      "Multiple system configurations",
      "Enhanced network systems"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products/cnt/plc/plcr",
    features: [
      "Next-generation automation environment",
      "Programmable automation controllers",
      "Various application support",
      "Scalable system architecture"
    ]
  },

  {
    id: 50002,
    name: "MELSEC System Q",
    model: "Q Series",
    brand: "Mitsubishi",
    category: "Controllers",
    description: "The Q Series PLCs are equipped with a multiple CPU function that allows multiple CPUs to be mounted simultaneously. This capability allows for system configurations that match the scale and objectives of the production site.",
    price: 2850,
    rating: 4.8,
    reviews: 142,
    images: [getImageUrl("mitsubishi/controllers/melsec-q-series.webp")],
    inStock: true,
    badge: "Popular",
    specs: [
      "Multiple CPU function",
      "Simultaneous CPU mounting",
      "Scalable system configurations",
      "Industrial automation control"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products/cnt/plc",
    features: [
      "Multiple CPU support",
      "High-speed processing",
      "Flexible system configuration",
      "Comprehensive I/O options"
    ]
  },

  {
    id: 50003,
    name: "MELSEC-L Series",
    model: "L Series",
    brand: "Mitsubishi",
    category: "Controllers",
    description: "Latest generation of Compact PLC. Full function, performance and cost effective. Suitable for complex motion tasks and IOT for small-medium systems.",
    price: 1450,
    rating: 4.7,
    reviews: 98,
    images: [getImageUrl("mitsubishi/controllers/melsec-l-series.webp")],
    inStock: true,
    specs: [
      "Compact PLC design",
      "Full function capability",
      "Cost-effective solution",
      "IOT ready"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products/cnt/plc",
    features: [
      "Complex motion task support",
      "IOT integration",
      "Small-medium system optimization",
      "Performance efficiency"
    ]
  },

  {
    id: 50004,
    name: "MELSEC iQ-F Series",
    model: "iQ-F Series",
    brand: "Mitsubishi",
    category: "Controllers",
    description: "Latest generation of Modular PLC, to automate your business. Solve any Automation task, from Motion to IOT and much more with flexible, compact and easy solutions.",
    price: 950,
    rating: 4.6,
    reviews: 134,
    images: [getImageUrl("mitsubishi/controllers/melsec-iq-f-series.webp")],
    inStock: true,
    specs: [
      "Modular PLC design",
      "Business automation",
      "Motion to IOT capabilities",
      "Flexible and compact"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products/cnt/plc",
    features: [
      "Wide range of control applications",
      "Motion control integration",
      "IOT connectivity",
      "Easy implementation"
    ]
  },

  // Controllers - Simple Application Controllers
  {
    id: 50005,
    name: "ALPHA2 Simple Application Controller",
    model: "ALPHA2",
    brand: "Mitsubishi",
    category: "Controllers",
    description: "The easy to use entry model controller for simple applications. The ALPHA2 controllers offer simple, reliable control for a range of automation applications including lighting, air conditioning, security systems, temperature, and water control.",
    price: 485,
    rating: 4.5,
    reviews: 87,
    images: [getImageUrl("mitsubishi/controllers/alpha2-controller.webp")],
    inStock: true,
    specs: [
      "Easy installation and use",
      "All-in-one design",
      "Built-in display and analog inputs",
      "GSM functionality"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products/cnt/sac",
    features: [
      "Simple application control",
      "Lighting and HVAC control",
      "Security system integration",
      "Temperature and water control"
    ]
  },

  // Controllers - Motion Controllers
  {
    id: 50006,
    name: "Motion Controller with SSCNET",
    model: "Motion Controller",
    brand: "Mitsubishi",
    category: "Controllers",
    description: "High performance motion controllers for the iQ Platform. Total system performance instead of individual component specifications leads to maximum performance with high speed and high accuracy drive control.",
    price: 3200,
    rating: 4.9,
    reviews: 76,
    images: [getImageUrl("mitsubishi/controllers/motion-controller-sscnet.webp")],
    inStock: true,
    badge: "Professional",
    specs: [
      "High-speed servo network SSCNET",
      "Complex synchronous control",
      "iQ Platform compatibility",
      "Maximum performance design"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products/cnt/ssc",
    features: [
      "High-precision positioning",
      "SSCNET communication",
      "Synchronous control capability",
      "Advanced servo integration"
    ]
  },

  // Controllers - CNCs
  {
    id: 50007,
    name: "CNC - Computerized Numerical Controller",
    model: "CNC",
    brand: "Mitsubishi",
    category: "Controllers",
    description: "CNCs are the core of machine tool systems, which are commonly called the 'mother machine' in the manufacturing industry. Mitsubishi Electric's CNCs are equipped with the latest CPU and high-speed optic servo network, to provide high-speed and high-precision machining.",
    price: 8500,
    originalPrice: 9200,
    rating: 4.9,
    reviews: 54,
    images: [getImageUrl("mitsubishi/controllers/cnc-controller.webp")],
    inStock: true,
    badge: "Sale",
    specs: [
      "Latest CPU technology",
      "High-speed optic servo network",
      "High-speed machining",
      "High-precision control"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products/cnt",
    features: [
      "Advanced CPU performance",
      "Optical servo network",
      "Precision machining control",
      "Industrial productivity enhancement"
    ]
  },

  // Drive Products - AC Servos (MELSERVO)
  {
    id: 50008,
    name: "MELSERVO AC Servo System",
    model: "MELSERVO",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "MELSERVO systems combine a servo motor and amp, and are ideal for controlling the moving parts of various machines and equipment (speed, torque, alignment, locus, etc.). They contribute to the development of competitive devices, as a driving source for industrial machines.",
    price: 1850,
    rating: 4.8,
    reviews: 156,
    images: [getImageUrl("mitsubishi/drives/melservo-ac-servo.webp")],
    inStock: true,
    badge: "Popular",
    specs: [
      "Combined servo motor and amplifier",
      "Speed, torque, alignment control",
      "Locus control capability",
      "Industrial machine integration"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products",
    features: [
      "Precise motion control",
      "High-performance servo motor",
      "Advanced amplifier technology",
      "Versatile application support"
    ]
  },

  // Drive Products - Inverters (FREQROL)
  {
    id: 50009,
    name: "FREQROL General-Purpose Inverter",
    model: "FREQROL",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "The FREQROL Series general-purpose inverters allow changes to be made to the speed of three-phase induction motors, freely and easily. An extensive lineup provides optimum control and energy conservation in a wide range of machines.",
    price: 945,
    rating: 4.6,
    reviews: 203,
    images: [getImageUrl("mitsubishi/drives/freqrol-inverter.webp")],
    inStock: true,
    specs: [
      "Three-phase induction motor control",
      "Variable speed control",
      "Energy conservation",
      "Extensive product lineup"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products",
    features: [
      "Easy speed adjustment",
      "Energy efficient operation",
      "Wide application range",
      "User-friendly interface"
    ]
  },

  // Industrial Robots
  {
    id: 50010,
    name: "MELFA Industrial Robot",
    model: "MELFA",
    brand: "Mitsubishi",
    category: "Industrial Robots",
    description: "Now compatible with even more FA products. Mitsubishi Electric robots support various intelligent applications in high-tech fields with precise positioning and advanced control capabilities.",
    price: 25000,
    rating: 4.8,
    reviews: 67,
    images: [getImageUrl("mitsubishi/robots/melfa-industrial-robot.webp")],
    inStock: true,
    badge: "Professional",
    specs: [
      "FA product compatibility",
      "Intelligent application support",
      "High-tech field applications",
      "Advanced control systems"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products",
    features: [
      "Precise positioning control",
      "Intelligent applications",
      "High-tech compatibility",
      "Advanced automation"
    ]
  },

  // Edge Computing
  {
    id: 50011,
    name: "MELIPC Industrial Computer",
    model: "MELIPC",
    brand: "Mitsubishi",
    category: "Edge Computing",
    description: "Mitsubishi Electric industrial computer MELIPC offers new values for Edge computing, IT system coordination, and device control with its robust features and flexibility utilizing general purpose applications.",
    price: 4500,
    rating: 4.7,
    reviews: 89,
    images: [getImageUrl("mitsubishi/computing/melipc-industrial-computer.webp")],
    inStock: true,
    specs: [
      "Edge computing capabilities",
      "IT system coordination",
      "Device control features",
      "General purpose applications"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products",
    features: [
      "Robust industrial design",
      "Flexible application support",
      "Edge computing optimization",
      "IT integration capabilities"
    ]
  },

  // Human Machine Interfaces
  {
    id: 50012,
    name: "GOT Human-Machine Interface",
    model: "GOT",
    brand: "Mitsubishi",
    category: "HMI Systems",
    description: "Human-Machine Interfaces (HMIs) - GOT series provide intuitive operator interfaces for monitoring and controlling industrial processes with advanced visualization and touch screen capabilities.",
    price: 1200,
    rating: 4.6,
    reviews: 124,
    images: [getImageUrl("mitsubishi/hmi/got-hmi-system.webp")],
    inStock: true,
    specs: [
      "Touch screen interface",
      "Advanced visualization",
      "Process monitoring",
      "Industrial process control"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products",
    features: [
      "Intuitive operator interface",
      "Real-time monitoring",
      "Touch screen technology",
      "Process visualization"
    ]
  }
]

// Helper functions for product management
export const getMitsubishiProductsByCategory = (category: string): Product[] => {
  return mitsubishiProducts.filter(product => product.category === category)
}

export const searchMitsubishiProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return mitsubishiProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.specs.some(spec => spec.toLowerCase().includes(lowercaseQuery)) ||
    product.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  )
}

export const getFeaturedMitsubishiProducts = (count: number = 6): Product[] => {
  return mitsubishiProducts
    .filter(product => product.badge === "Featured" || product.rating >= 4.8)
    .slice(0, count)
}

export const getMitsubishiProductById = (id: number): Product | undefined => {
  return mitsubishiProducts.find(product => product.id === id)
}

export const getMitsubishiCategories = (): string[] => {
  const categories = new Set(mitsubishiProducts.map(product => product.category))
  return Array.from(categories).sort()
} 