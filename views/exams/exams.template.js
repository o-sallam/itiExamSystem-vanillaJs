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
  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // Check if user has taken this exam before
  let userScore = null;
  let hasPassed = false;

  if (currentUser && currentUser.email) {
    // Get all users to find the current user's exam results
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((user) => user.email === currentUser.email);

    if (user && user.examsResults) {
      // Find this exam in user's results
      const examResult = user.examsResults.find(
        (result) => result.examId === exam.id
      );
      if (examResult) {
        userScore = examResult.percentage;
        hasPassed = userScore >= 60; // Check if user passed with 60% or higher
      }
    }
  }

  // Determine if the start button should be disabled
  const startButtonDisabled = hasPassed ? "disabled" : "";
  const buttonText = hasPassed ? "Passed" : "Start Exam";
  const buttonClass = hasPassed ? "start-btn passed" : "start-btn";

  return `
    <div class="exam-card" data-exam-id="${exam.id}">
      <div class="exam-card-header">
        <img src="${exam.image}" alt="${exam.title}" class="exam-image">
        <h3 class="exam-title">${exam.title}</h3>
        ${
          userScore !== null
            ? `<div class="user-score" style="${
                hasPassed
                  ? "background-color: #2ecc71;"
                  : "background-color: #e74c3c;"
              }">Score: ${userScore}%</div>`
            : ""
        }
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
        <button class="${buttonClass}" ${startButtonDisabled}>${buttonText}</button>
      </div>
    </div>
  `;
};

/**
 * Generates the exams page template with placeholder for dynamically loaded exam cards
 * @returns {string} Complete HTML for the exams page
 */
export const examsTemplate = () => {
  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const fullname = currentUser.fullname || "User";

  // Generate initial HTML structure with loading message
  return `
    <div class="exams-container">
      <div class="exams-header">
        <div class="user-info">
          <span class="user-fullname">Welcome, ${fullname}</span>
        </div>
        <h1>Available Exams</h1>
        <div class="logout-container">
          <button id="logout-btn" class="logout-btn">Logout</button>
        </div>
      </div>
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
