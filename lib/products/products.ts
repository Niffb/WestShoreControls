import { Product } from '@/lib/types/shared-types'
import { klemsanProducts } from './klemsan-products'
import { mitsubishiProducts } from './mitsubishi-products'
import { tmeicProducts } from './tmeic-products'
import { getAllKatkoProducts } from './katko-products'
import { ericoProducts } from './erico-products'
import { lsIndustrialProducts } from './ls-industrial-products'

// Import Noark products
import { noarkMCBProducts } from './noark-mcb-products'
import { noarkMCPProducts } from './noark-mcp-products'
import { pcbProducts } from './noark-pcb-products'
import { noarkSPDProducts } from './noark-spd-products'
import { noarkSwitchesProducts } from './noark-switches-products'
import { noarkEnclosedBreakersProducts } from './noark-enclosed-breakers-products'
import { noarkFuseHoldersProducts } from './noark-fuse-holders-products'
import { noarkB1NProducts } from './noark-b1n-products'
import { noarkB1HProducts } from './noark-b1h-products'
import { noarkB1NQProducts } from './noark-b1nq-products'

// Import scraped products
import { mitsubishiScrapedProducts } from './scraped/mitsubishi-scraped-products'
import { noarkScrapedProducts } from './scraped/noark-scraped-products'
import { schneiderelectricScrapedProducts } from './scraped/schneider-electric-scraped-products'
import { allenbradleyScrapedProducts } from './scraped/allen-bradley-scraped-products'
import { nventScrapedProducts } from './scraped/nvent-scraped-products'
import { unknownScrapedProducts } from './scraped/unknown-scraped-products'

// Import all newly converted scraped products
import { allScrapedProducts } from './scraped/all-scraped-products'

// Convert PCBProducts to Product format
const mappedPCBProducts: Product[] = pcbProducts.map((pcb, index) => ({
  id: 6000 + index, // Assign numeric IDs starting from 6000
  name: pcb.name,
  model: pcb.model,
  brand: pcb.brand,
  category: pcb.category,
  description: pcb.description,
  rating: pcb.rating,
  reviews: pcb.reviews,
  images: pcb.images,
  inStock: pcb.inStock,
  specs: Object.entries(pcb.specifications).map(([key, value]) => `${key}: ${value}`),
  url: pcb.url,
  features: pcb.features
}));

// Generate random realistic prices based on product type
const generatePrice = (category: string, name: string): { price: number; originalPrice?: number } => {
  let basePrice = 100
  
  // Set base prices by category
  switch (category.toLowerCase()) {
    case 'variable frequency drives':
      basePrice = Math.random() * 800 + 200 // $200-$1000
      break
    case 'contactors':
      basePrice = Math.random() * 200 + 80  // $80-$280
      break
    case 'circuit breakers':
      basePrice = Math.random() * 300 + 150 // $150-$450
      break
    case 'pilot devices':
      basePrice = Math.random() * 75 + 25   // $25-$100
      break
    case 'flexible conductors':
      basePrice = Math.random() * 150 + 50  // $50-$200
      break
    case 'busbars':
      basePrice = Math.random() * 200 + 100 // $100-$300
      break
    case 'overload relays':
      basePrice = Math.random() * 140 + 60  // $60-$200
      break
    case 'distribution blocks':
      basePrice = Math.random() * 160 + 40  // $40-$200
      break
    case 'enclosed isolators':
      basePrice = Math.random() * 400 + 150 // $150-$550
      break
    default:
      basePrice = Math.random() * 200 + 50  // $50-$250
  }
  
  // 30% chance of having a discount
  const hasDiscount = Math.random() < 0.3
  if (hasDiscount) {
    const originalPrice = Math.round(basePrice)
    const discountedPrice = Math.round(basePrice * 0.8)
    return { price: discountedPrice, originalPrice }
  }
  
  return { price: Math.round(basePrice) }
}

// Generate random ratings between 3.5 and 5.0
const generateRating = (): number => {
  const ratings = [3.5, 3.8, 4.0, 4.2, 4.5, 4.7, 4.8, 4.9, 5.0]
  return ratings[Math.floor(Math.random() * ratings.length)]
}

// Generate random review counts
const generateReviews = (): number => {
  return Math.floor(Math.random() * 200) + 15 // 15-215 reviews
}

