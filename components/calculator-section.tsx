"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Calculator, Scale, Flame, Target } from "lucide-react"

type CalculatorType = "bmi" | "calories"
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive"
type Goal = "lose" | "maintain" | "gain"

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
}

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little or no exercise)",
  light: "Light (1-3 days/week)",
  moderate: "Moderate (3-5 days/week)",
  active: "Active (6-7 days/week)",
  veryActive: "Very Active (2x per day)",
}

export function CalculatorSection() {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>("bmi")
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial")
  
  // BMI inputs
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")
  
  // Calorie inputs
  const [age, setAge] = useState("")
  const [gender, setGender] = useState<"male" | "female">("male")
  const [activity, setActivity] = useState<ActivityLevel>("moderate")
  const [goal, setGoal] = useState<Goal>("maintain")
  
  // Results
  const [bmiResult, setBmiResult] = useState<number | null>(null)
  const [calorieResult, setCalorieResult] = useState<number | null>(null)
  const [macros, setMacros] = useState<{ protein: number; carbs: number; fats: number } | null>(null)

  const calculateBMI = () => {
    let weightKg: number
    let heightM: number

    if (unit === "imperial") {
      weightKg = parseFloat(weight) * 0.453592
      const totalInches = parseFloat(heightFeet) * 12 + parseFloat(heightInches)
      heightM = totalInches * 0.0254
    } else {
      weightKg = parseFloat(weight)
      heightM = parseFloat(height) / 100
    }

    if (weightKg > 0 && heightM > 0) {
      const bmi = weightKg / (heightM * heightM)
      setBmiResult(Math.round(bmi * 10) / 10)
    }
  }

  const calculateCalories = () => {
    let weightKg: number
    let heightCm: number

    if (unit === "imperial") {
      weightKg = parseFloat(weight) * 0.453592
      const totalInches = parseFloat(heightFeet) * 12 + parseFloat(heightInches)
      heightCm = totalInches * 2.54
    } else {
      weightKg = parseFloat(weight)
      heightCm = parseFloat(height)
    }

    const ageNum = parseFloat(age)

    if (weightKg > 0 && heightCm > 0 && ageNum > 0) {
      // Mifflin-St Jeor Equation
      let bmr: number
      if (gender === "male") {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5
      } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161
      }

      let tdee = bmr * activityMultipliers[activity]

      // Adjust for goal
      if (goal === "lose") {
        tdee -= 500
      } else if (goal === "gain") {
        tdee += 500
      }

      const calories = Math.round(tdee)
      setCalorieResult(calories)

      // Calculate macros (for powerlifting focus: high protein)
      const protein = Math.round(weightKg * 2.2) // 1g per lb bodyweight
      const fats = Math.round((calories * 0.25) / 9)
      const carbs = Math.round((calories - protein * 4 - fats * 9) / 4)
      setMacros({ protein, carbs, fats })
    }
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400" }
    if (bmi < 25) return { label: "Normal", color: "text-green-400" }
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-400" }
    return { label: "Obese", color: "text-red-400" }
  }

  return (
    <section id="calculator" className="py-24 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Fitness Tools
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold text-foreground mt-4">
            BMI & CALORIE CALCULATOR
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-pretty">
            Get personalized insights to fuel your training. Calculate your BMI and 
            daily calorie needs with macro recommendations for powerlifting.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-card rounded-2xl border border-border p-8">
          {/* Calculator Type Toggle */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setCalculatorType("bmi")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all",
                calculatorType === "bmi"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              )}
            >
              <Scale className="h-5 w-5" />
              BMI Calculator
            </button>
            <button
              onClick={() => setCalculatorType("calories")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all",
                calculatorType === "calories"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              )}
            >
              <Flame className="h-5 w-5" />
              Calorie Calculator
            </button>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={cn("text-sm font-medium", unit === "imperial" ? "text-foreground" : "text-muted-foreground")}>
              Imperial (lbs/ft)
            </span>
            <button
              onClick={() => setUnit(unit === "imperial" ? "metric" : "imperial")}
              className={cn(
                "relative w-14 h-7 rounded-full transition-colors",
                unit === "metric" ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 w-5 h-5 rounded-full bg-foreground transition-transform",
                  unit === "metric" ? "translate-x-8" : "translate-x-1"
                )}
              />
            </button>
            <span className={cn("text-sm font-medium", unit === "metric" ? "text-foreground" : "text-muted-foreground")}>
              Metric (kg/cm)
            </span>
          </div>

          {/* Inputs */}
          <div className="grid gap-6">
            {/* Weight */}
            <div>
              <Label htmlFor="weight" className="text-foreground">
                Weight ({unit === "imperial" ? "lbs" : "kg"})
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === "imperial" ? "185" : "84"}
                className="mt-2"
              />
            </div>

            {/* Height */}
            {unit === "imperial" ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="heightFeet" className="text-foreground">Height (feet)</Label>
                  <Input
                    id="heightFeet"
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    placeholder="5"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="heightInches" className="text-foreground">Height (inches)</Label>
                  <Input
                    id="heightInches"
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    placeholder="10"
                    className="mt-2"
                  />
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="height" className="text-foreground">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="178"
                  className="mt-2"
                />
              </div>
            )}

            {/* Calorie-specific inputs */}
            {calculatorType === "calories" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-foreground">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="30"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground">Gender</Label>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => setGender("male")}
                        className={cn(
                          "flex-1 py-2 rounded-lg font-medium transition-all",
                          gender === "male"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        Male
                      </button>
                      <button
                        onClick={() => setGender("female")}
                        className={cn(
                          "flex-1 py-2 rounded-lg font-medium transition-all",
                          gender === "female"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        Female
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-foreground">Activity Level</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {(Object.keys(activityLabels) as ActivityLevel[]).map((level) => (
                      <button
                        key={level}
                        onClick={() => setActivity(level)}
                        className={cn(
                          "py-2 px-4 rounded-lg text-sm font-medium text-left transition-all",
                          activity === level
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-muted"
                        )}
                      >
                        {activityLabels[level]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-foreground">Goal</Label>
                  <div className="flex gap-2 mt-2">
                    {[
                      { id: "lose", label: "Lose Weight" },
                      { id: "maintain", label: "Maintain" },
                      { id: "gain", label: "Build Muscle" },
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setGoal(g.id as Goal)}
                        className={cn(
                          "flex-1 py-2 rounded-lg font-medium transition-all",
                          goal === g.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Calculate Button */}
            <Button
              size="lg"
              className="w-full font-semibold"
              onClick={calculatorType === "bmi" ? calculateBMI : calculateCalories}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate
            </Button>
          </div>

          {/* Results */}
          {calculatorType === "bmi" && bmiResult !== null && (
            <div className="mt-8 p-6 bg-secondary/50 rounded-xl text-center">
              <div className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
                Your BMI
              </div>
              <div className="font-[family-name:var(--font-display)] text-6xl font-bold text-foreground">
                {bmiResult}
              </div>
              <div className={cn("text-lg font-semibold mt-2", getBMICategory(bmiResult).color)}>
                {getBMICategory(bmiResult).label}
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                Note: BMI does not account for muscle mass. Powerlifters often have higher BMI due to muscle.
              </p>
            </div>
          )}

          {calculatorType === "calories" && calorieResult !== null && macros && (
            <div className="mt-8 p-6 bg-secondary/50 rounded-xl">
              <div className="text-center mb-6">
                <div className="text-muted-foreground text-sm uppercase tracking-wider mb-2">
                  Daily Calorie Target
                </div>
                <div className="font-[family-name:var(--font-display)] text-6xl font-bold text-foreground">
                  {calorieResult.toLocaleString()}
                </div>
                <div className="text-primary font-semibold">calories/day</div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-card rounded-lg">
                  <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                    {macros.protein}g
                  </div>
                  <div className="text-muted-foreground text-sm">Protein</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <Flame className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                    {macros.carbs}g
                  </div>
                  <div className="text-muted-foreground text-sm">Carbs</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <Scale className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                    {macros.fats}g
                  </div>
                  <div className="text-muted-foreground text-sm">Fats</div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm text-center mt-4">
                Macros optimized for strength training with high protein intake.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
