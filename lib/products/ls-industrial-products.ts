// LS Industrial products - Complete catalog with all product images
// Updated to include all product categories from the images folder
// Created on: 2025-01-27
// Updated: 2025-01-27 - Fixed image paths to reference actual available images from GitHub CDN

import { Product } from '@/lib/types/shared-types'

export const lsIndustrialProducts: Product[] = [
  // XGT Series PLC Controllers
  {
    id: 5001,
    name: "XGT Series PLC",
    model: "XGT",
    brand: "LS Industrial",
    category: "Programmable Logic Controllers",
    description: "Advanced programmable logic controllers with high-speed processing, multiple communication interfaces, and comprehensive I/O capabilities for industrial automation applications.",
    price: 1450,
    rating: 4.8,
    reviews: 156,
    images: [
      "products/ls_industrial/Programmable_Logic_Controls_HMI_XGT-300x300_406e406a.jpg",
      "products/ls_industrial/XGT-panel-HMI_XGT-panel-HMI_XGT-panel-HMI-300x300_06fff377.jpg"
    ],
    inStock: true,
    badge: "Advanced",
    specs: [
      "High-speed processing",
      "Multiple communication interfaces",
      "Comprehensive I/O capabilities",
      "Industrial automation ready"
    ],
    features: [
      "Advanced control algorithms",
      "Ethernet communication",
      "Modular design",
      "Industrial-grade construction",
      "Real-time monitoring",
      "Flexible programming environment"
    ]
  },

  // Variable Frequency Drives
  {
    id: 5002,
    name: "LS Industrial VFDs",
    model: "VFD Series",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "High-performance variable frequency drives for motor speed control with energy efficiency, precise control, and comprehensive protection features.",
    price: 890,
    rating: 4.7,
    reviews: 234,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg",
      "products/ls_industrial/medium_voltage_VFD_medium_voltage_VFD_medium-voltage-vfd-300x300_28da3219.jpg"
    ],
    inStock: true,
    badge: "Energy Efficient",
    specs: [
      "Motor speed control",
      "Energy efficiency optimization",
      "Precise control capabilities",
      "Comprehensive protection"
    ],
    features: [
      "Energy-saving operation",
      "Precise speed control",
      "Advanced protection features",
      "Easy programming",
      "Multiple control modes",
      "Communication interfaces"
    ]
  },

  // Susol Contactors
  {
    id: 5003,
    name: "Susol Contactors",
    model: "Susol",
    brand: "LS Industrial",
    category: "Contactors",
    description: "Reliable contactors for switching applications with excellent performance, long service life, and compact design for space-efficient installations.",
    price: 185,
    rating: 4.6,
    reviews: 298,
    images: [
      "products/ls_industrial/Magnetic_Contactor_meta-MEC-img_b088404f.png",
      "products/ls_industrial/magnetic_contactors/Magnetic Contactor.jpg",
      "products/ls_industrial/magnetic_contactors/Magnetic Contactor (1).jpg",
      "products/ls_industrial/magnetic_contactors/Magnetic Contactor (2).jpg"
    ],
    inStock: true,
    specs: [
      "Reliable switching performance",
      "Long service life",
      "Compact design",
      "Space-efficient installation"
    ],
    features: [
      "High reliability",
      "Easy installation",
      "Low maintenance",
      "Wide range of applications",
      "Standard DIN rail mounting",
      "Multiple auxiliary contacts available"
    ]
  },

  // Susol Overload Relays
  {
    id: 5004,
    name: "Susol Overload Relays",
    model: "Susol OR",
    brand: "LS Industrial",
    category: "Overload Relays",
    description: "Motor protection overload relays with adjustable current settings, temperature compensation, and reliable trip characteristics for motor protection applications.",
    price: 125,
    rating: 4.5,
    reviews: 187,
    images: [
      "products/ls_industrial/Overload_Relay_susol-overload-300x300_e0fd1b9f.jpg"
    ],
    inStock: true,
    specs: [
      "Adjustable current settings",
      "Temperature compensation",
      "Reliable trip characteristics",
      "Motor protection applications"
    ],
    features: [
      "Precise motor protection",
      "Easy current adjustment",
      "Temperature compensation",
      "Manual and automatic reset",
      "Auxiliary contacts",
      "DIN rail mounting"
    ]
  },

  // Susol Molded Case Circuit Breakers
  {
    id: 5005,
    name: "Susol Molded Case Circuit Breakers",
    model: "Susol MCCB",
    brand: "LS Industrial",
    category: "Circuit Breakers",
    description: "High-performance molded case circuit breakers with excellent breaking capacity, reliable protection, and compact design for industrial applications.",
    price: 485,
    rating: 4.7,
    reviews: 142,
    images: [
      "products/ls_industrial/new_Susol_UL_MCCB_new_Susol_UL_MCCB_new-Susol_UL_MCCB-300x300_655509b0.jpg"
    ],
    inStock: true,
    badge: "High Performance",
    specs: [
      "Excellent breaking capacity",
      "Reliable protection",
      "Compact design",
      "Industrial applications"
    ],
    features: [
      "High breaking capacity",
      "Reliable operation",
      "Easy installation",
      "Multiple protection functions",
      "Accessory compatibility",
      "UL listed"
    ]
  },

  // Susol UTE and UTS Series Circuit Breakers
  {
    id: 5006,
    name: "Susol UTE/UTS Series Circuit Breakers",
    model: "UTE/UTS",
    brand: "LS Industrial",
    category: "Circuit Breakers",
    description: "UL molded case circuit breakers with advanced protection features, high interrupting capacity, and reliable performance for commercial and industrial applications.",
    price: 625,
    rating: 4.8,
    reviews: 98,
    images: [
      "products/ls_industrial/new_Susol_UL_MCCB_new_Susol_UL_MCCB_new-Susol_UL_MCCB-300x300_655509b0.jpg"
    ],
    inStock: true,
    badge: "UL Listed",
    specs: [
      "Advanced protection features",
      "High interrupting capacity",
      "UL molded case design",
      "Commercial and industrial rated"
    ],
    features: [
      "UL listed",
      "High interrupting capacity",
      "Advanced trip units",
      "Communication options",
      "Easy maintenance",
      "Wide range of accessories"
    ]
  },

  // Susol Air Circuit Breakers
  {
    id: 5007,
    name: "Susol Air Circuit Breakers",
    model: "Susol ACB",
    brand: "LS Industrial",
    category: "Circuit Breakers",
    description: "High-capacity air circuit breakers for main distribution applications with advanced protection, remote operation capabilities, and comprehensive monitoring features.",
    price: 2850,
    rating: 4.9,
    reviews: 67,
    images: [
      "products/ls_industrial/air_circuit_breakers_air_circuit_breakers_air-circuit-breakers-300x300_35876d55.jpg"
    ],
    inStock: true,
    badge: "High Capacity",
    specs: [
      "High-capacity design",
      "Main distribution applications",
      "Advanced protection features",
      "Remote operation capabilities"
    ],
    features: [
      "High breaking capacity",
      "Advanced protection",
      "Remote operation",
      "Comprehensive monitoring",
      "Easy maintenance",
      "Communication interfaces"
    ]
  },

  // Starvert iV5 Series
  {
    id: 5008,
    name: "Starvert iV5 Series",
    model: "iV5",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "Compact variable frequency drives with advanced vector control, energy-saving features, and user-friendly operation for general-purpose applications.",
    price: 750,
    rating: 4.6,
    reviews: 178,
    images: [
      "products/ls_industrial/LS_starvert_iV5_LS_starvert_iV5_iV5-300x300_a5496187.jpg"
    ],
    inStock: true,
    specs: [
      "Advanced vector control",
      "Energy-saving features",
      "User-friendly operation",
      "General-purpose applications"
    ],
    features: [
      "Vector control",
      "Energy efficiency",
      "Easy programming",
      "Compact design",
      "Built-in EMC filter",
      "Multiple control modes"
    ]
  },

  // Starvert iS7 Series
  {
    id: 5009,
    name: "Starvert iS7 Series",
    model: "iS7",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "High-performance variable frequency drives with advanced control algorithms, excellent dynamic response, and comprehensive protection for demanding applications.",
    price: 1250,
    rating: 4.8,
    reviews: 134,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    badge: "High Performance",
    specs: [
      "Advanced control algorithms",
      "Excellent dynamic response",
      "Comprehensive protection",
      "Demanding applications"
    ],
    features: [
      "Advanced algorithms",
      "Excellent dynamics",
      "High precision",
      "Robust construction",
      "Communication options",
      "Easy maintenance"
    ]
  },

  // Starvert iP5A Series
  {
    id: 5010,
    name: "Starvert iP5A Series",
    model: "iP5A",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "Pump and fan optimized variable frequency drives with specialized algorithms, energy-saving features, and application-specific functions.",
    price: 950,
    rating: 4.7,
    reviews: 165,
    images: [
      "products/ls_industrial/Starvert_iP5A_LS_Starvert_iP5A_LS_iP5A-300x300_af011ef2.jpg"
    ],
    inStock: true,
    badge: "Pump & Fan Optimized",
    specs: [
      "Pump and fan optimization",
      "Specialized algorithms",
      "Energy-saving features",
      "Application-specific functions"
    ],
    features: [
      "Pump optimization",
      "Fan control",
      "Energy efficiency",
      "Sleep/wake function",
      "PID control",
      "Fire mode operation"
    ]
  },

  // Starvert iS5 Series
  {
    id: 5011,
    name: "Starvert iS5 Series",
    model: "iS5",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "Reliable variable frequency drives with proven performance, easy operation, and cost-effective solution for standard industrial applications.",
    price: 650,
    rating: 4.5,
    reviews: 223,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    specs: [
      "Proven performance",
      "Easy operation",
      "Cost-effective solution",
      "Standard industrial applications"
    ],
    features: [
      "Reliable operation",
      "Easy setup",
      "Cost effective",
      "Standard features",
      "Simple programming",
      "Maintenance-friendly"
    ]
  },

  // Starvert iH Series
  {
    id: 5012,
    name: "Starvert iH Series",
    model: "iH",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "Heavy-duty variable frequency drives designed for harsh industrial environments with enhanced protection, robust construction, and high reliability.",
    price: 1450,
    rating: 4.8,
    reviews: 89,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    badge: "Heavy Duty",
    specs: [
      "Heavy-duty design",
      "Harsh environment operation",
      "Enhanced protection",
      "High reliability"
    ],
    features: [
      "Harsh environment rated",
      "Enhanced protection",
      "Robust construction",
      "High reliability",
      "Extended temperature range",
      "Vibration resistant"
    ]
  },

  // Starvert iE5 Series
  {
    id: 5013,
    name: "Starvert iE5 Series",
    model: "iE5",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "Economy variable frequency drives offering essential features, reliable performance, and cost-effective motor control for basic applications.",
    price: 485,
    rating: 4.4,
    reviews: 267,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    badge: "Economy",
    specs: [
      "Essential features",
      "Reliable performance",
      "Cost-effective control",
      "Basic applications"
    ],
    features: [
      "Essential features",
      "Cost effective",
      "Reliable operation",
      "Simple setup",
      "Basic protection",
      "Compact size"
    ]
  },

  // Starvert iG5A Series
  {
    id: 5014,
    name: "Starvert iG5A Series",
    model: "iG5A",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "General-purpose variable frequency drives with balanced features, good performance, and versatile applications for standard motor control needs.",
    price: 725,
    rating: 4.6,
    reviews: 145,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    specs: [
      "Balanced features",
      "Good performance",
      "Versatile applications",
      "Standard motor control"
    ],
    features: [
      "Balanced performance",
      "Versatile applications",
      "Good value",
      "Standard features",
      "Easy operation",
      "Reliable design"
    ]
  },

  // Starvert iC5 Series
  {
    id: 5015,
    name: "Starvert iC5 Series",
    model: "iC5",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "Compact variable frequency drives with space-saving design, essential control features, and reliable operation for applications with space constraints.",
    price: 575,
    rating: 4.5,
    reviews: 198,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    badge: "Compact",
    specs: [
      "Space-saving design",
      "Essential control features",
      "Reliable operation",
      "Space-constrained applications"
    ],
    features: [
      "Compact design",
      "Space saving",
      "Essential features",
      "Reliable operation",
      "Easy installation",
      "Cost effective"
    ]
  },

  // LS Industrial Softstarters
  {
    id: 5016,
    name: "LS Industrial Softstarters",
    model: "Softstarter Series",
    brand: "LS Industrial",
    category: "Softstarters",
    description: "Motor softstarters providing smooth acceleration and deceleration, reduced starting current, and mechanical stress protection for motor-driven equipment.",
    price: 385,
    rating: 4.6,
    reviews: 156,
    images: [
      "products/ls_industrial/Softstarters_motor-soft-starter-medium-voltage-controller-19851-5172985-300x300_1a89c0b6.jpg"
    ],
    inStock: true,
    specs: [
      "Smooth acceleration/deceleration",
      "Reduced starting current",
      "Mechanical stress protection",
      "Motor-driven equipment"
    ],
    features: [
      "Smooth motor starting",
      "Current reduction",
      "Mechanical protection",
      "Energy savings",
      "Bypass contactors",
      "Protection features"
    ]
  },

  // SMART IO Series
  {
    id: 5017,
    name: "SMART IO Series",
    model: "SMART IO",
    brand: "LS Industrial",
    category: "I/O Modules",
    description: "Intelligent I/O modules with distributed control capabilities, flexible configuration, and seamless integration for industrial automation systems.",
    price: 285,
    rating: 4.7,
    reviews: 123,
    images: [
      "products/ls_industrial/smart-IO_smart-IO_smart-IO-300x300_d44e4fcd.jpg"
    ],
    inStock: true,
    badge: "Smart",
    specs: [
      "Distributed control capabilities",
      "Flexible configuration",
      "Seamless integration",
      "Industrial automation systems"
    ],
    features: [
      "Intelligent I/O",
      "Distributed control",
      "Flexible configuration",
      "Easy integration",
      "Diagnostic capabilities",
      "Communication interfaces"
    ]
  },

  // Optidrive PCE Series
  {
    id: 5018,
    name: "Optidrive PCE Series",
    model: "PCE",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "Performance-oriented variable frequency drives with advanced control features, high efficiency, and comprehensive functionality for demanding applications.",
    price: 1150,
    rating: 4.8,
    reviews: 98,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    badge: "Performance",
    specs: [
      "Advanced control features",
      "High efficiency",
      "Comprehensive functionality",
      "Demanding applications"
    ],
    features: [
      "Advanced control",
      "High efficiency",
      "Comprehensive features",
      "Performance oriented",
      "Multiple interfaces",
      "Robust design"
    ]
  },

  // Optidrive P2 Series
  {
    id: 5019,
    name: "Optidrive P2 Series",
    model: "P2",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "General-purpose variable frequency drives with proven reliability, user-friendly operation, and cost-effective performance for standard applications.",
    price: 675,
    rating: 4.6,
    reviews: 187,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    specs: [
      "Proven reliability",
      "User-friendly operation",
      "Cost-effective performance",
      "Standard applications"
    ],
    features: [
      "Proven reliability",
      "User friendly",
      "Cost effective",
      "Standard features",
      "Easy setup",
      "Maintenance friendly"
    ]
  },

  // Optidrive HVAC Series
  {
    id: 5020,
    name: "Optidrive HVAC Series",
    model: "HVAC",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "HVAC-optimized variable frequency drives with specialized functions for heating, ventilation, and air conditioning applications with energy-saving features.",
    price: 825,
    rating: 4.7,
    reviews: 143,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    badge: "HVAC Optimized",
    specs: [
      "HVAC optimization",
      "Specialized functions",
      "Energy-saving features",
      "HVAC applications"
    ],
    features: [
      "HVAC optimization",
      "Energy savings",
      "Specialized functions",
      "BMS integration",
      "PID control",
      "Fire mode"
    ]
  },

  // Optidrive HVAC Eco Series
  {
    id: 5021,
    name: "Optidrive HVAC Eco Series",
    model: "HVAC Eco",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "Economic HVAC variable frequency drives with essential features, energy efficiency, and cost-effective solution for basic HVAC applications.",
    price: 565,
    rating: 4.5,
    reviews: 167,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    badge: "Eco",
    specs: [
      "Essential HVAC features",
      "Energy efficiency",
      "Cost-effective solution",
      "Basic HVAC applications"
    ],
    features: [
      "Essential features",
      "Energy efficient",
      "Cost effective",
      "HVAC applications",
      "Simple operation",
      "Basic protection"
    ]
  },

  // Optidrive E2 Series
  {
    id: 5022,
    name: "Optidrive E2 Series",
    model: "E2",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "Economy variable frequency drives with essential control features, reliable operation, and budget-friendly pricing for basic motor control applications.",
    price: 445,
    rating: 4.4,
    reviews: 234,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    badge: "Economy",
    specs: [
      "Essential control features",
      "Reliable operation",
      "Budget-friendly pricing",
      "Basic motor control"
    ],
    features: [
      "Essential features",
      "Reliable operation",
      "Budget friendly",
      "Basic control",
      "Simple setup",
      "Cost effective"
    ]
  },

  // Optidrive E2 Single Phase
  {
    id: 5023,
    name: "Optidrive E2 Single Phase",
    model: "E2 Single Phase",
    brand: "LS Industrial",
    category: "Variable Frequency Drives",
    description: "Single-phase input variable frequency drives for small motor applications with compact design, easy installation, and reliable performance.",
    price: 365,
    rating: 4.5,
    reviews: 145,
    images: [
      "products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg"
    ],
    inStock: true,
    badge: "Single Phase",
    specs: [
      "Single-phase input",
      "Small motor applications",
      "Compact design",
      "Easy installation"
    ],
    features: [
      "Single phase input",
      "Compact design",
      "Easy installation",
      "Small motor control",
      "Reliable performance",
      "Cost effective"
    ]
  },

  // Programmable Logic Controls & HMI
  {
    id: 5024,
    name: "PLC & HMI Systems",
    model: "PLC-HMI",
    brand: "LS Industrial",
    category: "Human Machine Interface",
    description: "Integrated programmable logic controller and human machine interface systems for comprehensive automation control and monitoring applications.",
    price: 1850,
    rating: 4.8,
    reviews: 89,
    images: [
      "products/ls_industrial/Programmable_Logic_Controls_HMI_XGT-300x300_406e406a.jpg",
      "products/ls_industrial/XGT-panel-HMI_XGT-panel-HMI_XGT-panel-HMI-300x300_06fff377.jpg"
    ],
    inStock: true,
    badge: "Integrated System",
    specs: [
      "Integrated PLC and HMI",
      "Comprehensive automation control",
      "Monitoring applications",
      "Industrial automation systems"
    ],
    features: [
      "Integrated design",
      "Comprehensive control",
      "Advanced monitoring",
      "User-friendly interface",
      "Communication options",
      "Flexible programming"
    ]
  },

  // General Overload Relays
  {
    id: 5025,
    name: "LS Industrial Overload Relays",
    model: "OR Series",
    brand: "LS Industrial",
    category: "Overload Relays",
    description: "General-purpose overload relays for motor protection with adjustable current settings, reliable trip characteristics, and easy installation.",
    price: 95,
    rating: 4.5,
    reviews: 276,
    images: [
      "products/ls_industrial/Overload_Relay_susol-overload-300x300_e0fd1b9f.jpg"
    ],
    inStock: true,
    specs: [
      "Motor protection",
      "Adjustable current settings",
      "Reliable trip characteristics",
      "Easy installation"
    ],
    features: [
      "Motor protection",
      "Adjustable settings",
      "Reliable operation",
      "Easy installation",
      "Manual reset",
      "Auxiliary contacts"
    ]
  },

  // Master-K PLC Series
  {
    id: 5026,
    name: "Master-K PLC Series",
    model: "Master-K",
    brand: "LS Industrial",
    category: "Programmable Logic Controllers",
    description: "Comprehensive programmable logic controller series with modular design, high performance, and extensive communication capabilities for industrial automation.",
    price: 1250,
    rating: 4.7,
    reviews: 134,
    images: [
      "products/ls_industrial/master-K_master-K_master-K-300x300_71e634ff.jpg"
    ],
    inStock: true,
    badge: "Modular",
    specs: [
      "Modular design",
      "High performance",
      "Extensive communication",
      "Industrial automation"
    ],
    features: [
      "Modular architecture",
      "High-speed processing",
      "Multiple communication protocols",
      "Expandable I/O system",
      "Advanced programming environment",
      "Robust industrial design"
    ]
  },

  // Manual Motor Starters
  {
    id: 5027,
    name: "Manual Motor Starters",
    model: "MMS Series",
    brand: "LS Industrial",
    category: "Motor Starters",
    description: "Manual motor starters providing motor protection and control with integrated overload protection, compact design, and reliable operation.",
    price: 145,
    rating: 4.5,
    reviews: 189,
    images: [
      "products/ls_industrial/Manual_Motor_Starter_susol-circuit-breakers-300x300_622af47f.jpg"
    ],
    inStock: true,
    specs: [
      "Integrated overload protection",
      "Compact design",
      "Reliable operation",
      "Motor control and protection"
    ],
    features: [
      "Manual operation",
      "Overload protection",
      "Compact design",
      "Easy installation",
      "Wide current range",
      "DIN rail mounting"
    ]
  }
]

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'All Products') return lsIndustrialProducts
  return lsIndustrialProducts.filter(p => p.category === category)
}

// Get unique categories
export const getUniqueCategories = (): string[] => {
  const categories = Array.from(new Set(lsIndustrialProducts.map(p => p.category)))
  return ['All Products', ...categories]
}

// Get featured products (highest rated)
export const getFeaturedProducts = (limit: number = 3): Product[] => {
  return lsIndustrialProducts
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
} 