export interface KatkoProduct {
  id: number
  name: string
  model: string
  brand: string
  series: string
  category: string
  subcategory?: string
  description: string
  features: string[]
  specifications: {
    current: string
    voltage?: string
    poles: string
    
    mounting?: string
    testing?: string
    installation?: string
  }
  images: string[]
  inStock: boolean
  price?: number
  originalPrice?: number
  rating: number
  reviews: number
  badge?: string
  url?: string
  specs?: string[]
}

export const katkoLoadBreakSwitches: KatkoProduct[] = [
  // KU & RT 16-40A Series
  {
    id: 1001,
    name: "LoadSafe KU Rotary Switch 16-40A",
    model: "KU 16-40A",
    brand: "Katko",
    series: "LoadSafe KU",
    category: "Load Break Switches",
    subcategory: "KU Rotary Switches",
    description: "Reliable and high-quality KU 16-40A switches available in 3- and 4-pole versions. New parallel and changeover kits enable 6- and 8-pole solutions, as well as changeover switch solutions. VDE-approved and independently tested.",
    features: [
      "Easy installation on DIN rail or with screws",
      "Compact design provides more space for wiring",
      "Advanced silver contacts ensure safe and durable operation",
      "Available with fixed auxiliary contacts (NO-version) or separately mountable auxiliary contacts",
      "Black direct handle included, compatible with separate shaft and handle",
      "Over 20% smaller carbon footprint compared to previous generation",
      "3-pole and 4-pole versions available",
      "6-pole and 8-pole versions with parallel kit",
      "VDE-approved and independently tested"
    ],
    specifications: {
      current: "16-40A",
      poles: "3-pole, 4-pole (6-pole and 8-pole with parallel kit)",
      mounting: "DIN rail or screw mounting",
      testing: "IEC 60947-3 standards",
      installation: "Compatible with handles LK10 and LK11"
    },
    images: ["/images/products/katko/load-break-switches/Load Break Switches.png"],
    inStock: true,
    rating: 4.8,
    reviews: 45,
    price: 156,
    originalPrice: 195
  },
  {
    id: 1002,
    name: "LoadSafe RT Door-Mounted Switch 16-40A",
    model: "RT 16-40A",
    brand: "Katko",
    series: "LoadSafe RT",
    category: "Load Break Switches",
    subcategory: "RT Door-Mounted Switches",
    description: "Compact and robust RT 16-40A door-mounted switches specifically designed for door-mounting applications. The most installation-friendly door-mounted switch on the market with quick and effortless installation process.",
    features: [
      "Quick and efficient door mounting without mounting screws",
      "Can be installed on the side of enclosures",
      "Wiring done from the back of the switch",
      "Most installation-friendly door-mounted switch on market",
      "Compact design",
      "3-pole switch solutions",
      "Integrated aluminum shaft with AD11 adapter",
      "VDE-approved and independently tested"
    ],
    specifications: {
      current: "16-40A",
      poles: "3-pole",
      mounting: "Door mounting or side of enclosure",
      testing: "IEC 60947-3 standards",
      installation: "Requires handle (LKX50, LKX50YR, LK10RT, or LK10RTYR)"
    },
    images: ["/images/products/katko/load-break-switches/Load Break Switches (1).png"],
    inStock: true,
    rating: 4.9,
    reviews: 32,
    price: 178,
    originalPrice: 210
  },

  // KU 16-125A Series
  {
    id: 1003,
    name: "KU Rotary Switch 16-125A",
    model: "KU 16-125A",
    brand: "Katko",
    series: "KU",
    category: "Load Break Switches",
    subcategory: "KU Rotary Switches",
    description: "Compact size KU rotary switches and change-over switches with DIN-rail mounting. Available with CCC certificate upon request.",
    features: [
      "Compact size",
      "VV = change-over switch option",
      "DIN-rail mounting",
      "3-pole and 4-pole KU-switches as standard",
      "2-pole upon request",
      "6-pole and 8-pole versions with parallel kit",
      "Silver contacts for safe and durable operation",
      "Compatible with multiple handle and shaft options",
      "Available with CCC certificate"
    ],
    specifications: {
      current: "16-125A",
      poles: "2-pole (request), 3-pole, 4-pole, 6-pole, 8-pole",
      mounting: "DIN-rail mounting",
      testing: "IEC 60947-3",
      installation: "Handles LK10, LK11 (load break) and LK12 (change-over); Shafts L=100/200/300 AD11 and AD11/VT"
    },
    images: ["/images/products/katko/load-break-switches/Load Break Switches (2).png"],
    inStock: true,
    rating: 4.7,
    reviews: 58,
    price: 234,
    originalPrice: 275
  },

  // KU 100-160A Series
  {
    id: 1004,
    name: "KU Rotary Switch 100-160A",
    model: "KU 100-160A",
    brand: "Katko",
    series: "KU",
    category: "Load Break Switches",
    subcategory: "KU Rotary Switches",
    description: "Modular design KU rotary switches and change-over switches with DIN-rail mounting for higher current applications.",
    features: [
      "Modular design",
      "DIN-rail mounting",
      "3-pole and 4-pole KU-switches as standard",
      "Change-over switches with CO designation",
      "6-pole and 8-pole versions with parallel kit",
      "Silver contacts technology",
      "Multiple handle compatibility"
    ],
    specifications: {
      current: "100-160A",
      poles: "3-pole, 4-pole, 6-pole, 8-pole",
      mounting: "DIN-rail mounting",
      testing: "IEC 60947-3",
      installation: "Handles LK10, LK11 (3&4 poles), LK12 (6&8 poles), LK12CO102 (change-over)"
    },
    images: ["/images/products/katko/load-break-switches/Load Break Switches KU 160.png"],
    inStock: true,
    rating: 4.6,
    reviews: 41,
    price: 312,
    originalPrice: 365
  },

  // KU 200-250A Series
  {
    id: 1005,
    name: "KU Rotary Switch 200-250A",
    model: "KU 200-250A",
    brand: "Katko",
    series: "KU",
    category: "Load Break Switches",
    subcategory: "KU Rotary Switches",
    description: "Heavy-duty KU switches made of halogen-free thermoplastic material with 100% recyclability. Reliable switch for demanding industrial applications.",
    features: [
      "Made of halogen-free thermoplastic material",
      "100% recyclability",
      "Optional test position for testing auxiliary contacts",
      "Reliable for demanding industrial applications",
      "Change-over switches available (CO designation)",
      "Direct handle options (CO SV designation)",
      "Always delivered with bridging bars for change-over",
      "Terminal covers and phase barriers available"
    ],
    specifications: {
      current: "200-250A",
      voltage: "AC-23 1000V 135A (250A switch)",
      poles: "Multiple configurations",
      testing: "Icw 690V (1s) 8kA, R.M.S value 100 kA",
      installation: "Handle LKX 100, Shaft L=200 AD12/T6"
    },
    images: ["/images/products/katko/load-break-switches/Load Break Switches (3).png"],
    inStock: true,
    rating: 4.8,
    reviews: 29,
    price: 445,
    originalPrice: 520
  },

  // KU 315-400A Series
  {
    id: 1006,
    name: "KU Rotary Switch 315-400A",
    model: "KU 315-400A",
    brand: "Katko",
    series: "KU",
    category: "Load Break Switches",
    subcategory: "KU Rotary Switches",
    description: "High-current KU switches made of halogen-free thermoplastic material for demanding industrial applications with enhanced electrical specifications.",
    features: [
      "Made of halogen-free thermoplastic material",
      "100% recyclability",
      "Optional test position for auxiliary contacts",
      "Reliable for demanding industrial applications",
      "Change-over switches with CO designation",
      "Direct handle options with CO SV designation",
      "Bridging bars included for change-over switches",
      "Terminal covers and phase barriers available"
    ],
    specifications: {
      current: "315-400A",
      voltage: "AC-23 1000V 200A (400A switch)",
      poles: "Multiple configurations",
      testing: "Icw 690V (1s) 13.5kA, R.M.S value 100 kA",
      installation: "Handle LKX 150, Shaft LVK=228"
    },
    images: ["/images/products/katko/load-break-switches/Load Break Switches (4).png"],
    inStock: true,
    rating: 4.9,
    reviews: 18,
    price: 678,
    originalPrice: 795
  },

  // KU 630-800A Series
  {
    id: 1007,
    name: "KU Rotary Switch 630-800A",
    model: "KU 630-800A",
    brand: "Katko",
    series: "KU",
    category: "Load Break Switches",
    subcategory: "KU Rotary Switches",
    description: "Maximum capacity KU switches for the most demanding industrial applications with superior electrical performance characteristics.",
    features: [
      "Made of halogen-free thermoplastic material",
      "100% recyclability",
      "Optional test position for auxiliary contacts",
      "Reliable for most demanding industrial applications",
      "Change-over switches with CO designation",
      "Direct handle options with CO SV designation",
      "Bridging bars included for change-over switches",
      "Terminal covers and phase barriers available"
    ],
    specifications: {
      current: "630-800A",
      voltage: "AC-23 1000V 400A (800A switch)",
      poles: "Multiple configurations",
      testing: "Icw 690V (1s) 28kA, R.M.S value 100kA",
      installation: "Handle LKX 150, Shaft LVK=228"
    },
    images: ["/images/products/katko/load-break-switches/Load Break Switches KU 800.png"],
    inStock: true,
    rating: 5.0,
    reviews: 12,
    price: 892,
    originalPrice: 1050
  },

  // VKA Series
  {
    id: 1008,
    name: "VKA Rotary Load Break Switch 200-250A",
    model: "VKA 200-250A",
    brand: "Katko",
    series: "VKA",
    category: "Load Break Switches",
    subcategory: "VKA Rotary Switches",
    description: "Compact size VKA rotary load break switches with silver contacts technology, including handle and shaft for 250mm panel board applications.",
    features: [
      "Compact size",
      "3-pole and 4-pole VKA-switches as standard",
      "2-pole available upon request",
      "Silver contacts technology for safe operation",
      "Handle LK12 and shaft included",
      "Suitable for 250mm panel board",
      "Tested according to IEC 60947-3"
    ],
    specifications: {
      current: "200-250A",
      poles: "2-pole (request), 3-pole, 4-pole",
      mounting: "Panel board mounting",
      testing: "IEC 60947-3",
      installation: "Handle LK12 and shaft L=228 AD12/T6 included"
    },
    images: ["/images/products/katko/load-break-switches/LoadSafe Product Image.png"],
    inStock: true,
    rating: 4.7,
    reviews: 24,
    price: 398,
    originalPrice: 465
  },

  // KUE Toggle Switches
  {
    id: 1009,
    name: "KUE Toggle Switch 16-125A",
    model: "KUE 16-125A",
    brand: "Katko",
    series: "KUE",
    category: "Load Break Switches",
    subcategory: "KUE Toggle Switches",
    description: "Compact size KUE toggle switches with DIN-rail mounting and silver contacts technology. Available with adapter for three-phase section rail connection.",
    features: [
      "Compact size",
      "DIN-rail mounting",
      "3-pole configuration",
      "Silver contacts technology",
      "Available with three-phase section rail adapter",
      "Three different connection heights available",
      "Tested according to IEC 60947-3"
    ],
    specifications: {
      current: "16-125A",
      poles: "3-pole",
      mounting: "DIN-rail mounting",
      testing: "IEC 60947-3",
      installation: "Optional three-phase section rail adapter"
    },
    images: ["/images/products/katko/load-break-switches/Load Break Switches 1024x1024.png"],
    inStock: true,
    rating: 4.5,
    reviews: 37,
    price: 189,
    originalPrice: 220
  },

  // EVA Toggle Switches
  {
    id: 1010,
    name: "EVA Toggle Switch 125-250A",
    model: "EVA 125-250A",
    brand: "Katko",
    series: "EVA",
    category: "Load Break Switches",
    subcategory: "EVA Toggle Switches",
    description: "Compact size EVA toggle switches with silver contacts technology for long life expectancy and safe use in demanding conditions.",
    features: [
      "Compact size",
      "Silver contacts for long life expectancy",
      "Safe use in demanding conditions",
      "125-160A: Available with yellow front plate and red toggle",
      "200-250A: 3-pole and 4-pole options",
      "Terminal covers and phase barriers available",
      "Available with red toggle option",
      "Tested according to IEC 60947-3"
    ],
    specifications: {
      current: "125-250A",
      poles: "3-pole, 4-pole (200-250A)",
      mounting: "Panel mounting",
      testing: "IEC 60947-3",
      installation: "Terminal covers (LS/VS) and phase barriers available"
    },
    images: ["/images/products/katko/load-break-switches/Load Break Switches EVA.png"],
    inStock: true,
    rating: 4.6,
    reviews: 21,
    price: 267,
    originalPrice: 315
  }
]

