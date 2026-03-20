'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Dumbbell, CalendarDays, Users, BookOpen, LogOut, Menu, X } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

const NAV = [
  { href: '/admin',          label: 'Dashboard',  icon: Dumbbell },
  { href: '/admin/classes',  label: 'Classes',    icon: CalendarDays },
  { href: '/admin/trainers', label: 'Trainers',   icon: Users },
  { href: '/admin/bookings', label: 'Bookings',   icon: BookOpen },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  if (pathname === '/admin/login') return <>{children}</>

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-primary" />
            <span className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground">
              {siteConfig.name.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(item => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-primary" />
            <span className="font-[family-name:var(--font-display)] font-bold text-foreground">{siteConfig.name.toUpperCase()}</span>
          </div>
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}