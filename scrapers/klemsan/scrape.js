/**
 * Klemsan Product Expander
 * 
 * Expands the existing Klemsan product data (categories with models)
 * into individual products for each model variant.
 * 
 * Uses local image paths from /assets/images/products/klemsan/
 */

import fs from 'fs/promises';
import path from 'path';

// Local image paths for categories
const LOCAL_CATEGORY_IMAGES = {
    'Screw Terminals': '/assets/images/products/klemsan/OPK_EKI_112010N.webp',
    'Quick Release': '/assets/images/products/klemsan/WG_-_EKI_110010N.webp',
    'Spring Terminals': '/assets/images/products/klemsan/YKB_94_(2,5X100)_White_532100B.webp',
    'Plug Terminals': '/assets/images/products/klemsan/OPK_EKI_112110N.webp',
    'Other Terminals': '/assets/images/products/klemsan/OPK_EKI_112220N.webp',
    'End Stops': '/assets/images/products/klemsan/DM_6-S_113060.webp',
    'Power Sources': '/assets/images/products/klemsan/KLP-10-24_261003.webp',
    'Intermediate Relays': '/assets/images/products/klemsan/REL_24V_DC_SLIM_TIP_6A250VAC_095041.webp',
    'Automation': '/assets/images/products/klemsan/REMOTE_IO__260001.webp',
    'Climate': '/assets/images/products/klemsan/Z1T-M5_216018.webp',
    'Cam Switches': '/assets/images/products/klemsan/G1-SA_270130.webp',
    'Control Buttons': '/assets/images/products/klemsan/G1-SAP_270131.webp',
    'Junction Boxes': '/assets/images/products/klemsan/D3899926WH53SA_936WH53SA.webp',
    'Thermal Printers': '/assets/images/products/klemsan/KLEMARK_RIBON_30mm_x_300m__1020010.webp',
    'Cable Channels': '/assets/images/products/klemsan/YKB_914_(9X914)_BEYAZ_539914B.webp',
    'Tools and Accessories': '/assets/images/products/klemsan/YKB_762_(9X762)_SIYAH_539762S.webp',
    'Terminal Blocks': '/assets/images/products/klemsan/OPK_EKI_112010N.webp',
    'Marking Solutions': '/assets/images/products/klemsan/KLEMARK_RIBON_50mm_x_300m__1020011.webp',
    'Accessories': '/assets/images/products/klemsan/DM_8-S_113080.webp',
    'Electronic Terminals': '/assets/images/products/klemsan/Z1K-M10_216019.webp',
    'Terminal Marking': '/assets/images/products/klemsan/SLF-P1_W_11,2mm_x_15m__1020100.webp'
};

// Default image
const DEFAULT_IMAGE = '/assets/images/products/klemsan/OPK_EKI_112010N.webp';