export const katkoSwitchFuses: KatkoProduct[] = [
  // KKV Switch Fuses 16-32A
  {
    id: 2001,
    name: "KKV Switch Fuse 16-32A",
    model: "KKV 16-32A",
    brand: "Katko",
    series: "KKV",
    category: "Switch Fuses",
    subcategory: "KKV Switch Fuses",
    description: "KKV switch fuses combining KU switch and KV 10 x 38 fuse holder. Available in 3-pole and 4-pole configurations with comprehensive handle and shaft compatibility.",
    features: [
      "Available as 3-pole and 4-pole",
      "Consists of KU switch and KV 10 x 38 fuse holder",
      "Compatible with handles LK10 and LK11",
      "Multiple shaft length options available",
      "Tested according to IEC 60269",
      "Compact design saves space",
      "Reliable switching and protection"
    ],
    specifications: {
      current: "16-32A",
      poles: "3-pole, 4-pole",
      mounting: "DIN rail or screw mounting",
      testing: "IEC 60269",
      installation: "Handles LK10, LK11; Shafts L=100/200/300 AD11 and AD11/VT"
    },
    images: ["/images/products/katko/switch-fuses/Switch Fuses.png"],
    inStock: true,
    rating: 4.7,
    reviews: 33,
    price: 198,
    originalPrice: 235
  },

  // KVKE Switch Fuses 20-32A
  {
    id: 2002,
    name: "KVKE Switch Fuse 20-32A",
    model: "KVKE 20-32A",
    brand: "Katko",
    series: "KVKE",
    category: "Switch Fuses",
    subcategory: "KVKE Switch Fuses",
    description: "KVKE switch fuses for 20-32A applications with 10×38 & BS fuse versions. DIN rail and screw base mounting as standard with handle and shaft included.",
    features: [
      "10×38 & BS fuse versions",
      "DIN rail and screw base mounting as standard",
      "Available as 3-pole and 4-pole version",
      "1-pole and 2-pole versions on request",
      "Handle LK10 and shaft L=180 mm included",
      "Suitable for 250 mm deep panel boards",
      "Fuse covers included",
      "Black or yellow/red handle options"
    ],
    specifications: {
      current: "20-32A",
      poles: "1-pole, 2-pole (request), 3-pole, 4-pole",
      mounting: "DIN rail and screw base mounting",
      testing: "IEC 60269",
      installation: "Handle LK10 and shaft L=180 mm included"
    },
    images: ["/images/products/katko/switch-fuses/Switch Fuses 600x600.png"],
    inStock: true,
    rating: 4.8,
    reviews: 28,
    price: 246,
    originalPrice: 290
  },

  // KVKE Switch Fuses 63-160A
  {
    id: 2003,
    name: "KVKE Switch Fuse 63-160A",
    model: "KVKE 63-160A",
    brand: "Katko",
    series: "KVKE",
    category: "Switch Fuses",
    subcategory: "KVKE Switch Fuses",
    description: "Heavy-duty KVKE switch fuses with DIN & BS fuse versions. Four breaking points per phase with silver alloy connecting rivets for long life expectancy and safe use in demanding conditions.",
    features: [
      "DIN & BS fuse versions",
      "Four breaking points per phase",
      "Silver alloy connecting rivets 350 μm thick",
      "Long life expectancy in demanding conditions",
      "Compact size saves space",
      "Modular structure with variable drive mechanism position",
      "Available as 1-, 2-, 3- and 4-pole",
      "Black or yellow/red handle options",
      "Easy auxiliary contacts installation",
      "Fuse covers included, terminal covers as accessory"
    ],
    specifications: {
      current: "63-160A",
      poles: "1-pole, 2-pole, 3-pole, 4-pole",
      mounting: "DIN rail and screw base mounting",
      testing: "IEC 60269",
      installation: "Handle LK12 and shaft L=220 AD12/T included"
    },
    images: ["/images/products/katko/switch-fuses/FuseSafe Product Image.png"],
    inStock: true,
    rating: 4.9,
    reviews: 19,
    price: 387,
    originalPrice: 455
  },

  // KVKE Switch Fuses 200-250A
  {
    id: 2004,
    name: "KVKE Switch Fuse 200-250A",
    model: "KVKE 200-250A",
    brand: "Katko",
    series: "KVKE",
    category: "Switch Fuses",
    subcategory: "KVKE Switch Fuses",
    description: "Maximum capacity KVKE switch fuses for the most demanding applications. Features silver alloy connecting rivets and modular structure with comprehensive accessory options.",
    features: [
      "DIN & BS fuse versions",
      "Four breaking points per phase",
      "Silver alloy connecting rivets 350 μm thick",
      "Long life expectancy in demanding conditions",
      "Compact size saves space",
      "Modular structure with variable drive mechanism position",
      "Available as 1-, 2-, 3- and 4-pole",
      "Black or yellow/red handle options",
      "Easy auxiliary contacts installation",
      "Fuse covers included, terminal covers as accessory"
    ],
    specifications: {
      current: "200-250A",
      poles: "1-pole, 2-pole, 3-pole, 4-pole",
      mounting: "DIN rail and screw base mounting",
      testing: "IEC 60269",
      installation: "Handle LK14 and shaft LVK=228 included"
    },
    images: ["/images/products/katko/switch-fuses/Switch Fuses.png"],
    inStock: true,
    rating: 5.0,
    reviews: 14,
    price: 562,
    originalPrice: 660
  }
]

