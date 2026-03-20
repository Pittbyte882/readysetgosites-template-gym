import { supabaseAdmin } from '@/lib/supabase'
import { CalendarDays, Users, BookOpen, TrendingUp } from 'lucide-react'

export default async function AdminDashboard() {
  const [{ count: classCount }, { count: trainerCount }, { count: bookingCount }, { count: newBookings }] =
    await Promise.all([
      supabaseAdmin.from('classes').select('*', { count: 'exact', head: true }).eq('active', true),
      supabaseAdmin.from('trainers').select('*', { count: 'exact', head: true }).eq('active', true),
      supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    ])

  const stats = [
    { label: 'Active Classes',   value: classCount ?? 0,   icon: CalendarDays, color: 'text-blue-400' },
    { label: 'Active Trainers',  value: trainerCount ?? 0, icon: Users,        color: 'text-green-400' },
    { label: 'Total Bookings',   value: bookingCount ?? 0, icon: BookOpen,     color: 'text-yellow-400' },
    { label: 'New This Week',    value: newBookings ?? 0,  icon: TrendingUp,   color: 'text-primary' },
  ]

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome back. Here's what's happening.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className={`font-[family-name:var(--font-display)] text-4xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}