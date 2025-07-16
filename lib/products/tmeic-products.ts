import { Product } from '@/lib/types/shared-types'

// TMEIC Products based on scraped data
// Organized by main categories: Variable Frequency Drives, PV Inverters, Energy Storage, Motors, Controllers
export const tmeicProducts: Product[] = [
  // Variable Frequency Drives - TMdrive Series
  {
    id: 60001,
    name: "TMdrive-10",
    model: "TMdrive-10",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "TMEIC's TM-10 family of low-voltage system drives has been designed to lower your cost of ownership with numerous space-saving and maintenance features.",
    price: 3200,
    rating: 5.0,
    reviews: 89,
    images: ["images/tmeic/TMdrive-10/TMdrive-10-angle.png"],
    inStock: true,
    badge: "Popular",
    specs: [
      "Low Voltage",
      "Space-Saving",
      "Low Maintenance",
      "Cost Effective"
    ],
    url: "https://www.tmeic.com/products/low-voltage-ac-drives",
    features: [
      "Space-saving design",
      "Maintenance-friendly features",
      "Low cost of ownership",
      "Reliable operation"
    ]
  },

  {
    id: 60002,
    name: "TMdrive-10e2",
    model: "TMdrive-10e2",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "Advanced low voltage drive system with enhanced performance and efficiency features.",
    price: 3800,
    rating: 4.9,
    reviews: 67,
    images: ["images/tmeic/TMdrive-10e2/product-tmdrive-10e2-doors-open.png"],
    inStock: true,
    specs: [
      "Enhanced Performance",
      "High Efficiency",
      "Advanced Control",
      "Low Voltage"
    ],
    url: "https://www.tmeic.com/products/tmdrive-10e2",
    features: [
      "Enhanced performance capability",
      "High efficiency operation",
      "Advanced control algorithms",
      "Improved reliability"
    ]
  },

  {
    id: 60003,
    name: "TMdrive-30",
    model: "TMdrive-30",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "Medium voltage drive for industrial applications requiring high power and precision control.",
    price: 8500,
    rating: 4.8,
    reviews: 45,
    images: ["images/tmeic/TMdrive-30/TMdrive-30-angle.png"],
    inStock: true,
    badge: "Industrial",
    specs: [
      "Medium Voltage",
      "High Power",
      "Precision Control",
      "Industrial Grade"
    ],
    url: "https://www.tmeic.com/products/tmdrive-30",
    features: [
      "Medium voltage capability",
      "High power handling",
      "Precision motor control",
      "Industrial durability"
    ]
  },

  {
    id: 60004,
    name: "TMdrive-50",
    model: "TMdrive-50",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "High-performance medium voltage drive designed for demanding industrial applications.",
    price: 12500,
    rating: 4.9,
    reviews: 38,
    images: ["images/tmeic/TMdrive-50/TMdrive-50-angle.png"],
    inStock: true,
    specs: [
      "High Performance",
      "Medium Voltage",
      "Demanding Applications",
      "Robust Design"
    ],
    url: "https://www.tmeic.com/products/tmdrive-50",
    features: [
      "High performance operation",
      "Demanding application capability",
      "Robust construction",
      "Advanced motor control"
    ]
  },

  {
    id: 60005,
    name: "TMdrive-70",
    model: "TMdrive-70",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "The TMdrive-70 from TMEIC is a high-power, water-cooled, precise and rugged, fully digitalized vector-controlled three-level pulse width modulated drive.",
    price: 18500,
    rating: 4.9,
    reviews: 32,
    images: ["images/tmeic/TMdrive-70/TMdrive-70-angle.png"],
    inStock: true,
    badge: "High Power",
    specs: [
      "High Power",
      "Water-Cooled",
      "Precise Control",
      "Rugged Design"
    ],
    url: "https://www.tmeic.com/products/tmdrive-70",
    features: [
      "High-power capability",
      "Water-cooled design",
      "Precise control",
      "Rugged construction",
      "Digitalized vector control",
      "Three-level PWM"
    ]
  },

  {
    id: 60006,
    name: "TMdrive-70e2",
    model: "TMdrive-70e2",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "Enhanced version of the TMdrive-70 with improved performance and advanced features.",
    price: 21000,
    rating: 4.9,
    reviews: 28,
    images: ["images/tmeic/TMdrive-70e2/TMdrive-70e2-angle.png"],
    inStock: true,
    specs: [
      "Enhanced Performance",
      "Advanced Features",
      "High Power",
      "Improved Design"
    ],
    url: "https://www.tmeic.com/products/tmdrive-70e2",
    features: [
      "Enhanced performance capability",
      "Advanced control features",
      "High power handling",
      "Improved reliability"
    ]
  },

  {
    id: 60007,
    name: "TMdrive-MVe2",
    model: "TMdrive-MVe2",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "The TMdrive-MVe2 is a medium voltage, AC fed drive designed for high-efficiency and power-friendly operation in a broad range of industrial applications.",
    price: 15800,
    rating: 5.0,
    reviews: 62,
    images: ["images/tmeic/TMdrive-MVe2/Product-MVe2-2.png"],
    inStock: true,
    badge: "Featured",
    specs: [
      "3.3-7.2 kV",
      "NEMA Type",
      "High Efficiency",
      "Power-Friendly"
    ],
    url: "https://www.tmeic.com/products/medium-voltage-ac-drives",
    features: [
      "High-efficiency operation",
      "Power-friendly design",
      "Broad application range",
      "Medium voltage capability"
    ]
  },

  {
    id: 60008,
    name: "TMdrive-MVG",
    model: "TMdrive-MVG",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "Medium voltage drive with advanced grid-friendly features for utility and industrial applications.",
    price: 16500,
    rating: 4.8,
    reviews: 34,
    images: ["images/tmeic/TMdrive-MVG/TMdrive-MVG2-angle.png"],
    inStock: true,
    specs: [
      "Grid-Friendly",
      "Medium Voltage",
      "Utility Grade",
      "Advanced Features"
    ],
    url: "https://www.tmeic.com/products/tmdrive-mvg",
    features: [
      "Grid-friendly operation",
      "Utility-grade performance",
      "Advanced control features",
      "Robust construction"
    ]
  },

  {
    id: 60009,
    name: "TMdrive-MVG2",
    model: "TMdrive-MVG2",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "Next generation medium voltage drive with enhanced grid support capabilities.",
    price: 19200,
    rating: 4.9,
    reviews: 28,
    images: ["images/tmeic/TMdrive-MVG2/product-mvdrive-TMdrive-MVG2.png"],
    inStock: true,
    badge: "Next Gen",
    specs: [
      "Next Generation",
      "Enhanced Grid Support",
      "Medium Voltage",
      "Advanced Control"
    ],
    url: "https://www.tmeic.com/products/tmdrive-mvg2",
    features: [
      "Next generation technology",
      "Enhanced grid support",
      "Advanced control algorithms",
      "Improved performance"
    ]
  },

  {
    id: 60010,
    name: "TMdrive-XL55",
    model: "TMdrive-XL55",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "High-power medium voltage drive designed for extra-large industrial applications.",
    price: 25000,
    rating: 4.9,
    reviews: 22,
    images: ["images/tmeic/TMdrive-XL55/product-mvdrive-TMdrive-XL55_0.png"],
    inStock: true,
    badge: "High Power",
    specs: [
      "Extra Large",
      "High Power",
      "Medium Voltage",
      "Industrial Applications"
    ],
    url: "https://www.tmeic.com/products/tmdrive-xl55",
    features: [
      "Extra-large capacity",
      "High power handling",
      "Industrial-grade design",
      "Advanced performance"
    ]
  },

  {
    id: 60011,
    name: "TMdrive-XL75",
    model: "TMdrive-XL75",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "Ultra-high power medium voltage drive for the most demanding industrial applications.",
    price: 32000,
    rating: 5.0,
    reviews: 18,
    images: ["images/tmeic/TMdrive-XL75/product-mvdrive-TMdrive-XL75_0.png"],
    inStock: true,
    badge: "Ultra Power",
    specs: [
      "Ultra High Power",
      "Most Demanding Applications",
      "Medium Voltage",
      "Premium Performance"
    ],
    url: "https://www.tmeic.com/products/tmdrive-xl75",
    features: [
      "Ultra-high power capability",
      "Most demanding applications",
      "Premium performance level",
      "Advanced technology"
    ]
  },

  {
    id: 60012,
    name: "TMdrive-XL80",
    model: "TMdrive-XL80",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "Top-tier ultra-high power medium voltage drive for the largest industrial applications.",
    price: 38000,
    rating: 5.0,
    reviews: 15,
    images: ["images/tmeic/TMdrive-XL80/product-mvdrives-tmdirve-xl80.png"],
    inStock: true,
    badge: "Top Tier",
    specs: [
      "Top Tier",
      "Ultra High Power",
      "Largest Applications",
      "Maximum Performance"
    ],
    url: "https://www.tmeic.com/products/tmdrive-xl80",
    features: [
      "Top-tier performance",
      "Ultra-high power",
      "Largest industrial applications",
      "Maximum capability"
    ]
  },

  {
    id: 60013,
    name: "TMdrive-XL85",
    model: "TMdrive-XL85",
    brand: "TMEIC",
    category: "Variable Frequency Drives",
    description: "Premium ultra-high power medium voltage drive with cutting-edge technology.",
    price: 42000,
    rating: 5.0,
    reviews: 12,
    images: ["images/tmeic/TMdrive-XL85/XL85-no-bg.png"],
    inStock: true,
    badge: "Premium",
    specs: [
      "Premium Class",
      "Cutting-Edge Technology",
      "Ultra High Power",
      "Advanced Performance"
    ],
    url: "https://www.tmeic.com/products/tmdrive-xl85",
    features: [
      "Premium performance class",
      "Cutting-edge technology",
      "Ultra-high power capability",
      "Advanced control systems"
    ]
  },

  // DC Drives
  {
    id: 60014,
    name: "TMdrive-DC",
    model: "TMdrive-DC",
    brand: "TMEIC",
    category: "DC Drives",
    description: "High-performance DC drive system for precise motor control applications.",
    price: 8900,
    rating: 4.8,
    reviews: 54,
    images: ["images/tmeic/TMdrive-DC/product-dcdrives-tmdc.png"],
    inStock: true,
    specs: [
      "DC Drive System",
      "Precise Control",
      "High Performance",
      "Motor Applications"
    ],
    url: "https://www.tmeic.com/products/tmdrive-dc",
    features: [
      "Precise motor control",
      "High performance operation",
      "DC drive technology",
      "Reliable performance"
    ]
  },

  {
    id: 60015,
    name: "TMdrive-DCe2",
    model: "TMdrive-DCe2",
    brand: "TMEIC",
    category: "DC Drives",
    description: "Enhanced DC drive system with improved performance and advanced features.",
    price: 11200,
    rating: 4.9,
    reviews: 41,
    images: ["images/tmeic/TMdrive-DCe2/product-dcdrives-tmdc.png"],
    inStock: true,
    badge: "Enhanced",
    specs: [
      "Enhanced Performance",
      "Advanced Features",
      "DC Drive System",
      "Improved Design"
    ],
    url: "https://www.tmeic.com/products/tmdrive-dce2",
    features: [
      "Enhanced performance capability",
      "Advanced control features",
      "Improved reliability",
      "DC drive technology"
    ]
  },

  // PV Inverters - Solar Ware Series
  {
    id: 60016,
    name: "SOLAR WARE 100",
    model: "SOLAR WARE 100",
    brand: "TMEIC",
    category: "PV Inverters",
    description: "Compact PV inverter designed for small to medium scale solar installations.",
    price: 8500,
    rating: 4.7,
    reviews: 89,
    images: ["images/tmeic/SOLAR_WARE_100/product-solar-ware-100.png"],
    inStock: true,
    specs: [
      "100kW Capacity",
      "Compact Design",
      "Small-Medium Scale",
      "Solar Installation"
    ],
    url: "https://www.tmeic.com/products/solar-ware-100",
    features: [
      "Compact design",
      "Efficient power conversion",
      "Reliable operation",
      "Easy installation"
    ]
  },

  {
    id: 60017,
    name: "SOLAR WARE 175",
    model: "SOLAR WARE 175",
    brand: "TMEIC",
    category: "PV Inverters",
    description: "Mid-range PV inverter with enhanced efficiency for commercial solar applications.",
    price: 12000,
    rating: 4.8,
    reviews: 76,
    images: ["images/tmeic/SOLAR_WARE_175/product-solar-ware-250-175.png"],
    inStock: true,
    specs: [
      "175kW Capacity",
      "Enhanced Efficiency",
      "Commercial Applications",
      "Mid-Range Power"
    ],
    url: "https://www.tmeic.com/products/solar-ware-175",
    features: [
      "Enhanced efficiency",
      "Commercial-grade design",
      "Reliable performance",
      "Advanced power conversion"
    ]
  },

  {
    id: 60018,
    name: "SOLAR WARE 250",
    model: "SOLAR WARE 250",
    brand: "TMEIC",
    category: "PV Inverters",
    description: "High-capacity PV inverter for large commercial and small utility solar installations.",
    price: 16500,
    rating: 4.9,
    reviews: 64,
    images: ["images/tmeic/SOLAR_WARE_250/product-solar-ware-250-175.png"],
    inStock: true,
    badge: "Commercial",
    specs: [
      "250kW Capacity",
      "Large Commercial",
      "Small Utility",
      "High Capacity"
    ],
    url: "https://www.tmeic.com/products/solar-ware-250",
    features: [
      "High capacity output",
      "Commercial/utility grade",
      "Advanced grid support",
      "Robust construction"
    ]
  },

  {
    id: 60019,
    name: "SOLAR WARE 490",
    model: "SOLAR WARE 490",
    brand: "TMEIC",
    category: "PV Inverters",
    description: "High-power PV inverter designed for utility-scale solar power plants.",
    price: 24000,
    rating: 4.8,
    reviews: 52,
    images: ["images/tmeic/SOLAR_WARE_490/product-solar-ware-750-675-665-630-500-490.png"],
    inStock: true,
    badge: "Utility Scale",
    specs: [
      "490kW Capacity",
      "Utility Scale",
      "High Power",
      "Solar Power Plants"
    ],
    url: "https://www.tmeic.com/products/solar-ware-490",
    features: [
      "Utility-scale capacity",
      "High power output",
      "Advanced grid compliance",
      "Industrial durability"
    ]
  },

  {
    id: 60020,
    name: "SOLAR WARE 500",
    model: "SOLAR WARE 500",
    brand: "TMEIC",
    category: "PV Inverters",
    description: "Advanced PV inverter with power factor control and grid support features.",
    price: 25000,
    rating: 4.9,
    reviews: 48,
    images: ["images/tmeic/SOLAR_WARE_500/product-solar-ware-750-675-665-630-500-490.png"],
    inStock: true,
    specs: [
      "500kW Capacity",
      "Power Factor Control",
      "Grid Support",
      "Advanced Features"
    ],
    url: "https://www.tmeic.com/products/solar-ware-500",
    features: [
      "Power factor control",
      "Reactive/Active power control",
      "Fault ride through capability",
      "Anti-islanding protection"
    ]
  },

  {
    id: 60021,
    name: "SOLAR WARE 2220",
    model: "SOLAR WARE 2220",
    brand: "TMEIC",
    category: "PV Inverters",
    description: "High efficiency utility-scale PV inverter with wide MPPT range and compact design.",
    price: 85000,
    rating: 5.0,
    reviews: 34,
    images: ["images/tmeic/SOLAR_WARE_2220/pv-inverter-2550-2220-solar-ware.png"],
    inStock: true,
    badge: "High Efficiency",
    specs: [
      "2.22MW/2.22MVA",
      "98.7% Efficiency",
      "Wide MPPT",
      "Compact Size"
    ],
    url: "https://www.tmeic.com/products/solar-ware-2220",
    features: [
      "High efficiency (98.7%)",
      "Wide MPPT model (2.22MW/2.22MVA)",
      "Best-in-class and compact size",
      "No derating up to 50°C",
      "VAR mode for night operation",
      "DC Box integrated"
    ]
  },

  {
    id: 60022,
    name: "SOLAR WARE 2500",
    model: "SOLAR WARE 2500",
    brand: "TMEIC",
    category: "PV Inverters",
    description: "One of the largest central PV inverters in the 1500V power class with hybrid cooling technology.",
    price: 95000,
    rating: 5.0,
    reviews: 28,
    images: ["images/tmeic/SOLAR_WARE_2500/solar-ware-2700-and-2500_1500v.png"],
    inStock: true,
    badge: "Largest 1500V",
    specs: [
      "2.5MW Capacity",
      "1500V Class",
      "Heat-Pipe Cooling",
      "Utility-Scale"
    ],
    url: "https://www.tmeic.com/products/solar-ware-2500",
    features: [
      "One of the largest central PV inverters",
      "First heat-pipe based hybrid cooling",
      "1500V power class",
      "Utility-scale solution"
    ]
  },

  {
    id: 60023,
    name: "SOLAR WARE 2550",
    model: "SOLAR WARE 2550",
    brand: "TMEIC",
    category: "PV Inverters",
    description: "Premium utility-scale PV inverter with highest efficiency and large capacity output.",
    price: 98000,
    rating: 5.0,
    reviews: 26,
    images: ["images/tmeic/SOLAR_WARE_2550/pv-inverter-2550-2220-solar-ware.png"],
    inStock: true,
    badge: "Premium",
    specs: [
      "2.55MW/2.55MVA",
      "98.8% Efficiency",
      "Large Capacity",
      "Best-in-Class"
    ],
    url: "https://www.tmeic.com/products/solar-ware-2550",
    features: [
      "High efficiency (98.8%)",
      "Large capacity (2.55MW/2.55MVA)",
      "Best-in-class and compact size",
      "No derating up to 50°C",
      "VAR mode for night operation",
      "Safety function of DC input circuit"
    ]
  },

  {
    id: 60024,
    name: "SOLAR WARE STATION",
    model: "SOLAR WARE STATION",
    brand: "TMEIC",
    category: "PV Inverters",
    description: "Complete containerized solar power solution including PV inverter, transformer and switchgear.",
    price: 125000,
    rating: 4.9,
    reviews: 22,
    images: ["images/tmeic/SOLAR_WARE_STATION/solar-ware-station-ac-station-2_22mw-lrg.png"],
    inStock: true,
    badge: "Complete Solution",
    specs: [
      "Containerized Solution",
      "AC Station",
      "Inverter + Transformer",
      "Complete Package"
    ],
    url: "https://www.tmeic.com/products/solar-ware-station-0",
    features: [
      "AC Station: PV inverter, transformer and switchgear",
      "L-H Combo & Inverter Package available",
      "Minimizes construction and installation time",
      "Protection from harsh environments",
      "All containerized solution"
    ]
  },

  // Energy Storage
  {
    id: 60025,
    name: "Energy Storage System",
    model: "Energy Storage",
    brand: "TMEIC",
    category: "Energy Storage",
    description: "Advanced energy storage solution with bi-directional power conversion and grid support capabilities.",
    price: 150000,
    rating: 4.8,
    reviews: 18,
    images: ["images/tmeic/Energy_Storage/solarware_universal_pcs.png"],
    inStock: true,
    badge: "Advanced",
    specs: [
      "±2500kW Active Power",
      "750V-1250V DC",
      "98.5% Efficiency",
      "Advanced Hybrid Cooling"
    ],
    url: "https://www.tmeic.com/products/energy-storage-0",
    features: [
      "Bi-directional power conversion",
      "Advanced hybrid cooling system",
      "Grid support capabilities",
      "High efficiency operation",
      "Modbus and Ethernet communication"
    ]
  },

  // Motors
  {
    id: 60026,
    name: "21-FII Series Motors",
    model: "21-FII",
    brand: "TMEIC",
    category: "Motors",
    description: "21-FII series three-phase high-voltage motors designed for all applications and industries with cast aluminum squirrel cage rotors.",
    price: 8500,
    rating: 5.0,
    reviews: 56,
    images: ["images/tmeic/21-FII_Series_Motors/product-motor-21-FII_1.png"],
    inStock: true,
    specs: [
      "300-6500 kW",
      "8,700 HP",
      "IEC Frame Sizes",
      "Three-Phase High-Voltage"
    ],
    url: "https://www.tmeic.com/products/21-fii-series-motors",
    features: [
      "Built on IEC frame sizes",
      "Cast aluminum squirrel cage rotors",
      "Suitable for all applications",
      "Industrial-grade construction"
    ]
  },

  {
    id: 60027,
    name: "21-G Series Motors",
    model: "21-G",
    brand: "TMEIC",
    category: "Motors",
    description: "High-performance three-phase induction motors with advanced design features.",
    price: 7200,
    rating: 4.8,
    reviews: 43,
    images: ["images/tmeic/21-G_Series_Motors/product-motor-TM21G_0.png"],
    inStock: true,
    specs: [
      "Three-Phase Induction",
      "Advanced Design",
      "High Performance",
      "Industrial Applications"
    ],
    url: "https://www.tmeic.com/products/21-g-series-motors",
    features: [
      "Advanced design features",
      "High performance operation",
      "Reliable construction",
      "Versatile applications"
    ]
  },

  {
    id: 60028,
    name: "21-H Series Motors",
    model: "21-H",
    brand: "TMEIC",
    category: "Motors",
    description: "Robust industrial motors designed for heavy-duty applications with enhanced durability.",
    price: 9800,
    rating: 4.9,
    reviews: 38,
    images: ["images/tmeic/21-H_Series_Motors/product-motor-TM21-H.png"],
    inStock: true,
    badge: "Heavy Duty",
    specs: [
      "Heavy-Duty Applications",
      "Enhanced Durability",
      "Robust Design",
      "Industrial Grade"
    ],
    url: "https://www.tmeic.com/products/21-h-series-motors",
    features: [
      "Heavy-duty capability",
      "Enhanced durability",
      "Robust industrial design",
      "Superior reliability"
    ]
  },

  {
    id: 60029,
    name: "Motors for Metal Rolling Mills",
    model: "Metal Rolling Mills",
    brand: "TMEIC",
    category: "Motors",
    description: "Specialized motors designed for metal rolling mill applications with high torque and precision control.",
    price: 15000,
    rating: 5.0,
    reviews: 24,
    images: ["images/tmeic/Motors_for_Metal_Rolling_Mills/product-motor-metals-rolling-mills.png"],
    inStock: true,
    badge: "Specialized",
    specs: [
      "Metal Rolling Mills",
      "High Torque",
      "Precision Control",
      "Specialized Design"
    ],
    url: "https://www.tmeic.com/products/motors-metal-rolling-mills",
    features: [
      "Specialized for metal rolling",
      "High torque capability",
      "Precision control features",
      "Industrial durability"
    ]
  },

  // Controllers
  {
    id: 60030,
    name: "Innovation Series Controller",
    model: "Innovation Series",
    brand: "TMEIC",
    category: "Controllers",
    description: "VME-rack-based family of controllers providing high-performance control functions and numerous LAN options for seamless plant integration.",
    price: 6800,
    rating: 5.0,
    reviews: 42,
    images: ["images/tmeic/Innovation_Series_Controller/product-controller-innovation-series.png"],
    inStock: true,
    badge: "Featured",
    specs: [
      "VME-Rack Based",
      "High Performance",
      "LAN Options",
      "Plant Integration"
    ],
    url: "https://www.tmeic.com/products/controllers",
    features: [
      "VME-rack based design",
      "High-performance control functions",
      "Numerous LAN options",
      "Seamless plant integration"
    ]
  },

  {
    id: 60031,
    name: "nv Series Controller",
    model: "nv Series",
    brand: "TMEIC",
    category: "Controllers",
    description: "Advanced controller series with enhanced processing power and communication capabilities.",
    price: 5200,
    rating: 4.8,
    reviews: 36,
    images: ["images/tmeic/nv_Series_Controller/product-nvseries-controller-220px.png"],
    inStock: true,
    specs: [
      "Enhanced Processing",
      "Communication Capabilities",
      "Advanced Series",
      "High Performance"
    ],
    url: "https://www.tmeic.com/products/nv-series-controller",
    features: [
      "Enhanced processing power",
      "Advanced communication",
      "High performance operation",
      "Reliable control system"
    ]
  },

  {
    id: 60032,
    name: "V Series Controller",
    model: "V Series",
    brand: "TMEIC",
    category: "Controllers",
    description: "Versatile controller series designed for various industrial automation applications.",
    price: 4800,
    rating: 4.7,
    reviews: 48,
    images: ["images/tmeic/V_Series_Controller/product-vseries-controller.jpg"],
    inStock: true,
    specs: [
      "Versatile Design",
      "Industrial Automation",
      "Various Applications",
      "Reliable Control"
    ],
    url: "https://www.tmeic.com/products/v-series-controller",
    features: [
      "Versatile application support",
      "Industrial automation focus",
      "Reliable operation",
      "Comprehensive control features"
    ]
  },

  // Software
  {
    id: 60033,
    name: "TMdrive-Navigator",
    model: "TMdrive-Navigator",
    brand: "TMEIC",
    category: "Software",
    description: "Configuration and maintenance tool for TMEIC drives that helps users understand drive operation and performance.",
    price: 2500,
    rating: 5.0,
    reviews: 67,
    images: ["images/tmeic/TMdrive-Navigator/product-software-tmdrive-navigator.png"],
    inStock: true,
    badge: "Software Tool",
    specs: [
      "Drive Configuration",
      "Maintenance Tool",
      "User-Friendly",
      "Performance Analysis"
    ],
    url: "https://www.tmeic.com/products/software-tools/",
    features: [
      "Drive configuration capability",
      "Maintenance assistance",
      "User-friendly interface",
      "Performance understanding tools"
    ]
  },

  {
    id: 60034,
    name: "uTool",
    model: "uTool",
    brand: "TMEIC",
    category: "Software",
    description: "Universal tool for TMEIC systems configuration and monitoring.",
    price: 1800,
    rating: 4.7,
    reviews: 52,
    images: ["images/tmeic/uTool/product-software-utool-animated.gif"],
    inStock: true,
    specs: [
      "Universal Tool",
      "System Configuration",
      "Monitoring",
      "TMEIC Systems"
    ],
    url: "https://www.tmeic.com/products/utool",
    features: [
      "Universal system tool",
      "Configuration management",
      "System monitoring",
      "Comprehensive support"
    ]
  }
]

// Get TMEIC categories
export const tmeicCategories = [
  'Variable Frequency Drives',
  'DC Drives', 
  'PV Inverters',
  'Energy Storage',
  'Motors',
  'Controllers',
  'Software'
]