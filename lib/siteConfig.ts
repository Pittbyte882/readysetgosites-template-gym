// ─────────────────────────────────────────────────────────────
//  IRON & GRIT — SITE CONFIG
//  Edit this file to fully customize the site for any client.
//  Every section, photo, copy, and data point lives here.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {

  // ── Brand ──────────────────────────────────────────────────
  name:        "Iron & Grit",
  tagline:     "Built for lifters, by lifters.",
  description: "No excuses. No shortcuts. Just raw power. The premier powerlifting gym for serious athletes.",

  // ── Logo ───────────────────────────────────────────────────
  // Set logoImage to a path in /public to use an image logo.
  // If null, renders the Dumbbell icon + text name.
  logo: {
    image:   null as string | null,  // e.g. "/logo.png"
    width:   160,
    height:  48,
    altText: "Iron & Grit Logo",
  },

  // ── Contact ────────────────────────────────────────────────
  phone:   "(555) 123-IRON",
  email:   "info@ironandgrit.com",
  address: "123 Iron Street, Strength City, SC 12345",

  // ── Social ─────────────────────────────────────────────────
  social: {
    instagram: "#",
    youtube:   "#",
    facebook:  "#",
  },

  // ── Email (set in .env.local) ───────────────────────────────
  notifyEmail: process.env.NOTIFY_EMAIL!,
  fromEmail:   process.env.FROM_EMAIL!,

  // ── SEO ────────────────────────────────────────────────────
  seo: {
    title:       "Iron & Grit | Hardcore Powerlifting Gym",
    description: "No excuses. No shortcuts. Just raw power. Join Iron & Grit - the premier powerlifting gym for serious athletes.",
    keywords:    ["powerlifting", "gym", "fitness", "strength training", "personal training"],
    url:         "https://ironandgrit.com",
    ogImage:     "/og-image.jpg",
  },
