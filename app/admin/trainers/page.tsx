'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

interface Trainer {
  id: string
  name: string
  role: string
  image: string | null
  specialty: string
  experience: string
  instagram: string
  achievements: string[]
  sort_order: number
}

const EMPTY = { name: '', role: '', image: '', specialty: '', experience: '', instagram: '', achievements: [''], sort_order: 0 }

export default function AdminTrainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Trainer | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const res = await fetch('/api/trainers')
    setTrainers(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openNew = () => { setForm(EMPTY); setEditing(null); setShowForm(true) }
  const openEdit = (t: Trainer) => {
    setForm({ name: t.name, role: t.role, image: t.image ?? '', specialty: t.specialty, experience: t.experience, instagram: t.instagram ?? '', achievements: t.achievements, sort_order: t.sort_order })
    setEditing(t)
    setShowForm(true)
  }

  const setAchievement = (i: number, val: string) => {
    const updated = [...form.achievements]
    updated[i] = val
    setForm(f => ({ ...f, achievements: updated }))
  }

  const addAchievement = () => setForm(f => ({ ...f, achievements: [...f.achievements, ''] }))
  const removeAchievement = (i: number) => setForm(f => ({ ...f, achievements: f.achievements.filter((_, idx) => idx !== i) }))

  const handleSave = async () => {
    setSaving(true)
    const payload = { ...form, achievements: form.achievements.filter(a => a.trim()), image: form.image || null }
    const method = editing ? 'PATCH' : 'POST'
    const url = editing ? `/api/trainers/${editing.id}` : '/api/trainers'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    await load()
    setShowForm(false)
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this trainer?')) return
    await fetch(`/api/trainers/${id}`, { method: 'DELETE' })
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">Trainers</h1>
          <p className="text-muted-foreground mt-1">Manage your coaching team</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" /> Add Trainer
        </button>
      </div>

      {loading ? <div className="text-muted-foreground">Loading...</div> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainers.map(t => (
            <div key={t.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground">{t.name}</h3>
                  <p className="text-primary text-sm font-medium">{t.role}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>🏋️ {t.specialty} · {t.experience}</p>
                <p>📋 {t.achievements.length} achievements</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground">
                {editing ? 'Edit Trainer' : 'New Trainer'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              {[
                { label: 'Full Name', key: 'name', placeholder: 'e.g. Marcus Stone' },
                { label: 'Role / Title', key: 'role', placeholder: 'e.g. Head Powerlifting Coach' },
                { label: 'Specialty', key: 'specialty', placeholder: 'e.g. Powerlifting' },
                { label: 'Experience', key: 'experience', placeholder: 'e.g. 15+ years' },
                { label: 'Instagram URL', key: 'instagram', placeholder: 'https://instagram.com/...' },
                { label: 'Photo URL', key: 'image', placeholder: '/images/trainer-1.jpg or https://...' },
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
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Achievements</label>
                  <button onClick={addAchievement} className="text-xs text-primary hover:underline">+ Add</button>
                </div>
                <div className="space-y-2">
                  {form.achievements.map((a, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={a}
                        onChange={e => setAchievement(i, e.target.value)}
                        placeholder="e.g. USAPL National Champion"
                        className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                      <button onClick={() => removeAchievement(i)} className="text-muted-foreground hover:text-red-500 transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-border">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-semibold text-muted-foreground hover:text-foreground">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save Trainer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}