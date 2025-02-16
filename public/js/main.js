import "bootstrap"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"

// Function to dynamically insert the navbar
async function loadNavbar() {
  try {
    const response = await fetch("../components/navbar.html")
    const navbarHTML = await response.text()
    document.getElementById("navbar-container").innerHTML = navbarHTML
  } catch (error) {
    console.error("Error loading navbar:", error)
  }
}

// Load the navbar when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadNavbar)

// Function to dynamically insert the trainer cards
const trainers = [
  {
    name: "Jordan",
    specialty: "Strength Training & Powerlifting",
    image: "/public/images/Jordan Trainer.png",
    icon: "/public/images/Dumbell Icon.png",
    iconName: "Dumbell",
    position: "start",
    class: "info",
  },
  {
    name: "Ava",
    specialty: "Yoga, Flexibility & Core Strength",
    image: "/public/images/Ava Trainer.png",
    icon: "/public/images/Red Lotus Icon.png",
    iconName: "Lotus",
    position: "start",
    class: "danger",
  },
  {
    name: "Sophia",
    specialty: "Weight Loss, Cardio & Endurance",
    image: "/public/images/Sophia Trainer.png",
    icon: "/public/images/Red Heart Icon.png",
    iconName: "Heart",
    position: "start",
    class: "danger",
  },
  {
    name: "Liam",
    specialty: "High Intensity Interval Training (HIIT)",
    image: "/public/images/Liam Trainer.png",
    icon: "/public/images/Bicep Icon.png",
    iconName: "Bicep",
    position: "end",
    class: "info",
  },
]

const plans = [
  {
    name: "Foundation",
    price: "99",
  },
  {
    name: "Momentum",
    price: "199",
  },
  {
    name: "Locked In",
    price: "299",
  },
]

document.querySelectorAll('.plan-selector').forEach(button => {
  button.addEventListener('click', () => {
    const planName = button.getAttribute('plan');
    localStorage.setItem('selectedPlan', planName);
    window.location.href = '/public/pages/booking.html';
  });
});

async function loadTrainerCards() {
  const trainerContainer = document.getElementById("trainers-container")

  try {
    const response = await fetch("/public/components/trainer-card.html")
    let template = await response.text()

    trainers.forEach((trainer) => {
      let trainerHTML = template
        .replace(/NAME/g, trainer.name)
        .replace(/SPECIALTY/g, trainer.specialty)
        .replace(/IMAGE/g, trainer.image)
        .replace(/ICON/g, trainer.icon)
        .replace(/ICONNAME/g, trainer.iconName)
        .replace(/POSITION/g, trainer.position)
        .replace(/CLASS/g, trainer.class)
      trainerContainer.innerHTML += trainerHTML
    })

    document.querySelectorAll('.trainer-selector').forEach(button => {
      button.addEventListener('click', () => {
        const trainerName = button.getAttribute('trainer');
        localStorage.setItem('selectedTrainer', trainerName);
      });
    });
    
  } catch (error) {
    console.log("Cannot load trainer cards on this page")
  }
}

document.addEventListener("DOMContentLoaded", loadTrainerCards)

// Initialize Flatpickr with time slots
flatpickr("#calendar", {
  enableTime: true,
  dateFormat: "Y-m-d H:i",
  minDate: "today",
  time_24hr: true,
  minuteIncrement: 30,
  disable: [
    function (date) {
      // Disable Sundays
      return date.getDay() === 0
    },
  ],
  defaultDate: localStorage.getItem("selectedDateTime") || null,
  onChange: function (selectedDates, dateStr, instance) {
    localStorage.setItem("selectedDateTime", dateStr)
  },
})

// Click listener for the plan cards
document.querySelectorAll(".plan-card").forEach((card) => {
  card.addEventListener("click", () => {
    // Remove 'selected' class from all cards
    document
      .querySelectorAll(".plan-card")
      .forEach((c) => c.classList.remove("selected"))

    // Add 'selected' class to the clicked card
    card.classList.add("selected")

    // Store selected plan
    const selectedPlan = card.getAttribute("plan")
    localStorage.setItem("selectedPlan", selectedPlan)
  })
})

// Click listener for the trainer cards
document.querySelectorAll(".trainer-card").forEach((card) => {
  card.addEventListener("click", () => {
    // Remove 'selected' class from all cards
    document
      .querySelectorAll(".trainer-card")
      .forEach((c) => c.classList.remove("selected"))

    // Add 'selected' class to the clicked card
    card.classList.add("selected")

    // Store selected trainer
    const selectedTrainer = card.getAttribute("trainer")
    localStorage.setItem("selectedTrainer", selectedTrainer)
  })
})

