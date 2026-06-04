// Centralized Content Configuration for FitZone Gym

export const heroContent = {
  tagline: "FITZONE PREMIER CLUB",
  titleLine1: "Transform Your",
  titleLine2: "Body Into Strength",
  description: "Elite trainers, state-of-the-art strength equipment, and bespoke fitness plans tailored to your lifestyle. Train in a premium, modern facility built for results.",
  bgImage: "/images/hero_bg.jpg",
  ctaPrimary: { label: "Join Today", link: "#contact" },
  ctaSecondary: { label: "Explore Plans", link: "#pricing" },
  stats: [
    { value: "10000", suffix: "+", label: "Active Members" },
    { value: "50", suffix: "+", label: "Certified Coaches" },
    { value: "150", suffix: "+", label: "Premium Devices" },
    { value: "500", suffix: "+", label: "Calories/Hour" }
  ],
  liveTracker: {
    memberName: "Alex Rivera",
    memberRole: "Pro Member",
    memberAvatar: "/images/hero_avatar.jpg",
    initialHeartRate: 130, // bpm
    initialCalories: 320,  // kcal
    targetDuration: 60,    // min
    currentDuration: 42,   // min
    cardioDistance: "5.2 KM"
  }
};

export const aboutContent = {
  tagline: "About FitZone",
  titleLine1: "Elevate Your",
  titleLine2: "Athletic Potential",
  description: "At FitZone, we design high-end fitness spaces tailored to your focus. Established in NYC, our facilities combine raw industrial design with premium technology, expert coaching, and a driven community to push your training targets to the absolute peak.",
  features: [
    "State-of-the-art plate-loaded strength equipment",
    "Individualized nutrition & biometric profiling",
    "Internationally certified master coaches",
    "Inspiring, energetic community workspace",
    "Dynamic group conditioning & recovery classes",
    "Premium lockers, saunas & steam recovery rooms"
  ],
  stats: [
    { value: "12", suffix: "+", label: "Years Elite Service" },
    { value: "50", suffix: "+", label: "Master Trainers" },
    { value: "98", suffix: "%", label: "Goal Success Rate" }
  ],
  images: {
    primary: "/images/about_primary.jpg",
    secondary: "/images/about_secondary.jpg"
  }
};

export const programsContent = {
  tagline: "Our Disciplines",
  title: "Tailored Training Programs",
  list: [
    {
      title: "Strength & Hypertrophy",
      description: "Build structural power, bone density, and muscle volume through structured progressive overload and Olympic lifting.",
      category: "Strength"
    },
    {
      title: "Metabolic Conditioning",
      description: "Optimize fat oxidation, stamina, and cardiovascular thresholds with intense, science-backed metabolic circuits.",
      category: "Weight Loss"
    },
    {
      title: "Cardiovascular Endurance",
      description: "Boost your VO2 max, aerobic limits, and stamina using high-end assault runners, rowers, and spin cycles.",
      category: "Cardio"
    },
    {
      title: "Yoga & Core Stability",
      description: "Re-establish functional mobility, joint safety, and core coordination in our quiet, isolated studio space.",
      category: "Wellness"
    },
    {
      title: "1-on-1 Personal Coaching",
      description: "Maximize your progress with customized biomechanical programming, active tracking, and dietary support.",
      category: "Personal Training"
    },
    {
      title: "Elite CrossFit",
      description: "A blend of gymnastics, weightlifting, and high-intensity metabolic workouts designed for ultimate versatility.",
      category: "CrossFit"
    }
  ]
};

export const pricingContent = {
  tagline: "Membership Plans",
  title: "Invest in Your Performance",
  description: "Flexible memberships structured around your commitment levels. Select a plan and unlock your training potential.",
  plans: [
    {
      name: "Club Membership",
      priceMonthly: 79,
      priceYearly: 750,
      description: "Essential access to standard gym floors, locker rooms, and standard facilities.",
      features: [
        { text: "Full gym floor access", available: true },
        { text: "Premium locker & shower facilities", available: true },
        { text: "1 Biometric assessment session", available: true },
        { text: "Free high-speed member WiFi", available: true },
        { text: "Tailored nutrition profiles", available: false },
        { text: "Unlimited group training classes", available: false },
        { text: "Dedicated personal coach", available: false },
      ],
      highlighted: false,
      tag: "",
      buttonText: "Join Club",
    },
    {
      name: "All-Access Premium",
      priceMonthly: 129,
      priceYearly: 1200,
      description: "Our recommended package. Complete gym access with custom nutritional plans and coaching.",
      features: [
        { text: "Full gym floor access 24/7", available: true },
        { text: "Premium locker, sauna & steam access", available: true },
        { text: "2 Personal training sessions / month", available: true },
        { text: "Unlimited group fitness classes", available: true },
        { text: "Tailored nutrition profiles", available: true },
        { text: "FitZone member merchandise pack", available: true },
        { text: "Dedicated personal coach", available: false },
      ],
      highlighted: true,
      tag: "MOST POPULAR",
      buttonText: "Go Premium",
    },
    {
      name: "FitZone Elite VIP",
      priceMonthly: 249,
      priceYearly: 2400,
      description: "Unrestricted athletic support. Master trainers, recovery lounge, and priority sessions.",
      features: [
        { text: "24/7 VIP keyless gym access", available: true },
        { text: "Full lockers, sauna & massage lounge", available: true },
        { text: "Weekly personal training sessions", available: true },
        { text: "All group, HIIT & CrossFit classes", available: true },
        { text: "Custom meal prep catering services", available: true },
        { text: "2 Free recovery massage sessions / mo", available: true },
        { text: "Dedicated master trainer & coach", available: true },
      ],
      highlighted: false,
      tag: "ELITE CHOICE",
      buttonText: "Join Elite",
    }
  ]
};

