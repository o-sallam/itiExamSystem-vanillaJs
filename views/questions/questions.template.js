/**
 * Questions page template
 * Contains the HTML structure for the exam questions page
 */

export const questionsTemplate = () => {
  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const fullname = currentUser.fullname || "User";

  // Get exam data from localStorage (would be set when user clicks on an exam)
  const currentExam = JSON.parse(localStorage.getItem("currentExam") || "{}");
  const examTitle = currentExam.title || "Exam";

  return `
    <div class="questions-container">
      <div class="questions-header">
        <div class="user-info">
          <span class="user-fullname">Welcome, ${fullname}</span>
        </div>
        <h1>${examTitle}</h1>
        <div class="timer-container">
          <div class="timer" id="exam-timer">00:00</div>
        </div>
      </div>
      
      <div class="question-box">
        <div class="question-title" id="question-title">
          <div class="question-number" id="question-number">Question 1</div>
          <h2>Question Title</h2>
        </div>
        
        <div class="options-container">
          <div class="option-row">
            <div class="option" id="option-a">
              <span class="option-letter">A</span>
              <span class="option-text">Option A</span>
            </div>
            <div class="option" id="option-b">
              <span class="option-letter">B</span>
              <span class="option-text">Option B</span>
            </div>
          </div>
          
          <div class="option-row">
            <div class="option" id="option-c">
              <span class="option-letter">C</span>
              <span class="option-text">Option C</span>
            </div>
            <div class="option" id="option-d">
              <span class="option-letter">D</span>
              <span class="option-text">Option D</span>
            </div>
          </div>
        </div>
        
        <div class="navigation-buttons">
          <button class="nav-button" id="prev-button">Previous</button>
          <div class="question-navigation" id="question-navigation">
            <!-- Question navigation circles will be added here dynamically -->
          </div>
          <button class="nav-button" id="next-button">Next</button>
        </div>
      </div>
    </div>
  `;
};
