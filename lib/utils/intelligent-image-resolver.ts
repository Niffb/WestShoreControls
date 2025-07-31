import { Product } from '@/lib/types/shared-types'
import { getImageUrl } from '@/lib/config/image-config'

// Image resolution configuration
interface ImageConfig {
  baseUrl: string
  fallbackImages: Record<string, string>
  brandFolders: Record<string, string>
  categoryMappings: Record<string, string[]>
  seriesImageMappings: Record<string, string> // New mapping for series images
}

const imageConfig: ImageConfig = {
  baseUrl: 'assets/images/products',
  
  // Series image mappings from scraped data to series images
  seriesImageMappings: {
    // Circuit Breakers
    'B1E': 'assets/images/products/series/Circuit_Breakers_B1E_4bd83906.png',
    'B1H': 'assets/images/products/series/Circuit_Breakers_B1H_a17e2295.png', 
    'B1NQ': 'assets/images/products/series/Circuit_Breakers_B1NQ_8f9792b5.png',
    'ERH': 'assets/images/products/series/Circuit_Breakers_ERH_450bce06.png',
    'ES': 'assets/images/products/series/Circuit_Breakers_ES_012c2fb4.jpg',
    'HM': 'assets/images/products/series/Circuit_Breakers_HM_5f7ef01e.jpg',
    'KLK': 'assets/images/products/series/Circuit_Breakers_KLK_a13a6e2e.jpg',
    'NEH': 'assets/images/products/series/Circuit_Breakers_NEH_3487381c.jpg',
    'RTT': 'assets/images/products/series/Circuit_Breakers_RTT_1834d635.png',
    'UTE': 'assets/images/products/series/Circuit_Breakers_UTE_f6920103.jpg',
    
    // Contactors
    'EX9CDR': 'assets/images/products/series/Contactors_EX9CDR_65f2f730.png',
    'EX9CDS': 'assets/images/products/series/Contactors_EX9CDS_c9b1dd61.png',
    'EX9CKT': 'assets/images/products/series/Contactors_EX9CKT_c7e745f7.png',
    'EX9CMR': 'assets/images/products/series/Contactors_EX9CMR_e46f91f1.png',
    'MIT': 'assets/images/products/series/Contactors_MIT_4357f859.png',
    'UZ': 'assets/images/products/series/Contactors_UZ_d49ea3cb.jpg',
    
    // Drives & VFDs
    'E8': 'assets/images/products/series/Drives_&_VFDs_E8_32086962.jpg',
    'FR': 'assets/images/products/series/Drives_&_VFDs_FR_225ad36d.jpg',
    'LSLV': 'assets/images/products/series/Drives_&_VFDs_LSLV_abab3ef1.jpg',
    'MR': 'assets/images/products/series/Drives_&_VFDs_MR_cac87e25.png',
    'SV': 'assets/images/products/series/Drives_&_VFDs_SV_c2e8cac6.jpg',
    
    // LED Indicators
    'ES50': 'assets/images/products/series/LED_Indicators_ES50_cf268077.jpg',
    
    // Manual Motor Starters
    'ASNA': 'assets/images/products/series/Manual_Motor_Starters_ASNA,_ASNB,_ASNUV,_ASNT_4066cce8.jpg',
    'ASNB': 'assets/images/products/series/Manual_Motor_Starters_ASNA,_ASNB,_ASNUV,_ASNT_4066cce8.jpg',
    'ASNUV': 'assets/images/products/series/Manual_Motor_Starters_ASNA,_ASNB,_ASNUV,_ASNT_4066cce8.jpg',
    'ASNT': 'assets/images/products/series/Manual_Motor_Starters_ASNA,_ASNB,_ASNUV,_ASNT_4066cce8.jpg',
    'DRA': 'assets/images/products/series/Manual_Motor_Starters_DRA_e3bc65b4.jpg',
    'MMS': 'assets/images/products/series/Manual_Motor_Starters_MMS_02da3a62.jpg',
    'SHT': 'assets/images/products/series/Manual_Motor_Starters_SHT_f59cabdc.jpg',
    'UVT': 'assets/images/products/series/Manual_Motor_Starters_UVT_4f663b1d.jpg',
    
    // Other Products
    'KU': 'assets/images/products/series/Other_Products_KU_89abdf04.png',
    'UAH': 'assets/images/products/series/Other_Products_UAH,_UAS_a5bbf984.jpg',
    'UAS': 'assets/images/products/series/Other_Products_UAH,_UAS_a5bbf984.jpg',
    'VKA': 'assets/images/products/series/Other_Products_VKA_371b9da0.png',
    
    // Overload Relays
    'EX9R': 'assets/images/products/series/Overload_Relays_EX9R_419c8487.png',
    'ISOTP': 'assets/images/products/series/Overload_Relays_ISOTP_2ee2ee9a.jpg',
    
    // PLCs
    'FX5': 'assets/images/products/series/PLCs_FX5,_FX3_0caa970b.jpg',
    'FX3': 'assets/images/products/series/PLCs_FX5,_FX3_0caa970b.jpg',
    'WS0': 'assets/images/products/series/PLCs_WS0_1fa9bad4.png',
    
    // Power Distribution
    'ABS': 'assets/images/products/series/Power_Distribution_ABS_b92f2d4d.jpg',
    'CFBS': 'assets/images/products/series/Power_Distribution_CFBS,_FBS,_FBSS,_UCFBS_99838ef0.jpg',
    'FBS': 'assets/images/products/series/Power_Distribution_CFBS,_FBS,_FBSS,_UCFBS_99838ef0.jpg',
    'FBSS': 'assets/images/products/series/Power_Distribution_CFBS,_FBS,_FBSS,_UCFBS_99838ef0.jpg',
    'UCFBS': 'assets/images/products/series/Power_Distribution_CFBS,_FBS,_FBSS,_UCFBS_99838ef0.jpg',
    'FBC': 'assets/images/products/series/Power_Distribution_FBC_a19bac54.jpg',
    'PCB': 'assets/images/products/series/Power_Distribution_PCB_4be2e429.jpg',
    'SB': 'assets/images/products/series/Power_Distribution_SB_1615fcdd.jpg',
    'UDJ': 'assets/images/products/series/Power_Distribution_UDJ,_UD_798c646b.jpg',
    'UD': 'assets/images/products/series/Power_Distribution_UDJ,_UD_798c646b.jpg',
    
    // Push Buttons
    'EX9PB': 'assets/images/products/series/Push_Buttons_EX9PB_55ae0d32.png',
    'EX9PBA': 'assets/images/products/series/Push_Buttons_EX9PBA_dae27e21.png',
    'EX9PBC': 'assets/images/products/series/Push_Buttons_EX9PBC_f22d7c33.png',
    'EX9PBG': 'assets/images/products/series/Push_Buttons_EX9PBG_2e232237.png',
    'EX9PBL': 'assets/images/products/series/Push_Buttons_EX9PBL_420e05c9.png',
    'EX9PBR': 'assets/images/products/series/Push_Buttons_EX9PBR_6743c8b0.png',
    'EX9PBS': 'assets/images/products/series/Push_Buttons_EX9PBS_e10eb321.png',
    'EX9PBW': 'assets/images/products/series/Push_Buttons_EX9PBW_3d5d47cf.png',
    'ASNEB': 'assets/images/products/series/Push_Buttons_ASNEB_31468f8b.jpg',
    
    // Servo Motors
    'HF': 'assets/images/products/series/Servo_Motors_HF_a2068941.jpg',
    'HK': 'assets/images/products/series/Servo_Motors_HK_ddfe5d94.png',
    
    // Batteries & Power
    'MR_J3BAT': 'assets/images/products/series/Batteries_&_Power_MR_J3BAT_3f719844.jpg'
  },
  
  // Fallback images for each category - updated to use series images where available
  fallbackImages: {
    'Variable Frequency Drives': 'images/westlogo.jpg',
    'Drives & VFDs': 'assets/images/products/series/Drives_&_VFDs_FR_225ad36d.jpg',
    'Circuit Breakers': 'assets/images/products/series/Circuit_Breakers_B1H_a17e2295.png',
    'Miniature Circuit Breakers': 'assets/images/products/series/Circuit_Breakers_B1H_a17e2295.png',
    'Motor-Circuit Protectors': 'assets/images/products/noark/M1_molded_case_circuit_breakers_M1_molded_case_cir_M1-300x300_c777b548.jpg',
    'Contactors': 'assets/images/products/series/Contactors_EX9CDR_65f2f730.png',
    'Contactors and Relays': 'assets/images/products/series/Contactors_EX9CDR_65f2f730.png',
    'Overload Relays': 'assets/images/products/series/Overload_Relays_EX9R_419c8487.png',
    'Push Buttons': 'assets/images/products/series/Push_Buttons_EX9PBA_dae27e21.png',
    'LED Indicators': 'assets/images/products/series/LED_Indicators_ES50_cf268077.jpg',
    'Manual Motor Starters': 'assets/images/products/series/Manual_Motor_Starters_MMS_02da3a62.jpg',
    'PLCs': 'assets/images/products/series/PLCs_FX5,_FX3_0caa970b.jpg',
    'Programmable Logic Controllers': 'assets/images/products/series/PLCs_FX5,_FX3_0caa970b.jpg',
    'Power Distribution': 'assets/images/products/series/Power_Distribution_ABS_b92f2d4d.jpg',
    'Servo Motors': 'assets/images/products/series/Servo_Motors_HF_a2068941.jpg',
    'Batteries & Power': 'assets/images/products/series/Batteries_&_Power_MR_J3BAT_3f719844.jpg',
    'Other Products': 'assets/images/products/series/Other_Products_VKA_371b9da0.png',
    'Controllers': 'assets/images/products/mitsubishi/controllers/melsec-a-series.webp',
    'Enclosed Isolators': 'images/products/enclosed-isolators/KEM-Product-Range-Enclosed-Isolators.png',
    'Flexible Conductors': 'assets/images/products/erico/PBCR_braided_power_shunts_PBCR_braided_power_shunt_PBCR-power-shunt-350x360_d70d3343.jpg',
    'Screw Terminals': 'products/klemsan/product_images/AVK_2,5_Red_304124.webp',
    'Quick Release': 'products/klemsan/product_images/PYK_4E_Beige_307220.webp',
    'default': 'assets/images/products/placeholder.jpg'
  },

  // Brand folder mappings
  brandFolders: {
    'Mitsubishi': 'mitsubishi',
    'NOARK': 'noark',
    'Noark': 'noark',
    'LS Industrial': 'ls_industrial',
    'TMEIC': 'tmeic',
    'Katko': 'katko',
    'ERICO': 'erico',
    'Klemsan': 'klemsan'
  },

  // Category to subfolder mappings
  categoryMappings: {
    'Variable Frequency Drives': ['drives', 'vfd_series'],
    'Miniature Circuit Breakers': ['circuit_breakers'],
    'Motor-Circuit Protectors': ['circuit_breakers'],
    'Controllers': ['controllers'],
    'Servo Motors': ['servo-motors'],
    'Circuit Breakers': ['circuit_breakers'],
    'Contactors and Relays': ['contactors', 'relays'],
    'Screw Terminals': ['terminals'],
    'Quick Release': ['terminals']
  }
}

