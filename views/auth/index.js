import { authTemplate } from "./auth.template.js";
import { authStyles } from "./auth.style.js";
import {
  showError,
  showSuccess,
  clearValidation,
  validateEmail,
  validatePassword,
  validateFullname,
  validateConfirmPassword,
} from "../../utils/validationHelpers.js";

export default {
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
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const confirmPasswordField = document.getElementById(
      "confirmPasswordField"
    );
    const fullname = document.getElementById("fullname");

    // Validation message elements
    const emailValidation = document.getElementById("email-validation");
    const passwordValidation = document.getElementById("password-validation");
    const fullnameValidation = document.getElementById("fullname-validation");
    const confirmPasswordValidation = document.getElementById(
      "confirm-password-validation"
    );

    let isSignUp = true;

    // Function to clear validation when switching modes
    const resetValidation = () => {
      const inputs = [email, password, fullname, confirmPassword];
      const validations = [
        emailValidation,
        passwordValidation,
        fullnameValidation,
        confirmPasswordValidation,
      ];

      clearValidation(inputs, validations);
    };

    const handleSignIn = () => {
      nameField.style.maxHeight = "0";
      confirmPasswordField.style.maxHeight = "0";
      title.innerHTML = "Sign In";
      signUpBtn.classList.add("disabled");
      signInBtn.classList.remove("disabled");
      resetValidation();
      isSignUp = false;
    };

    const validateAndSignIn = () => {
      const emailValue = email.value.trim();
      const passwordValue = password.value.trim();

      // For sign in, just check if fields are not empty
      const isEmailValid = validateEmail(
        emailValue,
        email,
        emailValidation,
        isSignUp
      );
      const isPasswordValid = validatePassword(
        passwordValue,
        password,
        passwordValidation,
        isSignUp
      );

      if (!isEmailValid || !isPasswordValid) {
        return false;
      }

      // If we reach here, basic validation passed
      console.log("Sign In Successful");
      console.log({ email: emailValue, password: passwordValue });
      // Authentication logic for sign in
      // Example: authenticateUser(email, password);
      return true;
    };

    const handleSignUp = () => {
      nameField.style.maxHeight = "65px";
      confirmPasswordField.style.maxHeight = "65px";
      title.innerHTML = "Sign Up";
      signUpBtn.classList.remove("disabled");
      signInBtn.classList.add("disabled");
      resetValidation();
      isSignUp = true;
    };

    const validateAndSignUp = () => {
      const fullnameValue = fullname.value.trim();
      const emailValue = email.value.trim();
      const passwordValue = password.value.trim();
      const confirmValue = confirmPassword.value.trim();

      const isFullnameValid = validateFullname(
        fullnameValue,
        fullname,
        fullnameValidation,
        isSignUp
      );
      const isEmailValid = validateEmail(
        emailValue,
        email,
        emailValidation,
        isSignUp
      );
      const isPasswordValid = validatePassword(
        passwordValue,
        password,
        passwordValidation,
        isSignUp
      );
      const isConfirmValid = validateConfirmPassword(
        confirmValue,
        passwordValue,
        confirmPassword,
        confirmPasswordValidation,
        isSignUp
      );

      if (
        isFullnameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmValid
      ) {
        console.log("Sign Up Successful");
        console.log({
          fullname: fullnameValue,
          email: emailValue,
          password: passwordValue,
        });
        // Registration logic for sign up
        // Example: registerUser(fullname, email, password);
        return true;
      }
      return false;
    };

    // Add input event listeners for real-time validation
    email.addEventListener("input", () => {
      // Only validate if there's a value or we're in sign up mode
      if (email.value.trim() || isSignUp) {
        validateEmail(email.value.trim(), email, emailValidation, isSignUp);
      }
    });

    password.addEventListener("input", () => {
      // Only validate if there's a value or we're in sign up mode
      if (password.value.trim() || isSignUp) {
        validatePassword(
          password.value.trim(),
          password,
          passwordValidation,
          isSignUp
        );
      }
    });

    fullname.addEventListener("input", () => {
      if (isSignUp) {
        validateFullname(
          fullname.value.trim(),
          fullname,
          fullnameValidation,
          isSignUp
        );
      }
    });

    confirmPassword.addEventListener("input", () => {
      if (isSignUp) {
        validateConfirmPassword(
          confirmPassword.value.trim(),
          password.value.trim(),
          confirmPassword,
          confirmPasswordValidation,
          isSignUp
        );
      }
    });

    // Toggle between sign up and sign in modes
    signInBtn.addEventListener("click", () => {
      if (!isSignUp) {
        validateAndSignIn();
      } else {
        handleSignIn();
      }
    });

    signUpBtn.addEventListener("click", () => {
      if (isSignUp) {
        validateAndSignUp();
      } else {
        handleSignUp();
      }
    });

    // Initialize form state
    handleSignUp(); // Start in sign up mode by default
  },
};