// Combine all Noark products
const allNoarkProducts: Product[] = [
  ...noarkMCBProducts,
  ...noarkMCPProducts,
  ...noarkB1NProducts,
  ...mappedPCBProducts,
  ...noarkSPDProducts,
  ...noarkSwitchesProducts,
  ...noarkEnclosedBreakersProducts,
  ...noarkFuseHoldersProducts,
];

// All products from CSV data - now empty, ready for new efficient method
export const allProducts: Product[] = [
  // Enclosed Isolators Products
  {
    id: 1,
    name: "KEM Polycarbonate Enclosed Isolator 63A",
    model: "KEM-PC-63A",
    brand: "Katko",
    category: "Enclosed Isolators",
    description: "KEM polycarbonate enclosed isolator rated 10-630A with IP66 protection. Features self-extinguishing material, wide operating temperature range, and excellent insulating properties. Padlockable with 3 locks and door interlock with defeat mechanism. Good UV resistance and chemical resistance. Tested according to IEC 60947-3.",
    price: 285,
    originalPrice: 325,
    rating: 4.8,
    reviews: 124,
    images: ["/images/products/enclosed-isolators/KEM-Product-Range-Enclosed-Isolators.png"],
    badge: "Sale",
    inStock: true,
    specs: ["10-630A Current Range", "IP66 Protection", "IEC 60947-3 Tested", "Polycarbonate Enclosure"],
    features: ["Self-Extinguishing Material", "UV Resistant", "Chemical Resistant", "Padlockable"]
  },
  {
    id: 2,
    name: "KEA Fire-Rated Aluminium Isolator 125A",
    model: "KEA-FR-125A",
    brand: "Katko", 
    category: "Enclosed Isolators",
    description: "KEA fire-rated aluminium enclosed isolator designed to conform to F200 class (200°C for 3 hours) or F300 class (300°C for 2 hours) of EN 12101-3. IP66 rated with excellent corrosion and UV resistance. Perfect for critical safety applications requiring fire protection.",
    price: 495,
    rating: 4.9,
    reviews: 87,
    images: ["/images/products/enclosed-isolators/Firerated-Product-Range.png"],
    badge: "Popular",
    inStock: true,
    specs: ["16-800A Range", "F200 3H / F300 2H Fire Rating", "IP66 Protection", "Aluminium Enclosure"],
    features: ["Fire Resistant", "Corrosion Resistant", "UV Resistant", "Door Interlock"]
  },
  {
    id: 3,
    name: "KER Stainless Steel Visual Isolator 400A",
    model: "KER-VS-400A",
    brand: "Katko",
    category: "Enclosed Isolators", 
    description: "KER stainless steel visual isolating switch with visual status indication window. AISI 316L construction for superior corrosion resistance and hygiene requirements. IP66 rated with padlockable handle and door interlock mechanism.",
    price: 725,
    rating: 4.7,
    reviews: 156,
    images: ["/images/products/enclosed-isolators/IsoSafe-Product-Image.png"],
    inStock: true,
    specs: ["200-800A Range", "Visual Status Window", "AISI 316L Stainless Steel", "IP66 Protection"],
    features: ["Visual Indication", "Hygienic Design", "Corrosion Proof", "6/8-Pole Available"]
  },
  {
    id: 4,
    name: "Enclosed Switch Fuse KKVT 32A",
    model: "KKVT-32A",
    brand: "Katko",
    category: "Enclosed Isolators",
    description: "Enclosed switch fuse available in 1P, 2P, 3P and 4P versions. Features KU switch with KV 10×38 fuse holder for 16-32A applications. Available in both BS and DIN fuse versions with polycarbonate, steel, or stainless steel enclosures.",
    price: 365,
    rating: 4.6,
    reviews: 98,
    images: ["/images/products/enclosed-isolators/Enclosed-Switchfuse.png"],
    inStock: true,
    specs: ["16-630A Range", "1P/2P/3P/4P Versions", "BS/DIN Fuse Compatible", "Multiple Enclosure Options"],
    features: ["Integrated Fuse Protection", "Multiple Configurations", "Versatile Design", "Easy Installation"]
  },
  {
    id: 5,
    name: "TKM Motor Control Switch 25A",
    model: "TKM-MC-25A",
    brand: "Katko",
    category: "Enclosed Isolators",
    description: "TKM motor control cam switch in polycarbonate enclosure. IP66 rated with thermal current rating 16-40A. Features door interlock with defeat mechanism and padlockable with three locks. Available as star-delta (TK) or reverse switch (SK) configurations.",
    price: 445,
    originalPrice: 515,
    rating: 4.8,
    reviews: 73,
    images: ["/images/products/enclosed-isolators/Enclosed-Isolators-TKM-600x600.png"],
    badge: "Sale",
    inStock: true,
    specs: ["16-40A Range", "IP66 Protection", "Cam Switch Design", "Polycarbonate Enclosure"],
    features: ["Star-Delta Option", "Reverse Switch Option", "Motor Control Ready", "IEC 60947-3 Tested"]
  },
  {
    id: 6,
    name: "Bypass Switch for Frequency Inverter 40A",
    model: "BYPASS-FI-40A",
    brand: "Katko",
    category: "Enclosed Isolators",
    description: "Bypass switch specifically designed for frequency inverter applications. Available in polycarbonate (IP65), sheet steel (IP65) or aluminium (IP66) enclosures. R.M.S value 50kA with CB certificates. Essential for maintenance operations.",
    price: 585,
    rating: 4.9,
    reviews: 112,
    images: ["/images/products/enclosed-isolators/Enclosed-Isolators-Bypass.png"],
    badge: "Popular",
    inStock: true,
    specs: ["16-63A Range", "50kA R.M.S Value", "Multiple Enclosure Options", "CB Certified"],
    features: ["Inverter Compatible", "High Breaking Capacity", "Maintenance Bypass", "IEC 60947-3 Tested"]
  },
  {
    id: 7,
    name: "KEM ABS Enclosed Isolator 40A",
    model: "KEM-ABS-40A",
    brand: "Katko",
    category: "Enclosed Isolators",
    description: "KEM ABS enclosed isolator rated 10-80A with IP65 protection. Recommended for indoor installation with excellent insulating properties and chemical resistance. Features door interlock with defeat mechanism and padlockable with three locks.",
    price: 195,
    rating: 4.5,
    reviews: 89,
    images: ["/images/products/enclosed-isolators/Enclosed-Isolators-Product-Range.png"],
    inStock: true,
    specs: ["10-80A Range", "IP65 Protection", "ABS Enclosure", "Indoor Installation"],
    features: ["Recycled ABS Material", "Chemical Resistant", "Cost Effective", "Padlockable"]
  },
  {
    id: 8,
    name: "EMC Switch Polycarbonate 80A",
    model: "EMC-PC-80A",
    brand: "Katko",
    category: "Enclosed Isolators",
    description: "EMC switch ensuring safe operation in environments with electromagnetic disturbance. Tested according to EMC EN 61000-6-3. Available in polycarbonate up to 125A with EMC cable glands included. IP66 protection with 3-, 4-, 6- or 8-pole configurations.",
    price: 415,
    originalPrice: 475,
    rating: 4.7,
    reviews: 156,
    images: ["/images/products/enclosed-isolators/Enclosed-Isolators-Product-Range-(1).png"],
    badge: "Sale",
    inStock: true,
    specs: ["10-1600A Range", "EMC Protected", "IP66 Protection", "Multi-pole Options"],
    features: ["EMC Compatibility", "Shielded Cable Glands", "EM Interference Resistant", "Wide Range Available"]
  },
  {
    id: 9,
    name: "KET Sheet Steel Isolator 200A",
    model: "KET-SS-200A",
    brand: "Katko",
    category: "Enclosed Isolators",
    description: "KET sheet steel enclosed isolator rated 16-1600A with IP66 protection. Features good corrosion resistance, wide operating temperature range, and excellent insulating properties. Padlockable with door interlock and defeat mechanism.",
    price: 525,
    rating: 4.6,
    reviews: 134,
    images: ["/images/products/enclosed-isolators/Enclosed-Isolators-Product-Range-(2).png"],
    inStock: true,
    specs: ["16-1600A Range", "IP66 Protection", "Sheet Steel Construction", "Wide Temperature Range"],
    features: ["Corrosion Resistant", "High Current Capacity", "UV Resistant", "Chemical Resistant"]
  },
  {
    id: 10,
    name: "KEA Aluminium Enclosed Isolator 160A",
    model: "KEA-AL-160A",
    brand: "Katko",
    category: "Enclosed Isolators",
    description: "KEA aluminium enclosed isolator rated 16-250A. Available in IP66 (A2, A4) and IP65 (A5, A6) configurations with IK08/IK10 impact protection. Excellent for harsh weather conditions with wide operating temperature range and UV resistance.",
    price: 385,
    rating: 4.8,
    reviews: 98,
    images: ["/images/products/enclosed-isolators/Enclosed-Isolators-Product-Range-(3).png"],
    badge: "Popular",
    inStock: true,
    specs: ["16-250A Range", "IP65/IP66 Protection", "IK08/IK10 Impact Rating", "Aluminium Construction"],
    features: ["Weather Resistant", "Impact Protection", "UV Resistant", "Chemical Resistant"]
  },
  {
    id: 11,
    name: "ATEX Explosion-Proof Isolator 100A",
    model: "ATEX-100A",
    brand: "Katko",
    category: "Enclosed Isolators",
    description: "ATEX explosion-proof switch conforming to Directive 2014/34/EU for Zone 22 (Category 3D) applications. IP66 protection with frontal impact test of 7 Joules. Available in aluminium and stainless steel with ATEX cable glands included.",
    price: 895,
    rating: 4.9,
    reviews: 67,
    images: ["/images/products/enclosed-isolators/Enclosed-Isolators-Product-Range-(4).png"],
    badge: "Special",
    inStock: true,
    specs: ["16-160A Range", "ATEX Zone 22 Certified", "IP66 Protection", "7J Impact Tested"],
    features: ["Explosion Proof", "ATEX Certified", "Impact Resistant", "Hazardous Area Suitable"]
  },
  {
    id: 12,
    name: "KER IP69K Stainless Steel Isolator 80A",
    model: "KER-IP69K-80A",
    brand: "Katko",
    category: "Enclosed Isolators",
    description: "KER IP69K stainless steel isolator with highest protection rating. AISI 316L acid-proof construction ideal for hygienic applications. Features LK11 handle (black or yellow/red) with door interlock and defeat mechanism. S-model available with sloped roof.",
    price: 745,
    originalPrice: 850,
    rating: 4.9,
    reviews: 145,
    images: ["/images/products/enclosed-isolators/Enclosed-Isolators-Image.png"],
    badge: "Premium",
    inStock: true,
    specs: ["16-125A Range", "IP69K Protection", "AISI 316L Stainless Steel", "Hygienic Design"],
    features: ["Highest IP Rating", "Acid Proof", "Washdown Safe", "Food Industry Suitable"]
  },
  // Elsteel Modular Enclosures Products
  {
    id: 13,
    name: "Techno Module",
    model: "TM-200",
    brand: "Elsteel",
    category: "Modular Enclosures",
    description: "Flexibility. Reliability. Safety. Welcome to Techno Module. Elsteel's original 200mm grid solution is the long-standing preference of panel builders and consultants all over the world. Tested & certified; flexible & technically advanced; with Techno Module - the posibilites are endless.",
    price: 485,
    rating: 4.9,
    reviews: 187,
    images: ["products/elsteel/Modular_Enclosures_modular-enclosures-300x300_504caefb.jpg"],
    badge: "Popular",
    inStock: true,
    specs: ["200mm Grid System", "Tested & Certified", "Flexible Design", "Universal Compatibility"],
    features: ["Modular Construction", "Easy Assembly", "Professional Grade", "Worldwide Preference"]
  },
  {
    id: 14,
    name: "Busbar System",
    model: "BS-ADVANCED",
    brand: "Elsteel",
    category: "Modular Enclosures",
    description: "Elsteel's design verified Busbar System is the most advanced solution on the market. Tested and certified for both copper & aluminum, our fully flexible system is suitable for any project.",
    price: 650,
    originalPrice: 750,
    rating: 4.8,
    reviews: 142,
    images: ["products/elsteel/busbars_elsteel_busbars_elsteel_busbars-elsteel-300x300_387b9243.jpg"],
    badge: "Sale",
    inStock: true,
    specs: ["Copper & Aluminum Compatible", "Design Verified", "Fully Flexible", "Market Leading"],
    features: ["Advanced Technology", "Dual Material Support", "Project Versatile", "Tested & Certified"]
  },
  {
    id: 15,
    name: "Techno Module Light",
    model: "TML-COMPACT",
    brand: "Elsteel",
    category: "Modular Enclosures",
    description: "Designed with the same flexibility and reliability of Techno Module; the Techno Module Light is for projects where a smaller panel is required.",
    price: 325,
    rating: 4.7,
    reviews: 96,
    images: ["products/elsteel/elsteel_techno_module_light_elsteel_techno_module__module-light-300x300_a91bf58d.jpg"],
    inStock: true,
    specs: ["Compact Design", "Same Flexibility", "Smaller Panels", "Reliable Construction"],
    features: ["Space Efficient", "Flexible Design", "Proven Reliability", "Easy Installation"]
  },
  {
    id: 16,
    name: "Instant Panel",
    model: "IP-15MIN",
    brand: "Elsteel",
    category: "Modular Enclosures",
    description: "It takes just 15 minutes to assemble our instant panel. A cost effective option for small distribution switchboards up to 400A, built on the Techno Module's 200mm grid.",
    price: 285,
    originalPrice: 350,
    rating: 4.6,
    reviews: 203,
    images: ["products/elsteel/instant_panel_instant_panel_instant-panel-300x300_91886171.jpg"],
    badge: "Sale",
    inStock: true,
    specs: ["15 Min Assembly", "Up to 400A", "200mm Grid", "Cost Effective"],
    features: ["Quick Assembly", "Economic Solution", "Small Distribution", "Easy Installation"]
  },
  {
    id: 17,
    name: "Plug & Power™ Reloaded",
    model: "PP-RELOADED",
    brand: "Elsteel",
    category: "Plug and Power",
    description: "Plug & Power™ Reloaded is a revolutionary new way of making Power Distribution Boards and Motor Control Centres! A Techno Module panel with Plug & Power™ Reloaded can be modified, changed and rearranged indefinitely, while maintaining your power supply to critical equipment.",
    price: 850,
    rating: 4.9,
    reviews: 78,
    images: ["products/elsteel/plugs_plugs_plugs-300x300_e3c1762c.jpg"],
    badge: "New",
    inStock: true,
    specs: ["Design verified IEC 61439-2", "Infinite Modifications", "Live Power Supply", "Vertical Busbar System"],
    features: ["Revolutionary Design", "Motherboard Technology", "Form 4 Separation", "Plug-in Base System"]
  },
  {
    id: 18,
    name: "Fully Welded IP69K Enclosures",
    model: "FW-IP69K",
    brand: "Elsteel",
    category: "Enclosures",
    description: "The double gasket on the box and double lip on the door ensures a very high IP rating of IP69K. This ingress rating of enclosure is essential where high pressure, high temperature or washdown is used to sanitize equipment. You can rest assured that expensive electrical equipment is safe from water and dust.",
    price: 425,
    rating: 4.8,
    reviews: 112,
    images: ["products/elsteel/IP69K_IP69K_IP69K-300x300_bb3882e7.jpg"],
    badge: "High IP Rating",
    inStock: true,
    specs: ["IP69K Rating", "Double Gasket", "Double Lip Door", "High Pressure Resistant"],
    features: ["Water & Dust Protection", "Sanitization Ready", "High Temperature Resistant", "Certified Protection"]
  },
  {
    id: 19,
    name: "Mild Steel Box",
    model: "MSB-STANDARD",
    brand: "Elsteel",
    category: "Enclosures",
    description: "Mild Steel Boxes are fully welded ensuring high IP ratings. With a high quality, durable, textured paint finish, the boxes are resistant to corrosion in most indoor environments. The boxes include a mounting plate and can be fitted with a variety of different inserts.",
    price: 245,
    rating: 4.7,
    reviews: 89,
    images: ["products/elsteel/mild-steel-box_mild-steel-box_mild-steel-box-300x300_76658e42.jpg"],
    inStock: true,
    specs: ["Fully Welded", "High IP Rating", "Textured Paint Finish", "Mounting Plate Included"],
    features: ["Corrosion Resistant", "Custom Inserts", "Indoor Use", "Durable Construction"]
  },
  {
    id: 20,
    name: "Stainless Steel Box",
    model: "SSB-316",
    brand: "Elsteel",
    category: "Enclosures",
    description: "Stainless Steel Boxes for harsher environments. High specification grade material AISI 304 or AISI 316. Perfect for outdoor use and environments such as food industry or medical where aggressive detergents are used for cleaning. We use 'wet grinded' steel for smooth, easy-to-clean surfaces.",
    price: 675,
    originalPrice: 750,
    rating: 4.9,
    reviews: 156,
    images: ["products/elsteel/stainles_steel_box_stainles_steel_box_ss-box-300x300_7e0de335.jpg"],
    badge: "Sale",
    inStock: true,
    specs: ["AISI 304/316 Grade", "Wet Grinded Steel", "Outdoor Rated", "Easy to Clean"],
    features: ["Harsh Environment Ready", "Food Industry Approved", "Medical Grade", "Smooth Finish"]
  },
  {
    id: 21,
    name: "Terminal Boxes",
    model: "TB-STANDARD",
    brand: "Elsteel",
    category: "Enclosures",
    description: "Terminal Boxes are manufactured to very high standards ensuring a top-quality product. Available in both powder coated Mild Steel and Stainless Steel AISI 304/AISI 316. Essential for electrical and electro-mechanical applications with wide range of uses.",
    price: 185,
    rating: 4.6,
    reviews: 203,
    images: ["products/elsteel/terminal_box_terminal_box_terminal-box-300x300_7f91fa48.jpg"],
    inStock: true,
    specs: ["High Standards", "Multiple Material Options", "Powder Coated", "Wide Application Range"],
    features: ["Electrical Applications", "Electro-mechanical Ready", "Quality Construction", "Versatile Use"]
  },
  {
    id: 22,
    name: "Custom Made Enclosures",
    model: "CME-BESPOKE",
    brand: "Elsteel",
    category: "Special Enclosures",
    description: "Elsteel special enclosures are manufactured according to your needs and requirements. Our manufacturing process is very flexible, and we can save you precious assembly time by making almost any enclosure you need. We love a challenge so next time you have one: ask us.",
    price: 950,
    rating: 4.9,
    reviews: 67,
    images: ["products/elsteel/floor_standing_cabinet_floor_standing_cabinet_floor-standing-300x300_9e491b3b.jpg"],
    badge: "Custom",
    inStock: true,
    specs: ["Your Design", "Superior Quality", "Any RAL Colour", "Customized Cutouts"],
    features: ["Bespoke Design", "Flexible Manufacturing", "Fast Delivery", "No Quantity Limitations"]
  },
  {
    id: 23,
    name: "Special Size Enclosures",
    model: "SSE-TIGHT",
    brand: "Elsteel",
    category: "Special Enclosures",
    description: "We can produce boxes in special sizes and angles to fit into tight spaces, with or without cutouts for buttons, rain roof and other various options. Our know-how combined with your design requirements.",
    price: 675,
    originalPrice: 780,
    rating: 4.8,
    reviews: 94,
    images: ["products/elsteel/inserts_inserts_inserts-300x300_5c24e245.jpg"],
    badge: "Sale",
    inStock: true,
    specs: ["Special Sizes", "Tight Space Solutions", "Mild Steel or Stainless", "Custom Angles"],
    features: ["Space Optimization", "Button Cutouts", "Rain Roof Options", "Excellent Price"]
  },
  {
    id: 24,
    name: "19\" Super Frame",
    model: "SF-19INCH",
    brand: "Elsteel",
    category: "Super Frame",
    description: "Elsteel 19\" Super Frame is designed for high tech requirements for Telecommunication, Data Communication and Uninterruptible Power Supply (UPS). Super Frame cabinets are delivered with all necessary accessories for cable management fitted with top/bottom gland plates and cable trays.",
    price: 1250,
    rating: 4.9,
    reviews: 156,
    images: [
      "products/elsteel/techno_module_basic_elsteel_techno_module_basic_el_techno-modular-basic-300x300_b114fbc3.jpg"
    ],
    badge: "High Tech",
    inStock: true,
    specs: ["19\" Rack Compatible", "Cable Management", "Adjustable Feet", "Top/Bottom Gland Plates"],
    features: ["Sleek Design", "Data Center Ready", "Adjustable Equipment Trays", "Easy Access Design"]
  },
  // Klemsan Products (imported from klemsan-products.ts)
  ...klemsanProducts,
  // Scraped Products (original)
  ...mitsubishiScrapedProducts,
  ...noarkScrapedProducts,
  ...schneiderelectricScrapedProducts,
  ...allenbradleyScrapedProducts,
  ...nventScrapedProducts,
  // All newly converted scraped products (10,621 products)
  ...allScrapedProducts,
  // Note: unknownScrapedProducts excluded until brands are properly identified
]

