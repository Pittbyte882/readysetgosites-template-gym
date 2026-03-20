"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"

export function HeroSection() {
  const { hero } = siteConfig

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        {hero.backgroundImage ? (
          <Image
            src={hero.backgroundImage}
            alt={`${siteConfig.name} Gym Interior`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="space-y-8">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
            {hero.headlineLines.map((line, i) => (
              <span
                key={i}
                className={`block text-balance ${line.highlight ? "text-primary" : ""}`}
              >
                {line.text}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground text-pretty">
            {hero.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="text-lg px-8 h-14 font-semibold group" asChild>
              <a href={hero.primaryCTA.href}>
                {hero.primaryCTA.label}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 font-semibold" asChild>
              <a href={hero.secondaryCTA.href}>
                <Play className="mr-2 h-5 w-5" />
                {hero.secondaryCTA.label}
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-border/50 mt-16">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}