// ── Theme ──────────────────────────────────────────────────
  // Set defaultTheme to any theme id below.
  // Add, remove, or reorder themes to control what clients can choose from.
  theme: {
    default: "dark-powerful" as string,
    available: [
      {
        id:     "dark-powerful",
        name:   "Dark & Powerful",
        colors: ["#0a0a0a", "#dc2626", "#ffffff"],
      },
      {
        id:     "bold-energetic",
        name:   "Bold & Energetic",
        colors: ["#171717", "#f97316", "#000000"],
      },
      {
        id:     "clean-modern",
        name:   "Clean & Modern",
        colors: ["#fafafa", "#1e3a5f", "#22c55e"],
      },
      {
        id:     "premium-sleek",
        name:   "Premium & Sleek",
        colors: ["#2d2d2d", "#d4af37", "#ffffff"],
      },
      {
        id:     "iron-steel",
        name:   "Iron & Steel",
        colors: ["#262630", "#a0a0b0", "#ffffff"],
      },
      {
        id:     "beast-mode",
        name:   "Beast Mode",
        colors: ["#1a1a2e", "#6366f1", "#ffffff"],
      },
    ],
  },
  // ── Navigation Links ───────────────────────────────────────
  navLinks: [
    { href: "#classes",    label: "Classes" },
    { href: "#pricing",    label: "Membership" },
    { href: "#trainers",   label: "Trainers" },
    { href: "#calculator", label: "Calculator" },
    { href: "#booking",    label: "Book Now" },
  ],

  // ── Hero Section ───────────────────────────────────────────
  hero: {
    // Path in /public. Uses dark gradient overlay automatically.
    backgroundImage: "/images/hero-gym.jpg",
    badge:           "Hardcore Powerlifting",
    headlineLines: [
      { text: "NO EXCUSES.",    highlight: false },
      { text: "NO SHORTCUTS.",  highlight: true  },
      { text: "JUST RAW POWER.", highlight: false },
    ],
    subheadline: "Where serious athletes come to break limits. State-of-the-art equipment, elite coaching, and a community that pushes you beyond what you thought possible.",
    primaryCTA: {
      label: "Start Your Journey",
      href:  "#booking",
    },
    secondaryCTA: {
      label: "Take a Tour",
      href:  "#classes",
    },
    stats: [
      { value: "500+", label: "Active Members" },
      { value: "15+",  label: "Expert Trainers" },
      { value: "24/7", label: "Access" },
      { value: "50K",  label: "Lbs Lifted Daily" },
    ],
  },

  // ── Schedule / Classes ─────────────────────────────────────
  // Add your class schedule here. Days and times are fully customizable.
  classes: [
    {
      name:        "Powerlifting Fundamentals",
      instructor:  "Marcus Stone",
      time:        "6:00 AM",
      duration:    "90 min",
      level:       "Beginner",
      days:        ["Mon", "Wed", "Fri"],
      spots:       12,
      spotsLeft:   4,
    },
    {
      name:        "Olympic Lifting",
      instructor:  "Sarah Chen",
      time:        "9:00 AM",
      duration:    "75 min",
      level:       "Intermediate",
      days:        ["Tue", "Thu"],
      spots:       10,
      spotsLeft:   2,
    },
    {
      name:        "Strength & Conditioning",
      instructor:  "Viktor Kozlov",
      time:        "12:00 PM",
      duration:    "60 min",
      level:       "All Levels",
      days:        ["Mon", "Tue", "Wed", "Thu", "Fri"],
      spots:       15,
      spotsLeft:   8,
    },
    {
      name:        "Competition Prep",
      instructor:  "Viktor Kozlov",
      time:        "5:00 PM",
      duration:    "120 min",
      level:       "Advanced",
      days:        ["Tue", "Thu", "Sat"],
      spots:       8,
      spotsLeft:   1,
    },
    {
      name:        "Bench Press Clinic",
      instructor:  "Jessica Martinez",
      time:        "7:00 AM",
      duration:    "60 min",
      level:       "Intermediate",
      days:        ["Sat"],
      spots:       10,
      spotsLeft:   5,
    },
    {
      name:        "Open Gym & Coaching",
      instructor:  "All Coaches",
      time:        "4:00 PM",
      duration:    "180 min",
      level:       "All Levels",
      days:        ["Mon", "Wed", "Fri", "Sun"],
      spots:       30,
      spotsLeft:   12,
    },
  ],

  // ── Membership Plans ───────────────────────────────────────
  membership: {
    eyebrow:     "Membership Plans",
    headline:    "INVEST IN YOUR STRENGTH",
    subheadline: "Choose the plan that matches your commitment level. All plans include access to our world-class facility and equipment.",
    trialText:   "All plans include a 7-day free trial. No commitment, cancel anytime.",
    plans: [
      {
        id:           "starter",
        name:         "Starter",
        description:  "Perfect for beginners ready to commit",
        monthlyPrice: 49,
        yearlyPrice:  470,
        popular:      false,
        ctaLabel:     "Choose Plan",
        features: [
          "Full gym access",
          "Basic equipment usage",
          "Locker room access",
          "2 group classes per week",
          "Online booking",
        ],
        notIncluded: [
          "Personal training",
          "Nutrition guidance",
          "24/7 access",
        ],
      },
      {
        id:           "warrior",
        name:         "Warrior",
        description:  "For dedicated lifters pushing limits",
        monthlyPrice: 89,
        yearlyPrice:  850,
        popular:      true,
        ctaLabel:     "Get Started",
        features: [
          "Full gym access",
          "All equipment access",
          "Locker room + towel service",
          "Unlimited group classes",
          "Online booking priority",
          "24/7 access",
          "1 PT session per month",
          "Basic nutrition guidance",
        ],
        notIncluded: [
          "Unlimited PT sessions",
        ],
      },
      {
        id:           "elite",
        name:         "Elite",
        description:  "Maximum results, no compromises",
        monthlyPrice: 199,
        yearlyPrice:  1900,
        popular:      false,
        ctaLabel:     "Choose Plan",
        features: [
          "Full gym access",
          "Premium equipment priority",
          "Private locker + laundry",
          "Unlimited group classes",
          "VIP booking",
          "24/7 access",
          "4 PT sessions per month",
          "Custom nutrition plan",
          "Competition prep support",
          "Recovery room access",
        ],
        notIncluded: [],
      },
    ],
  },

  // ── Trainers ───────────────────────────────────────────────
  trainers: {
    eyebrow:     "Meet The Team",
    headline:    "ELITE COACHES",
    subheadline: "Learn from the best. Our coaches have competed at the highest levels and are dedicated to helping you reach your full potential.",
    ctaText:     "Interested in personal training? Book a free consultation with any of our coaches.",
    ctaLabel:    "Book a Session",
    ctaHref:     "#booking",
    members: [
      {
        name:         "Marcus Stone",
        role:         "Head Powerlifting Coach",
        image:        "/images/trainer-1.jpg",  // null = initials placeholder
        specialty:    "Powerlifting",
        experience:   "15+ years",
        instagram:    "#",
        achievements: [
          "USAPL National Champion",
          "500lb Squat Club",
          "Certified Strength Coach",
        ],
      },
      {
        name:         "Sarah Chen",
        role:         "Strength & Conditioning",
        image:        "/images/trainer-2.jpg",
        specialty:    "Olympic Lifting",
        experience:   "10+ years",
        instagram:    "#",
        achievements: [
          "CrossFit Games Athlete",
          "USAW Level 2 Coach",
          "Masters in Exercise Science",
        ],
      },
      {
        name:         "Viktor Kozlov",
        role:         "Competition Prep Specialist",
        image:        "/images/trainer-3.jpg",
        specialty:    "Deadlift",
        experience:   "20+ years",
        instagram:    "#",
        achievements: [
          "700lb Deadlift",
          "Former National Team",
          "IPF Certified Coach",
        ],
      },
      {
        name:         "Jessica Martinez",
        role:         "Nutrition & Performance",
        image:        "/images/trainer-4.jpg",
        specialty:    "Bench Press",
        experience:   "8+ years",
        instagram:    "#",
        achievements: [
          "Registered Dietitian",
          "WNBF Pro",
          "Precision Nutrition L2",
        ],
      },
    ],
  },

  // ── Booking Section ────────────────────────────────────────
  booking: {
    eyebrow:     "Book A Session",
    headline:    "READY TO START?",
    subheadline: "Schedule your first session or free consultation with one of our elite coaches.",
    formFields: {
      sessionTypes: [
        "Free Consultation",
        "Personal Training",
        "Competition Prep",
        "Nutrition Assessment",
        "Group Class",
      ],
      timeSlots: [
        "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM",
        "10:00 AM", "12:00 PM", "4:00 PM", "5:00 PM",
        "6:00 PM", "7:00 PM",
      ],
    },
    responseTime: "We confirm all bookings within 2 hours during business hours.",
  },

  // ── Footer Links ───────────────────────────────────────────
  footerLinks: {
    programs: [
      { label: "Powerlifting",     href: "#" },
      { label: "Olympic Lifting",  href: "#" },
      { label: "Strength Training",href: "#" },
      { label: "Personal Training",href: "#" },
      { label: "Competition Prep", href: "#" },
    ],
    company: [
      { label: "About Us",  href: "#" },
      { label: "Our Team",  href: "#trainers" },
      { label: "Careers",   href: "#" },
      { label: "Press",     href: "#" },
      { label: "Blog",      href: "#" },
    ],
    support: [
      { label: "Contact",        href: "#" },
      { label: "FAQs",           href: "#" },
      { label: "Membership",     href: "#pricing" },
      { label: "Schedule",       href: "#classes" },
      { label: "Privacy Policy", href: "#" },
    ],
  },

}