// Combined products including Mitsubishi, TMEIC, Katko, Erico, LS Industrial, and Noark when needed
export const getAllProductsIncludingMitsubishi = (): Product[] => {
  return [
    ...allProducts, 
    ...mitsubishiProducts, 
    ...tmeicProducts, 
    ...getAllKatkoProducts(), 
    ...ericoProducts, 
    ...lsIndustrialProducts,
    ...noarkMCBProducts,
    ...noarkMCPProducts,
    ...mappedPCBProducts,
    ...noarkSPDProducts,
    ...noarkSwitchesProducts,
    ...noarkEnclosedBreakersProducts,
    ...noarkFuseHoldersProducts,
    ...noarkB1NProducts,
    ...noarkB1HProducts,
    ...noarkB1NQProducts
  ]
}

// Product categories - cleaned up to only include categories with actual products
export const productCategories: string[] = [
  'All Products',
  // ERICO Categories
  "Busbars",
  "Busbar Supports",
  "Connecting Clamps",
  "Connectors",
  "Distribution Blocks",
  "Flexible Conductors",
  "Insulators",
  "Power Terminals",
  // LS Industrial Categories
  "Magnetic Contactor",
  // Elsteel Categories (from main products)
  "Enclosed Isolators",
  "Enclosures",
  "Modular Enclosures",
  "Special Enclosures",
  "Super Frame",
  // Klemsan Categories (assumed from existing products)
  "Terminal Blocks",
  "Screw Terminals",
  "Spring Terminals",
  "Plug Terminals",
  "Other Terminals",
  "End Stops",
  "Power Sources",
  "Intermediate Relays",
  "Automation",
  "Climate",
  "Time Relays",
  "Voltage Monitoring Relay",
  "Marking Solutions",
  "Tools and Accessories",
  // Noark Categories
  "Air Circuit Breakers",
  "DIN Rail Fuse Holders and Fuses",
  "Enclosed Breakers",
  "Miniature Circuit Breakers",
  "Molded Case Switches",
  "Motor-Circuit Protectors",
  "Power Circuit Breakers",
  "Surge Protective Device",
  // Scraped Categories
  "Batteries & Power",
  "Cables & Accessories",
  "Circuit Breakers",
  "Contactors",
  "Variable Frequency Drives",
  "LED Indicators",
  "Manual Motor Starters",
  "Other Products",
  "Overload Relays",
  "Programmable Logic Controllers",
  "Power Distribution",
  "Push Buttons",
  "Servo Motors",
]