// Existing Klemsan products (copied from klemsan-products.ts)
const klemsanProducts = [
  {
    id: 1001,
    name: "Screw Terminal Block 2.5mm²",
    brand: "Klemsan",
    category: "Screw Terminals",
    description: "High-quality screw terminal block for secure conductor connections up to 2.5 mm². Flame-retardant PA66 housing with nickel-plated steel clamp system.",
    rating: 4.7,
    reviews: 23,
    images: ["/assets/images/products/klemsan/OPK_EKI_112010N.webp"],
    inStock: true,
    specs: ["2.5 mm²", "800 V", "24 A", "UL / CE"],
    models: ["AVK 2.5", "AVK 4 R", "AVK 2.5/4 T", "PB 2.5/NM", "WGO PB 6/NM", "WGO 1"],
  },
  {
    id: 1002,
    name: "Quick Release Terminal 4mm²",
    brand: "Klemsan",
    category: "Quick Release",
    description: "Tool-free spring clamp quick-release terminal block for fast wiring up to 4 mm².",
    rating: 4.6,
    reviews: 17,
    images: ["/assets/images/products/klemsan/WG_-_EKI_110010N.webp"],
    inStock: true,
    specs: ["4 mm²", "800 V", "32 A", "Push-in"],
    models: ["PYK 1.5 M", "PYK 2.5", "PYK 4 T", "PYKM 2.5", "PYK 2.5-2 FD B", "PYK 3 S", "PYK 4 S", "PYK 4 SLD", "PYK 2.5 A", "PYK 2.5 EA", "PYK 2.5 CCA", "PYK 1.5 ME", "PYK 2.5 ET"],
  },
  {
    id: 1003,
    name: "Spring Terminal Block 2.5mm²",
    brand: "Klemsan",
    category: "Spring Terminals",
    description: "Compact spring-clamp terminal block ensuring vibration-resistant connections for control panels.",
    rating: 4.8,
    reviews: 31,
    images: ["/assets/images/products/klemsan/YKB_94_(2,5X100)_White_532100B.webp"],
    inStock: true,
    specs: ["2.5 mm²", "800 V", "24 A", "IEC 60947-7-2"],
    models: ["YBK 2.5-2 F", "YBK 2.5-2 FK", "YBK 3 S", "YBK 3 SLD", "WG-EK", "MDB 4", "MDB 4E", "YBK 2.5-3 F", "YBK 2.5-2 FT", "PCY 2.5", "PCY 2.5 N", "MYK 2.5", "MYK 2.5 T", "SRD 2.5", "SRD 2.5 D-A"],
  },
  {
    id: 1004,
    name: "Plug-in Terminal 4-Pole",
    brand: "Klemsan",
    category: "Plug Terminals",
    description: "Modular plug-in terminal block system providing quick module replacement in automation cabinets.",
    rating: 4.7,
    reviews: 12,
    images: ["/assets/images/products/klemsan/OPK_EKI_112110N.webp"],
    inStock: true,
    specs: ["4 Pole", "6 mm²", "800 V"],
    models: ["CTP .5", "PTP 2.5", "CTP 2.5 E", "CTP 2.5 EA", "CTP 2.5 S", "CTP 2.5-2F", "CTP 2.5-2FK", "CTP 2.5-FT", "CTP 2.5 T", "PTP 2.5 T", "CTP 2.5 ET", "CTP 2.5 CT", "CTP 2.5-2T", "SC-PTR 2.5", "SC-PT 2,5", "SC-PTS 2,5"],
  },
  {
    id: 1005,
    name: "Multi-purpose Terminal Set",
    brand: "Klemsan",
    category: "Other Terminals",
    description: "Assorted terminal pack including disconnect, fuse and ground terminals for panel assembly.",
    rating: 4.5,
    reviews: 8,
    images: ["/assets/images/products/klemsan/OPK_EKI_112220N.webp"],
    inStock: true,
    specs: ["Assorted", "DIN-rail"],
    models: ["PSK 1/2", "PSK 1/12", "PSK 2/2", "PSK 2/10", "SK 1", "SK 2", "SK 3", "SK 4", "UC02", "UC03", "UC05", "BIK 1", "BIK 2", "BIK 3", "BIK 4", "BIK 5", "SBK16/5", "SBK16/10", "SBK35/5", "SBK35/10", "SBK50/5", "SBK50/10", "BK 4", "BK 10", "BK 35", "IBK 4", "IBK 10", "IBK 35", "BKN 4", "BKN 16", "BKN 35", "IBKN 4", "IBKN 16", "IBKN 35"],
  },
  {
    id: 1006,
    name: "End Stop for DIN Rail",
    brand: "Klemsan",
    category: "End Stops",
    description: "Robust PA end-bracket ensuring tight fixation of terminal blocks on DIN rails.",
    rating: 4.9,
    reviews: 44,
    images: ["/assets/images/products/klemsan/DM_6-S_113060.webp"],
    inStock: true,
    specs: ["PA66", "35 mm DIN"],
    models: ["KD3", "KD4", "KD5", "KD6", "KD6A", "KD 7", "KD 8", "ATCS 6", "ME 1-1", "ME 1-2", "ME 2-2", "ME 3", "GE 4"],
  },
  {
    id: 1007,
    name: "24 VDC DIN Rail Power Supply 120 W",
    brand: "Klemsan",
    category: "Power Sources",
    description: "Slim DIN-rail power supply providing 24 V DC / 5 A with universal input and overload protection.",
    rating: 4.6,
    reviews: 29,
    images: ["/assets/images/products/klemsan/KLP-10-24_261003.webp"],
    inStock: true,
    specs: ["120 W", "24 V DC", "UL 508"],
    models: ["KSS-15-12", "KSS-15-24", "KSS-30-12", "KSS-30-24", "KSS-60-12", "KSS-60-24", "KSS-60-48", "KSS-75-12", "KSS-75-24", "KSS-75-48", "KSS-120-12", "KSS-120-24", "KSS-120-48", "KSS-240-24", "KSS-240-48", "KSS-360-24", "KSS-360-36", "KSS-360-48", "KSS-480-24", "KSS-480-48", "KSS-960-24", "KSS-960-48"],
  },
  {
    id: 1008,
    name: "Plug-in Intermediate Relay 8 Pin 230 VAC",
    brand: "Klemsan",
    category: "Intermediate Relays",
    description: "General-purpose relay with LED indicator and test button, suitable for interface applications.",
    rating: 4.7,
    reviews: 19,
    images: ["/assets/images/products/klemsan/REL_24V_DC_SLIM_TIP_6A250VAC_095041.webp"],
    inStock: true,
    specs: ["8 Pin", "10 A", "230 VAC Coil"],
    models: ["KRM200", "KRM400", "KMY200", "KMY400", "KRI100", "KRI100L/L", "KRI100LD", "KRI200", "KRI200L/L", "KRI200LD/LD", "KRI 1CO", "KRI 2CO"],
  },
  {
    id: 1009,
    name: "PLC I/O Module 16-DI",
    brand: "Klemsan",
    category: "Automation",
    description: "Modular remote I/O unit with 16 digital inputs, MODBUS TCP communication for industrial automation.",
    rating: 4.5,
    reviews: 14,
    images: ["/assets/images/products/klemsan/REMOTE_IO__260001.webp"],
    inStock: true,
    specs: ["16 DI", "MODBUS TCP", "24 V DC"],
    models: ["MEASTRO110", "MEASTRO120", "MEASTRO121", "MEASTRO221", "MEASTRO321", "T1-60S", "T1-100S", "T1-XS", "T1-FLASH", "T1-M4", "Z1-M5", "T1-M5", "T1-K", "T1-LR", "SD1", "PH1-20L", "LC3", "DPR3110", "DPR3120", "DPR3111", "DPR3121", "DPR3110E", "DPR3120E", "F1", "C1-SA", "ALRC-6", "ANC-8", "ANC-16", "ASCON 311", "ASCON 321", "ASCON 331", "ASCON 352", "VT3-AC", "VT3-AC-24", "VT3-ACDC-24", "KPR-SCE6VDC-1C", "KPR-SCE12VDC-1C", "ETOR-4", "ETOR-2", "KLEA 320P", "KLEA 370P", "RAPIDUS 231R-E", "RAPIDUS 211R"],
  },
  {
    id: 1010,
    name: "Panel Climate Control Fan 120 mm",
    brand: "Klemsan",
    category: "Climate",
    description: "High-performance panel fan with filter mat ensuring proper ventilation and temperature control.",
    rating: 4.4,
    reviews: 11,
    images: ["/assets/images/products/klemsan/Z1T-M5_216018.webp"],
    inStock: true,
    specs: ["230 VAC", "IP54", "Metal Grill"],
    models: ["KLM TM01", "KLM TM02", "KLM TM03", "RFF 36", "RFF 60", "RFF 120", "EF 105", "EF 150", "EF 250", "EF 352", "FF 105-40", "FF 150-150", "RFF 55", "RFF 56", "KLM HT 15", "KLM HT 30", "KLM HT 45", "KLM HT 60", "KLM TL01", "KLM TL02", "KLM TL03", "KLM TL04", "KLM TL05", "KLM TL06"],
  },
  {
    id: 1011,
    name: "Cam Switch 3-Position 40 A",
    brand: "Klemsan",
    category: "Cam Switches",
    description: "Durable cam switch for ON-OFF-ON operations, 3-pole, rated 40 A, panel-mount.",
    rating: 4.6,
    reviews: 15,
    images: ["/assets/images/products/klemsan/G1-SA_270130.webp"],
    inStock: true,
    specs: ["3-Pole", "40 A", "IP65"],
    models: ["CS010090S", "CS016090S", "CS010091S", "CS040063E", "CS032108M", "CS120109L", "CS010111S"],
  },
  {
    id: 1012,
    name: "22 mm Control Push Button – Green",
    brand: "Klemsan",
    category: "Control Buttons",
    description: "Illuminated push-button actuator, 22 mm mounting, LED 24 V DC, colour green.",
    rating: 4.7,
    reviews: 20,
    images: ["/assets/images/products/klemsan/G1-SAP_270131.webp"],
    inStock: true,
    specs: ["LED", "IP65", "1 NO"],
    models: ["DYB - B/W", "DYB - K/R", "DYB - M/B", "DYB - S/Y", "DYB - Y/G", "DYB - S/B", "CYB - B/W", "CYB - K/R", "CYB - M/B", "CYB - S/Y", "CYB - Y/G", "CYB - S/B", "K2", "KA", "LIND24 - B/W", "LIND24 - K/R", "LIND24 - M/B", "LIND24 - S/", "LIND24 - Y/G"],
  },
  {
    id: 1013,
    name: "ABS Junction Box 160×120×80 mm",
    brand: "Klemsan",
    category: "Junction Boxes",
    description: "Weather-resistant ABS enclosure with polyurethane gasket for reliable outdoor installations.",
    rating: 4.5,
    reviews: 9,
    images: ["/assets/images/products/klemsan/D3899926WH53SA_936WH53SA.webp"],
    inStock: true,
    specs: ["IP66", "ABS", "Grey RAL 7035"],
    models: ["KDO 2128", "KDT 2128", "KDOC 4050", "KDTC 4050", "KPO 1824", "KPT 1824", "KJBS 7040", "KJBS 1010", "KJBS 8012-D", "KPL 2055", "KJBT 1914"],
  },
  {
    id: 1014,
    name: "Thermal Transfer Printer for Marking",
    brand: "Klemsan",
    category: "Thermal Printers",
    description: "Compact thermal printer for printing terminal and cable markers with high resolution.",
    rating: 4.6,
    reviews: 18,
    images: ["/assets/images/products/klemsan/KLEMARK_RIBON_30mm_x_300m__1020010.webp"],
    inStock: true,
    specs: ["300 dpi", "USB / Ethernet"],
    models: ["KL-Tx300 C"],
  },
  {
    id: 1015,
    name: "PVC Cable Duct 40×60 mm – Grey",
    brand: "Klemsan",
    category: "Cable Channels",
    description: "Slotted cable duct providing organized wiring in control panels, halogen-free PVC.",
    rating: 4.3,
    reviews: 7,
    images: ["/assets/images/products/klemsan/YKB_914_(9X914)_BEYAZ_539914B.webp"],
    inStock: true,
    specs: ["2 m Length", "Halogen Free", "UL 94-V0"],
    models: ["KKC 1518", "KKC 1530", "KKC 1540", "KKC 1560", "KKD 2530", "KKD 2540", "KHF 2530", "KHF 2540", "KHF 6080", "KKK 60", "KKK 25", "KKK 40", "KKT 4040", "KKT 6080"],
  },
  {
    id: 1016,
    name: "Terminal Block Screwdriver Set",
    brand: "Klemsan",
    category: "Tools and Accessories",
    description: "Professional insulated screwdriver set optimized for Klemsan terminal block installation.",
    rating: 4.8,
    reviews: 32,
    images: ["/assets/images/products/klemsan/YKB_762_(9X762)_SIYAH_539762S.webp"],
    inStock: true,
    specs: ["VDE 1000 V", "6 pcs"],
    models: ["CRIMPER 6", "CRIMPER F 10 L", "CRIMPER N 50", "CUTTER 16", "KMK 1002", "KT 1", "KT 2", "IKT 1", "IKT 2", "YKB 94", "YKB 100", "YKB 250", "KLM-11", "KLI-1S", "KLM-EN-1S"],
  }
];

