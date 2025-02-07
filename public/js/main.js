import 'bootstrap';

// Function to dynamically insert the navbar
async function loadNavbar() {
    try {
      const response = await fetch("../components/navbar.html");
      const navbarHTML = await response.text();
      document.getElementById("navbar-container").innerHTML = navbarHTML;
    } catch (error) {
      console.error("Error loading navbar:", error);
    }
  }
  
  // Load the navbar when the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", loadNavbar);
  