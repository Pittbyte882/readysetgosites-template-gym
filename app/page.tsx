import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ScheduleSection } from "@/components/schedule-section"
import { PricingSection } from "@/components/pricing-section"
import { CalculatorSection } from "@/components/calculator-section"
import { BookingSection } from "@/components/booking-section"
import { TrainersSection } from "@/components/trainers-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ScheduleSection />
        <PricingSection />
        <TrainersSection />
        <CalculatorSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  )
}
