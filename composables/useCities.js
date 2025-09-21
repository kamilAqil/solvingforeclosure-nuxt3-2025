// composables/useCities.js
export const topics = [
  'postpone-foreclosure',
  'stop-auction',
  'loan-modification',
  'reinstate-loan',
  'sell-before-auction'
]

// Cities within ~50 miles of 92802
export const counties = {
  orange: [
    'aliso-viejo','anaheim','brea','buena-park','costa-mesa','cypress','dana-point',
    'fountain-valley','fullerton','garden-grove','huntington-beach','irvine','la-habra',
    'la-palma','laguna-beach','laguna-hills','laguna-niguel','laguna-woods','lake-forest',
    'los-alamitos','mission-viejo','newport-beach','orange','placentia',
    'rancho-santa-margarita','san-clemente','san-juan-capistrano','santa-ana','seal-beach',
    'stanton','tustin','villa-park','westminster','yorba-linda'
  ],
  riverside: [
    // Excludes >~50mi desert cities; add if you want them
    'corona','norco','eastvale','jurupa-valley','riverside','moreno-valley','perris',
    'lake-elsinore','canyon-lake','menifee','wildomar','murrieta','temecula'
  ],
  losAngeles_BC: [
    // Focus on B/C-weighted cities/neighborhoods; can expand later
    'los-angeles','long-beach','carson','compton','lynwood','south-gate','huntington-park',
    'maywood','cudahy','bell','bell-gardens','paramount','bellflower','lakewood','downey',
    'norwalk','cerritos','artesia','hawaiian-gardens','la-mirada','whittier','pico-rivera',
    'montebello','monterey-park','alhambra','san-gabriel','rosemead','el-monte',
    'south-el-monte','baldwin-park','la-puente','west-covina','covina','azusa','glendora',
    'duarte','monrovia','pomona','diamond-bar','walnut','industry','irwindale',
    'gardena','hawthorne','inglewood','lawndale','torrance','lomita'
  ],
  sanBernardino_BC: [
    'chino','chino-hills','montclair','upland','ontario','rancho-cucamonga','fontana',
    'rialto','bloomington','colton','san-bernardino','loma-linda','grand-terrace',
    'redlands','highland','yucaipa'
  ]
}

// Pretty labels for UI
const proper = (slug) =>
  slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')

export const cityMeta = (() => {
  const map = {}
  for (const [group, arr] of Object.entries(counties)) {
    arr.forEach(slug => {
      map[slug] = {
        name: proper(slug),
        countyGroup: group, // 'orange' | 'riverside' | 'losAngeles_BC' | 'sanBernardino_BC'
        state: 'CA'
      }
    })
  }
  return map
})()

export const allCitySlugs = () => [
  ...new Set(Object.values(counties).flat())
]