export const katkoULCSAListed: KatkoProduct[] = [
  // UL KU Rotary Switches 16-80A
  {
    id: 3001,
    name: "UL KU Rotary Switch 16-80A",
    model: "UL KU 16-80A",
    brand: "Katko",
    series: "UL KU",
    category: "UL/CSA Listed",
    subcategory: "UL KU Rotary Switches",
    description: "UL 508 and CSA C22.2 No.14 listed KU rotary switches available in 3- and 4-pole versions. Designed for North American market with enhanced safety features and certified performance.",
    features: [
      "UL 508 and CSA C22.2 No.14 listed",
      "Available as 3-pole and 4-pole",
      "Enhanced safety features for North American market",
      "DIN rail and screw mounting options",
      "Compatible with North American enclosure standards",
      "Advanced silver contacts technology",
      "Temperature range: -25°C to +70°C",
      "Tested according to UL and CSA standards"
    ],
    specifications: {
      current: "16-80A",
      poles: "3-pole, 4-pole",
      mounting: "DIN rail or screw mounting",
      testing: "UL 508, CSA C22.2 No.14",
      installation: "Compatible with UL accessories and handles"
    },
    images: ["/images/products/katko/ul-csa-listed/UL KU80 Katko.png"],
    inStock: true,
    rating: 4.8,
    reviews: 42,
    price: 289,
    originalPrice: 340
  },

  // UL KKV Switch Fuses 16-32A
  {
    id: 3002,
    name: "UL KKV Switch Fuse 16-32A",
    model: "UL KKV 16-32A",
    brand: "Katko",
    series: "UL KKV",
    category: "UL/CSA Listed",
    subcategory: "UL KKV Switch Fuses",
    description: "UL 508 and CSA listed KKV switch fuses combining UL approved KU switch with Class CC fuse holders. Provides comprehensive protection for North American electrical systems.",
    features: [
      "UL 508 and CSA C22.2 No.14 listed",
      "Class CC fuse holder compatibility",
      "Available as 3-pole and 4-pole",
      "Enhanced arc extinction technology",
      "North American electrical code compliant",
      "Temperature compensated contact pressure",
      "Quick-connect terminals",
      "Fuse rejection feature for safety"
    ],
    specifications: {
      current: "16-32A",
      poles: "3-pole, 4-pole",
      mounting: "DIN rail or screw mounting",
      testing: "UL 508, CSA C22.2 No.14",
      installation: "Class CC fuse holders, UL listed accessories"
    },
    images: ["/images/products/katko/ul-csa-listed/UL KKV 768x768.png"],
    inStock: true,
    rating: 4.9,
    reviews: 38,
    price: 324,
    originalPrice: 385
  },

  // UL RT Door-Mounted Switches
  {
    id: 3003,
    name: "UL RT Door-Mounted Switch 16-40A",
    model: "UL RT 16-40A",
    brand: "Katko",
    series: "UL RT",
    category: "UL/CSA Listed",
    subcategory: "UL RT Door-Mounted",
    description: "UL listed RT door-mounted switches specifically designed for North American enclosure standards. Features tool-free installation and enhanced safety mechanisms.",
    features: [
      "UL 508 and CSA listed",
      "Tool-free door mounting system",
      "NEMA enclosure compatibility",
      "Enhanced safety interlock mechanisms",
      "Integrated shaft with UL approved adapters",
      "Corrosion-resistant materials",
      "Wide temperature operating range",
      "Vibration and shock resistant"
    ],
    specifications: {
      current: "16-40A",
      poles: "3-pole",
      mounting: "Door mounting, NEMA compatible",
      testing: "UL 508, CSA C22.2 No.14",
      installation: "UL listed handles and shafts required"
    },
    images: ["/images/products/katko/ul-csa-listed/UL KU RT Range.png"],
    inStock: true,
    rating: 4.7,
    reviews: 29,
    price: 267,
    originalPrice: 315
  },

  // UL ISF Enclosed Switches
  {
    id: 3004,
    name: "UL ISF Enclosed Switch 16-63A",
    model: "UL ISF 16-63A",
    brand: "Katko",
    series: "UL ISF",
    category: "UL/CSA Listed",
    subcategory: "UL ISF Enclosed Switches",
    description: "UL Type 4X enclosed switches with integral switch fuse functionality. Designed for harsh industrial environments with superior corrosion resistance and weatherproof construction.",
    features: [
      "UL Type 4X enclosure rating",
      "Integral switch fuse design",
      "Stainless steel construction option",
      "IP66 weatherproof protection",
      "Padlockable in OFF position",
      "Door interlock safety mechanism",
      "Multiple conduit entry options",
      "Arc-resistant design"
    ],
    specifications: {
      current: "16-63A",
      poles: "3-pole, 4-pole",
      mounting: "Wall or panel mounting",
      testing: "UL Type 4X, CSA equivalent",
      installation: "UL listed conduits and fittings"
    },
    images: ["/images/products/katko/ul-csa-listed/ISF Range Small.png"],
    inStock: true,
    rating: 4.8,
    reviews: 31,
    price: 445,
    originalPrice: 525
  },

  // UL EMC Shielded Switches
  {
    id: 3005,
    name: "UL EMC Shielded Switch 25-125A",
    model: "UL EMC 25-125A",
    brand: "Katko",
    series: "UL EMC",
    category: "UL/CSA Listed",
    subcategory: "UL EMC Shielded Switches",
    description: "UL listed EMC shielded rotary switches designed for electromagnetic compatibility in sensitive industrial applications. Features advanced shielding technology and certified EMC performance.",
    features: [
      "UL 508 and CSA listed with EMC certification",
      "Advanced electromagnetic shielding",
      "EMI/RFI suppression technology",
      "Suitable for variable frequency drive applications",
      "Enhanced contact materials for long life",
      "Multiple grounding provisions",
      "Compact shielded design",
      "Industrial grade construction"
    ],
    specifications: {
      current: "25-125A",
      poles: "3-pole, 4-pole",
      mounting: "DIN rail with EMC grounding",
      testing: "UL 508, CSA, EMC standards",
      installation: "EMC glands and shielded cables required"
    },
    images: ["/images/products/katko/ul-csa-listed/Katko EMC Product Range.png"],
    inStock: true,
    rating: 4.9,
    reviews: 24,
    price: 389,
    originalPrice: 460
  },

  // UL Accessories
  {
    id: 3006,
    name: "UL Accessories for KU and VKA Series",
    model: "UL ACC-KU-VKA",
    brand: "Katko",
    series: "UL Accessories",
    category: "UL/CSA Listed",
    subcategory: "UL Accessories",
    description: "Complete range of UL listed accessories for KU and VKA series switches including handles, shafts, auxiliary contacts, and mounting hardware specifically approved for North American installations.",
    features: [
      "UL 508 and CSA listed accessories",
      "Complete compatibility with UL switches",
      "Padlockable handle options",
      "Extended shaft lengths available",
      "Auxiliary contact blocks",
      "Mounting hardware and covers",
      "Terminal protection accessories",
      "Color-coded identification options"
    ],
    specifications: {
      current: "Accessory Kit",
      poles: "Compatible with all UL switches",
      mounting: "Various mounting options",
      testing: "UL 508, CSA C22.2 No.14",
      installation: "Complete installation kit included"
    },
    images: ["/images/products/katko/ul-csa-listed/UL Accessories.png"],
    inStock: true,
    rating: 4.6,
    reviews: 18,
    price: 156,
    originalPrice: 185
  }
]

