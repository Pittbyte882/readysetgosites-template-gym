"use client"

import Image from "next/image"
import { Instagram, Award, Dumbbell } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"

export function TrainersSection() {
  const { trainers } = siteConfig

  return (
    <section id="trainers" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            {trainers.eyebrow}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground mt-4">
            {trainers.headline}
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-pretty">
            {trainers.subheadline}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.members.map((trainer) => (
            <div
              key={trainer.name}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {trainer.image ? (
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-primary opacity-40">
                      {trainer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Specialty badge */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                    <Dumbbell className="h-3 w-3" />
                    {trainer.specialty}
                  </div>
                </div>

                {/* Instagram */}
                <a href={trainer.instagram}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>

              <div className="p-6">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground">
                  {trainer.name}
                </h3>
                <p className="text-primary text-sm font-medium mt-1">{trainer.role}</p>
                <p className="text-muted-foreground text-sm mt-2">{trainer.experience} experience</p>
                <div className="mt-4 space-y-2">
                  {trainer.achievements.map((achievement) => (
                    <div key={achievement} className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">{trainers.ctaText}</p>
          <a href={trainers.ctaHref} className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            {trainers.ctaLabel}
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}