// Product brands  
export const productBrands: string[] = [
  'All Brands',
  "Elsteel",
  "ERICO",
  "Katko",
  "Klemsan",
  "LS Industrial",
  "Mitsubishi",
  "Noark",
  "TMEIC",
  "Westshore Controls",
  // Scraped brands
  "Schneider Electric",
  "Allen Bradley",
  "nVent",
  "General Electric",
  "ABB",
  "Siemens",
  "Eaton",
  "Square D",
  "Cutler Hammer",
  "Westinghouse",
  "Fuji Electric",
  "Omron",
  "Honeywell",
  "Emerson",
  "Danfoss",
  "Yaskawa",
  "Delta",
  "Lenze",
  "SEW",
  "Nord",
  "Bonfiglioli",
  "Leroy Somer",
  "WEG",
  "Teco",
  "Baldor",
  "Marathon",
  "Leeson",
  "Dayton",
  "Grainger",
  "McMaster",
  "Automation Direct",
  "Phoenix Contact",
  "Weidmuller",
  "Pepperl Fuchs",
  "Turck",
  "Balluff",
  "Sick",
  "Keyence",
  "Banner",
  "Cognex",
  "Datalogic",
  "Leuze",
  "Wenglor",
  "Contrinex",
  "Baumer",
  "IFM",
  "Pilz",
  "Murr",
  "Harting",
  "Molex",
  "TE Connectivity",
  "Amphenol",
  "Belden",
  "Panduit",
  "Legrand",
  "Wieland",
  "Wago",
  "Beckhoff",
  "B&R",
  "Lapp",
  "Igus",
  "Rittal",
  "Hoffman",
  "Hammond",
  "Saginaw",
  "Stahlin",
  "Fibox",
  "Bud",
  "Polycase",
  "OKW",
  "Pactec",
  "Serpac",
  "Takachi",
  "Teko",
  "Rolec",
  "Rose",
  "New Age",
  "Spelsberg",
  "Gewiss",
  "Hensel",
  "Schroff"
]

