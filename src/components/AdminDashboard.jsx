import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiLock, FiRefreshCw, FiTrash2 } from 'react-icons/fi'
import { getAnalyticsSnapshot, resetAnalytics } from '../utils/analytics.js'
import './Admin.css'

// Demo-only passphrase. This is a client-side convenience gate to keep the
// dashboard out of casual view — it is NOT real authentication and provides
// no actual security, since anyone can read this source file.
const DEMO_PASSPHRASE = 'shiranjeevi-admin'

export function AdminDashboard() {
  const [unlocked, setUnlocked] = useState(false)
  const [passInput, setPassInput] = useState('')
  const [gateError, setGateError] = useState(false)
  const [snapshot, setSnapshot] = useState(null)

  useEffect(() => {
    if (!unlocked) return
    setSnapshot(getAnalyticsSnapshot())
  }, [unlocked])

  const refresh = () => setSnapshot(getAnalyticsSnapshot())

  const handleReset = () => {
    resetAnalytics()
    refresh()
  }

  const handleGateSubmit = (e) => {
    e.preventDefault()
    if (passInput === DEMO_PASSPHRASE) {
      setUnlocked(true)
      setGateError(false)
    } else {
      setGateError(true)
    }
  }

  const maxDaily = useMemo(() => {
    if (!snapshot) return 1
    return Math.max(1, ...snapshot.last7.map((d) => d.count))
  }, [snapshot])

  const sectionEntries = useMemo(() => {
    if (!snapshot) return []
    const entries = Object.entries(snapshot.sectionViews)
    const max = Math.max(1, ...entries.map(([, v]) => v))
    return entries.sort((a, b) => b[1] - a[1]).map(([id, count]) => ({ id, count, pct: Math.round((count / max) * 100) }))
  }, [snapshot])

  if (!unlocked) {
    return (
      <div className="admin-page">
        <div className="admin-gate">
          <span style={{ display: 'inline-flex', color: 'var(--primary-soft)', marginBottom: 12 }}>
            <FiLock size={22} />
          </span>
          <h1>Admin Access</h1>
          <p>Private analytics dashboard. Enter the passphrase to continue.</p>
          <form onSubmit={handleGateSubmit}>
            <input
              type="password"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              placeholder="Passphrase"
              aria-label="Admin passphrase"
              autoFocus
            />
            {gateError && <p className="admin-gate-error">Incorrect passphrase.</p>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Unlock
            </button>
          </form>
          <Link to="/" className="admin-back" style={{ marginTop: 18, justifyContent: 'center' }}>
            <FiArrowLeft size={14} />
            Back to site
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Visitor Analytics</h1>
          <p className="admin-sub">Private, local-only demo dashboard.</p>
        </div>
        <Link to="/" className="admin-back">
          <FiArrowLeft size={14} />
          Back to site
        </Link>
      </div>

      <p className="admin-note">
        This dashboard reads anonymous visit counters stored in your own browser's localStorage. It is a frontend-only demo —
        there is no server, no cross-device tracking, and no data leaves this browser.
      </p>

      {snapshot && (
        <>
          <div className="admin-grid">
            <div className="admin-stat">
              <span className="admin-stat-label">TOTAL VISITS</span>
              <div className="admin-stat-value">{snapshot.totalVisits}</div>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-label">TODAY</span>
              <div className="admin-stat-value">{snapshot.todayVisits}</div>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-label">LAST 7 DAYS</span>
              <div className="admin-stat-value">{snapshot.weeklyVisits}</div>
            </div>
            <div className="admin-stat">
              <span className="admin-stat-label">TOP DEVICE</span>
              <div className="admin-stat-value" style={{ fontSize: '1.3rem', textTransform: 'capitalize' }}>
                {Object.entries(snapshot.devices).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'}
              </div>
            </div>
          </div>

          <div className="admin-panels">
            <div className="admin-panel">
              <h3>Visits — last 7 days</h3>
              <div className="admin-bars">
                {snapshot.last7
                  .slice()
                  .reverse()
                  .map((day) => (
                    <div className="admin-bar-col" key={day.date}>
                      <div
                        className="admin-bar"
                        style={{ height: `${Math.max(4, (day.count / maxDaily) * 100)}%` }}
                        title={`${day.count} visits`}
                      />
                      <span className="admin-bar-label">{day.date.slice(5)}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="admin-panel">
              <h3>Most viewed sections</h3>
              {sectionEntries.length > 0 ? (
                <div className="admin-row-list">
                  {sectionEntries.map((entry) => (
                    <div className="admin-row" key={entry.id}>
                      <span style={{ width: 90, textTransform: 'capitalize' }}>{entry.id}</span>
                      <span className="admin-row-bar">
                        <span style={{ width: `${entry.pct}%` }} />
                      </span>
                      <span>{entry.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="admin-empty">No section activity recorded yet.</p>
              )}
            </div>
          </div>

          <div className="admin-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={refresh} style={{ marginRight: 10 }}>
              <FiRefreshCw size={14} />
              Refresh
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={handleReset}>
              <FiTrash2 size={14} />
              Reset data
            </button>
          </div>
        </>
      )}
    </div>
  )
}