export const katkoConnectors: KatkoProduct[] = [
  // ConnectSafe Terminal Blocks
  {
    id: 4001,
    name: "ConnectSafe Terminal Block KKL Series",
    model: "KKL Series",
    brand: "Katko",
    series: "ConnectSafe KKL",
    category: "Connectors",
    subcategory: "ConnectSafe Terminal Blocks",
    description: "ConnectSafe KKL series terminal blocks provide reliable electrical connections with enhanced safety features. Designed for industrial applications with excellent corrosion resistance and long service life.",
    features: [
      "Enhanced safety terminal block design",
      "Excellent corrosion resistance",
      "Industrial grade construction",
      "Easy wire insertion and removal",
      "Color-coded identification options",
      "Wide temperature operating range",
      "DIN rail mounting compatibility",
      "Multiple current ratings available"
    ],
    specifications: {
      current: "6-125A",
      poles: "1-pole to multi-pole configurations",
      mounting: "DIN rail mounting",
      testing: "IEC 60947-7-1",
      installation: "Tool-free wire insertion"
    },
    images: ["/images/products/katko/connectors/Connectors KKL 768x768.png"],
    inStock: true,
    rating: 4.7,
    reviews: 35,
    price: 89,
    originalPrice: 105
  },

  // ConnectSafe Terminal Blocks KLH Series
  {
    id: 4002,
    name: "ConnectSafe Terminal Block KLH Series",
    model: "KLH Series",
    brand: "Katko",
    series: "ConnectSafe KLH",
    category: "Connectors",
    subcategory: "ConnectSafe Terminal Blocks",
    description: "KLH series terminal blocks offer high-density connection solutions with superior electrical performance. Ideal for control panels and industrial automation applications.",
    features: [
      "High-density connection design",
      "Superior electrical performance",
      "Compact footprint saves space",
      "Multiple wire gauge compatibility",
      "Finger-safe terminal design",
      "Vibration and shock resistant",
      "Easy maintenance access",
      "Modular expandable system"
    ],
    specifications: {
      current: "10-150A",
      poles: "Multiple pole configurations",
      mounting: "DIN rail and panel mounting",
      testing: "IEC 60947-7-1, UL Listed",
      installation: "Spring-loaded terminals"
    },
    images: ["/images/products/katko/connectors/Connectors KLH 768x768.png"],
    inStock: true,
    rating: 4.8,
    reviews: 42,
    price: 112,
    originalPrice: 135
  },

  // KLM M4 Connector
  {
    id: 4003,
    name: "KLM M4 Connector 1x50",
    model: "KLM1x50 M4",
    brand: "Katko",
    series: "KLM",
    category: "Connectors",
    subcategory: "KLM M4 Connectors",
    description: "High-current M4 connector designed for heavy-duty applications. Features robust construction with excellent electrical conductivity and mechanical strength for demanding industrial environments.",
    features: [
      "Heavy-duty M4 threaded connection",
      "Excellent electrical conductivity",
      "Robust mechanical construction",
      "Corrosion-resistant materials",
      "High current carrying capacity",
      "Easy installation and maintenance",
      "Industrial grade insulation",
      "Wide range of cable compatibility"
    ],
    specifications: {
      current: "50A",
      poles: "1-pole",
      mounting: "M4 threaded connection",
      testing: "IEC 60947-1",
      installation: "M4 bolt connection"
    },
    images: ["/images/products/katko/connectors/KLM1x50 M4 Connector.png"],
    inStock: true,
    rating: 4.6,
    reviews: 28,
    price: 67,
    originalPrice: 80
  },

  // ConnectSafe Product Range
  {
    id: 4004,
    name: "ConnectSafe Complete Terminal Block System",
    model: "ConnectSafe System",
    brand: "Katko",
    series: "ConnectSafe",
    category: "Connectors",
    subcategory: "ConnectSafe Systems",
    description: "Complete ConnectSafe terminal block system offering comprehensive connection solutions for industrial applications. Includes various terminal types, accessories, and mounting hardware.",
    features: [
      "Complete connection system",
      "Multiple terminal block types",
      "Comprehensive accessory range",
      "Standardized mounting system",
      "Color-coding and marking options",
      "Easy system expansion",
      "Professional installation support",
      "Long-term reliability"
    ],
    specifications: {
      current: "Variable up to 300A",
      poles: "Complete system solution",
      mounting: "DIN rail and panel systems",
      testing: "Full IEC compliance",
      installation: "Complete system with accessories"
    },
    images: ["/images/products/katko/connectors/ConnectSafe Product Image.png"],
    inStock: true,
    rating: 4.9,
    reviews: 56,
    price: 445,
    originalPrice: 525
  },

  // ConnectSafe Terminal Blocks General
  {
    id: 4005,
    name: "ConnectSafe Terminal Blocks Range",
    model: "ConnectSafe TB",
    brand: "Katko",
    series: "ConnectSafe",
    category: "Connectors",
    subcategory: "ConnectSafe Terminal Blocks",
    description: "Comprehensive range of ConnectSafe terminal blocks designed for various industrial applications. Offers excellent performance, safety, and reliability in demanding environments.",
    features: [
      "Comprehensive product range",
      "Enhanced safety features",
      "Excellent performance characteristics",
      "Various current ratings available",
      "Multiple mounting options",
      "Easy wire management",
      "Professional appearance",
      "Long service life"
    ],
    specifications: {
      current: "5-250A",
      poles: "1-pole to multi-pole",
      mounting: "DIN rail and panel mounting",
      testing: "IEC 60947-7-1",
      installation: "Multiple connection methods"
    },
    images: ["/images/products/katko/connectors/ConnectSafe Terminal Blocks.png"],
    inStock: true,
    rating: 4.7,
    reviews: 73,
    price: 134,
    originalPrice: 160
  }
]

