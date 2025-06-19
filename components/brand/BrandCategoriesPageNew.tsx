'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { 
  BoltIcon, 
  CpuChipIcon, 
  PowerIcon, 
  WrenchScrewdriverIcon,
  LightBulbIcon,
  CogIcon,
  Squares2X2Icon,
  CommandLineIcon,
  BeakerIcon
} from '@heroicons/react/24/outline'
import { ShieldCheckIcon, BuildingLibraryIcon, LinkIcon, WrenchIcon } from '@heroicons/react/24/solid'

import { cleanProducts, cleanProductsWithMitsubishi, getProductsByBrandEnhanced } from '@/lib/products/products'
import { mitsubishiProducts } from '@/lib/products/mitsubishi-products'
import { tmeicProducts } from '@/lib/products/tmeic-products'
import { lsIndustrialProducts } from '@/lib/products/ls-industrial-products'
import { getImageUrl } from '@/lib/config/image-config'

// Brand data with logos and categories (same as in BrandSelection)
const brands = [
  {
    name: 'LS Industrial',
    logo: getImageUrl('brands/LS.webp'),
    description: 'Complete Industrial Automation Solutions - Full Range of VFDs, PLCs, Contactors & Control Systems',
    categories: ['Variable Frequency Drives', 'Programmable Logic Controllers', 'Contactors', 'Circuit Breakers', 'Overload Relays', 'Softstarters', 'I/O Modules', 'Human Machine Interface']
  },
  {
    name: 'ERICO',
    logo: getImageUrl('brands/Erico.webp'),
    description: 'Complete Electrical Connection & Protection Product Line',
    categories: ['Flexible Conductors', 'Busbars', 'Cable Management']
  },
  {
    name: 'Katko',
    logo: getImageUrl('brands/Katko.webp'),
    description: 'Complete Range of Enclosed Isolators & Safety Switches',
    categories: ['Enclosed Isolators', 'Load Break Switches', 'Switch Fuses', 'UL/CSA Listed', 'Connectors', 'Installation Enclosures', 'Accessories']
  },
  {
    name: 'Klemsan',
    logo: getImageUrl('brands/klemsan-logo.webp'),
    description: 'Full Product Line of Terminal Blocks & Connection Solutions',
    categories: ['Screw Terminals', 'Quick Release', 'Spring Terminals', 'Plug Terminals', 'Other Terminals', 'End Stops', 'Power Sources', 'Intermediate Relays', 'Automation', 'Climate', 'Cam Switches', 'Control Buttons', 'Junction Boxes', 'Thermal Printers', 'Cable Channels', 'Tools and Accessories']
  },
  {
    name: 'TMEIC',
    logo: getImageUrl('brands/TMEIC_logo.svg'),
    description: 'Complete Range of High Power Drives & Industrial Systems',
    categories: ['Variable Frequency Drives', 'DC Drives', 'PV Inverters', 'Energy Storage', 'Motors', 'Controllers', 'Software']
  },
  {
    name: 'Mitsubishi',
    logo: getImageUrl('brands/MitsubishiLogo.webp'),
    description: 'Complete Factory Automation & Electric Controls Product Line',
    categories: [
      'Controllers', 
      'Variable Frequency Drives', 
      'Human Machine Interface', 
      'SCADA Systems',
      'Robotics',
      'Circuit Breakers', 
      'Contactors', 
      'Overload Relays',
      'Field Devices',
      'Energy Management',
      'Low Power Motors'
    ]
  },
  {
    name: 'Noark',
    logo: getImageUrl('brands/Noark.webp'),
    description: 'Complete Circuit Protection & Industrial Controls Product Line',
    categories: ['Circuit Protection', 'Motor Circuit Protectors', 'Miniature Circuit Breakers', 'Molded Case Switches', 'Surge Protective Device', 'Power Circuit Breakers', 'DIN Rail Fuse Holders and Fuses', 'Enclosed Breakers']
  },
  {
    name: 'Elsteel',
    logo: getImageUrl('brands/Elsteel.webp'),
    description: 'Full Range of Electrical Steel & Distribution Equipment',
    categories: ['Modular Enclosures', 'Plug and Power', 'Enclosures', 'Special Enclosures', 'Super Frame']
  }
]