// Intelligent image resolution functions
export class IntelligentImageResolver {
  
  /**
   * Main method to resolve the best image for a product
   */
  static resolveProductImage(product: Product, preferredIndex: number = 0): string {
    // Special handling for Variable Frequency Drives - use westlogo.jpg directly
    if (product.category === 'Variable Frequency Drives') {
      return 'images/westlogo.jpg'
    }

    // Check if this is a scraped product with placeholder image - use series mapping
    if (product.images && product.images.length > 0 && product.images[preferredIndex] === 'placeholder.jpg') {
      const seriesImage = this.resolveSeriesImage(product)
      if (seriesImage) {
        return getImageUrl(seriesImage)
      }
    }

    // If product already has valid images, use them
    if (product.images && product.images.length > 0 && product.images[preferredIndex]) {
      const existingImage = product.images[preferredIndex]
      if (this.isValidImagePath(existingImage)) {
        return getImageUrl(existingImage)
      }
    }

    // Try to resolve based on product metadata
    const resolvedImage = this.resolveByMetadata(product)
    if (resolvedImage) {
      return getImageUrl(resolvedImage)
    }

    // Fall back to category-based image
    return getImageUrl(this.getCategoryFallback(product.category))
  }

  /**
   * Resolve series image for scraped products based on model/name patterns
   */
  private static resolveSeriesImage(product: Product): string | null {
    const model = product.model?.toUpperCase() || ''
    const name = product.name?.toUpperCase() || ''
    const description = product.description?.toUpperCase() || ''
    
    // Try exact model match first
    if (model && imageConfig.seriesImageMappings[model]) {
      return imageConfig.seriesImageMappings[model]
    }
    
    // Try to find series pattern in name or model
    for (const [series, imagePath] of Object.entries(imageConfig.seriesImageMappings)) {
      const seriesUpper = series.toUpperCase()
      
      // Check if series appears in model, name, or description
      if (model.includes(seriesUpper) || 
          name.includes(seriesUpper) || 
          description.includes(seriesUpper)) {
        return imagePath
      }
      
      // Handle special cases for compound series names
      if (series.includes('_')) {
        const seriesParts = series.split('_')
        if (seriesParts.every(part => name.includes(part.toUpperCase()) || model.includes(part.toUpperCase()))) {
          return imagePath
        }
      }
      
      // Handle dash variations (e.g., EX9-CDR vs EX9CDR)
      const seriesWithDash = seriesUpper.replace(/([A-Z]+)(\d+)([A-Z]+)/, '$1$2-$3')
      const seriesWithoutDash = seriesUpper.replace('-', '')
      
      if (name.includes(seriesWithDash) || name.includes(seriesWithoutDash) ||
          model.includes(seriesWithDash) || model.includes(seriesWithoutDash)) {
        return imagePath
      }
    }
    
    return null
  }