export const katkoInstallationEnclosures: KatkoProduct[] = [
  // KATKO Product Range Installation Enclosures
  {
    id: 5001,
    name: "KATKO Installation Enclosure System",
    model: "KATKO IE System",
    brand: "Katko",
    series: "Installation Enclosures",
    category: "Installation Enclosures",
    subcategory: "KATKO Installation Systems",
    description: "Comprehensive installation enclosure system designed for housing Katko electrical components. Features modular design with excellent protection ratings and professional appearance for industrial installations.",
    features: [
      "Modular enclosure system design",
      "Excellent protection ratings (IP65/IP66)",
      "Professional industrial appearance",
      "Multiple size configurations available",
      "Integrated mounting rails and hardware",
      "Easy component installation and maintenance",
      "Corrosion-resistant materials",
      "Compatible with full Katko product range",
      "Customizable internal layouts",
      "Wall and floor mounting options",
      "Cable management systems included",
      "Lockable doors with safety interlocks"
    ],
    specifications: {
      current: "Supports up to 800A components",
      poles: "Accommodates all pole configurations",
      mounting: "Wall, floor, and pole mounting",
      testing: "IP65/IP66, IEC 60439-1",
      installation: "Complete mounting and wiring systems"
    },
    images: ["/images/products/katko/installation-enclosures/KATKO Product Range.png"],
    inStock: true,
    rating: 4.8,
    reviews: 89,
    price: 678,
    originalPrice: 795
  }
]

