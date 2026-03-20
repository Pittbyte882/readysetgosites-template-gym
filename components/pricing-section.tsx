"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Zap } from "lucide-react"
import { siteConfig } from "@/lib/siteConfig"

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const { membership } = siteConfig

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            {membership.eyebrow}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground mt-4">
            {membership.headline}
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-pretty">
            {membership.subheadline}
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={cn("text-sm font-medium", !isYearly ? "text-foreground" : "text-muted-foreground")}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={cn("relative w-14 h-7 rounded-full transition-colors", isYearly ? "bg-primary" : "bg-muted")}
            >
              <span className={cn("absolute top-1 w-5 h-5 rounded-full bg-foreground transition-transform", isYearly ? "translate-x-8" : "translate-x-1")} />
            </button>
            <span className={cn("text-sm font-medium", isYearly ? "text-foreground" : "text-muted-foreground")}>
              Yearly <span className="ml-2 text-primary">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {membership.plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-2xl border p-8 transition-all",
                plan.popular
                  ? "border-primary bg-card scale-105 shadow-2xl shadow-primary/10"
                  : "border-border bg-card/50 hover:border-primary/50"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    <Zap className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
                <div className="mt-6">
                  <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-foreground">
                    ${isYearly ? Math.round(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                {isYearly && (
                  <p className="text-sm text-primary mt-2">${plan.yearlyPrice} billed annually</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 opacity-50">
                    <Check className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-muted-foreground line-through">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn("w-full font-semibold", !plan.popular ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "")}
                variant={plan.popular ? "default" : "secondary"}
              >
                {plan.ctaLabel}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">{membership.trialText}</p>
        </div>
      </div>
    </section>
  )
}