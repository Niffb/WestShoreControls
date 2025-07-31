import seriesData from '@/series.json'

// Type for the series data structure
type SeriesData = {
  [category: string]: string[]
}

// Interface for series image mapping
export interface SeriesImageMapping {
  seriesName: string
  imagePath: string
  category: string
}

/**
 * Maps series names to their corresponding image paths from series_images folder
 * Uses the series.json file to determine which category each series belongs to
 */
export class SeriesImageMapper {
  private static instance: SeriesImageMapper
  private seriesImageMap: Map<string, SeriesImageMapping>

  private constructor() {
    this.seriesImageMap = new Map()
    this.buildSeriesImageMap()
  }

  public static getInstance(): SeriesImageMapper {
    if (!SeriesImageMapper.instance) {
      SeriesImageMapper.instance = new SeriesImageMapper()
    }
    return SeriesImageMapper.instance
  }

  /**
   * Build the mapping between series names and their image paths
   */
  private buildSeriesImageMap(): void {
    const typedSeriesData = seriesData as SeriesData

    // Create a manual mapping for known series images with their actual filenames
    const knownSeriesImages: { [key: string]: string } = {
      // VFDs / Drives
      'fr': '/series_images/Drives_&_VFDs_FR_225ad36d.jpg',
      'e8': '/series_images/Drives_&_VFDs_E8_32086962.jpg',
      'sv': '/series_images/Drives_&_VFDs_SV_c2e8cac6.jpg',
      'lslv': '/series_images/Drives_&_VFDs_LSLV_abab3ef1.jpg',
      'mr': '/series_images/Drives_&_VFDs_MR_cac87e25.png',
      
      // Circuit Breakers
      'klk': '/series_images/Circuit_Breakers_KLK_a13a6e2e.jpg',
      'b1e': '/series_images/Circuit_Breakers_B1E_4bd83906.png',
      'b1h': '/series_images/Circuit_Breakers_B1H_a17e2295.png',
      'b1nq': '/series_images/Circuit_Breakers_B1NQ_8f9792b5.png',
      'erh': '/series_images/Circuit_Breakers_ERH_450bce06.png',
      'es': '/series_images/Circuit_Breakers_ES_012c2fb4.jpg',
      'hm': '/series_images/Circuit_Breakers_HM_5f7ef01e.jpg',
      'neh': '/series_images/Circuit_Breakers_NEH_3487381c.jpg',
      'rtt': '/series_images/Circuit_Breakers_RTT_1834d635.png',
      'ute': '/series_images/Circuit_Breakers_UTE_f6920103.jpg',
      
      // Contactors
      'ex9cmr': '/series_images/Contactors_EX9CMR_e46f91f1.png',
      'ex9cds': '/series_images/Contactors_EX9CDS_c9b1dd61.png',
      'ex9cdr': '/series_images/Contactors_EX9CDR_65f2f730.png',
      'ex9ckt': '/series_images/Contactors_EX9CKT_c7e745f7.png',
      'mit': '/series_images/Contactors_MIT_4357f859.png',
      'uz': '/series_images/Contactors_UZ_d49ea3cb.jpg',
      
      // LED Indicators
      'es50': '/series_images/LED_Indicators_ES50_cf268077.jpg',
      
      // Manual Motor Starters
      'mms': '/series_images/Manual_Motor_Starters_MMS_02da3a62.jpg',
      'asna, asnb, asnuv, asnt': '/series_images/Manual_Motor_Starters_ASNA,_ASNB,_ASNUV,_ASNT_4066cce8.jpg',
      'dra': '/series_images/Manual_Motor_Starters_DRA_e3bc65b4.jpg',
      'uvt': '/series_images/Manual_Motor_Starters_UVT_4f663b1d.jpg',
      'sht': '/series_images/Manual_Motor_Starters_SHT_f59cabdc.jpg',
      
      // Overload Relays
      'isotp': '/series_images/Overload_Relays_ISOTP_2ee2ee9a.jpg',
      'ex9r': '/series_images/Overload_Relays_EX9R_419c8487.png',
      
      // PLCs
      'ws0': '/series_images/PLCs_WS0_1fa9bad4.png',
      'fx5, fx3': '/series_images/PLCs_FX5,_FX3_0caa970b.jpg',
      
      // Power Distribution
      'abs': '/series_images/Power_Distribution_ABS_b92f2d4d.jpg',
      'cfbs, fbs, fbss, ucfbs': '/series_images/Power_Distribution_CFBS,_FBS,_FBSS,_UCFBS_99838ef0.jpg',
      'pcb': '/series_images/Power_Distribution_PCB_4be2e429.jpg',
      'udj, ud': '/series_images/Power_Distribution_UDJ,_UD_798c646b.jpg',
      'fbc': '/series_images/Power_Distribution_FBC_a19bac54.jpg',
      'sb': '/series_images/Power_Distribution_SB_1615fcdd.jpg',
      
      // Push Buttons
      'ex9pb': '/series_images/Push_Buttons_EX9PB_55ae0d32.png',
      'ex9pbc': '/series_images/Push_Buttons_EX9PBC_f22d7c33.png',
      'ex9pbr': '/series_images/Push_Buttons_EX9PBR_6743c8b0.png',
      'ex9pbs': '/series_images/Push_Buttons_EX9PBS_e10eb321.png',
      'ex9pbl': '/series_images/Push_Buttons_EX9PBL_420e05c9.png',
      'ex9pbw': '/series_images/Push_Buttons_EX9PBW_3d5d47cf.png',
      'asneb': '/series_images/Push_Buttons_ASNEB_31468f8b.jpg',
      'ex9pbg': '/series_images/Push_Buttons_EX9PBG_2e232237.png',
      'ex9pba': '/series_images/Push_Buttons_EX9PBA_dae27e21.png',
      
      // Servo Motors
      'hf': '/series_images/Servo_Motors_HF_a2068941.jpg',
      'hk': '/series_images/Servo_Motors_HK_ddfe5d94.png',
      
      // Batteries & Power
      'mr j3bat': '/series_images/Batteries_&_Power_MR_J3BAT_3f719844.jpg',
      
      // Other Products
      'vka': '/series_images/Other_Products_VKA_371b9da0.png',
      'ku': '/series_images/Other_Products_KU_89abdf04.png',
      'uah, uas': '/series_images/Other_Products_UAH,_UAS_a5bbf984.jpg'
    }

    // Iterate through each category and its series
    Object.entries(typedSeriesData).forEach(([category, seriesList]) => {
      seriesList.forEach(seriesName => {
        // Check if we have a known image for this series
        const knownImage = knownSeriesImages[seriesName.toLowerCase()]
        const imagePath = knownImage || this.generateImagePath(category, seriesName)
        
        this.seriesImageMap.set(seriesName.toLowerCase(), {
          seriesName,
          imagePath,
          category
        })

        // Also map with category prefix for more specific lookups
        const categoryKey = `${category.toLowerCase()}_${seriesName.toLowerCase()}`
        this.seriesImageMap.set(categoryKey, {
          seriesName,
          imagePath,
          category
        })
      })
    })
  }