// Category icons mapping
const getCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: any } = {
    'Contactors': BoltIcon,
    'Variable Frequency Drives': CpuChipIcon,
    'DIN Rail Miniature Circuit Breakers': PowerIcon,
    'Circuit Breakers': PowerIcon,
    'Circuit Protection': PowerIcon,
    'Motor Circuit Protectors': BoltIcon,
    'Power Circuit Breakers': PowerIcon,
    'Molded Case Circuit Breakers (MCCBs)': PowerIcon,
    'Molded Case Switches': BoltIcon,
    'Motor-Circuit Protectors (MCPs)': BoltIcon,
    'Miniature Circuit Breakers': PowerIcon,
    'Enclosed Breakers': Squares2X2Icon,
    'DIN Rail Fuse Holders and Fuses': Squares2X2Icon,
    'Surge Protective Device': BoltIcon,
    'Industrial Control Systems': CogIcon,
    'Industrial Controls': CogIcon,
    'LV Switchboards': PowerIcon,
    'Power T & D': PowerIcon,
    'Special Applications': BeakerIcon,
    'Switchboards': Squares2X2Icon,
    'Power Transmission & Distribution': PowerIcon,
    'Pilot Devices': LightBulbIcon,
    'Manual Motor Controllers': CogIcon,
    'Motor Starters': CogIcon,
    'Flexible Conductors': WrenchScrewdriverIcon,
    'Busbars': WrenchScrewdriverIcon,
    'Terminal Blocks': Squares2X2Icon,
    'Overload Relays': CommandLineIcon,
    'Controllers': CpuChipIcon,
    'Motors': CogIcon,
    'Programmable Logic Controllers': CpuChipIcon,
    'Softstarters': BoltIcon,
    'I/O Modules': Squares2X2Icon,

    'Cable Management': WrenchScrewdriverIcon,
    'Marking Solutions': BeakerIcon,
    'Electronic Terminals': Squares2X2Icon,
    'Terminal Marking': BeakerIcon,
    'DC Drives': CpuChipIcon,
    'Enclosures': Squares2X2Icon,
    'Distribution Blocks': PowerIcon,
    'Power Blocks and Terminals': PowerIcon,
    'Modular Enclosures': Squares2X2Icon,
    'Plug and Power': BoltIcon,
    'Special Enclosures': WrenchScrewdriverIcon,
    'Super Frame': CpuChipIcon,
    'Human Machine Interface': LightBulbIcon,
    'SCADA Systems': CommandLineIcon,
    'Robotics': CogIcon,
    'Field Devices': WrenchScrewdriverIcon,
    'Energy Management': BeakerIcon,
    'Low Power Motors': PowerIcon,
    'PV Inverters': PowerIcon,
    'Energy Storage': BoltIcon,
    'Software': CommandLineIcon,
    'Load Break Switches': PowerIcon,
    'Switch Fuses': BoltIcon,
    'Enclosed Isolators': Squares2X2Icon,
    'UL/CSA Listed': ShieldCheckIcon,
    'Connectors': LinkIcon,
    'Installation Enclosures': BuildingLibraryIcon,
    'Accessories': WrenchIcon,
    
    // Klemsan specific icons
    'Screw Terminals': WrenchScrewdriverIcon,
    'Quick Release': BoltIcon,
    'Spring Terminals': Squares2X2Icon,
    'Plug Terminals': LinkIcon,
    'Other Terminals': Squares2X2Icon,
    'End Stops': WrenchIcon,
    'Power Sources': PowerIcon,
    'Intermediate Relays': CommandLineIcon,
    'Automation': CogIcon,
    'Climate': BeakerIcon,
    'Cam Switches': CogIcon,
    'Control Buttons': LightBulbIcon,
    'Junction Boxes': Squares2X2Icon,
    'Thermal Printers': BeakerIcon,
    'Cable Channels': WrenchScrewdriverIcon,
    'Tools and Accessories': WrenchIcon
  }
  return iconMap[category] || Squares2X2Icon
}

