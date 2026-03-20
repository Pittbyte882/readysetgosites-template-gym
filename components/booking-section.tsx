"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Calendar, Clock, User, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"

const availableClasses = [
  { id: 1, name: "Power Hour", times: ["6:00 AM", "12:00 PM", "5:00 PM", "7:00 PM"] },
  { id: 2, name: "Deadlift Domination", times: ["7:00 AM", "6:00 PM"] },
  { id: 3, name: "Squat Squad", times: ["6:00 AM", "5:00 PM", "7:00 PM"] },
  { id: 4, name: "Bench Press Bootcamp", times: ["6:00 AM", "12:00 PM", "5:00 PM"] },
  { id: 5, name: "Olympic Lifting", times: ["10:00 AM", "2:00 PM"] },
  { id: 6, name: "Personal Training", times: ["7:00 AM", "9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"] },
]

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

export function BookingSection() {
  const [step, setStep] = useState(1)
  const [selectedClass, setSelectedClass] = useState<typeof availableClasses[0] | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [isBooked, setIsBooked] = useState(false)
  
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < todayStart
  }

  const handleBook = () => {
    setIsBooked(true)
  }

  const resetBooking = () => {
    setStep(1)
    setSelectedClass(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setFormData({ name: "", email: "", phone: "" })
    setIsBooked(false)
  }

  if (isBooked) {
    return (
      <section id="booking" className="py-24 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-4">
              BOOKING CONFIRMED!
            </h3>
            <p className="text-muted-foreground mb-6">
              You are booked for <span className="text-primary font-semibold">{selectedClass?.name}</span> on{" "}
              <span className="text-foreground font-semibold">
                {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </span>{" "}
              at <span className="text-foreground font-semibold">{selectedTime}</span>.
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              A confirmation email has been sent to {formData.email}. See you at the gym!
            </p>
            <Button onClick={resetBooking} variant="outline">
              Book Another Class
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Reserve Your Spot
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground mt-4">
            BOOK A CLASS
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-pretty">
            Secure your spot in any of our classes. Limited spaces available to ensure 
            quality coaching and equipment access.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={cn(
                    "w-16 h-1 mx-2 transition-all",
                    step > s ? "bg-primary" : "bg-secondary"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Booking Card */}
        <div className="bg-card rounded-2xl border border-border p-8">
          {/* Step 1: Select Class */}
          {step === 1 && (
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-6">
                Select a Class
              </h3>
              <div className="grid gap-3">
                {availableClasses.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => {
                      setSelectedClass(cls)
                      setStep(2)
                    }}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                      selectedClass?.id === cls.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 bg-secondary/50"
                    )}
                  >
                    <span className="font-semibold text-foreground">{cls.name}</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date */}
          {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setStep(1)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                  Select a Date
                </h3>
                <div className="w-5" />
              </div>

              {/* Calendar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={handlePrevMonth} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <ChevronLeft className="h-5 w-5 text-foreground" />
                  </button>
                  <span className="font-semibold text-foreground">
                    {monthNames[currentMonth]} {currentYear}
                  </span>
                  <button onClick={handleNextMonth} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <ChevronRight className="h-5 w-5 text-foreground" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const isDisabled = isDateDisabled(day)
                    const isSelected = selectedDate?.getDate() === day && 
                                       selectedDate?.getMonth() === currentMonth && 
                                       selectedDate?.getFullYear() === currentYear
                    return (
                      <button
                        key={day}
                        onClick={() => {
                          if (!isDisabled) {
                            setSelectedDate(new Date(currentYear, currentMonth, day))
                            setStep(3)
                          }
                        }}
                        disabled={isDisabled}
                        className={cn(
                          "aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                          isDisabled
                            ? "text-muted-foreground/50 cursor-not-allowed"
                            : isSelected
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary text-foreground"
                        )}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Select Time */}
          {step === 3 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setStep(2)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                  Select a Time
                </h3>
                <div className="w-5" />
              </div>

              <div className="text-center mb-6 text-muted-foreground">
                <Calendar className="h-5 w-5 inline-block mr-2" />
                {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedClass?.times.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setSelectedTime(time)
                      setStep(4)
                    }}
                    className={cn(
                      "flex items-center justify-center gap-2 p-4 rounded-xl border transition-all",
                      selectedTime === time
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 bg-secondary/50"
                    )}
                  >
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-foreground">{time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Personal Details */}
          {step === 4 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => setStep(3)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                  Your Details
                </h3>
                <div className="w-5" />
              </div>

              {/* Summary */}
              <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Class</div>
                    <div className="font-semibold text-foreground">{selectedClass?.name}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Date</div>
                    <div className="font-semibold text-foreground">
                      {selectedDate?.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Time</div>
                    <div className="font-semibold text-foreground">{selectedTime}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    className="mt-2"
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full font-semibold mt-6"
                  onClick={handleBook}
                  disabled={!formData.name || !formData.email || !formData.phone}
                >
                  <User className="mr-2 h-5 w-5" />
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