// Get featured products (first 8 products)
export const getFeaturedProducts = (): Product[] => {
  return cleanProducts.slice(0, 8)
}

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'All Products') return cleanProducts
  return cleanProducts.filter(product => product.category === category)
}

// Get products by brand with enhanced support for all brands
export const getProductsByBrandEnhanced = (brand: string): Product[] => {
  // Filter all products by brand for comprehensive support
  const allProductsList = getAllProductsIncludingMitsubishi()
  const filteredByBrand = allProductsList.filter(product => 
    product.brand.toLowerCase() === brand.toLowerCase()
  )
  
  // Return filtered products, or fallback to specific brand logic
  if (filteredByBrand.length > 0) {
    return filteredByBrand
  }
  
  // Fallback to original brand-specific logic
  switch (brand.toLowerCase()) {
    case 'mitsubishi':
      return [...mitsubishiProducts, ...mitsubishiScrapedProducts]
    case 'tmeic':
      return tmeicProducts
    case 'katko':
      return getAllKatkoProducts()
    case 'noark':
      return [
        ...noarkMCBProducts,
        ...noarkMCPProducts, 
        ...mappedPCBProducts,
        ...noarkSPDProducts,
        ...noarkSwitchesProducts,
        ...noarkEnclosedBreakersProducts,
        ...noarkFuseHoldersProducts,
        ...noarkB1NProducts,
        ...noarkB1HProducts,
        ...noarkB1NQProducts,
        ...noarkScrapedProducts
      ]
    case 'klemsan':
      return klemsanProducts
    case 'erico':
      return ericoProducts
    case 'ls industrial':
      return lsIndustrialProducts
    case 'schneider electric':
      return schneiderelectricScrapedProducts
    case 'allen bradley':
      return allenbradleyScrapedProducts
    case 'nvent':
      return nventScrapedProducts
    default:
      return []
  }
}