  /**
   * Generate the expected image path based on category and series name
   */
  private generateImagePath(category: string, seriesName: string): string {
    // Clean up category name for filename
    const cleanCategory = category.replace(/\s+/g, '_').replace(/&/g, '_')
    
    // Clean up series name for filename
    const cleanSeries = seriesName.replace(/,\s*/g, ',').replace(/\s+/g, '_')
    
    // Create the base filename pattern
    const baseFileName = `${cleanCategory}_${cleanSeries}`
    
    // Return the path to series_images folder (without extension, will be handled by image resolver)
    return `/series_images/${baseFileName}`
  }

  /**
   * Get image path for a specific series
   */
  public getSeriesImage(seriesName: string, category?: string): string | null {
    // Try with category prefix first if provided
    if (category) {
      const categoryKey = `${category.toLowerCase()}_${seriesName.toLowerCase()}`
      const mapping = this.seriesImageMap.get(categoryKey)
      if (mapping) {
        return mapping.imagePath
      }
    }

    // Try direct series name lookup
    const mapping = this.seriesImageMap.get(seriesName.toLowerCase())
    return mapping ? mapping.imagePath : null
  }

  /**
   * Get all available series for a category
   */
  public getSeriesForCategory(category: string): SeriesImageMapping[] {
    const results: SeriesImageMapping[] = []
    
    this.seriesImageMap.forEach(mapping => {
      if (mapping.category.toLowerCase() === category.toLowerCase()) {
        results.push(mapping)
      }
    })
    
    return results
  }

