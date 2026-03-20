"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin, Dumbbell } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"

const SOCIAL_ICONS = {
  instagram: Instagram,
  youtube:   Youtube,
  facebook:  Facebook,
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              {siteConfig.logo.image ? (
                <Image src={siteConfig.logo.image} alt={siteConfig.logo.altText} width={siteConfig.logo.width} height={siteConfig.logo.height} className="object-contain" />
              ) : (
                <>
                  <Dumbbell className="h-8 w-8 text-primary" />
                  <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                    {siteConfig.name.toUpperCase()}
                  </span>
                </>
              )}
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">{siteConfig.description}</p>

            {/* Contact */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>{siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>{siteConfig.email}</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              {(Object.entries(siteConfig.social) as [keyof typeof SOCIAL_ICONS, string][]).map(([platform, url]) => {
                const Icon = SOCIAL_ICONS[platform]
                return (
                  <a key={platform} href={url}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-4">Programs</h4>
            <ul className="space-y-3">
              {siteConfig.footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {siteConfig.footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {siteConfig.footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  )
}