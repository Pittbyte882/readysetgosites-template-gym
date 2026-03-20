'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Booking {
  id: string
  name: string
  email: string
  phone: string | null
  session_type: string
  preferred_time: string | null
  message: string | null
  status: string
  created_at: string
}

const STATUSES = ['new', 'contacted', 'confirmed', 'cancelled']

const STATUS_COLORS: Record<string, string> = {
  new:       'bg-primary/10 text-primary',
  contacted: 'bg-blue-500/10 text-blue-400',
  confirmed: 'bg-green-500/10 text-green-400',
  cancelled: 'bg-red-500/10 text-red-400',
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const load = async () => {
    const url = filter === 'all' ? '/api/bookings' : `/api/bookings?status=${filter}`
    const res = await fetch(url)
    setBookings(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [filter])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    await load()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">Bookings</h1>
        <p className="text-muted-foreground mt-1">View and manage session requests</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', ...STATUSES].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors',
              filter === s ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? <div className="text-muted-foreground">Loading...</div> : bookings.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">No bookings found.</div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground">{b.name}</h3>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium capitalize', STATUS_COLORS[b.status] ?? 'bg-secondary text-muted-foreground')}>
                      {b.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                    <a href={`mailto:${b.email}`} className="text-primary hover:underline">{b.email}</a>
                    {b.phone && <span>📞 {b.phone}</span>}
                    <span>🏋️ {b.session_type}</span>
                    {b.preferred_time && <span>🕐 {b.preferred_time}</span>}
                    <span className="text-xs">
                      {new Date(b.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  {b.message && (
                    <p className="text-sm text-muted-foreground bg-secondary/50 rounded-lg px-4 py-3">{b.message}</p>
                  )}
                </div>

                {/* Status selector */}
                <select
                  value={b.status}
                  onChange={e => updateStatus(b.id, e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary capitalize"
                >
                  {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
