/**
 * Questions page styles
 * Contains the CSS styles specific to the exam questions page
 */

export const questionsStyles = () => {
  return `
    <style>
      /* Questions container styles */
      .questions-container {
        width: 90%;
        max-width: 1000px;
        margin: 50px auto;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
        max-height: 80vh;
      }
      
      /* Header styles */
      .questions-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
      
      .user-info {
        flex: 1;
      }
      
      .user-fullname {
        font-size: 1rem;
        color: #333;
        font-weight: 500;
      }
      
      .questions-header h1 {
        flex: 2;
        text-align: center;
        margin: 0;
        color: #4bb24c;
      }
      
      .timer-container {
        flex: 1;
        text-align: right;
      }
      
      .timer {
        display: inline-block;
        background-color: #333;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        font-weight: bold;
        font-size: 1.2rem;
      }
      
      /* Question box styles */
      .question-box {
        background-color: #fff;
        border: 2px solid #4bb24c;
        border-radius: 8px;
        padding: 20px;
        margin-top: 20px;
      }
      
      .question-title {
        margin-bottom: 20px;
        text-align: center;
      }
      
      .question-title h2 {
        color: #333;
        font-size: 1.5rem;
      }
      
      /* Options styles */
      .options-container {
        margin-bottom: 30px;
      }
      
      .option-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        gap: 20px;
      }
      
      .option {
        flex: 1;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
      }
      
      .option:hover {
        background-color: #f0f0f0;
        border-color: #4bb24c;
      }
      
      .option.selected {
        background-color: #e6f7e6;
        border-color: #4bb24c;
      }
      
      .option-letter {
        display: inline-block;
        width: 30px;
        height: 30px;
        background-color: #4bb24c;
        color: white;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
        font-weight: bold;
      }
      
      .option-text {
        flex: 1;
      }
      
      /* Navigation buttons */
      .navigation-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
      }
      
      .nav-button {
        background-color: #4bb24c;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .nav-button:hover {
        background-color: #3d9c3e;
      }
      
      .nav-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
      
      /* Question navigation styles */
      .question-navigation {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
        margin: 0 15px;
      }
      
      .question-circle {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-weight: bold;
        position: relative;
      }
      
      .question-circle.current {
        background-color: #4bb24c;
        color: white;
      }
      
      .question-circle.answered {
        background-color: #a3e0a4;
        color: #333;
      }
      
      .question-circle.unanswered {
        background-color: #f0f0f0;
        color: #333;
        border: 2px solid #ff6b6b;
      }
      
      .question-circle .tooltip {
        visibility: hidden;
        width: 200px;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -100px;
        opacity: 0;
        transition: opacity 0.3s;
        font-weight: normal;
        font-size: 0.8rem;
      }
      
      .question-circle:hover .tooltip {
        visibility: visible;
        opacity: 1;
      }
      
      /* Question number styles */
      .question-number {
        font-size: 1.2rem;
        color: #4bb24c;
        font-weight: bold;
        margin-bottom: 5px;
        text-align: center;
      }
      
      /* Results card styles */
      .results-card {
        text-align: center;
        padding: 20px;
      }
      
      .score-display {
        font-size: 2rem;
        font-weight: bold;
        margin: 10px 0;
      }
      
      .percentage-display {
        font-size: 3rem;
        font-weight: bold;
        color: #4bb24c;
        margin: 10px 0;
      }
      
      .status-display {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 15px 0;
      }
      
      .status-display.success {
        color: #4bb24c;
      }
      
      .status-display.failed {
        color: #ff6b6b;
      }
      
      .button-container {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 20px;
      }
      
      .show-results-btn {
        background-color: #4bb24c;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 12px 20px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .show-results-btn:hover {
        background-color: #3d9c3e;
      }
      
      .back-to-exams-btn {
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 12px 20px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .back-to-exams-btn:hover {
        background-color: #2980b9;
      }
      
      .try-again-btn {
        background-color: #e74c3c;
        color: white;
        border: none;
        border-radius: 4px;
        padding: 12px 20px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .try-again-btn:hover {
        background-color: #c0392b;
      }
    </style>
  `;
};