export const katkoAccessories: KatkoProduct[] = [
  // Handles and Operating Accessories
  {
    id: 6001,
    name: "Handle Accessories 768x768",
    model: "Handle ACC-768",
    brand: "Katko",
    series: "Handle Accessories",
    category: "Accessories",
    subcategory: "Handles and Operating Accessories",
    description: "Comprehensive range of handle accessories for Katko switches and isolators. Includes various handle types, extensions, and locking mechanisms for enhanced operation and safety.",
    features: [
      "Various handle configurations available",
      "Padlock and key locking options",
      "Weather-resistant materials",
      "Ergonomic design for easy operation",
      "Compatible with all Katko switch ranges",
      "Color-coded identification options",
      "Anti-vibration locking mechanisms",
      "Easy installation and maintenance"
    ],
    specifications: {
      current: "Compatible with all current ratings",
      poles: "Universal compatibility",
      mounting: "Direct switch mounting",
      testing: "IEC 60947-3",
      installation: "Tool-free installation"
    },
    images: ["/images/products/katko/accessories/Handles Accessories 768x768.png"],
    inStock: true,
    rating: 4.8,
    reviews: 67,
    price: 45,
    originalPrice: 55
  },

  // Covers and Protection Accessories
  {
    id: 6002,
    name: "Accessories Cover 768x768",
    model: "Cover ACC-768",
    brand: "Katko",
    series: "Cover Accessories",
    category: "Accessories",
    subcategory: "Covers and Protection",
    description: "Protective covers and enclosure accessories for Katko electrical equipment. Provides enhanced protection against environmental conditions and unauthorized access.",
    features: [
      "Weather-resistant protection",
      "UV-stabilized materials",
      "Clear viewing windows available",
      "Tamper-evident security features",
      "Easy-clean surfaces",
      "Ventilation options",
      "Custom sizing available",
      "Industrial grade construction"
    ],
    specifications: {
      current: "All current ratings supported",
      poles: "Universal coverage",
      mounting: "Multiple mounting options",
      testing: "IP65/IP66 protection",
      installation: "Quick-fit design"
    },
    images: ["/images/products/katko/accessories/Accessories Cover 768x768.png"],
    inStock: true,
    rating: 4.7,
    reviews: 89,
    price: 78,
    originalPrice: 95
  },

  // Fixing and Mounting Accessories
  {
    id: 6003,
    name: "Accessories Fixing 768x768",
    model: "Fixing ACC-768",
    brand: "Katko",
    series: "Fixing Accessories",
    category: "Accessories",
    subcategory: "Fixing and Mounting",
    description: "Complete range of fixing and mounting accessories for secure installation of Katko equipment. Includes brackets, rails, and specialized mounting hardware.",
    features: [
      "Multiple mounting configurations",
      "Adjustable positioning systems",
      "Corrosion-resistant hardware",
      "Vibration dampening options",
      "DIN rail compatibility",
      "Panel and wall mounting options",
      "Load distribution brackets",
      "Professional appearance"
    ],
    specifications: {
      current: "Supports up to 800A equipment",
      poles: "All pole configurations",
      mounting: "Universal mounting systems",
      testing: "Mechanical load testing",
      installation: "Professional mounting hardware"
    },
    images: ["/images/products/katko/accessories/Accessories Fixing 768x768.png"],
    inStock: true,
    rating: 4.9,
    reviews: 134,
    price: 89,
    originalPrice: 110
  },

  // Door Mounting Accessories
  {
    id: 6004,
    name: "Door Mounting Accessories",
    model: "Door Mount ACC",
    brand: "Katko",
    series: "Door Mount",
    category: "Accessories",
    subcategory: "Door Mounting Systems",
    description: "Specialized door mounting accessories for integrating Katko switches into enclosure doors. Provides secure mounting with easy access and operation.",
    features: [
      "Secure door integration",
      "Adjustable positioning",
      "Weather seal compatibility",
      "Multiple door thickness support",
      "Anti-sag reinforcement",
      "Cable management integration",
      "Lock integration ready",
      "Professional finish"
    ],
    specifications: {
      current: "Up to 400A door mounting",
      poles: "All configurations supported",
      mounting: "Door thickness 2-10mm",
      testing: "Door load testing",
      installation: "Complete mounting kit"
    },
    images: ["/images/products/katko/accessories/Door Mounting Accessories.png"],
    inStock: true,
    rating: 4.8,
    reviews: 92,
    price: 156,
    originalPrice: 185
  },

  // Change Over Kit
  {
    id: 6005,
    name: "Change Over Kit",
    model: "Change Over Kit",
    brand: "Katko",
    series: "Change Over",
    category: "Accessories",
    subcategory: "Change Over Systems",
    description: "Change over kit for converting standard switches to change-over operation. Enables seamless switching between multiple power sources or load configurations.",
    features: [
      "Seamless source switching",
      "Break-before-make operation",
      "Mechanical interlocking",
      "Visual position indication",
      "Safety interlocks included",
      "Easy retrofit installation",
      "Multiple source compatibility",
      "Professional operation"
    ],
    specifications: {
      current: "Up to 630A change over",
      poles: "3-pole and 4-pole options",
      mounting: "Retrofit compatible",
      testing: "IEC 60947-3",
      installation: "Complete change over kit"
    },
    images: ["/images/products/katko/accessories/Change Over Kit.png"],
    inStock: true,
    rating: 4.6,
    reviews: 43,
    price: 234,
    originalPrice: 275
  },

  // Metal Accessories
  {
    id: 6006,
    name: "Metal Accessory Range",
    model: "Metal ACC",
    brand: "Katko",
    series: "Metal Accessories",
    category: "Accessories",
    subcategory: "Metal Accessories",
    description: "Comprehensive range of metal accessories for enhanced durability and professional appearance. Includes brackets, guards, and structural components.",
    features: [
      "Heavy-duty metal construction",
      "Corrosion-resistant coating",
      "Professional appearance",
      "High mechanical strength",
      "Precision manufacturing",
      "Multiple finish options",
      "Weld-free assembly",
      "Long service life"
    ],
    specifications: {
      current: "All current ratings",
      poles: "Universal compatibility",
      mounting: "Multiple mounting options",
      testing: "Mechanical strength testing",
      installation: "Professional metal accessories"
    },
    images: ["/images/products/katko/accessories/Metal Accessory.png"],
    inStock: true,
    rating: 4.9,
    reviews: 78,
    price: 98,
    originalPrice: 120
  },

  // Plastic Accessories
  {
    id: 6007,
    name: "Plastic Accessory Range",
    model: "Plastic ACC",
    brand: "Katko",
    series: "Plastic Accessories",
    category: "Accessories",
    subcategory: "Plastic Accessories",
    description: "High-quality plastic accessories offering excellent insulation properties and chemical resistance. Ideal for corrosive environments and electrical insulation applications.",
    features: [
      "Excellent electrical insulation",
      "Chemical resistance",
      "UV-stabilized materials",
      "Lightweight construction",
      "Easy installation",
      "Color-coding options",
      "Impact resistant",
      "Cost-effective solution"
    ],
    specifications: {
      current: "Insulation rated accessories",
      poles: "All configurations",
      mounting: "Lightweight mounting",
      testing: "Electrical insulation testing",
      installation: "Easy-fit plastic accessories"
    },
    images: ["/images/products/katko/accessories/Plastic Accessory.png"],
    inStock: true,
    rating: 4.5,
    reviews: 56,
    price: 34,
    originalPrice: 42
  },

  // KATKO Accessories General
  {
    id: 6008,
    name: "KATKO Accessories Complete Range",
    model: "KATKO ACC",
    brand: "Katko",
    series: "Complete Accessories",
    category: "Accessories",
    subcategory: "Complete Accessory Systems",
    description: "Complete range of KATKO accessories covering all switch and isolator enhancement needs. Includes operational, mounting, and safety accessories for professional installations.",
    features: [
      "Complete accessory coverage",
      "Professional installation support",
      "Quality assurance program",
      "Technical documentation included",
      "Multiple product categories",
      "Standardized compatibility",
      "Global availability",
      "Expert technical support"
    ],
    specifications: {
      current: "All KATKO product compatibility",
      poles: "Complete range support",
      mounting: "Universal accessory mounting",
      testing: "Full compliance testing",
      installation: "Complete accessory solution"
    },
    images: ["/images/products/katko/accessories/KATKO Accessories.png"],
    inStock: true,
    rating: 4.8,
    reviews: 145,
    price: 445,
    originalPrice: 520
  }
]

export const getAllKatkoProducts = (): KatkoProduct[] => {
  return [...katkoLoadBreakSwitches, ...katkoSwitchFuses, ...katkoULCSAListed, ...katkoConnectors, ...katkoInstallationEnclosures, ...katkoAccessories]
}

export const getKatkoProductsByCategory = (category: string): KatkoProduct[] => {
  const allProducts = getAllKatkoProducts()
  return allProducts.filter(product => product.category === category)
}

export const getKatkoProductsBySubcategory = (subcategory: string): KatkoProduct[] => {
  const allProducts = getAllKatkoProducts()
  return allProducts.filter(product => product.subcategory === subcategory)
} 