// Check if there exists a selected trainer and plan card to highlight
document.addEventListener("DOMContentLoaded", () => {
  // Highlight selected plan from storage
  const storedPlan = localStorage.getItem("selectedPlan")
  if (storedPlan) {
    const selectedPlanCard = document.querySelector(
      `.plan-card[plan="${storedPlan}"]`
    )
    if (selectedPlanCard) {
      selectedPlanCard.classList.add("selected")
    }
  }

  // Highlight selected trainer from storage
  const storedTrainer = localStorage.getItem("selectedTrainer")
  if (storedTrainer) {
    const selectedTrainerCard = document.querySelector(
      `.trainer-card[trainer="${storedTrainer}"]`
    )
    if (selectedTrainerCard) {
      selectedTrainerCard.classList.add("selected")
    }
  }
})

// Function to dynamically insert the trainer details
async function loadTrainerDetails() {
  const trainerContainer = document.getElementById("trainer-details")

  try {
    const response = await fetch("/public/components/trainer-details.html")
    let template = await response.text()

    const storedTrainer = localStorage.getItem("selectedTrainer") // Retrieve from localStorage
    const selectedTrainer = trainers.find(
      (trainer) => trainer.name.toLowerCase() === storedTrainer?.toLowerCase()
    )

    const trainer = selectedTrainer || trainers[0] // Use default if none is found

    let trainerHTML = template
      .replace(/NAME/g, trainer.name)
      .replace(/SPECIALTY/g, trainer.specialty)
      .replace(/ICON/g, trainer.icon)
      .replace(/ICONNAME/g, trainer.iconName)

    trainerContainer.innerHTML = trainerHTML
  } catch (error) {
    console.log("Cannot load trainer details on this page")
  }
}

document.addEventListener("DOMContentLoaded", loadTrainerDetails)

// Function to dynamically insert the plan details
async function loadPlanDetails() {
  const planContainer = document.getElementById("plan-details")

  try {
    const response = await fetch("/public/components/plan-details.html")
    let template = await response.text()

    const storedPlan = localStorage.getItem("selectedPlan")
    const selectedPlan = plans.find(
      (plan) => plan.name.toLowerCase() === storedPlan?.toLowerCase()
    )

    const plan = selectedPlan || plans[0]

    let planHTML = template
      .replace(/PLAN/g, plan.name)
      .replace(/PRICE/g, plan.price)

    planContainer.innerHTML = planHTML

    // If the selected plan is the "Locked IN Plan", add the span dynamically
    if (plan.name.toLowerCase() === "locked in") {
      const prefixSpan = document.getElementById("plan-prefix")
      prefixSpan.innerHTML =
        '<span class="fw-bold text-secondary">LOCKED</span> IN '
    }
  } catch (error) {
    console.log("Cannot load plan details on this page")
  }
}

document.addEventListener("DOMContentLoaded", loadPlanDetails)

// Function to dynamically insert the date details
async function loadDateDetails() {
  const dateContainer = document.getElementById("date-details")

  try {
    const response = await fetch("/public/components/date-details.html")
    let template = await response.text()

    let storedDate = localStorage.getItem("selectedDateTime")

    // Default date and time if none is provided
    if (!storedDate) {
      const now = new Date()
      now.setMinutes(30, 0, 0) // Sets minutes to 30, seconds & ms to 0
      storedDate = now.toISOString().slice(0, 16).replace("T", " ")
    }

    let date = new Date(storedDate)

    let parsedDate = {
      dayName: date.toLocaleString("default", { weekday: "long" }),
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "long" }),
      year: date.getFullYear(),
      start: date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      end: new Date(date.getTime() + 60 * 60 * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    }

    let dateHTML = template
      .replace(/DAYNAME/g, parsedDate.dayName)
      .replace(/DAY/g, parsedDate.day)
      .replace(/MONTH/g, parsedDate.month)
      .replace(/YEAR/g, parsedDate.year)
      .replace(/START/g, parsedDate.start)
      .replace(/END/g, parsedDate.end)

    dateContainer.innerHTML = dateHTML
  } catch (error) {
    console.log("Cannot load plan details on this page")
  }
}

document.addEventListener("DOMContentLoaded", loadDateDetails)

async function loadTrainerConfirmation() {
  const trainerContainer = document.getElementById("trainer-confirmation")

  try {
    const response = await fetch("/public/components/trainer-confirmation.html")
    let template = await response.text()

    const storedTrainer = localStorage.getItem("selectedTrainer") // Retrieve from localStorage
    const selectedTrainer = trainers.find(
      (trainer) => trainer.name.toLowerCase() === storedTrainer?.toLowerCase()
    )

    const trainer = selectedTrainer || trainers[0] // Use default if none is found

    let trainerHTML = template
      .replace(/NAME/g, trainer.name)
      .replace(/SPECIALTY/g, trainer.specialty)
      .replace(/IMAGE/g, trainer.image)
      .replace(/ICON/g, trainer.icon)
      .replace(/ICONNAME/g, trainer.iconName)
      .replace(/POSITION/g, trainer.position)
      .replace(/CLASS/g, trainer.class)
    trainerContainer.innerHTML = trainerHTML

  } catch (error) {
    console.log("Cannot load trainer confirmation on this page")
  }
}

document.addEventListener("DOMContentLoaded", loadTrainerConfirmation)
