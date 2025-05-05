/**
 * Auth page component
 * Main entry point that combines template, styles, and logic
 */

import { authTemplate } from "./auth.template.js";
import { authStyles } from "./auth.style.js";

/**
 * auth component that handles authentication (sign up/sign in)
 */
export default {
  /**
   * Renders the auth page with authentication form
   * @returns {string} Combined HTML template and styles
   */
  render: () => {
    return `
      ${authTemplate()}
      ${authStyles()}
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
    let isSignUp = true;

    // Toggle between sign up and sign in modes
    signInBtn.addEventListener("click", () => {
      nameField.style.maxHeight = "0";
      title.innerHTML = "Sign In";
      signUpBtn.classList.add("disabled");
      signInBtn.classList.remove("disabled");
      if (!isSignUp) {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        console.log("Sign In Clicked");
        console.log({ email, password });
      }

      isSignUp = false;
      // Authentication logic for sign in
      // Example: authenticateUser(email, password);
    });

    signUpBtn.addEventListener("click", () => {
      nameField.style.maxHeight = "65px";
      title.innerHTML = "Sign Up";
      signUpBtn.classList.remove("disabled");
      signInBtn.classList.add("disabled");
      if (isSignUp) {
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        console.log("Sign Up Clicked");
        console.log({ username, email, password });

        // Registration logic for sign up
        // Example: registerUser(username, email, password);
      }
      isSignUp = true;
    });
  },
};
