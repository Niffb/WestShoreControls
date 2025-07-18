import { Product } from '@/lib/types/shared-types'
import { getImageUrl } from '@/lib/config/image-config'
import mitsuADrives from '@/lib/data/mitsu-a-drives.json'
import frDrives from '@/lib/data/fra860.json'
import frFDrives from '@/lib/data/fr-f.json'

// Define types for the JSON data
interface DriveData {
  brand: string;
  sku: string;
  description: string;
  availability: string;
  categories: string[];
}

// FR-F drives mapping from the imported JSON data
const frfDriveProducts: Product[] = frFDrives.map((drive, index) => {
  // Check if this is an FR-F900 drive by model number
  const isF900Drive = drive.model.includes("FR-F9") || drive.model.toLowerCase().includes("f900");
  
  return {
    id: 51000 + index, // Starting from 51000 to avoid ID conflicts
    name: `${drive.model} ${isF900Drive ? 'FR-F900' : 'FR-F800'} Series Inverter`,
    model: drive.model,
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    subcategory: "FR-F800 Series Inverters",
    description: drive.description || `Mitsubishi ${isF900Drive ? 'FR-F900' : 'FR-F800'} Series Variable Frequency Drive`,
    rating: 4.8,
    reviews: Math.floor(Math.random() * 20) + 5,
    // Use the correct relative image paths for both F900 and F800 drives
    images: [isF900Drive ? "assets/images/products/mitsubishi/mitsubishi-electric-FA-f800.webp" : "assets/images/products/mitsubishi/drives/Mitsubishi_F800_Series_300x300_019b1561-110c-4fb4-a377-1493b5180803_medium.avif"],
    inStock: drive.availability === "IN STOCK",
    specs: [
      `FREQROL ${isF900Drive ? 'FR-F900' : 'FR-F800'} Series`,
      "Optimized for fans, pumps and compressors",
      "High energy savings",
      "Robust design for industrial environments"
    ],
    features: [
      "Energy optimization algorithms",
      "Advanced environmental resistance",
      "Modbus RTU/Ethernet communication",
      "Wide output frequency range (0.2-590Hz)"
    ],
    downloads: [
      {
        name: "FR-F800 Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-f800-catalog.pdf",
        type: "pdf"
      }
    ]
  };
});

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
    images: [getImageUrl("mitsubishi/controllers/melsec-iq-r-series.png")],
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
    ],
    downloads: [
      {
        name: "Melsec IQ-F and IQ-R Motion Controllers - Brochure",
        url: "https://cdn.kyklo.co/assets/W1siZiIsIjIwMjQvMDIvMTEvMDkvNTYvNTcvNWZkODJjODktZTEwNS00YmYwLThjZjAtZWQyYjUyNzM3YjIyL01pdHN1YmlzaGklMjBFbGVjdHJpYyUyMC0lMjBNRUxTRUMlMjBpUS1GJTIwU2VyaWVzJTIwLSUyMENhdGFsb2cucGRmIl1d?sha=0d8a7173c805e1dd",
        type: "pdf"
      }
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
    ],
    downloads: [
      {
        name: "MELSEC iQ-F Series - Catalog",
        url: "https://cdn.kyklo.co/assets/W1siZiIsIjIwMjQvMDIvMTEvMTAvMDIvMjIvMDEwMmFmZGEtYTE4OS00MDFlLWI5MGYtN2IwZTZiNTlkMGQyL01pdHN1YmlzaGklMjBFbGVjdHJpYyUyMC0lMjBNRUxTRUMlMjBpUS1GJTIwU2VyaWVzJTIwLSUyMENhdGFsb2cucGRmIl1d?sha=659258f6c58dbc77",
        type: "pdf"
      },
      {
        name: "Melsec IQ-F and IQ-R Motion Controllers - Brochure",
        url: "https://cdn.kyklo.co/assets/W1siZiIsIjIwMjQvMDIvMTEvMDkvNTYvNTcvNWZkODJjODktZTEwNS00YmYwLThjZjAtZWQyYjUyNzM3YjIyL01pdHN1YmlzaGklMjBFbGVjdHJpYyUyMC0lMjBpUS1SJTIwYW5kJTIwaVEtRiUyMG1vdGlvbiUyMGNvbnRyb2xsZXJzJTIwLSUyMEJyb2NodXJlLnBkZiJdXQ?sha=0d8a7173c805e1dd",
        type: "pdf"
      }
    ]
  },

  {
    id: 50007,
    name: "MELSEC-A Series AnS/QnAS",
    model: "AnS/QnAS",
    brand: "Mitsubishi",
    category: "Controllers",
    description: "The MELSEC-A series AnS/QnAS programmable controllers provide reliable control solutions with compact design and proven performance for various industrial applications.",
    price: 1250,
    rating: 4.5,
    reviews: 95,
    images: [getImageUrl("mitsubishi/controllers/melsec-a-series.png")],
    inStock: true,
    specs: [
      "Compact design",
      "Reliable performance",
      "Industrial automation control",
      "Legacy system compatibility"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products/cnt/plc",
    features: [
      "Proven reliability",
      "Compatible with existing systems",
      "Simple operation",
      "Cost-effective control solution"
    ],
    downloads: [
      {
        name: "MELSEC-A Series - AnS-QnAS - Catalog",
        url: "https://cdn.kyklo.co/assets/W1siZiIsIjIwMjQvMDIvMTEvMTAvMDcvMTgvMDFlODk2N2ItMWU2Ny00NzgyLTk0ZjktNzhlMmI4Y2M5ZWQxL01pdHN1YmlzaGklMjBFbGVjdHJpYyUyMC0lMjBNRUxTRUMtQSUyMHNlcmllcyUyMC0lMjBBblMtUW5BUyUyMC0lMjBDYXRhbG9nLnBkZiJdXQ?sha=bb98a8752073672e",
        type: "pdf"
      }
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
    ],
    downloads: [
      {
        name: "Motion Controller with SSCNET - Safety FA Solutions",
        url: "https://cdn.kyklo.co/assets/W1siZiIsIjIwMjQvMDIvMTEvMTAvMDkvMzkvZjIxNDFiYmQtNWY0NS00MWU4LThlYzUtNjAzNDFmNjQ1YWRiL01pdHN1YmlzaGklMjBFbGVjdHJpYyUyMC0lMjBNRUxTRUMtUVMtV1MlMjAtJTIwU2FmZXR5JTIwRkElMjBzb2x1dGlvbnMlMjAtJTIwQ2F0YWxvZy5wZGYiXV0?sha=3363e034b16929f8",
        type: "pdf"
      },
      {
        name: "Melsec IQ-F and IQ-R Motion Controllers - Brochure",
        url: "https://cdn.kyklo.co/assets/W1siZiIsIjIwMjQvMDIvMTEvMDkvNTYvNTcvNWZkODJjODktZTEwNS00YmYwLThjZjAtZWQyYjUyNzM3YjIyL01pdHN1YmlzaGklMjBFbGVjdHJpYyUyMC0lMjBpUS1SJTIwYW5kJTIwaVEtRiUyMG1vdGlvbiUyMGNvbnRyb2xsZXJzJTIwLSUyMEJyb2NodXJlLnBkZiJdXQ?sha=0d8a7173c805e1dd",
        type: "pdf"
      }
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
    images: ["assets/images/products/mitsubishi/servo-motors/Mitsubishi_MELSERVO_J5_medium.avif"],
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
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_D700_Series_300x300_72a55542-e148-4d3c-aa1b-ef4bcddb54fd_medium.avif"],
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

  // Drive Products - A800 Series Inverters
  {
    id: 50010,
    name: "FREQROL-A800 Plus Series Inverter",
    model: "FR-A800 Plus",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    subcategory: "FR-A800 Plus Series Inverters",
    description: "The FREQROL-A800 Plus Series inverters represent Mitsubishi Electric's premium line of variable frequency drives, offering advanced motor control, enhanced energy savings, and superior system integration capabilities. These drives support various industrial applications with features like extended conformal coating, Ethernet connectivity, and high-precision motor control.",
    price: null,
    rating: 4.9,
    reviews: 85,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    badge: "Premium",
    specs: [
      "Input voltage range: 200-240VAC (3-phase) or 380-500VAC (3-phase)",
      "Power range: 0.4kW to 280kW",
      "Advanced motor control with Real Sensorless Vector Control",
      "Built-in Ethernet/IP and Modbus RTU communication",
      "Extended conformal coating for harsh environments",
      "High-speed response with 1ms or less sampling",
      "Multiple control modes including V/F, Advanced Magnetic Flux Vector Control"
    ],
    features: [
      "Advanced energy-saving algorithms",
      "Enhanced system protection features",
      "Integrated PLC functionality",
      "USB programming port",
      "Supports various motor types including PM motors",
      "Extended life design with 10-year maintenance free operation"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "FR-A800 Plus Series Installation Guide",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-installation.pdf",
        type: "pdf"
      },
      {
        name: "FR-A800 Plus Series Programming Manual",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-programming.pdf",
        type: "pdf"
      },
      {
        name: "FR-A800 Plus Series Technical Guide",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-technical.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },

  // Drive Products - A800 Series Inverters - Specific Models
  {
    id: 50014,
    name: "FR-A820-00046-1-60 A800 Plus Series Inverter",
    model: "FR-A820-00046-1-60",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    subcategory: "FR-A800 Plus Series Inverters",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 200Vac-240Vac (3-phase/3P) - 400W / 0.4kW / 1/2HP - 3A (ND Normal Duty)",
    rating: 4.9,
    reviews: 15,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    specs: [
      "Input: 200-240VAC (3-phase)",
      "Power: 400W / 0.4kW / 1/2HP",
      "Current: 3A (ND Normal Duty)",
      "Frequency: 0.2-590Hz",
      "Conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port",
      "Conformal coating protection"
    ],
    downloads: [
      {
        name: "FR-A820-00046-1-60 Datasheet",
        url: "/downloads/mitsubishi/drives/fr-a820-00046-1-60-datasheet.pdf",
        type: "pdf"
      },
      {
        name: "FR-A800 Plus Series Technical Guide",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-technical.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50015,
    name: "FR-A820-00046-1-N6 A800 Plus Series Inverter",
    model: "FR-A820-00046-1-N6",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    subcategory: "FR-A800 Plus Series Inverters",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 200Vac-240Vac (3-phase/3P) - 400W / 0.4kW / 1/2HP - 3A (ND Normal Duty)",
    rating: 4.9,
    reviews: 12,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    specs: [
      "Input: 200-240VAC (3-phase)",
      "Power: 400W / 0.4kW / 1/2HP",
      "Current: 3A (ND Normal Duty)",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50016,
    name: "FR-A840-00023-1-60 A800 Plus Series Inverter",
    model: "FR-A840-00023-1-60",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    subcategory: "FR-A800 Plus Series Inverters",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 400W / 0.4kW / 1/2HP - 1.5A (ND Normal Duty)",
    rating: 4.9,
    reviews: 18,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 400W / 0.4kW / 1/2HP",
      "Current: 1.5A (ND Normal Duty)",
      "Conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50017,
    name: "FR-A840-00038-1-60 A800 Plus Series Inverter",
    model: "FR-A840-00038-1-60",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    subcategory: "FR-A800 Plus Series Inverters",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 750W / 0.75kW / 1HP - 2.5A (ND Normal Duty)",
    rating: 4.7,
    reviews: 16,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 750W / 0.75kW / 1HP",
      "Current: 2.5A (ND Normal Duty)",
      "Frequency: 0.2-590Hz",
      "Conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port",
      "Conformal coating protection"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50018,
    name: "FR-A840-02160-1-U6 A800 Plus Series Inverter",
    model: "FR-A840-02160-1-U6",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 75kW / 100HP - 144A (ND Normal Duty)",
    rating: 4.9,
    reviews: 22,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 75kW / 100HP",
      "Current: 144A (ND Normal Duty)",
      "Conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50019,
    name: "FR-A840-04320-1-06 A800 Plus Series Inverter",
    model: "FR-A840-04320-1-06",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 160kW / 250HP - 325A (ND Normal Duty)",
    rating: 4.9,
    reviews: 16,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 160kW / 250HP",
      "Current: 325A (ND Normal Duty)",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50020,
    name: "FR-A840-06830-1-06 A800 Plus Series Inverter",
    model: "FR-A840-06830-1-06",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 280kW / 400HP - 547A (ND Normal Duty)",
    rating: 4.9,
    reviews: 10,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 280kW / 400HP",
      "Current: 547A (ND Normal Duty)",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },

  // Industrial Robots
  {
    id: 50011,
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
    id: 50012,
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
    id: 50013,
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
  },

  // Added A800 Series Inverters from mitsu-a-drives.json
  {
    id: 50050,
    name: "FR-A820-00046-2-60 A800 Plus Series Inverter",
    model: "FR-A820-00046-2-60",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with conformal coating + CA term (0-20mA) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 200Vac-240Vac (3-phase/3P) - 400W / 0.4kW / 1/2HP - 3A (ND Normal Duty) - frequency (output) 0.2-590Hz",
    rating: 4.8,
    reviews: 16,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    specs: [
      "Input: 200-240VAC (3-phase)",
      "Power: 400W / 0.4kW / 1/2HP",
      "Current: 3A (ND Normal Duty)",
      "Frequency: 0.2-590Hz",
      "Conformal coating",
      "CA terminal (0-20mA)"
    ],
    features: [
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port",
      "Conformal coating protection"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50051,
    name: "FR-A820-00046-E1N6 A800 Plus Series Inverter",
    model: "FR-A820-00046-E1N6",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with Ethernet card + extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 200Vac-240Vac (3-phase/3P) - 400W / 0.4kW / 1/2HP - 3A (ND Normal Duty)",
    rating: 4.9,
    reviews: 22,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    badge: "IN STOCK",
    specs: [
      "Input: 200-240VAC (3-phase)",
      "Power: 400W / 0.4kW / 1/2HP",
      "Current: 3A (ND Normal Duty)",
      "Ethernet card included",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Built-in Ethernet connectivity",
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50052,
    name: "FR-A820-00077-1-60 A800 Plus Series Inverter",
    model: "FR-A820-00077-1-60",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 200Vac-240Vac (3-phase/3P) - 750W / 0.75kW / 1HP - 5A (ND Normal Duty) - frequency (output) 0.2-590Hz",
    rating: 4.7,
    reviews: 18,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    specs: [
      "Input: 200-240VAC (3-phase)",
      "Power: 750W / 0.75kW / 1HP",
      "Current: 5A (ND Normal Duty)",
      "Frequency: 0.2-590Hz",
      "Conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port",
      "Conformal coating protection"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50053,
    name: "FR-A820-00077-1-N6 A800 Plus Series Inverter",
    model: "FR-A820-00077-1-N6",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 200Vac-240Vac (3-phase/3P) - 750W / 0.75kW / 1HP - 5A (ND Normal Duty)",
    rating: 4.8,
    reviews: 19,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    badge: "IN STOCK",
    specs: [
      "Input: 200-240VAC (3-phase)",
      "Power: 750W / 0.75kW / 1HP",
      "Current: 5A (ND Normal Duty)",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50054,
    name: "FR-A820-00077-E1N6 A800 Plus Series Inverter",
    model: "FR-A820-00077-E1N6",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with Ethernet card + extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 200Vac-240Vac (3-phase/3P) - 750W / 0.75kW / 1HP - 5A (ND Normal Duty)",
    rating: 4.9,
    reviews: 21,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    badge: "IN STOCK",
    specs: [
      "Input: 200-240VAC (3-phase)",
      "Power: 750W / 0.75kW / 1HP",
      "Current: 5A (ND Normal Duty)",
      "Ethernet card included",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Built-in Ethernet connectivity",
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50055,
    name: "FR-A840-00023-1-N6 A800 Plus Series Inverter",
    model: "FR-A840-00023-1-N6",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 400W / 0.4kW / 1/2HP - 1.5A (ND Normal Duty)",
    rating: 4.8,
    reviews: 17,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    badge: "IN STOCK",
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 400W / 0.4kW / 1/2HP",
      "Current: 1.5A (ND Normal Duty)",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50056,
    name: "FR-A840-00023-E1N6 A800 Plus Series Inverter",
    model: "FR-A840-00023-E1N6",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with Ethernet card + extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 400W / 0.4kW / 1/2HP - 1.5A (ND Normal Duty)",
    rating: 4.9,
    reviews: 23,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    badge: "IN STOCK",
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 400W / 0.4kW / 1/2HP",
      "Current: 1.5A (ND Normal Duty)",
      "Ethernet card included",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Built-in Ethernet connectivity",
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50057,
    name: "FR-A840-00038-1-60 A800 Plus Series Inverter",
    model: "FR-A840-00038-1-60",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 750W / 0.75kW / 1HP - 2.5A (ND Normal Duty) - frequency (output) 0.2-590Hz",
    rating: 4.7,
    reviews: 16,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 750W / 0.75kW / 1HP",
      "Current: 2.5A (ND Normal Duty)",
      "Frequency: 0.2-590Hz",
      "Conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port",
      "Conformal coating protection"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50058,
    name: "FR-A840-00038-1-N6 A800 Plus Series Inverter",
    model: "FR-A840-00038-1-N6",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 750W / 0.75kW / 1HP - 2.5A (ND Normal Duty)",
    rating: 4.8,
    reviews: 18,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    badge: "IN STOCK",
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 750W / 0.75kW / 1HP",
      "Current: 2.5A (ND Normal Duty)",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50059,
    name: "FR-A840-00038-E1N6 A800 Plus Series Inverter",
    model: "FR-A840-00038-E1N6",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with Ethernet card + extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 750W / 0.75kW / 1HP - 2.5A (ND Normal Duty)",
    rating: 4.9,
    reviews: 22,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    badge: "IN STOCK",
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 750W / 0.75kW / 1HP",
      "Current: 2.5A (ND Normal Duty)",
      "Ethernet card included",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Built-in Ethernet connectivity",
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50060,
    name: "FR-A840-00052-1-60 A800 Plus Series Inverter",
    model: "FR-A840-00052-1-60",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 1.5kW / 2HP - 4A (ND Normal Duty) - frequency (output) 0.2-590Hz",
    rating: 4.8,
    reviews: 19,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    badge: "IN STOCK",
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 1.5kW / 2HP",
      "Current: 4A (ND Normal Duty)",
      "Frequency: 0.2-590Hz",
      "Conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port",
      "Conformal coating protection"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50061,
    name: "FR-A840-00052-1-N6 A800 Plus Series Inverter",
    model: "FR-A840-00052-1-N6",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 1.5kW / 2HP - 4A (ND Normal Duty)",
    rating: 4.8,
    reviews: 20,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    badge: "IN STOCK",
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 1.5kW / 2HP",
      "Current: 4A (ND Normal Duty)",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality",
      "USB programming port"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  {
    id: 50062,
    name: "FR-A840-00052-E1N6 A800 Plus Series Inverter",
    model: "FR-A840-00052-E1N6",
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: "Variable Speed/Frequency Drive (VSD/VFD) / Inverter with Ethernet card + extended conformal coating + FM term. (PTO output) - Mitsubishi Electric (FREQROL FR-A800 Plus series) - input 380Vac-500Vac (3-phase/3P) - 1.5kW / 2HP - 4A (ND Normal Duty)",
    rating: 4.9,
    reviews: 25,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: true,
    badge: "IN STOCK",
    specs: [
      "Input: 380-500VAC (3-phase)",
      "Power: 1.5kW / 2HP",
      "Current: 4A (ND Normal Duty)",
      "Ethernet card included",
      "Extended conformal coating",
      "FM terminal (PTO output)"
    ],
    features: [
      "Built-in Ethernet connectivity",
      "Extended conformal coating protection",
      "Advanced energy-saving algorithms",
      "Enhanced system protection",
      "Integrated PLC functionality"
    ],
    downloads: [
      {
        name: "FR-A800 Plus Series Catalog",
        url: "/downloads/mitsubishi/drives/fr-a800-plus-catalog.pdf",
        type: "pdf"
      },
      {
        name: "MilServo J2 Super Brochure",
        url: "/downloads/mitsubishi/drives/MilServo-J2-Super-Brochure.pdf",
        type: "pdf"
      }
    ]
  },
  
  // Add FR-A860 Series drives from JSON
  ...(frDrives as DriveData[]).map((drive, index) => ({
    id: 51000 + index,
    name: `Mitsubishi ${drive.sku} Inverter`,
    model: drive.sku,
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: drive.description,
    price: undefined,
    rating: 4.7,
    reviews: 84,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: drive.availability === "IN STOCK",
    badge: drive.availability === "IN STOCK" ? "In Stock" : undefined,
    specs: [
      "FR-A800 Series VFD/Inverter",
      drive.description.includes("600Vac") ? "600VAC Input" : "Input voltage varies by model",
      drive.description.match(/\d+HP/) ? drive.description.match(/\d+HP/)[0] : "Multiple HP ratings available",
      "Frequency output 0.2-590Hz"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products",
    features: [
      "Precise motor control",
      "Energy saving operation",
      "Multiple communication options",
      "Advanced protection functions"
    ]
  })),
  
  // Add FREQROL A800 Plus drives from existing JSON
  ...(mitsuADrives as DriveData[]).map((drive, index) => ({
    id: 52000 + index,
    name: `Mitsubishi ${drive.sku} Inverter`,
    model: drive.sku,
    brand: "Mitsubishi",
    category: "Variable Frequency Drives",
    description: drive.description,
    price: undefined,
    rating: 4.8,
    reviews: 76,
    images: ["assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif"],
    inStock: drive.availability === "IN STOCK",
    badge: drive.availability === "IN STOCK" ? "In Stock" : undefined,
    specs: [
      "FREQROL FR-A800 Plus Series",
      drive.description.match(/\d+HP/) ? drive.description.match(/\d+HP/)[0] : 
        drive.description.match(/\d+kW/) ? drive.description.match(/\d+kW/)[0] : "Multiple power ratings",
      drive.description.includes("200Vac") ? "200-240VAC Input" : 
        drive.description.includes("380Vac") ? "380-500VAC Input" : "Input voltage varies by model",
      "Frequency output 0.2-590Hz"
    ],
    url: "https://gb.mitsubishielectric.com/fa/products",
    features: [
      "Advanced drive technology",
      "High-performance motor control",
      "Multiple communication options",
      "Built-in safety functions"
    ]
  })),

  // Add FR-F drives from frFDrives JSON
  ...frfDriveProducts
]

// Helper functions for product management
export const getMitsubishiProductsByCategory = (category: string): Product[] => {
  return mitsubishiProducts.filter(product => product.category === category)
}

export const getMitsubishiProductsByCategoryAndSubcategory = (category: string, subcategory: string): Product[] => {
  return mitsubishiProducts.filter((product) => 
    product.category === category && 
    product.subcategory === subcategory
  )
}

export const getMitsubishiSubcategoriesByCategory = (category: string): string[] => {
  const subcategories = new Set<string>()
  
  mitsubishiProducts
    .filter(product => product.category === category && product.subcategory)
    .forEach(product => {
      if (product.subcategory) {
        subcategories.add(product.subcategory)
      }
    })
    
  return Array.from(subcategories)
}

export const searchMitsubishiProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return mitsubishiProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    (product.specs && product.specs.some(spec => spec.toLowerCase().includes(lowercaseQuery))) ||
    (product.features && product.features.some(feature => feature.toLowerCase().includes(lowercaseQuery)))
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