// Filtered products that exclude items with "Product found on" descriptions, category page URLs, and generic descriptions
export const cleanProducts: Product[] = allProducts.filter(product => {
  // Remove products with generic placeholder descriptions
  if (product.description.match(/^High-quality .* from .*/)) {
    return false
  }
  
  // Remove non-product items
  if (['About', 'Terms and Conditions', 'Privacy Policy'].includes(product.name)) {
    return false
  }
  
  // Remove products with placeholder images (but allow Klemsan products to use placeholders)
  if (product.images[0] === "/images/products/placeholder.jpg" && product.brand !== 'Klemsan') {
    return false
  }
  
  // Remove products with generic descriptions that don't provide value
  if (product.description.startsWith('Product found on')) {
    return false
  }
  
  // Remove products that are just category page links
  if (product.url?.includes('product-category') && product.description.length < 50) {
    return false
  }
  
  // Remove products with very short, non-descriptive descriptions (but allow Klemsan products)
  if (product.brand !== 'Klemsan' && product.description.length < 20 && !product.specs?.length) {
    return false
  }
  
  return true
})

// Enhanced clean products that include Mitsubishi, TMEIC, Katko, Erico, LS Industrial, and Noark products
export const cleanProductsWithMitsubishi = [
  ...cleanProducts, 
  ...mitsubishiProducts, 
  ...tmeicProducts, 
  ...getAllKatkoProducts(), 
  ...ericoProducts, 
  ...lsIndustrialProducts,
  ...noarkMCBProducts,
  ...noarkMCPProducts,
  ...mappedPCBProducts,
  ...noarkSPDProducts,
  ...noarkSwitchesProducts,
  ...noarkEnclosedBreakersProducts,
  ...noarkFuseHoldersProducts,
  ...noarkB1NProducts,
  ...noarkB1HProducts,
  ...noarkB1NQProducts
]

// Updated search function to include Mitsubishi
export const searchProductsEnhanced = (query: string): Product[] => {
  const searchProducts = [
    ...mitsubishiProducts,
    ...tmeicProducts,
    ...noarkMCBProducts,
    ...noarkMCPProducts,
    ...mappedPCBProducts,
    ...noarkSPDProducts,
    ...noarkSwitchesProducts,
    ...noarkEnclosedBreakersProducts,
    ...noarkFuseHoldersProducts,
    ...noarkB1NProducts,
    ...noarkB1HProducts,
    ...noarkB1NQProducts,
    ...klemsanProducts,
    ...ericoProducts,
    ...lsIndustrialProducts
  ]
  
  const lowercaseQuery = query.toLowerCase()
  return searchProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  )
}

// Get product by ID
export const getProductById = (id: number): Product | undefined => {
  return cleanProducts.find(product => product.id === id)
} 