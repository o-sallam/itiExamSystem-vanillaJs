/**
 * Exams page styles
 * Contains the CSS styles specific to the exams listing page
 */

export const examsStyles = () => {
  return `
    <style>
      /* Exam card styles */
      .exam-card-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
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
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
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