async function expandProducts() {
    console.log('=== Klemsan Product Expander ===\n');
    console.log('Using local images from /assets/images/products/klemsan/\n');
    
    const expandedProducts = [];
    let productId = 70001;
    
    for (const product of klemsanProducts) {
        const models = product.models || [product.name];
        const categoryImage = LOCAL_CATEGORY_IMAGES[product.category] || DEFAULT_IMAGE;
        
        // Create a product for each model
        for (const model of models) {
            expandedProducts.push({
                id: productId++,
                name: `${model} - ${product.name}`,
                model: model,
                brand: 'Klemsan',
                category: product.category,
                subcategory: product.category,
                description: `${product.description} Model: ${model}`,
                price: 0,
                rating: product.rating,
                reviews: product.reviews,
                images: [categoryImage],
                inStock: product.inStock,
                specs: product.specs,
                url: `/klemsan/${product.category.toLowerCase().replace(/\s+/g, '-')}/${model.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
                features: product.specs,
                sku: model.replace(/\s+/g, '')
            });
        }
    }
    
    // Get statistics
    const categories = [...new Set(expandedProducts.map(p => p.category))].sort();
    
    // Save to JSON
    const outputPath = path.join(process.cwd(), 'scraped-products.json');
    await fs.writeFile(outputPath, JSON.stringify(expandedProducts, null, 2));
    
    console.log('=== Expansion Complete ===');
    console.log(`✓ Expanded ${klemsanProducts.length} categories to ${expandedProducts.length} products`);
    console.log(`  Categories: ${categories.length}`);
    console.log(`✓ Saved to ${outputPath}`);
    console.log(`\nCategories: ${categories.join(', ')}`);
    
    return expandedProducts;
}

// Run the expander
expandProducts().catch(console.error);
