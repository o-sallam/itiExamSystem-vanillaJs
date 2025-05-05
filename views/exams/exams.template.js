/**
 * Exams page template
 * Contains the HTML structure for the exams listing page
 * Dynamically generates exam cards from JSON data
 */

// Placeholder exam data until the JSON is loaded
let examData = [];

// Function to load exam data
function loadExamData() {
  // Fetch the exam data from the JSON file
  fetch("../../data/examData.json")
    .then((response) => response.json())
    .then((data) => {
      examData = data;
      // Refresh the exam cards if the component is already rendered
      const container = document.querySelector(".cards-grid");
      if (container) {
        container.innerHTML = examData
          .map((exam) => createExamCard(exam))
          .join("");
        // Re-attach event listeners by dispatching a custom event
        document.dispatchEvent(new CustomEvent("examsDataLoaded"));
      }
    })
    .catch((error) => console.error("Error loading exam data:", error));
}

// Load the exam data when the script is executed
loadExamData();

/**
 * Generates HTML for a single exam card
 * @param {Object} exam - The exam data object
 * @returns {string} HTML for the exam card
 */
const createExamCard = (exam) => {
  return `
    <div class="exam-card" data-exam-id="${exam.id}">
      <div class="exam-card-header">
        <img src="${exam.image}" alt="${exam.title}" class="exam-image">
        <h3 class="exam-title">${exam.title}</h3>
      </div>
      <p>${
        exam.questions && exam.questions.length > 0
          ? exam.questions[0].text
          : "No questions available"
      }</p>
      <div class="card-footer">
        <span class="time">${exam.duration} mins</span>
        <span class="author">By: ${exam.createdBy}</span>
        <span class="questions-count">${
          exam.questions ? exam.questions.length : 0
        } Questions</span>
      </div>
    </div>
  `;
};

/**
 * Generates the exams page template with placeholder for dynamically loaded exam cards
 * @returns {string} Complete HTML for the exams page
 */
export const examsTemplate = () => {
  // Generate initial HTML structure with loading message
  return `
    <div class="exams-container">
      <h1>Available Exams</h1>
      <div class="cards-grid">
        ${
          examData.length > 0
            ? examData.map((exam) => createExamCard(exam)).join("")
            : '<div class="loading">Loading exam data...</div>'
        }
      </div>
    </div>
  `;
};