  /**
   * Resolve image based on product metadata (brand, category, model, specs)
   */
  private static resolveByMetadata(product: Product): string | null {
    const brand = product.brand
    const category = product.category
    const model = product.model?.toLowerCase() || ''
    const name = product.name?.toLowerCase() || ''

    // Special handling for Mitsubishi drives to provide variety
    if (brand === 'Mitsubishi' && (category?.includes('Drive') || category?.includes('VFD'))) {
      return this.resolveMitsubishiDriveImage(model, name)
    }

    // Brand-specific resolution
    if (brand && imageConfig.brandFolders[brand]) {
      const brandFolder = imageConfig.brandFolders[brand]
      
      // Try category-specific resolution within brand
      const categoryImage = this.resolveBrandCategoryImage(brandFolder, category, model, name)
      if (categoryImage) return categoryImage

      // Try model-specific resolution
      const modelImage = this.resolveModelImage(brandFolder, model, name)
      if (modelImage) return modelImage
    }

    return null
  }

  /**
   * Resolve specific Mitsubishi drive images based on model using public directory images
   */
  private static resolveMitsubishiDriveImage(model: string, name: string): string {
    const lowerModel = model.toLowerCase()
    const lowerName = name.toLowerCase()
    
    // A800 Series mapping
    if (lowerModel.includes('a800') || lowerModel.includes('a840') || lowerModel.includes('a820') || 
        lowerName.includes('a800') || lowerName.includes('a840') || lowerName.includes('a820') || 
        lowerName.includes('fr-a800') || lowerModel.includes('fr-a800')) {
      return 'assets/images/products/mitsubishi/FREQROLFR-A800_Series_1165a882.webp'
    }
    
    // F800 Series mapping
    if (lowerModel.includes('f800') || lowerModel.includes('f8') || 
        lowerName.includes('f800') || lowerName.includes('fr-f800') || lowerModel.includes('fr-f800')) {
      return 'assets/images/products/mitsubishi/FREQROL-F800_Series_83071d5c.webp'
    }
    
    // D700 Series mapping
    if (lowerModel.includes('d700') || lowerModel.includes('d7') || 
        lowerName.includes('d700') || lowerName.includes('fr-d700') || lowerModel.includes('fr-d700')) {
      return 'assets/images/products/mitsubishi/FREQROL-D700_Series_36840095.webp'
    }
    
    // E800 Series mapping
    if (lowerModel.includes('e800') || lowerModel.includes('e8') || 
        lowerName.includes('e800') || lowerName.includes('fr-e800') || lowerModel.includes('fr-e800')) {
      return 'assets/images/products/mitsubishi/FR-E800_Series_607274b1.webp'
    }
    
    // MELSERVO servo motors (if they appear in VFD category)
    if (lowerModel.includes('melservo') || lowerName.includes('melservo')) {
      return 'assets/images/products/mitsubishi/FREQROLFR-A800_Series_1165a882.webp' // Use A800 as fallback
    }
    
    // Default to A800 series for other Mitsubishi drives
    return 'assets/images/products/mitsubishi/FREQROLFR-A800_Series_1165a882.webp'
  }