  /**
   * Check if a series has an available image
   */
  public hasSeriesImage(seriesName: string, category?: string): boolean {
    return this.getSeriesImage(seriesName, category) !== null
  }

  /**
   * Get fallback image for a category if specific series image not found
   */
  public getCategoryFallbackImage(category: string): string {
    const categoryImages: { [key: string]: string } = {
      'circuit breakers': '/series_images/Circuit_Breakers_B1H_a17e2295.png',
      'miniature circuit breakers': '/series_images/Circuit_Breakers_B1H_a17e2295.png',
      'contactors': '/series_images/Contactors_EX9CDR_65f2f730.png',
      'drives & vfds': '/series_images/Drives_&_VFDs_FR_225ad36d.jpg',
      'variable frequency drives': '/series_images/Drives_&_VFDs_FR_225ad36d.jpg',
      'led indicators': '/series_images/LED_Indicators_ES50_cf268077.jpg',
      'manual motor starters': '/series_images/Manual_Motor_Starters_MMS_02da3a62.jpg',
      'overload relays': '/series_images/Overload_Relays_EX9R_419c8487.png',
      'plcs': '/series_images/PLCs_FX5,_FX3_0caa970b.jpg',
      'programmable logic controllers': '/series_images/PLCs_FX5,_FX3_0caa970b.jpg',
      'power distribution': '/series_images/Power_Distribution_PCB_4be2e429.jpg',
      'push buttons': '/series_images/Push_Buttons_EX9PBR_6743c8b0.png',
      'servo motors': '/series_images/Servo_Motors_HF_a2068941.jpg',
      'batteries & power': '/series_images/Batteries_&_Power_MR_J3BAT_3f719844.jpg',
      'other products': '/series_images/Other_Products_VKA_371b9da0.png'
    }

    return categoryImages[category.toLowerCase()] || '/images/westlogo.jpg'
  }

  /**
   * Get the best available image for a product series
   * Returns series-specific image if available, otherwise category fallback
   */
  public getBestSeriesImage(seriesName: string, category: string): string {
    const seriesImage = this.getSeriesImage(seriesName, category)
    if (seriesImage) {
      return seriesImage
    }

    // Try without extension variations
    const cleanSeriesName = seriesName.replace(/[,\s]+/g, '_')
    const altSeriesImage = this.getSeriesImage(cleanSeriesName, category)
    if (altSeriesImage) {
      return altSeriesImage
    }

    // Return category fallback
    return this.getCategoryFallbackImage(category)
  }

  /**
   * Debug method to list all available mappings
   */
  public getAllMappings(): SeriesImageMapping[] {
    return Array.from(this.seriesImageMap.values())
  }
}

// Export singleton instance
export const seriesImageMapper = SeriesImageMapper.getInstance()

// Helper functions for easy access
export function getSeriesImage(seriesName: string, category?: string): string | null {
  return seriesImageMapper.getSeriesImage(seriesName, category)
}

export function getBestSeriesImage(seriesName: string, category: string): string {
  return seriesImageMapper.getBestSeriesImage(seriesName, category)
}

export function hasSeriesImage(seriesName: string, category?: string): boolean {
  return seriesImageMapper.hasSeriesImage(seriesName, category)
}

export function getCategoryFallbackImage(category: string): string {
  return seriesImageMapper.getCategoryFallbackImage(category)
} 