// Category colors
const getCategoryColor = (category: string) => {
  const colorMap: { [key: string]: string } = {
    'Contactors': 'bg-blue-500',
    'Variable Frequency Drives': 'bg-purple-500',
    'DIN Rail Miniature Circuit Breakers': 'bg-red-500',
    'Circuit Breakers': 'bg-red-500',
    'Circuit Protection': 'bg-red-600',
    'Motor Circuit Protectors': 'bg-blue-600',
    'Power Circuit Breakers': 'bg-red-500',
    'Molded Case Circuit Breakers (MCCBs)': 'bg-orange-600',
    'Molded Case Switches': 'bg-blue-700',
    'Motor-Circuit Protectors (MCPs)': 'bg-blue-600',
    'Miniature Circuit Breakers': 'bg-red-400',
    'Enclosed Breakers': 'bg-gray-500',
    'DIN Rail Fuse Holders and Fuses': 'bg-gray-600',
    'Surge Protective Device': 'bg-yellow-600',
    'Industrial Control Systems': 'bg-green-600',
    'Industrial Controls': 'bg-green-600',
    'LV Switchboards': 'bg-purple-600',
    'Power T & D': 'bg-indigo-600',
    'Special Applications': 'bg-pink-600',
    'Switchboards': 'bg-indigo-600',
    'Power Transmission & Distribution': 'bg-orange-600',
    'Pilot Devices': 'bg-yellow-500',
    'Manual Motor Controllers': 'bg-green-500',
    'Motor Starters': 'bg-green-500',
    'Flexible Conductors': 'bg-orange-500',
    'Busbars': 'bg-orange-500',
    'Terminal Blocks': 'bg-gray-500',
    'Overload Relays': 'bg-indigo-500',
    'Controllers': 'bg-purple-500',
    'Motors': 'bg-green-500',
    'Programmable Logic Controllers': 'bg-blue-600',
    'Softstarters': 'bg-yellow-600',
    'I/O Modules': 'bg-teal-500',

    'Cable Management': 'bg-orange-500',
    'Marking Solutions': 'bg-pink-500',
    'Electronic Terminals': 'bg-gray-500',
    'Terminal Marking': 'bg-pink-500',
    'DC Drives': 'bg-purple-500',
    'Enclosures': 'bg-gray-500',
    'Distribution Blocks': 'bg-red-500',
    'Power Blocks and Terminals': 'bg-red-500',
    'Plug and Power': 'bg-blue-600',
    'Special Enclosures': 'bg-purple-600',
    'Super Frame': 'bg-green-600',
    'Human Machine Interface': 'bg-yellow-500',
    'SCADA Systems': 'bg-indigo-500',
    'Robotics': 'bg-green-500',
    'Field Devices': 'bg-orange-500',
    'Energy Management': 'bg-pink-500',
    'Low Power Motors': 'bg-green-500',
    'PV Inverters': 'bg-blue-500',
    'Energy Storage': 'bg-green-600',
    'Software': 'bg-purple-600',
    'Load Break Switches': 'bg-blue-600',
    'Switch Fuses': 'bg-orange-600',
    'Enclosed Isolators': 'bg-gray-500',
    'UL/CSA Listed': 'bg-green-700',
    'Connectors': 'bg-purple-600',
    'Installation Enclosures': 'bg-indigo-600',
    'Accessories': 'bg-yellow-600',
    
    // Klemsan specific colors
    'Screw Terminals': 'bg-orange-500',
    'Quick Release': 'bg-blue-500',
    'Spring Terminals': 'bg-green-500',
    'Plug Terminals': 'bg-purple-500',
    'Other Terminals': 'bg-gray-500',
    'End Stops': 'bg-yellow-500',
    'Power Sources': 'bg-red-500',
    'Intermediate Relays': 'bg-indigo-500',
    'Automation': 'bg-green-600',
    'Climate': 'bg-blue-600',
    'Cam Switches': 'bg-purple-600',
    'Control Buttons': 'bg-yellow-600',
    'Junction Boxes': 'bg-gray-600',
    'Thermal Printers': 'bg-pink-500',
    'Cable Channels': 'bg-orange-600',
    'Tools and Accessories': 'bg-yellow-700'
  }
  return colorMap[category] || 'bg-gray-500'
}