  /**
   * Resolve image based on brand and category
   */
  private static resolveBrandCategoryImage(brandFolder: string, category: string, model: string, name: string): string | null {
    if (!category) return null

    const categoryFolders = imageConfig.categoryMappings[category] || []
    
    for (const categoryFolder of categoryFolders) {
      // Try specific model matches first
      if (model) {
        const modelSpecificPaths = this.generateModelSpecificPaths(brandFolder, categoryFolder, model, name)
        for (const path of modelSpecificPaths) {
          if (this.imageExistsInAssets(path)) {
            return `${imageConfig.baseUrl}/${path}`
          }
        }
      }

      // Try general category images
      const generalPaths = this.generateCategoryPaths(brandFolder, categoryFolder)
      for (const path of generalPaths) {
        if (this.imageExistsInAssets(path)) {
          return `${imageConfig.baseUrl}/${path}`
        }
      }
    }

    return null
  }

  /**
   * Generate potential paths for model-specific images
   */
  private static generateModelSpecificPaths(brandFolder: string, categoryFolder: string, model: string, name: string): string[] {
    const paths: string[] = []
    const cleanModel = model.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()

    // Common image extensions
    const extensions = ['.avif', '.webp', '.jpg', '.jpeg', '.png']
    
    extensions.forEach(ext => {
      // Direct model match
      paths.push(`${brandFolder}/${categoryFolder}/${cleanModel}${ext}`)
      paths.push(`${brandFolder}/${categoryFolder}/${model}${ext}`)
      
      // Model with brand prefix
      paths.push(`${brandFolder}/${categoryFolder}/${brandFolder}_${cleanModel}${ext}`)
      
      // Series-based naming (common pattern)
      if (model.includes('series') || model.includes('Series')) {
        const seriesName = model.split(/series|Series/i)[0].trim()
        paths.push(`${brandFolder}/${categoryFolder}/${seriesName}_series${ext}`)
      }

      // Handle specific patterns found in the codebase
      if (brandFolder === 'noark') {
        // Noark MCB patterns - use public directory images
        if (model.includes('B1') || name.includes('b1') || name.includes('B1')) {
          if (model.toLowerCase().includes('b1n') || name.toLowerCase().includes('b1n')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/B1N_miniature_circuit_breakers_UL_489_240_Vac_6012_B1N-300x300_f9e504f0.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/B1N_miniature_circuit_breakers_UL_489_240_Vac_6012_B1N-300x300_f9e504f0.jpg`)
            }
          }
          if (model.toLowerCase().includes('b1h') || name.toLowerCase().includes('b1h')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/B1H_miniature_circuit_breakers_UL_489_480Y277_Vac__B1H-300x300_61a1ffe1.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/B1H_miniature_circuit_breakers_UL_489_480Y277_Vac__B1H-300x300_61a1ffe1.jpg`)
            }
          }
          if (model.toLowerCase().includes('b1nq') || name.toLowerCase().includes('b1nq')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/B1NQ_miniature_circuit_breakers_UL_489_120240_Vac__B1NQ-300x300_8caa1a92.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/B1NQ_miniature_circuit_breakers_UL_489_120240_Vac__B1NQ-300x300_8caa1a92.jpg`)
            }
          }
          if (model.toLowerCase().includes('b1e') || name.toLowerCase().includes('b1e')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/B1E_UL1077_supplementary_protectors_B1E_UL1077_sup_B1E-300x300_35a141dc.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/B1E_UL1077_supplementary_protectors_B1E_UL1077_sup_B1E-300x300_35a141dc.jpg`)
            }
          }
        }
        
