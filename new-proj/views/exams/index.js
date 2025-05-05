/**
 * Exams page component
 * Main entry point that combines template, styles, and logic
 */

import { examsTemplate } from "./exams.template.js";
import { examsStyles } from "./exams.style.js";

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
    // Add event listeners for exam cards
    const startButtons = document.querySelectorAll(".start-btn");

    startButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent card click event from firing
        const card = button.closest(".exam-card");
        const examTitle = card.querySelector("h3").textContent;
        console.log(`Starting exam: ${examTitle}`);
        // Here you can add logic to start the exam
      });
    });

    // Make entire card clickable
    const examCards = document.querySelectorAll(".exam-card");
    examCards.forEach((card) => {
      card.addEventListener("click", () => {
        const examTitle = card.querySelector("h3").textContent;
        console.log(`Selected exam: ${examTitle}`);
        // Here you can add logic to show exam details
      });
    });
  },
};