// Category representative images
const getCategoryImage = (category: string, brand?: string) => {
  // Use TMEIC-specific images for TMEIC brand categories
  if (brand === 'TMEIC') {
    const tmeicImageMap: { [key: string]: string } = {
      'Variable Frequency Drives': 'tmeic/TMdrive-10/TMdrive-10-angle.png',
      'DC Drives': 'tmeic/TMdrive-DC/product-dcdrives-tmdc.png',
      'PV Inverters': 'tmeic/SOLAR_WARE_2220/pv-inverter-2550-2220-solar-ware.png',
      'Energy Storage': 'tmeic/Energy_Storage/solarware_universal_pcs.png',
      'Motors': 'tmeic/21-FII_Series_Motors/product-motor-21-FII_1.png',
      'Controllers': 'tmeic/Innovation_Series_Controller/product-controller-innovation-series.png',
      'Software': 'tmeic/TMdrive-Navigator/product-software-tmdrive-navigator.png'
    }
    
    if (tmeicImageMap[category]) {
      return tmeicImageMap[category]
    }
  }

  // Use Mitsubishi-specific images for Mitsubishi brand categories
  if (brand === 'Mitsubishi') {
    const mitsubishiImageMap: { [key: string]: string } = {
      'Controllers': 'Mitsu Images/Melsec Q Picture.avif',
      'Variable Frequency Drives': 'Mitsu Images/Melsevo PC Picture.avif',
      'Human Machine Interface': 'Mitsu Images/pc_pic_got.avif',
      'SCADA Systems': 'Mitsu Images/PC SCADA Image.avif',
      'Robotics': 'Mitsu Images/PC Robots.avif',
      'Circuit Breakers': 'Mitsu Images/HV Breakers Contactors.avif',
      'Contactors': 'Mitsu Images/Mitsubishi Electric Contactors.avif',
      'Overload Relays': 'Mitsu Images/pc_pic_relays.avif',
      'Field Devices': 'Mitsu Images/PC Picture Devices.avif',
      'Energy Management': 'Mitsu Images/Ecomonitor Pro Image.avif',
      'Low Power Motors': 'Mitsu Images/PC Picture LPM.avif'
    }
    
    if (mitsubishiImageMap[category]) {
      return mitsubishiImageMap[category]
    }
  }

  // Use Klemsan-specific images for Klemsan brand categories
  if (brand === 'Klemsan') {
    const klemsanImageMap: { [key: string]: string } = {
      'Screw Terminals': 'categories/klemsan/screw-terminals.webp',
      'Quick Release': 'categories/klemsan/quick-release.webp',
      'Spring Terminals': 'categories/klemsan/spring-terminals.webp',
      'Plug Terminals': 'categories/klemsan/plug-terminals.webp',
      'Other Terminals': 'categories/klemsan/other-terminals.webp',
      'End Stops': 'categories/klemsan/end-stops.webp',
      'Power Sources': 'categories/klemsan/power-sources.webp',
      'Intermediate Relays': 'categories/klemsan/intermediate-relays.webp',
      'Automation': 'categories/klemsan/automation.webp',
      'Climate': 'categories/klemsan/climate.webp',
      'Cam Switches': 'categories/klemsan/cam-switches.webp',
      'Control Buttons': 'categories/klemsan/control-buttons.webp',
      'Junction Boxes': 'categories/klemsan/junction-boxes.webp',
      'Thermal Printers': 'categories/klemsan/thermal-printers.webp',
      'Cable Channels': 'categories/klemsan/cable-channels.webp',
      'Tools and Accessories': 'categories/klemsan/tools-and-accessories.webp'
    }
    
    if (klemsanImageMap[category]) {
      return klemsanImageMap[category]
    }
  }

  // Use Elsteel-specific images for Elsteel brand categories
  if (brand === 'Elsteel') {
    const elsteelImageMap: { [key: string]: string } = {
      'Modular Enclosures': 'products/elsteel/Modular_Enclosures_modular-enclosures-300x300_504caefb.jpg',
      'Plug and Power': 'products/elsteel/plugs_plugs_plugs-300x300_e3c1762c.jpg',
      'Enclosures': 'products/elsteel/IP69K_IP69K_IP69K-300x300_bb3882e7.jpg',
      'Special Enclosures': 'products/elsteel/floor_standing_cabinet_floor_standing_cabinet_floor-standing-300x300_9e491b3b.jpg',
      'Super Frame': 'products/elsteel/techno_module_basic_elsteel_techno_module_basic_el_techno-modular-basic-300x300_b114fbc3.jpg'
    }
    
    if (elsteelImageMap[category]) {
      return elsteelImageMap[category]
    }
  }

  // Use LS Industrial-specific images for LS Industrial brand categories
  if (brand === 'LS Industrial') {
    const lsIndustrialImageMap: { [key: string]: string } = {
      'Variable Frequency Drives': 'products/ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg',
      'Programmable Logic Controllers': 'products/ls_industrial/Programmable_Logic_Controls_HMI_XGT-300x300_406e406a.jpg',
      'Contactors': 'products/ls_industrial/Magnetic_Contactor_meta-MEC-img_b088404f.png',
      'Circuit Breakers': 'products/ls_industrial/new_Susol_UL_MCCB_new_Susol_UL_MCCB_new-Susol_UL_MCCB-300x300_655509b0.jpg',
      'Overload Relays': 'products/ls_industrial/Overload_Relay_susol-overload-300x300_e0fd1b9f.jpg',
      'Softstarters': 'products/ls_industrial/Softstarters_motor-soft-starter-medium-voltage-controller-19851-5172985-300x300_1a89c0b6.jpg',
      'I/O Modules': 'products/ls_industrial/smart-IO_smart-IO_smart-IO-300x300_d44e4fcd.jpg',
      'Human Machine Interface': 'products/ls_industrial/XGT-panel-HMI_XGT-panel-HMI_XGT-panel-HMI-300x300_06fff377.jpg',
      'Motor Starters': 'products/ls_industrial/Manual_Motor_Starter_susol-circuit-breakers-300x300_622af47f.jpg'
    }
    
    if (lsIndustrialImageMap[category]) {
      return lsIndustrialImageMap[category]
    }
  }

  // Use ERICO-specific images for ERICO brand categories
  if (brand === 'ERICO') {
    const ericoImageMap: { [key: string]: string } = {
      'Flexible Conductors': 'products/erico/Flexible_Conductors_flexible-conductor_98144139.jpg',
      'Busbars': 'products/erico/TCB_threaded_busbar_TCB_threaded_busbar_TCB_threaded_busbar-350x360_52c7809c.jpg',
      'Cable Management': 'products/erico/FGBS_FGBS_FGBS-300x300_2cd174d2.jpg',
      'Distribution Blocks': 'products/erico/BD-40A_BD-40A_BD-40A-300x300_36e975cb.jpg',
      'Power Blocks and Terminals': 'products/erico/SB-power-terminals_SB-power-terminals_SB-power-terminals-300x300_81ee0a3c.jpg',
      'Busbar Supports': 'products/erico/UBS_Universal_Busbar_Supports_UBS_Universal_Busbar_UBS-300x300_3b919330.jpg',
      'Connecting Clamps': 'products/erico/FC_erico_flexibar_clamp_FC_erico_flexibar_clamp_FC_erico_flexibar_clamp-350x360_8175290c.jpg',
      'Power Terminals': 'products/erico/SB-power-terminals_SB-power-terminals_SB-power-terminals-300x300_81ee0a3c.jpg',
      'Insulators': 'products/erico/ISO-TP_low_voltage_metric_insulators_ISO-TP_low_vo_ISO-TP-insulators-300x300_f859f294.jpg',
      'Connectors': 'products/erico/XM5_threaded_busbar_connector_XM5_threaded_busbar__XM5_connector-350x360_80d380c4.jpg'
    }
    
    if (ericoImageMap[category]) {
      return ericoImageMap[category]
    }
  }

  // Default images for other brands
  const imageMap: { [key: string]: string } = {
    'Contactors': 'products/contactors/IEC-contactors-Ex9CS-Mini-NR_IEC-contactors-Ex9CS-_IEC-contactors-Ex9CS-Mini-NR_5e300640.jpg',
    'Variable Frequency Drives': 'products/general/starvert-ie5_starvert-ie5_starvert-ie5_0e6fd403.jpg',
    'DIN Rail Miniature Circuit Breakers': 'products/circuit_breakers/susol-circuit-breakers-product-info_susol-circuit-breakers-product-info_58961ab2.jpg',
    'Circuit Breakers': 'products/circuit_breakers/air_circuit_breakers_air_circuit_breakers_air-circuit-breakers_36dc9a41.jpg',
    'Pilot Devices': 'products/pilot_devices/Ex9PB_22mm_pushbuttons_specifications_Ex9PB_22mm_pushbuttons_specifications_fff32144.jpg',
    'Manual Motor Controllers': 'products/contactors/manual-motor-starters-Ex9SN_manual-motor-starters-_manual-motor-starters-Ex9SN1-300x300_b4553354.jpg',
    'Motor Starters': 'products/contactors/manual-motor-starters-Ex9SN_manual-motor-starters-_manual-motor-starters-Ex9SN1-300x300_b4553354.jpg',
    'Flexible Conductors': 'products/erico/Flexible_Conductors_flexible-conductor_98144139.jpg',
    'Busbars': 'products/erico/TCB_threaded_busbar_TCB_threaded_busbar_TCB_threaded_busbar-350x360_52c7809c.jpg',
    'Terminal Blocks': 'products/klemsan/OPK_EKI_112010N.webp',
    'Overload Relays': 'products/noark/Thermal_Overload_Relays_Ex9RD_Ex9RD-thermal-overload-relays-300x300_486a7e7a.jpg',
    'Motor Circuit Protectors': 'categories/Motor Circuit Protectors/Motor Circuit Protectors Stock Images.avif',
    'Miniature Circuit Breakers': 'categories/Miniature Circuit Breakers/Miniature Circuit Breakers.avif',
    'Molded Case Switches': 'categories/Molded Case Switches/Molded Case Switches Ex9MD Series (1).avif',
    'Surge Protective Device': 'categories/Surge Protection Device/Surge Protective Devices.avif',
    'Power Circuit Breakers': 'categories/Power Curcuit /Power Circuit Breakers NOARK.avif',
    'DIN Rail Fuse Holders and Fuses': 'categories/DIN Rail Fuse Holders and Fuses/DIN Rail Fuse Holders and Fuses.avif',
    'Enclosed Breakers': 'categories/enclosed breakers/Enclosed Breakers.avif',
    'Circuit Protection': 'categories/Motor Circuit Protectors/Motor Circuit Protectors Stock Images.avif',
    'Controllers': 'products/general/starvert-ie5_starvert-ie5_starvert-ie5_0e6fd403.jpg',
    'Motors': 'products/motors/AC-motors-Ex9IE3_motor_AC-motors-Ex9IE3_motor_26e75140.jpg',
    'Cable Management': 'products/erico/FGBS_FGBS_FGBS-300x300_2cd174d2.jpg',
    'Marking Solutions': 'products/klemsan/marking-systems-klippon-connect_marking-systems-klippon-connect_marking-systems-klippon-connect_0f427544.jpg',
    'Electronic Terminals': 'products/klemsan/OPK_EKI_112010N.webp',
    'Terminal Marking': 'products/klemsan/marking-systems-klippon-connect_marking-systems-klippon-connect_marking-systems-klippon-connect_0f427544.jpg',
    'DC Drives': 'products/general/starvert-ie5_starvert-ie5_starvert-ie5_0e6fd403.jpg',
    'Enclosures': 'products/enclosures/fully-welded-ip69k.jpg',
    'Distribution Blocks': 'products/erico/BD-40A_BD-40A_BD-40A-300x300_36e975cb.jpg',
    'Power Blocks and Terminals': 'products/erico/SB-power-terminals_SB-power-terminals_SB-power-terminals-300x300_81ee0a3c.jpg',
    'Busbar Supports': 'products/erico/UBS_Universal_Busbar_Supports_UBS_Universal_Busbar_UBS-300x300_3b919330.jpg',
    'Connecting Clamps': 'products/erico/FC_erico_flexibar_clamp_FC_erico_flexibar_clamp_FC_erico_flexibar_clamp-350x360_8175290c.jpg',
    'Power Terminals': 'products/erico/SB-power-terminals_SB-power-terminals_SB-power-terminals-300x300_81ee0a3c.jpg',
    'Insulators': 'products/erico/ISO-TP_low_voltage_metric_insulators_ISO-TP_low_vo_ISO-TP-insulators-300x300_f859f294.jpg',
    'Load Break Switches': 'products/katko/load-break-switches/LoadSafe Product Image.png',
    'Switch Fuses': 'products/katko/switch-fuses/FuseSafe Product Image.png',
    'Enclosed Isolators': 'products/katko/enclosed-isolators/IsoSafe Product Image.png',
    'UL/CSA Listed': 'products/katko/ul-csa-listed/UL Listed Product Image.png',
    'Connectors': 'products/katko/connectors/ConnectSafe Product Image.png',
    'Installation Enclosures': 'products/katko/installation-enclosures/KATKO Product Range.png',
    'Accessories': 'products/katko/accessories/KATKO Accessories.png',
    'Plug and Power': 'products/plug-power/plug-power-reloaded.jpg',
    'Special Enclosures': 'products/special-enclosures/custom-made.jpg',
    'Super Frame': 'products/super-frame/19-inch-super-frame.jpg',
  }
  return imageMap[category] || 'products/placeholder.jpg'
}