        // Noark MCP patterns
        if (model.includes('M1') || model.includes('M2') || model.includes('M3') || model.includes('M4') || 
            name.includes('M1') || name.includes('M2') || name.includes('M3') || name.includes('M4')) {
          if (model.toLowerCase().includes('m1') || name.toLowerCase().includes('m1')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/M1_molded_case_circuit_breakers_M1_molded_case_cir_M1-300x300_c777b548.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/M1_molded_case_circuit_breakers_M1_molded_case_cir_M1-300x300_c777b548.jpg`)
            }
          }
          if (model.toLowerCase().includes('m2') || name.toLowerCase().includes('m2')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/M2_molded_case_circuit_breakers_M2_molded_case_cir_M2-300x300_dca8decb.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/M2_molded_case_circuit_breakers_M2_molded_case_cir_M2-300x300_dca8decb.jpg`)
            }
          }
          if (model.toLowerCase().includes('m3') || name.toLowerCase().includes('m3')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/M3_molded_case_circuit_breakers_M3_molded_case_cir_M3-300x300_c4a9c96f.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/M3_molded_case_circuit_breakers_M3_molded_case_cir_M3-300x300_c4a9c96f.jpg`)
            }
          }
          if (model.toLowerCase().includes('m4') || name.toLowerCase().includes('m4')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/M4_molded_case_circuit_breakers_M4_molded_case_cir_M4-300x300_4fc3277c.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/M4_molded_case_circuit_breakers_M4_molded_case_cir_M4-300x300_4fc3277c.jpg`)
            }
          }
        }
      }
      
      if (brandFolder === 'ls_industrial') {
        // LS Industrial VFD patterns
        if (categoryFolder.includes('drives') || name.includes('drive') || name.includes('vfd') || name.includes('starvert')) {
          if (model.toLowerCase().includes('iv5') || name.toLowerCase().includes('iv5')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/LS_starvert_iV5_LS_starvert_iV5_iV5-300x300_a5496187.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/LS_starvert_iV5_LS_starvert_iV5_iV5-300x300_a5496187.jpg`)
            }
          }
          if (model.toLowerCase().includes('ip5a') || name.toLowerCase().includes('ip5a')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/Starvert_iP5A_LS_Starvert_iP5A_LS_iP5A-300x300_af011ef2.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/Starvert_iP5A_LS_Starvert_iP5A_LS_iP5A-300x300_af011ef2.jpg`)
            }
          }
          if (model.toLowerCase().includes('ie5') || name.toLowerCase().includes('ie5')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg`)
            }
          }
        }
      }

      if (brandFolder === 'mitsubishi') {
        // Mitsubishi drive patterns - use public directory images
        if (categoryFolder.includes('drives') || name.includes('drive') || name.includes('vfd') || name.includes('inverter')) {
          const lowerModel = model.toLowerCase()
          const lowerName = name.toLowerCase()
          
          // A800 Series - prioritize webp for better performance
          if (lowerModel.includes('a800') || lowerModel.includes('a8') || lowerName.includes('a800') || lowerName.includes('fr-a800')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/FREQROLFR-A800_Series_1165a882.webp`)
              paths.push(`${brandFolder}/FREQROLFR-A800_Series_02422e5e.webp`)
              paths.push(`${brandFolder}/Inverters-FREQROLFR-A800_Plus__1446e720.webp`)
              paths.push(`${brandFolder}/FR-A_Series_02422e5e.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/FREQROLFR-A800_Series_230242e2.jpg`)
              paths.push(`${brandFolder}/Inverters-FREQROLFR-A800_Plus__230242e2.jpg`)
              paths.push(`${brandFolder}/FR-A_Series_1446e720.jpg`)
            }
            if (ext === '.png') {
              paths.push(`${brandFolder}/FREQROLFR-A800_Series_1165a882.png`)
              paths.push(`${brandFolder}/FR-A_Series_02422e5e.png`)
            }
          }
          
          // F800 Series
          if (lowerModel.includes('f800') || lowerModel.includes('f8') || lowerName.includes('f800') || lowerName.includes('fr-f800')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/FREQROL-F800_Series_83071d5c.webp`)
              paths.push(`${brandFolder}/FREQROLFR-F_Series_83071d5c.webp`)
              paths.push(`${brandFolder}/Inverters-FREQROLFR-F_series_83071d5c.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/FREQROL-F800_Series_c2972544.jpg`)
              paths.push(`${brandFolder}/FREQROLFR-F_Series_c2972544.jpg`)
              paths.push(`${brandFolder}/Inverters-FREQROLFR-F_series_c2972544.jpg`)
            }
            if (ext === '.png') {
              paths.push(`${brandFolder}/FREQROL-F800_Series_83071d5c.png`)
              paths.push(`${brandFolder}/FREQROLFR-F_Series_83071d5c.png`)
            }
          }
          
          // D700 Series
          if (lowerModel.includes('d700') || lowerModel.includes('d7') || lowerName.includes('d700') || lowerName.includes('fr-d700')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/FREQROL-D700_Series_36840095.webp`)
              paths.push(`${brandFolder}/FREQROLFR-D_Series_36840095.webp`)
              paths.push(`${brandFolder}/Inverters-FREQROLFR-D_series_36840095.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/FREQROL-D700_Series_4b066483.jpg`)
              paths.push(`${brandFolder}/FREQROLFR-D_Series_4b066483.jpg`)
              paths.push(`${brandFolder}/Inverters-FREQROLFR-D_series_4b066483.jpg`)
            }
            if (ext === '.png') {
              paths.push(`${brandFolder}/FREQROL-D700_Series_36840095.png`)
              paths.push(`${brandFolder}/FREQROLFR-D_Series_36840095.png`)
            }
          }
          
          // E800 Series
          if (lowerModel.includes('e800') || lowerModel.includes('e8') || lowerName.includes('e800') || lowerName.includes('fr-e800')) {
            if (ext === '.webp') {
              paths.push(`${brandFolder}/FR-E800_Series_607274b1.webp`)
              paths.push(`${brandFolder}/FREQROLFR-E_Series_607274b1.webp`)
              paths.push(`${brandFolder}/Inverters-FREQROLFR-E_series_607274b1.webp`)
              paths.push(`${brandFolder}/FR-E800_Series_b6caf4c6.webp`)
            }
            if (ext === '.jpg') {
              paths.push(`${brandFolder}/FR-E800_Series_607274b1.jpg`)
              paths.push(`${brandFolder}/FREQROLFR-E_Series_607274b1.jpg`)
              paths.push(`${brandFolder}/Inverters-FREQROLFR-E_series_27b5cbba.jpg`)
            }
            if (ext === '.png') {
              paths.push(`${brandFolder}/FR-E800_Series_b6caf4c6.png`)
              paths.push(`${brandFolder}/FREQROLFR-E_Series_b6caf4c6.png`)
            }
          }
        }
      }
    })

    return paths
  }

  /**
   * Generate general category-based paths
   */
  private static generateCategoryPaths(brandFolder: string, categoryFolder: string): string[] {
    const paths: string[] = []
    const extensions = ['.avif', '.webp', '.jpg', '.jpeg', '.png']
    
    extensions.forEach(ext => {
      paths.push(`${brandFolder}/${categoryFolder}/default${ext}`)
      paths.push(`${brandFolder}/${categoryFolder}/${brandFolder}_${categoryFolder}${ext}`)
      paths.push(`${brandFolder}/${categoryFolder}/product${ext}`)
    })

    return paths
  }

  /**
   * Resolve model-specific image without category
   */
  private static resolveModelImage(brandFolder: string, model: string, name: string): string | null {
    if (!model) return null

    const paths = [
      `${brandFolder}/${model}.avif`,
      `${brandFolder}/${model}.webp`, 
      `${brandFolder}/${model}.jpg`,
      `${brandFolder}/${brandFolder}_${model}.avif`,
      `${brandFolder}/products/${model}.avif`
    ]

    for (const path of paths) {
      if (this.imageExistsInAssets(path)) {
        return `${imageConfig.baseUrl}/${path}`
      }
    }

    return null
  }

  /**
   * Get category-based fallback image
   */
  private static getCategoryFallback(category: string): string {
    return imageConfig.fallbackImages[category] || imageConfig.fallbackImages['default']
  }

  /**
   * Check if an image path is valid (not placeholder, not empty)
   */
  private static isValidImagePath(imagePath: string): boolean {
    if (!imagePath) return false
    if (imagePath.includes('placeholder')) return false
    if (imagePath.includes('default')) return false
    if (imagePath === '/images/products/placeholder.jpg') return false
    return true
  }

  /**
   * Check if image exists in public assets directory
   * This uses known image files from the public/assets/images/products directory
   */
  private static imageExistsInAssets(path: string): boolean {
    // Check if it's a series image
    if (path.includes('series/')) {
      return true // Series images are guaranteed to exist since we copied them
    }
    
    // Known images in public directory organized by brand
    const publicImages = [
      // Mitsubishi VFD images
      // A800 Series
      'mitsubishi/FR-A_Series_02422e5e.png',
      'mitsubishi/FR-A_Series_02422e5e.webp',
      'mitsubishi/FR-A_Series_1446e720.jpg',
      'mitsubishi/FR-A_Series_1446e720.webp',
      'mitsubishi/FREQROL-A800-LCRELEASE_Series_1165a882.png',
      'mitsubishi/FREQROL-A800-LCRELEASE_Series_1165a882.webp',
      'mitsubishi/FREQROL-A800-LCRELEASE_Series_230242e2.jpg',
      'mitsubishi/FREQROL-A800-LCRELEASE_Series_230242e2.webp',
      'mitsubishi/FREQROLFR-A800_Series_02422e5e.png',
      'mitsubishi/FREQROLFR-A800_Series_02422e5e.webp',
      'mitsubishi/FREQROLFR-A800_Series_1165a882.png',
      'mitsubishi/FREQROLFR-A800_Series_1165a882.webp',
      'mitsubishi/FREQROLFR-A800_Series_230242e2.jpg',
      'mitsubishi/FREQROLFR-A800_Series_230242e2.webp',
      'mitsubishi/Inverters-FREQROLFR-A800_Plus__1446e720.jpg',
      'mitsubishi/Inverters-FREQROLFR-A800_Plus__1446e720.webp',
      'mitsubishi/Inverters-FREQROLFR-A800_Plus__230242e2.jpg',
      'mitsubishi/Inverters-FREQROLFR-A800_Plus__230242e2.webp',
      
      // F800 Series  
      'mitsubishi/FREQROL-F800_Series_83071d5c.png',
      'mitsubishi/FREQROL-F800_Series_83071d5c.webp',
      'mitsubishi/FREQROL-F800_Series_c2972544.jpg',
      'mitsubishi/FREQROL-F800_Series_c2972544.webp',
      'mitsubishi/FREQROLFR-F_Series_83071d5c.png',
      'mitsubishi/FREQROLFR-F_Series_83071d5c.webp',
      'mitsubishi/FREQROLFR-F_Series_c2972544.jpg',
      'mitsubishi/FREQROLFR-F_Series_c2972544.webp',
      'mitsubishi/Inverters-FREQROLFR-F_series_83071d5c.png',
      'mitsubishi/Inverters-FREQROLFR-F_series_83071d5c.webp',
      'mitsubishi/Inverters-FREQROLFR-F_series_c2972544.jpg',
      'mitsubishi/Inverters-FREQROLFR-F_series_c2972544.webp',
      
      // D700 Series
      'mitsubishi/FREQROL-D700_Series_36840095.png',
      'mitsubishi/FREQROL-D700_Series_36840095.webp',
      'mitsubishi/FREQROL-D700_Series_4b066483.jpg',
      'mitsubishi/FREQROL-D700_Series_4b066483.webp',
      'mitsubishi/FREQROLFR-D_Series_36840095.png',
      'mitsubishi/FREQROLFR-D_Series_36840095.webp',
      'mitsubishi/FREQROLFR-D_Series_4b066483.jpg',
      'mitsubishi/FREQROLFR-D_Series_4b066483.webp',
      'mitsubishi/Inverters-FREQROLFR-D_series_36840095.png',
      'mitsubishi/Inverters-FREQROLFR-D_series_36840095.webp',
      'mitsubishi/Inverters-FREQROLFR-D_series_4b066483.jpg',
      'mitsubishi/Inverters-FREQROLFR-D_series_4b066483.webp',
      
      // E800 Series
      'mitsubishi/FR-E800_Series_607274b1.jpg',
      'mitsubishi/FR-E800_Series_607274b1.webp',
      'mitsubishi/FR-E800_Series_b6caf4c6.png',
      'mitsubishi/FR-E800_Series_b6caf4c6.webp',
      'mitsubishi/FREQROLFR-E_Series_607274b1.jpg',
      'mitsubishi/FREQROLFR-E_Series_607274b1.webp',
      'mitsubishi/FREQROLFR-E_Series_b6caf4c6.png',
      'mitsubishi/FREQROLFR-E_Series_b6caf4c6.webp',
      'mitsubishi/Inverters-FREQROLFR-E_series_27b5cbba.jpg',
      'mitsubishi/Inverters-FREQROLFR-E_series_27b5cbba.webp',
      'mitsubishi/Inverters-FREQROLFR-E_series_607274b1.jpg',
      'mitsubishi/Inverters-FREQROLFR-E_series_607274b1.webp',
      'mitsubishi/Inverters-FREQROLFR-E_series_b6caf4c6.png',
      'mitsubishi/Inverters-FREQROLFR-E_series_b6caf4c6.webp',
      
      // Noark MCB and MCP images
      'noark/B1N_miniature_circuit_breakers_UL_489_240_Vac_6012_B1N-300x300_f9e504f0.webp',
      'noark/B1N_miniature_circuit_breakers_UL_489_240_Vac_6012_B1N-300x300_f9e504f0.jpg',
      'noark/B1H_miniature_circuit_breakers_UL_489_480Y277_Vac__B1H-300x300_61a1ffe1.webp',
      'noark/B1H_miniature_circuit_breakers_UL_489_480Y277_Vac__B1H-300x300_61a1ffe1.jpg',
      'noark/B1NQ_miniature_circuit_breakers_UL_489_120240_Vac__B1NQ-300x300_8caa1a92.webp',
      'noark/B1NQ_miniature_circuit_breakers_UL_489_120240_Vac__B1NQ-300x300_8caa1a92.jpg',
      'noark/B1E_UL1077_supplementary_protectors_B1E_UL1077_sup_B1E-300x300_35a141dc.webp',
      'noark/B1E_UL1077_supplementary_protectors_B1E_UL1077_sup_B1E-300x300_35a141dc.jpg',
      'noark/M1_molded_case_circuit_breakers_M1_molded_case_cir_M1-300x300_c777b548.webp',
      'noark/M1_molded_case_circuit_breakers_M1_molded_case_cir_M1-300x300_c777b548.jpg',
      'noark/M2_molded_case_circuit_breakers_M2_molded_case_cir_M2-300x300_dca8decb.webp',
      'noark/M2_molded_case_circuit_breakers_M2_molded_case_cir_M2-300x300_dca8decb.jpg',
      'noark/M3_molded_case_circuit_breakers_M3_molded_case_cir_M3-300x300_c4a9c96f.webp',
      'noark/M3_molded_case_circuit_breakers_M3_molded_case_cir_M3-300x300_c4a9c96f.jpg',
      'noark/M4_molded_case_circuit_breakers_M4_molded_case_cir_M4-300x300_4fc3277c.webp',
      'noark/M4_molded_case_circuit_breakers_M4_molded_case_cir_M4-300x300_4fc3277c.jpg',
      
      // LS Industrial VFD images
      'ls_industrial/LS_starvert_iV5_LS_starvert_iV5_iV5-300x300_a5496187.webp',
      'ls_industrial/LS_starvert_iV5_LS_starvert_iV5_iV5-300x300_a5496187.jpg',
      'ls_industrial/Starvert_iP5A_LS_Starvert_iP5A_LS_iP5A-300x300_af011ef2.webp',
      'ls_industrial/Starvert_iP5A_LS_Starvert_iP5A_LS_iP5A-300x300_af011ef2.jpg',
      'ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.webp',
      'ls_industrial/Variable_Frequency_Drives_starvert-ie5-300x300_f025777f.jpg'
    ]

    // Check exact matches first
    if (publicImages.includes(path)) {
      return true
    }

    // Fallback to pattern matching for other brands
    const knownPatterns = [
      /noark\/circuit_breakers\/.*\.(avif|jpg)/,
      /ls_industrial\/.*\.(avif|webp|jpg)/,
      /erico\/.*\.(jpg|webp)/,
      /klemsan\/.*\.(webp|jpg)/,
      /mitsubishi\/.*\.(avif|webp|jpg|png|svg)/,
      /mitsubishi\/drives\/.*\.(avif|webp|jpg|png)/,
      /mitsubishi\/circuit_breakers\/.*\.(avif|webp|jpg)/,
      /mitsubishi\/servo-motors\/.*\.(avif|webp|jpg)/
    ]

    return knownPatterns.some(pattern => pattern.test(path))
  }

  /**
   * Extract pole configuration from product name/description
   */
  private static extractPoles(text: string): string | null {
    const poleMatches = text.match(/(\d+)[p|P]ole|(\d+)[p|P]/i)
    if (poleMatches) {
      const poles = poleMatches[1] || poleMatches[2]
      return `${poles}pole`
    }
    return null
  }

  /**
   * Get multiple image variants for a product (for galleries, carousels, etc.)
   */
  static resolveProductImages(product: Product, maxImages: number = 3): string[] {
    const images: string[] = []
    
    // Primary image
    images.push(this.resolveProductImage(product, 0))
    
    // Try to get additional images
    for (let i = 1; i < maxImages; i++) {
      if (product.images && product.images[i] && this.isValidImagePath(product.images[i])) {
        images.push(getImageUrl(product.images[i]))
      } else {
        // Generate variant images (different angles, configurations, etc.)
        const variant = this.generateImageVariant(product, i)
        if (variant && !images.includes(getImageUrl(variant))) {
          images.push(getImageUrl(variant))
        }
      }
    }

    return images
  }

  /**
   * Generate image variants for products (different poles, configurations, etc.)
   */
  private static generateImageVariant(product: Product, variantIndex: number): string | null {
    const brand = product.brand
    const category = product.category

    // For circuit breakers, show different pole configurations
    if (category?.includes('Circuit Breaker') || category?.includes('MCB')) {
      const poleVariants = ['1pole', '2pole', '3pole', '4pole']
      const poleVariant = poleVariants[variantIndex - 1]
      
      if (poleVariant && brand === 'Noark') {
        return `/noark ${poleVariant.replace('pole', ' pole')}.jpg`
      }
    }

    // For drives, show different series
    if (category?.includes('Drive') || category?.includes('VFD')) {
      if (brand === 'LS Industrial') {
        const driveVariants = [
          'assets/images/products/ls_industrial/vfd_series/Starvert_C100_9c6865c5-524b-4222-bf20-e6f81559794b_medium.avif',
          'assets/images/products/ls_industrial/vfd_series/Starvert_iC5_medium.avif',
          'assets/images/products/ls_industrial/vfd_series/Starvert_iG5A_e972cb1c-e133-493e-99ad-39997d662be8_medium.avif'
        ]
        return driveVariants[variantIndex - 1] || null
      }
      
      if (brand === 'Mitsubishi') {
        const mitsubishiDriveVariants = [
          'assets/images/products/mitsubishi/drives/Mitsubishi_A800_Series_300x300_f4449bac-61ee-47f0-8e3b-7aa6411acc03_medium.avif',
          'assets/images/products/mitsubishi/drives/Mitsubishi_D700_Series_300x300_72a55542-e148-4d3c-aa1b-ef4bcddb54fd_medium.avif',
          'assets/images/products/mitsubishi/drives/Mitsubishi_E800_VFD_medium.avif',
          'assets/images/products/mitsubishi/drives/Mitsubishi_F800_Series_300x300_019b1561-110c-4fb4-a377-1493b5180803_medium.avif'
        ]
        return mitsubishiDriveVariants[variantIndex - 1] || null
      }
    }
    
    // For servo motors, show different Mitsubishi MELSERVO series
    if (category?.includes('Servo') || category?.includes('Motor')) {
      if (brand === 'Mitsubishi') {
        const servoVariants = [
          'assets/images/products/mitsubishi/drives/Mitsubishi_MELSERVO_J4_medium.avif',
          'assets/images/products/mitsubishi/drives/Mitsubishi_MELSERVO_J5_medium.avif',
          'assets/images/products/mitsubishi/drives/Mitsubishi_MELSERVO_JN_medium.avif'
        ]
        return servoVariants[variantIndex - 1] || null
      }
    }

    return null
  }

  /**
   * Preload images for better performance
   */
  static preloadProductImages(products: Product[]): void {
    const imagesToPreload = new Set<string>()
    
    products.slice(0, 10).forEach(product => {
      const primaryImage = this.resolveProductImage(product)
      imagesToPreload.add(primaryImage)
    })

    imagesToPreload.forEach(imageUrl => {
      if (typeof window !== 'undefined') {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = imageUrl
        document.head.appendChild(link)
      }
    })
  }
}

// Convenience functions for easy use
export const resolveProductImage = (product: Product, index: number = 0): string => {
  return IntelligentImageResolver.resolveProductImage(product, index)
}

export const resolveProductImages = (product: Product, maxImages: number = 3): string[] => {
  return IntelligentImageResolver.resolveProductImages(product, maxImages)
}

export const preloadProductImages = (products: Product[]): void => {
  IntelligentImageResolver.preloadProductImages(products)
} 