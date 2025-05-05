/**
 * Exams page component
 * Main entry point that combines template, styles, and logic
 */

import { examsTemplate } from "./exams.template.js";
import { examsStyles } from "./exams.style.js";

/**
 * Function to set up event listeners for exam cards
 */
const setupEventListeners = () => {
  // Add event listeners for exam cards
  const startButtons = document.querySelectorAll(".start-btn");

  startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent card click event from firing
      const card = button.closest(".exam-card");
      const examId = card.dataset.examId;
      const examTitle = card.querySelector("h3").textContent;
      console.log(`Starting exam: ${examTitle} (ID: ${examId})`);
      // Here you can add logic to start the exam using the examId
    });
  });

  // Make entire card clickable
  const examCards = document.querySelectorAll(".exam-card");
  examCards.forEach((card) => {
    card.addEventListener("click", () => {
      const examId = card.dataset.examId;
      const examTitle = card.querySelector("h3").textContent;
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
   */
  afterRender: () => {
    // Set up initial event listeners
    setupEventListeners();

    // Listen for the custom event when exam data is loaded
    document.addEventListener("examsDataLoaded", () => {
      console.log("Exam data loaded, setting up event listeners again");
      setupEventListeners();
    });
  },
};
