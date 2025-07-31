// Test script for series image mapping
const { getBestSeriesImage, getSeriesImage, seriesImageMapper } = require('./lib/utils/series-image-mapper.ts')

console.log('Testing Series Image Mapping System')
console.log('==================================')

// Test some common series
const testCases = [
  { series: 'FR', category: 'Drives & VFDs' },
  { series: 'B1H', category: 'Circuit Breakers' },
  { series: 'EX9CDR', category: 'Contactors' },
  { series: 'ES50', category: 'LED Indicators' },
  { series: 'MMS', category: 'Manual Motor Starters' },
  { series: 'EX9R', category: 'Overload Relays' },
  { series: 'FX5, FX3', category: 'PLCs' },
  { series: 'PCB', category: 'Power Distribution' },
  { series: 'EX9PBR', category: 'Push Buttons' },
  { series: 'HF', category: 'Servo Motors' },
  { series: 'MR J3BAT', category: 'Batteries & Power' },
]

testCases.forEach(({ series, category }) => {
  const image = getBestSeriesImage(series, category)
  console.log(`${series} (${category}): ${image}`)
})

console.log('\nAll mappings:')
console.log('=============')
const allMappings = seriesImageMapper.getAllMappings()
console.log(`Total mappings: ${allMappings.length}`)
allMappings.slice(0, 10).forEach(mapping => {
  console.log(`${mapping.seriesName} -> ${mapping.imagePath}`)
}) 