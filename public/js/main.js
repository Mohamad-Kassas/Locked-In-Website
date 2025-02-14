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
  onChange: function (selectedDates, dateStr, instance) {
    console.log("Selected Date and Time:", dateStr)
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

    // Optional: Store selected plan (e.g., for form submission or console check)
    const selectedPlan = card.getAttribute("plan")
    console.log("Selected Plan:", selectedPlan)
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

    // Optional: Store selected plan (e.g., for form submission or console check)
    const selectedPlan = card.getAttribute("trainer")
    console.log("Selected Trainer:", selectedPlan)
  })
})