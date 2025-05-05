/**
 * Home page component
 * Main entry point that combines template, styles, and logic
 */

import { homeTemplate } from "./home.template.js";
import { homeStyles } from "./home.style.js";

/**
 * Home component that handles authentication (sign up/sign in)
 */
export default {
  /**
   * Renders the home page with authentication form
   * @returns {string} Combined HTML template and styles
   */
  render: () => {
    return `
      ${homeTemplate()}
      ${homeStyles()}
    `;
  },

  /**
   * Sets up event listeners and handles user interactions after the component is rendered
   */
  afterRender: () => {
    const signUpBtn = document.getElementById("signUpBtn");
    const signInBtn = document.getElementById("signInBtn");
    const nameField = document.getElementById("nameField");
    const title = document.getElementById("title");

    // Toggle between sign up and sign in modes
    signInBtn.addEventListener("click", () => {
      nameField.style.maxHeight = "0";
      title.innerHTML = "Sign In";
      signUpBtn.classList.add("disabled");
      signInBtn.classList.remove("disabled");

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      console.log("Sign In Clicked");
      console.log({ email, password });

      // Authentication logic for sign in
      // Example: authenticateUser(email, password);
    });

    signUpBtn.addEventListener("click", () => {
      nameField.style.maxHeight = "65px";
      title.innerHTML = "Sign Up";
      signUpBtn.classList.remove("disabled");
      signInBtn.classList.add("disabled");

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      console.log("Sign Up Clicked");
      console.log({ username, email, password });

      // Registration logic for sign up
      // Example: registerUser(username, email, password);
    });
  },
};