export const trainersContent = {
  tagline: "Master Trainers",
  title: "Coached by Professionals",
  list: [
    {
      name: "Marcus Steele",
      specialty: "Director of Strength & Conditioning",
      image: "/images/trainer_marcus.jpg",
      skills: ["Powerlifting", "Hypertrophy Programming", "Olympic Lifting"],
      socials: { instagram: "#", twitter: "#", facebook: "#", email: "marcus@fitzone.com" }
    },
    {
      name: "Elena Rostova",
      specialty: "Yoga & Kinesthetic Specialist",
      image: "/images/trainer_elena.jpg",
      skills: ["Vinyasa Flow", "Functional Mobility", "Recovery Therapy"],
      socials: { instagram: "#", twitter: "#", facebook: "#", email: "elena@fitzone.com" }
    },
    {
      name: "Viktor Vance",
      specialty: "Head CrossFit & HIIT Coach",
      image: "/images/trainer_viktor.jpg",
      skills: ["Metcon Conditioning", "Weightlifting Tech", "Gymnastics Coach"],
      socials: { instagram: "#", twitter: "#", facebook: "#", email: "viktor@fitzone.com" }
    },
    {
      name: "Sarah Jenkins",
      specialty: "Lead Nutritionist & Fat Loss Coach",
      image: "/images/trainer_sarah.jpg",
      skills: ["Biometric Nutrition", "Fat Loss Conditioning", "Dietary Strategy"],
      socials: { instagram: "#", twitter: "#", facebook: "#", email: "sarah@fitzone.com" }
    }
  ]
};

export const testimonialsContent = {
  tagline: "Success Stories",
  title: "Real Member Progress",
  list: [
    {
      name: "Emily Thompson",
      role: "CrossFit Competitor",
      image: "/images/testimonial_emily.jpg",
      text: "FitZone completely redefined my strength potential. The elite equipment combined with a dark, energetic environment gets me focused instantly. It's a high-performance playground.",
      rating: 5,
    },
    {
      name: "James Rodriguez",
      role: "Aesthetic Athlete",
      image: "/images/testimonial_james.jpg",
      text: "For serious training, you need proper equipment. FitZone has state-of-the-art barbell stations and plate machines that are unmatched in NYC. The premium quality stands out immediately.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Yoga & Flexibility Member",
      image: "/images/testimonial_priya.jpg",
      text: "The transition from the high-energy barbell deck to the peaceful Yoga Sanctuary is exactly what I need. The premium saunas and cold plunges complete my recovery routine beautifully.",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "Club Member",
      image: "/images/testimonial_david.jpg",
      text: "Having 24/7 keyless access fits my active corporate routine. The biometric nutrition coaching helped me lower my body fat by 8% and build functional muscle in under 12 weeks.",
      rating: 5,
    }
  ]
};

export const contactContent = {
  tagline: "Contact Us",
  title: "Start Training Today",
  headquarters: {
    name: "FitZone Club Manhattan",
    address: "740 Broadway, 4th Floor, New York, NY 10003",
    phone: "+1 (212) 555-0199",
    phoneDirect: "+1 (800) 555-FITZONE",
    emailSales: "join@fitzonegym.com",
    emailSupport: "support@fitzonegym.com",
    hoursWeekdays: "Monday – Friday: 24 Hours Open",
    hoursWeekends: "Saturday – Sunday: 6:00 AM – 10:00 PM"
  },
  socialLinks: {
    instagram: "https://instagram.com/fitzone",
    facebook: "https://facebook.com/fitzone",
    twitter: "https://twitter.com/fitzone",
    youtube: "https://youtube.com/fitzone"
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!11m18!1m12!1m3!1d3023.0039281729606!2d-73.9946468!3d40.7299388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259853a479ff7%3A0xd64d0a927fa11eb8!2s740%20Broadway%2C%20New%20York%2C%20NY%2010003!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
};

export const galleryContent = {
  tagline: "Inside FitZone",
  title: "Our Club Gallery",
  images: [
    {
      src: "/images/gallery_weights.jpg",
      title: "Iron Dumbbell Rack",
      category: "Equipment",
      layout: ""
    },
    {
      src: "/images/gallery_woman_dumbbell.jpg",
      title: "Dumbbell Press",
      category: "Athletes",
      layout: "masonry-tall"
    },
    {
      src: "/images/gallery_barbell.jpg",
      title: "Olympic Barbell Plates",
      category: "Equipment",
      layout: "masonry-wide"
    },
    {
      src: "/images/gallery_man_lifting.jpg",
      title: "Heavy Deadlift Prep",
      category: "Athletes",
      layout: "masonry-tall"
    },
    {
      src: "/images/gallery_cable.jpg",
      title: "Cable Stack Machine",
      category: "Equipment",
      layout: ""
    },
    {
      src: "/images/gallery_woman_deadlift.jpg",
      title: "Power Clean Deadlift",
      category: "Athletes",
      layout: ""
    }
  ]
};

export const footerContent = {
  brandDescription: "FitZone Gym is the ultimate destination for luxury fitness, modern training techniques, and futuristic athletic recovery. Push your thresholds with NYC's elite coaches.",
  quickLinks: [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Programs', id: 'programs' },
    { label: 'Trainers', id: 'trainers' },
    { label: 'BMI Calculator', id: 'bmi' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' }
  ]
};
