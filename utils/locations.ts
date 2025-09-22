// Plain build-safe data (no Nuxt/Vue APIs here)

// --- helpers ---
const toSlug = (s: string) =>
  s
    ?.toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr))

// --- topics ---
export const topics = [
  'postpone-foreclosure',
  'stop-auction',
  'loan-modification',
  'reinstate-loan',
  'sell-before-auction'
].map(toSlug)

// --- cities grouped by county/area ---
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
    'corona','norco','eastvale','jurupa-valley','riverside','moreno-valley','perris',
    'lake-elsinore','canyon-lake','menifee','wildomar','murrieta','temecula'
  ],
  losAngeles_BC: [
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
} as const

// --- derived city lists ---
const _allCities = Object.values(counties).flat().map(toSlug)
export const citySlugs: string[] = uniq(_allCities)

// Sets for O(1) membership checks in guards
export const topicSet = new Set(topics)
export const citySet  = new Set(citySlugs)

// Pretty labels for UI/runtime use
const proper = (slug: string) =>
  slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')

export const cityMeta = (() => {
  const map: Record<string, { name: string; countyGroup: string; state: 'CA' }> = {}
  for (const [group, arr] of Object.entries(counties)) {
    for (const slug of arr) {
      const s = toSlug(slug)
      map[s] = { name: proper(s), countyGroup: group, state: 'CA' }
    }
  }
  return map
})()

// Cross-product for prerendering and/or sitemaps
export const topicCityRoutes: string[] = topics.flatMap(t =>
  citySlugs.map(c => `/${t}/${c}`)
)

// Optional debug (enable with NUXT_LOG_LOCATIONS=1)
if (process.env.NUXT_LOG_LOCATIONS === '1') {
  // Keep it short to avoid noisy CI logs
  // eslint-disable-next-line no-console
  console.log('[locations] topics:', topics.length, topics.slice(0, 5))
  // eslint-disable-next-line no-console
  console.log('[locations] cities:', citySlugs.length, citySlugs.slice(0, 10))
  // eslint-disable-next-line no-console
  console.log('[locations] sample routes:', topicCityRoutes.slice(0, 5))
}
