"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Clock, Users, Flame } from "lucide-react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const classes = [
  {
    name: "Power Hour",
    description: "Compound lifts focusing on strength gains",
    intensity: "High",
    duration: "60 min",
    capacity: 12,
    schedule: {
      Monday: ["6:00 AM", "5:00 PM"],
      Wednesday: ["6:00 AM", "5:00 PM"],
      Friday: ["6:00 AM", "5:00 PM"],
    },
  },
  {
    name: "Deadlift Domination",
    description: "Master the king of all lifts",
    intensity: "Extreme",
    duration: "75 min",
    capacity: 8,
    schedule: {
      Tuesday: ["7:00 PM"],
      Thursday: ["7:00 PM"],
      Saturday: ["10:00 AM"],
    },
  },
  {
    name: "Squat Squad",
    description: "Build lower body power and technique",
    intensity: "High",
    duration: "60 min",
    capacity: 10,
    schedule: {
      Monday: ["7:00 PM"],
      Wednesday: ["7:00 PM"],
      Saturday: ["8:00 AM"],
    },
  },
  {
    name: "Bench Press Bootcamp",
    description: "Push your upper body limits",
    intensity: "High",
    duration: "60 min",
    capacity: 10,
    schedule: {
      Tuesday: ["6:00 AM", "5:00 PM"],
      Thursday: ["6:00 AM", "5:00 PM"],
    },
  },
  {
    name: "Olympic Lifting",
    description: "Clean, jerk, and snatch fundamentals",
    intensity: "Extreme",
    duration: "90 min",
    capacity: 6,
    schedule: {
      Saturday: ["12:00 PM"],
      Sunday: ["10:00 AM"],
    },
  },
  {
    name: "Recovery & Mobility",
    description: "Essential stretching and recovery work",
    intensity: "Low",
    duration: "45 min",
    capacity: 20,
    schedule: {
      Sunday: ["8:00 AM", "4:00 PM"],
      Wednesday: ["8:00 PM"],
    },
  },
]

export function ScheduleSection() {
  const [selectedDay, setSelectedDay] = useState("Monday")

  const getClassesForDay = (day: string) => {
    return classes
      .filter((cls) => cls.schedule[day as keyof typeof cls.schedule])
      .flatMap((cls) => {
        const times = cls.schedule[day as keyof typeof cls.schedule]
        return times.map((time) => ({ ...cls, time }))
      })
      .sort((a, b) => {
        const timeA = new Date(`1970/01/01 ${a.time}`).getTime()
        const timeB = new Date(`1970/01/01 ${b.time}`).getTime()
        return timeA - timeB
      })
  }

  const dayClasses = getClassesForDay(selectedDay)

  return (
    <section id="classes" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Weekly Schedule
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground mt-4">
            CLASS TIMETABLE
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-pretty">
            Find your perfect class. From heavy lifts to recovery sessions, 
            we have everything you need to build serious strength.
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-hide">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "px-6 py-3 rounded-lg font-medium text-sm uppercase tracking-wider whitespace-nowrap transition-all",
                selectedDay === day
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <div className="grid gap-4">
          {dayClasses.length > 0 ? (
            dayClasses.map((cls, index) => (
              <div
                key={`${cls.name}-${cls.time}-${index}`}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                        {cls.name}
                      </span>
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold uppercase",
                          cls.intensity === "Extreme"
                            ? "bg-destructive/20 text-destructive"
                            : cls.intensity === "High"
                            ? "bg-primary/20 text-primary"
                            : "bg-accent/50 text-accent-foreground"
                        )}
                      >
                        {cls.intensity}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{cls.description}</p>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-foreground">{cls.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="h-4 w-4 text-primary" />
                      <span>{cls.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{cls.capacity} spots</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No classes scheduled for this day. Use this day for active recovery!
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
