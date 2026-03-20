"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { siteConfig } from "@/lib/siteConfig"

type Theme = string

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: { id: string; name: string; colors: string[] }[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(siteConfig.theme.default)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("iron-grit-theme")
    const isValid = siteConfig.theme.available.some(t => t.id === stored)
    if (stored && isValid) {
      setThemeState(stored)
    } else {
      // Fall back to whatever default is set in siteConfig
      setThemeState(siteConfig.theme.default)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("iron-grit-theme", theme)
    }
  }, [theme, mounted])

  const setTheme = (newTheme: Theme) => {
    const isValid = siteConfig.theme.available.some(t => t.id === newTheme)
    if (isValid) setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: siteConfig.theme.available }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}