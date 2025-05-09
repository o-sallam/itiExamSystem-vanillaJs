/**
 * Exams page component
 * Main entry point that combines template, styles, and logic
 */

import { examsTemplate } from "./exams.template.js";
import { examsStyles } from "./exams.style.js";
import Router from "../../router.js";

/**
 * Function to set up event listeners for exam cards and logout button
 */
const setupEventListeners = () => {
  // Set up logout button functionality
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      console.log("Logging out user");
      // Clear user data from localStorage
      localStorage.removeItem("currentUser");
      // Force redirect to login page
      window.location.href = "/";
    });
  }

  // Exam titles are no longer clickable
  const examTitles = document.querySelectorAll(".exam-title");

  // Remove pointer cursor and special color from titles
  examTitles.forEach((title) => {
    title.style.cursor = "default";
    // Keep the color for visual consistency
    title.style.color = "#4bb24c";
  });

  // Add event listeners to exam cards
  const examCards = document.querySelectorAll(".exam-card");
  examCards.forEach((card) => {
    // Find the start button in this card
    const startButton = card.querySelector(".start-btn");

    // Add click event to the start button only
    if (startButton) {
      startButton.addEventListener("click", (event) => {
        // Prevent event bubbling
        event.stopPropagation();

        // Check if button is disabled (user already passed)
        if (startButton.hasAttribute("disabled")) {
          return; // Do nothing if user already passed
        }

        const examId = card.dataset.examId;
        const examTitle = card.querySelector(".exam-title").textContent;
        console.log(`Starting exam: ${examTitle} (ID: ${examId})`);

        // Find the selected exam from examData
        fetch("../../data/examData.json")
          .then((response) => response.json())
          .then((examData) => {
            const selectedExam = examData.find(
              (exam) => exam.id === parseInt(examId)
            );
            if (selectedExam) {
              // Store the selected exam in localStorage
              localStorage.setItem("currentExam", JSON.stringify(selectedExam));

              // Navigate to the questions page
              const appElement = document.getElementById("app");
              const router = new Router(appElement);
              router.navigateTo("/questions");
            }
          })
          .catch((error) => console.error("Error loading exam data:", error));
      });
    }

    // Make the card clickable to view details but not start the exam
    card.addEventListener("click", (event) => {
      // Only handle click if it's not on the button
      if (!event.target.closest(".start-btn")) {
        const examId = card.dataset.examId;
        const examTitle = card.querySelector(".exam-title").textContent;
        console.log(`Viewing details for exam: ${examTitle} (ID: ${examId})`);
        // You could implement a modal or details view here
      }
    });
  });
};

/**
 * Exams component that displays available exams
 */
export default {
  /**
   * Renders the exams page with cards
   * @returns {string} Combined HTML template and styles
   */
  render: () => {
    return `
      ${examsTemplate()}
      ${examsStyles()}
    `;
  },

  /**
   * Sets up event listeners for exam cards after the component is rendered
   * Also checks if user is authenticated, redirects to login if not
   */
  afterRender: () => {
    // Check if user is authenticated
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      console.log("User not authenticated, redirecting to login");
      // Get the app element and create a new router instance to navigate
      const appElement = document.getElementById("app");
      const router = new Router(appElement);
      router.navigateTo("/");
      return;
    }

    // Set up initial event listeners
    setupEventListeners();

    // Listen for the custom event when exam data is loaded
    document.addEventListener("examsDataLoaded", () => {
      console.log("Exam data loaded, setting up event listeners again");
      setupEventListeners();
    });
  },
};
