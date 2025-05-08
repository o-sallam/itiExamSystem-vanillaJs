/**
 * Exams page styles
 * Contains the CSS styles specific to the exams listing page
 */

export const examsStyles = () => {
  return `
    <style>
      /* Exams header styles */
      .exams-header {
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
      
      .exams-header h1 {
        flex: 2;
        text-align: center;
        margin: 0 0 10px 0 ;
      }
      
      .logout-container {
        flex: 1;
        text-align: right;
      }
      
      .logout-btn {
        background-color: #f44336;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.3s;
      }
      
      .logout-btn:hover {
        background-color: #d32f2f;
      }
      
      /* Exam card styles */
      .exam-card-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
      }
      
      .exam-title {
        color: #4bb24c;
        cursor: pointer;
        transition: color 0.3s;
      }
      
      .exam-title:hover {
        color: #3a8f3b;
        text-decoration: underline;
      }
      
      .exam-image {
        max-width: 100%;
        height: 120px;
        object-fit: contain;
        margin-bottom: 10px;
        border-radius: 4px;
      }
      
      .card-footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        gap: 8px;
      }
      
      .questions-count {
        font-size: 0.8rem;
        color: #4bb24c;
        font-weight: bold;
      }
      
      .author {
        font-size: 0.8rem;
        color: #666;
        font-style: italic;
      }
      
      /* Loading indicator styles */
      .loading {
        text-align: center;
        padding: 20px;
        font-size: 18px;
        color: #4bb24c;
        grid-column: 1 / -1; /* Span all columns */
        position: relative;
      }
      
      .loading:after {
        content: '...';
        animation: dots 1.5s steps(5, end) infinite;
      }
      
      @keyframes dots {
        0%, 20% { content: '.'; }
        40% { content: '..'; }
        60% { content: '...'; }
        80%, 100% { content: ''; }
      }
    </style>
  `;
};
