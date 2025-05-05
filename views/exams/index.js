/**
 * Exams page component
 * Main entry point that combines template, styles, and logic
 */

import { examsTemplate } from "./exams.template.js";
import { examsStyles } from "./exams.style.js";
import Router from "../../router.js";

/**
 * Function to set up event listeners for exam cards
 */
const setupEventListeners = () => {
  // Make exam titles clickable to start the exam
  const examTitles = document.querySelectorAll(".exam-title");

  examTitles.forEach((title) => {
    title.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent card click event from firing
      const card = title.closest(".exam-card");
      const examId = card.dataset.examId;
      const examTitle = title.textContent;
      console.log(`Starting exam: ${examTitle} (ID: ${examId})`);
      // Here you can add logic to start the exam using the examId
    });
    // Add cursor pointer style to indicate clickability
    title.style.cursor = "pointer";
    title.style.color = "#4bb24c";
  });

  // Make entire card clickable for showing details
  const examCards = document.querySelectorAll(".exam-card");
  examCards.forEach((card) => {
    card.addEventListener("click", () => {
      const examId = card.dataset.examId;
      const examTitle = card.querySelector(".exam-title").textContent;
      console.log(`Selected exam: ${examTitle} (ID: ${examId})`);
      // Here you can add logic to show exam details using the examId
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
