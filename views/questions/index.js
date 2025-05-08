/**
 * Questions page component
 * Main entry point that combines template, styles, and logic for the exam questions
 */

import { questionsTemplate } from "./questions.template.js";
import { questionsStyles } from "./questions.style.js";
import Router from "../../router.js";

export default {
  render: () => {
    return `
      ${questionsTemplate()}
      ${questionsStyles()}
    `;
  },

  afterRender: () => {
    // Check if user is authenticated
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      console.log("User not authenticated, redirecting to login");
      // Navigate to login page
      const appElement = document.getElementById("app");
      const router = new Router(appElement);
      router.navigateTo("/");
      return;
    }

    // Check if an exam is selected
    const currentExam = localStorage.getItem("currentExam");
    if (!currentExam) {
      console.log("No exam selected, redirecting to exams page");
      // Navigate to exams page
      const appElement = document.getElementById("app");
      const router = new Router(appElement);
      router.navigateTo("/exams");
      return;
    }

    // Parse exam data
    const examData = JSON.parse(currentExam);

    // Shuffle questions to randomize order
    const shuffleArray = (array) => {
      // Create a copy of the array to avoid modifying the original
      const shuffled = [...array];
      // Fisher-Yates shuffle algorithm
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    // Randomize questions order
    examData.questions = shuffleArray(examData.questions);

    let currentQuestionIndex = 0;
    let selectedAnswers = {};
    let timeLeft = examData.duration * 60; // Convert minutes to seconds

    // Get DOM elements
    const questionTitle = document.getElementById("question-title");
    const questionNumber = document.getElementById("question-number");
    const questionNavigation = document.getElementById("question-navigation");
    const optionA = document.getElementById("option-a");
    const optionB = document.getElementById("option-b");
    const optionC = document.getElementById("option-c");
    const optionD = document.getElementById("option-d");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const timerElement = document.getElementById("exam-timer");

    // Create question navigation circles
    const createQuestionNavigation = () => {
      questionNavigation.innerHTML = "";
      examData.questions.forEach((question, index) => {
        const circle = document.createElement("div");
        circle.className = "question-circle";
        if (index === currentQuestionIndex) {
          circle.classList.add("current");
        } else if (selectedAnswers[question.id] !== undefined) {
          circle.classList.add("answered");
        } else {
          circle.classList.add("unanswered");
          // Add tooltip for unanswered questions
          const tooltip = document.createElement("span");
          tooltip.className = "tooltip";
          tooltip.textContent = question.text;
          circle.appendChild(tooltip);
        }
        circle.textContent = index + 1;

        // Add click event to navigate to that question
        circle.addEventListener("click", () => {
          currentQuestionIndex = index;
          displayQuestion();
        });

        questionNavigation.appendChild(circle);
      });
    };

    // Function to display current question
    const displayQuestion = () => {
      const question = examData.questions[currentQuestionIndex];

      // Update question number and title
      questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${
        examData.questions.length
      }`;
      questionTitle.querySelector("h2").textContent = question.text;

      // Update options
      optionA.querySelector(".option-text").textContent = question.options[0];
      optionB.querySelector(".option-text").textContent = question.options[1];
      optionC.querySelector(".option-text").textContent = question.options[2];
      optionD.querySelector(".option-text").textContent = question.options[3];

      // Clear previous selection
      [optionA, optionB, optionC, optionD].forEach((option) => {
        option.classList.remove("selected");
      });

      // Apply saved selection if any
      const selectedOption = selectedAnswers[question.id];
      if (selectedOption !== undefined) {
        const options = [optionA, optionB, optionC, optionD];
        options[selectedOption].classList.add("selected");
      }

      // Update navigation buttons
      prevButton.disabled = currentQuestionIndex === 0;

      // Check if all questions have been answered
      const allQuestionsAnswered = examData.questions.every(
        (q) => selectedAnswers[q.id] !== undefined
      );

      // If on the last question, update the Next button text to Finish and disable it if not all questions are answered
      if (currentQuestionIndex === examData.questions.length - 1) {
        nextButton.textContent = "Finish";
        nextButton.disabled = !allQuestionsAnswered;
      } else {
        nextButton.textContent = "Next";
        nextButton.disabled = false;
      }

      // Update question navigation
      createQuestionNavigation();
    };

    // Function to update timer display
    const updateTimer = () => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitExam();
      }
      timeLeft--;
    };

    // Function to handle option selection
    const handleOptionSelect = (optionIndex) => {
      const question = examData.questions[currentQuestionIndex];
      selectedAnswers[question.id] = optionIndex;

      // Update UI to show selection
      [optionA, optionB, optionC, optionD].forEach((option, index) => {
        if (index === optionIndex) {
          option.classList.add("selected");
        } else {
          option.classList.remove("selected");
        }
      });

      // Update the Next/Finish button state if on the last question
      if (currentQuestionIndex === examData.questions.length - 1) {
        const allQuestionsAnswered = examData.questions.every(
          (q) => selectedAnswers[q.id] !== undefined
        );
        nextButton.disabled = !allQuestionsAnswered;
      }

      // Update question navigation to reflect the answered question
      createQuestionNavigation();
    };

    // Function to submit exam
    // Function to display exam results
    const displayExamResults = (result) => {
      // Hide question content
      document.querySelector(".options-container").style.display = "none";
      document.querySelector(".question-title").style.display = "none";
      document.querySelector(".question-navigation").style.display = "none";
      document.querySelector(".navigation-buttons").style.display = "none";

      // Create results card with improved styling
      const resultsCard = document.createElement("div");
      resultsCard.className = "results-card";
      resultsCard.style.backgroundColor = "#ffffff";
      resultsCard.style.borderRadius = "10px";
      resultsCard.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
      resultsCard.style.padding = "30px";
      resultsCard.style.maxWidth = "600px";
      resultsCard.style.margin = "0 auto";
      resultsCard.style.border = "1px solid #e0e0e0";

      // Get current user data for personalized message
      const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
      const userName = currentUserData.fullname || "User";

      // Determine if passed or failed
      const isPassed = result.percentage >= 60;
      const statusClass = isPassed ? "success" : "failed";
      const statusText = isPassed
        ? `Congratulations ${userName}, you are successful!`
        : `Sorry ${userName}, you failed.`;

      resultsCard.innerHTML = `
        <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Exam Results</h2>
        <div class="score-display" style="font-size: 3rem; font-weight: bold; text-align: center; margin: 15px 0; color: ${
          isPassed ? "#2ecc71" : "#e74c3c"
        };">${result.score}/${result.totalQuestions}</div>
        <div class="percentage-display" style="text-align: center;">0%</div>
        <div class="status-display ${statusClass}" style="text-align: center; font-size: 1.5rem; margin: 20px 0; padding: 10px; border-radius: 8px; background-color: ${
        isPassed ? "#e8f5e9" : "#ffebee"
      }; color: ${
        isPassed ? "#2ecc71" : "#e74c3c"
      }; font-weight: bold;">${statusText}</div>
        <div class="button-container" style="display: flex; justify-content: center; gap: 15px; margin-top: 25px;">
          ${
            !isPassed
              ? '<button class="try-again-btn" style="background-color: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">Please try again</button>'
              : ""
          }
          <button class="back-to-exams-btn" style="background-color: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">Back to Exams</button>
          <button class="show-results-btn" style="background-color: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">Show Details</button>
        </div>
      `;

      // Append results card to question box
      const questionBox = document.querySelector(".question-box");
      questionBox.appendChild(resultsCard);

      // Add counter animation for percentage with improved styling
      const percentageDisplay = document.querySelector(".percentage-display");
      percentageDisplay.style.fontSize = "2.5rem";
      percentageDisplay.style.fontWeight = "bold";
      percentageDisplay.style.margin = "15px 0";
      percentageDisplay.style.color =
        result.percentage >= 60 ? "#2ecc71" : "#e74c3c";

      let count = 0;
      const targetPercentage = result.percentage;
      const duration = 1500; // Animation duration in milliseconds
      const interval = 20; // Update interval in milliseconds
      const steps = duration / interval;
      const increment = targetPercentage / steps;

      const counter = setInterval(() => {
        count += increment;
        if (count >= targetPercentage) {
          count = targetPercentage;
          clearInterval(counter);
        }
        percentageDisplay.textContent = `${Math.round(count)}%`;
      }, interval);

      // Add event listener to the show results button
      const showResultsBtn = document.querySelector(".show-results-btn");
      showResultsBtn.addEventListener("click", () => {
        // Get current user data to access exam results
        const currentUserData = JSON.parse(localStorage.getItem("currentUser"));

        // Get all users to find the current user's exam results
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex(
          (user) => user.email === currentUserData.email
        );

        if (userIndex !== -1 && users[userIndex].examsResults) {
          // Get the most recent exam result (the one just finished)
          const examResult =
            users[userIndex].examsResults[
              users[userIndex].examsResults.length - 1
            ];

          // Clear the question box to show detailed results
          const questionBox = document.querySelector(".question-box");
          questionBox.innerHTML = "";

          // Create detailed results container
          const detailedResults = document.createElement("div");
          detailedResults.className = "detailed-results";

          // Add header with improved styling
          detailedResults.innerHTML = `
            <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Detailed Exam Results</h2>
            <div class="exam-info" style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3498db;">
              <p><strong>Exam:</strong> ${examResult.examTitle}</p>
              <p><strong>Score:</strong> ${examResult.score}/${
            examResult.totalQuestions
          }</p>
              <p><strong>Percentage:</strong> <span style="${
                examResult.percentage < 60
                  ? "color: #e74c3c; font-weight: bold;"
                  : "color: #2ecc71; font-weight: bold;"
              }">${examResult.percentage}%</span></p>
              <p><strong>Date:</strong> ${new Date(
                examResult.date
              ).toLocaleString()}</p>
            </div>
            <div class="questions-review" style="margin-bottom: 20px;">
              <h3 style="color: #2c3e50; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Questions Review</h3>
            </div>
            <button class="back-btn" style="background-color: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; display: block; margin: 0 auto;">Back to Exams</button>
          `;

          // Add each question with user's answer and correct answer with improved styling
          const questionsReview =
            detailedResults.querySelector(".questions-review");
          examResult.questions.forEach((question, index) => {
            const questionElement = document.createElement("div");
            questionElement.className = `question-review`;
            questionElement.style.marginBottom = "15px";
            questionElement.style.padding = "15px";
            questionElement.style.borderRadius = "8px";
            questionElement.style.border = "1px solid #ddd";
            questionElement.style.backgroundColor = question.isCorrect
              ? "#e8f5e9"
              : "#ffebee";
            questionElement.style.borderLeft = question.isCorrect
              ? "4px solid #2ecc71"
              : "4px solid #e74c3c";

            questionElement.innerHTML = `
              <p class="question-text" style="font-size: 16px; margin-bottom: 10px;"><strong>Question ${
                index + 1
              }:</strong> ${question.text}</p>
              <p class="user-answer" style="margin-bottom: 5px; ${
                !question.isCorrect ? "color: #e74c3c;" : ""
              }">
                <strong>Your Answer:</strong> ${
                  question.options[question.selectedOption]
                }
                ${
                  !question.isCorrect
                    ? '<span style="margin-left: 10px;">❌</span>'
                    : '<span style="margin-left: 10px;">✓</span>'
                }
              </p>
              <p class="correct-answer" style="color: #2ecc71;">
                <strong>Correct Answer:</strong> ${
                  question.options[question.correctAnswer]
                }
                <span style="margin-left: 10px;">✓</span>
              </p>
            `;

            questionsReview.appendChild(questionElement);
          });

          // Add back button functionality
          questionBox.appendChild(detailedResults);
          const backBtn = detailedResults.querySelector(".back-btn");
          backBtn.addEventListener("click", () => {
            // Navigate back to exams page
            const appElement = document.getElementById("app");
            const router = new Router(appElement);
            router.navigateTo("/exams");
          });
        } else {
          // If no results found, navigate to exams page
          const appElement = document.getElementById("app");
          const router = new Router(appElement);
          router.navigateTo("/exams");
        }
      });

      // Add event listener to the back to exams button
      const backToExamsBtn = document.querySelector(".back-to-exams-btn");
      backToExamsBtn.addEventListener("click", () => {
        // Direct navigation to login/registration page
        const appElement = document.getElementById("app");
        const router = new Router(appElement);
        router.navigateTo("/exams");
      });

      // Add event listener to the try again button if it exists
      const tryAgainBtn = document.querySelector(".try-again-btn");
      if (tryAgainBtn) {
        tryAgainBtn.addEventListener("click", () => {
          // Reload the current exam
          localStorage.setItem("currentExam", JSON.stringify(examData));
          // Navigate to questions page to restart the exam
          const appElement = document.getElementById("app");
          const router = new Router(appElement);
          router.navigateTo("/questions");
        });
      }
    };

    const submitExam = () => {
      // Stop the timer
      clearInterval(timerInterval);

      // Calculate score
      let score = 0;
      examData.questions.forEach((question) => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          score++;
        }
      });

      // Create result object
      const result = {
        examId: examData.id,
        examTitle: examData.title,
        score: score,
        totalQuestions: examData.questions.length,
        percentage: Math.round((score / examData.questions.length) * 100),
        date: new Date().toISOString(),
      };

      // Store detailed exam data with user's selected options
      const detailedResult = {
        examId: examData.id,
        examTitle: examData.title,
        date: new Date().toISOString(),
        score: score,
        totalQuestions: examData.questions.length,
        percentage: Math.round((score / examData.questions.length) * 100),
        questions: examData.questions.map((question) => ({
          id: question.id,
          text: question.text,
          options: question.options,
          selectedOption: selectedAnswers[question.id],
          correctAnswer: question.correctAnswer,
          isCorrect: selectedAnswers[question.id] === question.correctAnswer,
        })),
      };

      // Get current user data
      const currentUserData = JSON.parse(localStorage.getItem("currentUser"));

      // Initialize solvedExams array if it doesn't exist
      if (!currentUserData.solvedExams) {
        currentUserData.solvedExams = [];
      }

      // Add the detailed exam result to the user's solved exams
      currentUserData.solvedExams.push(detailedResult);

      // Update the user data in localStorage
      localStorage.setItem("currentUser", JSON.stringify(currentUserData));

      // Update the user's exam results in the users array in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = users.findIndex(
        (user) => user.email === currentUserData.email
      );

      if (userIndex !== -1) {
        // Initialize examsResults array if it doesn't exist
        if (!users[userIndex].examsResults) {
          users[userIndex].examsResults = [];
        }

        // Add the exam result to the user's examsResults
        users[userIndex].examsResults.push(detailedResult);

        // Update users in localStorage
        localStorage.setItem("users", JSON.stringify(users));
      }

      // // Clear current exam
      // localStorage.removeItem("currentExam");

      // Display results card instead of alert
      displayExamResults(result);
    };

    // Set up event listeners for options
    optionA.addEventListener("click", () => handleOptionSelect(0));
    optionB.addEventListener("click", () => handleOptionSelect(1));
    optionC.addEventListener("click", () => handleOptionSelect(2));
    optionD.addEventListener("click", () => handleOptionSelect(3));

    // Set up navigation buttons
    prevButton.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
      }
    });

    nextButton.addEventListener("click", () => {
      if (currentQuestionIndex < examData.questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
      } else {
        // On last question, next button submits the exam
        submitExam();
      }
    });

    // Initialize the first question and navigation
    createQuestionNavigation();
    displayQuestion();

    // Start the timer
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
  },
};
