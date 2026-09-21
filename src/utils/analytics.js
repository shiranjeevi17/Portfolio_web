// ============================================================
// DEMO ANALYTICS (frontend-only)
// ------------------------------------------------------------
// This is a private, local-only visitor counter for the /admin
// dashboard. It writes to the visitor's own localStorage — it is
// NOT server-side analytics and does not track anyone across
// devices or send data anywhere. Good enough for a personal demo,
// not a substitute for a real analytics service.
// ============================================================

const STORE_KEY = 'portfolio-analytics-v1'

function todayKey() {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

function detectDevice() {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent || ''
  if (/tablet|ipad/i.test(ua)) return 'tablet'
  if (/mobile|android|iphone/i.test(ua)) return 'mobile'
  return 'desktop'
}

function readStore() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY)
    if (!raw) return defaultStore()
    const parsed = JSON.parse(raw)
    return { ...defaultStore(), ...parsed }
  } catch {
    return defaultStore()
  }
}

function defaultStore() {
  return {
    totalVisits: 0,
    dailyVisits: {}, // { 'YYYY-MM-DD': count }
    sectionViews: {}, // { sectionId: count }
    devices: { desktop: 0, mobile: 0, tablet: 0, unknown: 0 },
    firstVisit: null,
    lastVisit: null,
  }
}

function writeStore(store) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store))
  } catch {
    // ignore write failures (private browsing, quota, etc.)
  }
}

/** Call once per session load to record a visit. */
export function recordVisit() {
  if (typeof window === 'undefined') return
  const store = readStore()
  const day = todayKey()
  const device = detectDevice()

  store.totalVisits += 1
  store.dailyVisits[day] = (store.dailyVisits[day] || 0) + 1
  store.devices[device] = (store.devices[device] || 0) + 1
  store.lastVisit = new Date().toISOString()
  if (!store.firstVisit) store.firstVisit = store.lastVisit

  writeStore(store)
}

/** Call when a section scrolls into view to tally section activity. */
export function recordSectionView(sectionId) {
  if (typeof window === 'undefined' || !sectionId) return
  const store = readStore()
  store.sectionViews[sectionId] = (store.sectionViews[sectionId] || 0) + 1
  writeStore(store)
}

/** Reads the full analytics snapshot for the admin dashboard. */
export function getAnalyticsSnapshot() {
  if (typeof window === 'undefined') return defaultStore()
  const store = readStore()
  const day = todayKey()

  const last7 = [...Array(7)].map((_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    return { date: key, count: store.dailyVisits[key] || 0 }
  })

  const weeklyTotal = last7.reduce((sum, d) => sum + d.count, 0)

  return {
    totalVisits: store.totalVisits,
    todayVisits: store.dailyVisits[day] || 0,
    weeklyVisits: weeklyTotal,
    last7,
    sectionViews: store.sectionViews,
    devices: store.devices,
    firstVisit: store.firstVisit,
    lastVisit: store.lastVisit,
  }
}

/** Clears all locally stored demo analytics. */
export function resetAnalytics() {
  try {
    window.localStorage.removeItem(STORE_KEY)
  } catch {
    // ignore
  }
}
