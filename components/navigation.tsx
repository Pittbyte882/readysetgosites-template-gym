"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ThemeSwitcher } from "./theme-switcher"
import { Button } from "@/components/ui/button"
import { Menu, X, Dumbbell } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/siteConfig"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {siteConfig.logo.image ? (
              <Image
                src={siteConfig.logo.image}
                alt={siteConfig.logo.altText}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="object-contain"
              />
            ) : (
              <>
                <Dumbbell className="h-8 w-8 text-primary" />
                <span className="font-[family-name:var(--font-display)] text-xl lg:text-2xl font-bold tracking-tight text-foreground">
                  {siteConfig.name}
                </span>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Button className="hidden lg:inline-flex font-semibold">
              Join Now
            </Button>
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        <div className="px-4 py-6 space-y-4">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-lg font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button className="w-full mt-4 font-semibold">Join Now</Button>
        </div>
      </div>
    </nav>
  )
}