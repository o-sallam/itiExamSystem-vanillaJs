export default {
  render: () => {
    return `
      <div class="exams-container">
        <h1>Available Exams</h1>
        <div class="cards-grid">
          <!-- Row 1 -->
          <div class="exam-card">
            <h3>JavaScript Basics</h3>
            <p>Test your knowledge of JavaScript fundamentals including variables, data types, and functions.</p>
            <div class="card-footer">
              <span class="time">30 mins</span>
              <button class="start-btn">Start</button>
            </div>
          </div>
          
          <div class="exam-card">
            <h3>HTML & CSS</h3>
            <p>Evaluate your skills in creating and styling web pages with HTML5 and CSS3.</p>
            <div class="card-footer">
              <span class="time">45 mins</span>
              <button class="start-btn">Start</button>
            </div>
          </div>
          
          <div class="exam-card">
            <h3>React Fundamentals</h3>
            <p>Test your understanding of React components, props, state, and hooks.</p>
            <div class="card-footer">
              <span class="time">60 mins</span>
              <button class="start-btn">Start</button>
            </div>
          </div>
          
          <div class="exam-card">
            <h3>Node.js Basics</h3>
            <p>Assess your knowledge of Node.js including modules, npm, and basic server setup.</p>
            <div class="card-footer">
              <span class="time">40 mins</span>
              <button class="start-btn">Start</button>
            </div>
          </div>
          
          <!-- Row 2 -->
          <div class="exam-card">
            <h3>Database Design</h3>
            <p>Test your skills in designing and normalizing relational databases.</p>
            <div class="card-footer">
              <span class="time">50 mins</span>
              <button class="start-btn">Start</button>
            </div>
          </div>
          
          <div class="exam-card">
            <h3>API Development</h3>
            <p>Evaluate your understanding of RESTful API design principles and implementation.</p>
            <div class="card-footer">
              <span class="time">55 mins</span>
              <button class="start-btn">Start</button>
            </div>
          </div>
          
          <div class="exam-card">
            <h3>Web Security</h3>
            <p>Test your knowledge of common web vulnerabilities and security best practices.</p>
            <div class="card-footer">
              <span class="time">45 mins</span>
              <button class="start-btn">Start</button>
            </div>
          </div>
          
          <div class="exam-card">
            <h3>Performance Optimization</h3>
            <p>Assess your skills in optimizing web applications for better performance.</p>
            <div class="card-footer">
              <span class="time">35 mins</span>
              <button class="start-btn">Start</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  afterRender: () => {
    // Add event listeners for exam cards if needed
    const startButtons = document.querySelectorAll('.start-btn');
    
    startButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click event from firing
        const card = button.closest('.exam-card');
        const examTitle = card.querySelector('h3').textContent;
        console.log(`Starting exam: ${examTitle}`);
        // Here you can add logic to start the exam
      });
    });
    
    // Make entire card clickable
    const examCards = document.querySelectorAll('.exam-card');
    examCards.forEach(card => {
      card.addEventListener('click', () => {
        const examTitle = card.querySelector('h3').textContent;
        console.log(`Selected exam: ${examTitle}`);
        // Here you can add logic to show exam details
      });
    });
  }
};