'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

interface GymClass {
  id: string
  name: string
  instructor: string
  time: string
  duration: string
  level: string
  days: string[]
  spots: number
  spots_left: number
  active: boolean
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels']
const EMPTY: Omit<GymClass, 'id' | 'active'> = {
  name: '', instructor: '', time: '', duration: '',
  level: 'All Levels', days: [], spots: 10, spots_left: 10,
}

export default function AdminClasses() {
  const [classes, setClasses] = useState<GymClass[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<GymClass | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const res = await fetch('/api/classes')
    const data = await res.json()
    setClasses(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew = () => { setForm(EMPTY); setEditing(null); setShowForm(true) }
  const openEdit = (c: GymClass) => { setForm({ name: c.name, instructor: c.instructor, time: c.time, duration: c.duration, level: c.level, days: c.days, spots: c.spots, spots_left: c.spots_left }); setEditing(c); setShowForm(true) }

  const toggleDay = (day: string) => {
    setForm(f => ({ ...f, days: f.days.includes(day) ? f.days.filter(d => d !== day) : [...f.days, day] }))
  }

  const handleSave = async () => {
    setSaving(true)
    const method = editing ? 'PATCH' : 'POST'
    const url = editing ? `/api/classes/${editing.id}` : '/api/classes'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    await load()
    setShowForm(false)
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this class?')) return
    await fetch(`/api/classes/${id}`, { method: 'DELETE' })
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">Classes</h1>
          <p className="text-muted-foreground mt-1">Manage your class schedule</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Add Class
        </button>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {classes.map(c => (
            <div key={c.id} className="bg-card border border-border rounded-2xl p-6 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground">{c.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{c.level}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>👤 {c.instructor}</span>
                  <span>🕐 {c.time} · {c.duration}</span>
                  <span>👥 {c.spots_left}/{c.spots} spots</span>
                </div>
                <div className="flex gap-1.5 mt-3">
                  {DAYS.map(d => (
                    <span key={d} className={`text-xs px-2 py-0.5 rounded ${c.days.includes(d) ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{d}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(c)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground">
                {editing ? 'Edit Class' : 'New Class'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {[
                { label: 'Class Name', key: 'name', placeholder: 'e.g. Powerlifting Fundamentals' },
                { label: 'Instructor', key: 'instructor', placeholder: 'e.g. Marcus Stone' },
                { label: 'Time', key: 'time', placeholder: 'e.g. 6:00 AM' },
                { label: 'Duration', key: 'duration', placeholder: 'e.g. 90 min' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">{f.label}</label>
                  <input
                    type="text"
                    value={(form as any)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">Level</label>
                <select
                  value={form.level}
                  onChange={e => setForm(f => ({ ...f, level: e.target.value }))}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                >
                  {LEVELS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'Total Spots', key: 'spots' }, { label: 'Spots Left', key: 'spots_left' }].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">{f.label}</label>
                    <input
                      type="number"
                      value={(form as any)[f.key]}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: parseInt(e.target.value) }))}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Days</label>
                <div className="flex gap-2 flex-wrap">
                  {DAYS.map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDay(d)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${form.days.includes(d) ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-border">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save Class'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}