// Animated background particles
const FloatingParticles = () => {
  // Use fixed seed values to ensure consistent server/client rendering
  const particles = Array.from({length: 12}, (_, i) => {
    // Use index-based deterministic values instead of Math.random()
    const seedX = (i * 17.3 + 23.7) % 100
    const seedY = (i * 13.1 + 31.9) % 100
    const seedSize = (i % 3) + 1
    const seedColor = i % 4
    
    return {
      id: i,
      x: seedX,
      y: seedY,
      size: seedSize,
      color: ['#ef4444', '#f97316', '#3b82f6', '#10b981'][seedColor]
    }
  })

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, (index % 2 === 0 ? 10 : -10), 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: (index % 3) + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

interface Props {
  selectedBrand: string
}

export default function BrandCategoriesPageNew({ selectedBrand }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Find the selected brand data
  const brandData = brands.find(brand => brand.name === selectedBrand)
  
  if (!brandData) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Brand not found</h1>
          <Link href="/" className="text-red-600 hover:text-red-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Get product count for each category with enhanced Mitsubishi, TMEIC, Noark, and Klemsan support
  const getCategoryProductCount = (category: string) => {
    if (selectedBrand === 'Mitsubishi') {
      return mitsubishiProducts.filter(product => product.category === category).length
    }
    if (selectedBrand === 'TMEIC') {
      return tmeicProducts.filter(product => product.category === category).length
    }
    if (selectedBrand === 'Noark') {
      // Handle specific Noark categories with their dedicated product arrays
      if (category === 'Circuit Protection') {
        return 308 // MCP products count
      }
      if (category === 'Motor Circuit Protectors') {
        return 308 // MCP products count
      }
      if (category === 'Miniature Circuit Breakers') {
        return 20 // MCB products count
      }
      if (category === 'Power Circuit Breakers') {
        return 3 // PCB products count
      }
      if (category === 'Molded Case Switches') {
        return 14 // Switches products count
      }
      if (category === 'Surge Protective Device') {
        return 15 // SPD products count
      }
      if (category === 'DIN Rail Fuse Holders and Fuses') {
        return 11 // Fuse Holders products count
      }
      if (category === 'Enclosed Breakers') {
        return 12 // Enclosed Breakers products count
      }
      // For other Noark categories, use default filtering
      return cleanProducts.filter(product => 
        product.brand === selectedBrand && product.category === category
      ).length
    }
    if (selectedBrand === 'LS Industrial') {
      return lsIndustrialProducts.filter(product => product.category === category).length
    }
    if (selectedBrand === 'Klemsan') {
      // For Klemsan, count total models instead of products
      const klemsanProducts = cleanProducts.filter(product => 
        product.brand === selectedBrand && product.category === category
      )
      return klemsanProducts.reduce((total, product) => {
        return total + ((product as any).models?.length || 0)
      }, 0)
    }
    return cleanProducts.filter(product => 
      product.brand === selectedBrand && product.category === category
    ).length
  }

  // Convert brand name to URL slug
  const getBrandSlug = (brandName: string) => {
    return brandName.toLowerCase().replace(/\s+/g, '-')
  }

  // Convert category name to URL slug that matches generateStaticParams
  const getCategorySlug = (categoryName: string) => {
    return categoryName
      .toLowerCase()
      .replace(/\s*&\s*/g, '-') // Replace " & " with "-"
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/[()]/g, '') // Remove parentheses
  }

  return (
    <>
      <FloatingParticles />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-900/5 relative">
        {/* Hero Section */}
        <motion.section   
          className="relative pt-24 pb-16 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200/30 to-red-800/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-800/30 to-red-200/30 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb */}
            <motion.nav 
              className="flex items-center justify-center space-x-2 text-sm mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                href="/" 
                className="text-gray-500 hover:text-red-600 transition-colors flex items-center"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-1" />
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-red-600 font-medium">{selectedBrand}</span>
            </motion.nav>

            <motion.div 
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center bg-white rounded-xl px-4 py-2 shadow-lg">
                <Image
                  src={brandData.logo}
                  alt={`${brandData.name} logo`}
                  width={120}
                  height={40}
                  className="max-w-full max-h-20 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                Products
              </h1>
            </motion.div>
           
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-900 mx-auto mb-8 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
           
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {brandData.description} - Select a product category to explore our products
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <span className="font-medium text-gray-700">{brandData.categories.length} Categories</span>
              </div>
              <div className="flex items-center bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <span className="font-medium text-gray-700">
                  {selectedBrand === 'Mitsubishi' 
                    ? mitsubishiProducts.length 
                    : selectedBrand === 'TMEIC'
                    ? tmeicProducts.length
                    : selectedBrand === 'LS Industrial'
                    ? lsIndustrialProducts.length
                    : cleanProducts.filter(p => p.brand === selectedBrand).length} Products
                </span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Product Categories Grid */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" ref={ref}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {brandData.categories.map((category, index) => {
              const productCount = getCategoryProductCount(category)
              const IconComponent = getCategoryIcon(category)
              const colorClass = getCategoryColor(category)
              const categoryImage = getCategoryImage(category, selectedBrand)
              const brandSlug = getBrandSlug(selectedBrand)
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
                  }}
                  className="perspective-1000"
                >
                  <Link
                    href={productCount === 0 ? '/contact' : `/${brandSlug}/${getCategorySlug(category)}`}
                    className="group relative bg-white rounded-3xl border border-gray-200/60 overflow-hidden hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500 cursor-pointer block touch-manipulation h-full backdrop-blur-sm"
                  >
                    {/* Subtle hover gradient that doesn't interfere with white blend */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.02), transparent 60%)'
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Product Image */}
                    <div className="relative w-full h-64 bg-white transition-all duration-300">
                      <Image
                        src={getImageUrl(categoryImage)}
                        alt={`${category} example`}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500 z-10 relative"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      
                      {/* Category Icon Overlay with enhanced visibility */}
                      <div className="absolute top-4 right-4 z-20">
                        <motion.div 
                          className={`${colorClass} p-3 rounded-xl shadow-xl backdrop-blur-sm border border-white/20`}
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="h-6 w-6 text-white drop-shadow-lg" />
                        </motion.div>
                      </div>
                      
                      {/* Product count badge */}
                      <div className="absolute bottom-4 left-4 z-20">
                        <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-white/30">
                          <span className="text-xs font-semibold text-gray-700">{productCount === 0 ? 'Please Call To Inquire' : productCount} Items</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="p-6 relative z-10 bg-white">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-tight mb-3 line-clamp-2">
                        {category}
                      </h3>
                      
                      {/* Enhanced product count with better styling */}
                                              <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                            <p className="text-sm font-medium text-gray-600">
                              {productCount === 0 ? 'Please Call To Inquire' : `${productCount} ${selectedBrand === 'Klemsan' ? 'Models' : 'Products'} Available`}
                            </p>
                          </div>
                        </div>

                      {/* Action with enhanced styling */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <motion.span 
                          className="text-red-600 font-semibold group-hover:text-red-700 transition-colors flex items-center text-sm"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {productCount === 0 ? 'Call to Inquire' : 'View Products'}
                          <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </motion.span>
                        
                        {/* Visual indicator */}
                        <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors">
                          <ArrowRightIcon className="h-4 w-4 text-red-500 group-hover:text-red-600" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
            
            {/* Inquiry Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ 
                delay: brandData.categories.length * 0.1, 
                duration: 0.6,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
              }}
              className="perspective-1000"
            >
              <Link
                href="/contact"
                className="group relative bg-gradient-to-br from-red-500 to-red-700 rounded-3xl border border-red-300/30 overflow-hidden hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-500 cursor-pointer block touch-manipulation h-full backdrop-blur-sm"
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-800/20 opacity-0 group-hover:opacity-100 pointer-events-none"
                  transition={{ duration: 0.4 }}
                />

                {/* Inquiry Content */}
                <div className="relative h-64 flex flex-col items-center justify-center p-6 text-white">
                  {/* Icon */}
                  <motion.div 
                    className="mb-4 p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-center mb-2 leading-tight">
                    Questions About Our Products?
                  </h3>
                  
                  <p className="text-white/90 text-center text-sm mb-4 line-clamp-2">
                    Need help selecting the right {selectedBrand} products for your application?
                  </p>
                  
                  <div className="w-full border-t border-white/20 pt-4">
                    <motion.span 
                      className="text-white font-semibold group-hover:text-white/90 transition-colors flex items-center justify-center text-sm"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Inquire Now
                      <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.span>
                  </div>
                </div>

                {/* Bottom section with CTA */}
                <div className="p-6 relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                      <p className="text-sm font-medium text-white/90">
                        Expert Technical Support
                      </p>
                    </div>
                    
                    {/* Visual indicator */}
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <ArrowRightIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
} 