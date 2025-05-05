/**
 * Validation helper functions for form validation
 * These functions can be reused across different components
 */

/**
 * Shows an error message for an input field
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} validationElement - The validation message element
 * @param {string} message - The error message to display
 */
export const showError = (input, validationElement, message) => {
  const parentElement = input.parentElement;
  parentElement.classList.remove("success");
  parentElement.classList.add("error");
  validationElement.textContent = message;
  validationElement.classList.add("show");
};

/**
 * Shows a success state for an input field
 * @param {HTMLElement} input - The input element
 * @param {HTMLElement} validationElement - The validation message element
 */
export const showSuccess = (input, validationElement) => {
  const parentElement = input.parentElement;
  parentElement.classList.remove("error");
  parentElement.classList.add("success");
  validationElement.textContent = "";
  validationElement.classList.remove("show");
};

/**
 * Clears validation state for multiple input fields
 * @param {Array<HTMLElement>} inputs - Array of input elements
 * @param {Array<HTMLElement>} validations - Array of validation message elements
 */
export const clearValidation = (inputs, validations) => {
  inputs.forEach((input, index) => {
    if (input) {
      input.parentElement.classList.remove("error", "success");
    }
    if (validations[index]) {
      validations[index].textContent = "";
      validations[index].classList.remove("show");
    }
  });
};

/**
 * Validates an email address
 * @param {string} emailValue - The email value to validate
 * @param {HTMLElement} emailInput - The email input element
 * @param {HTMLElement} emailValidation - The email validation message element
 * @param {boolean} isSignUp - Whether we're in sign up mode
 * @returns {boolean} Whether the email is valid
 */
export const validateEmail = (
  emailValue,
  emailInput,
  emailValidation,
  isSignUp
) => {
  const validDomains = ["@yahoo.com", "@gmail.com", "@hotmail.com"];

  if (!emailValue) {
    showError(emailInput, emailValidation, "Email is required");
    return false;
  } else if (isSignUp) {
    // Only validate email domain in sign up mode
    const isValid = validDomains.some((domain) => emailValue.endsWith(domain));

    if (!isValid) {
      showError(
        emailInput,
        emailValidation,
        "Email must end with @yahoo.com, @gmail.com, or @hotmail.com"
      );
      return false;
    }
  }

  // If we reach here, email is valid
  showSuccess(emailInput, emailValidation);
  return true;
};

/**
 * Validates a password
 * @param {string} passwordValue - The password value to validate
 * @param {HTMLElement} passwordInput - The password input element
 * @param {HTMLElement} passwordValidation - The password validation message element
 * @param {boolean} isSignUp - Whether we're in sign up mode
 * @returns {boolean} Whether the password is valid
 */
export const validatePassword = (
  passwordValue,
  passwordInput,
  passwordValidation,
  isSignUp
) => {
  if (!passwordValue) {
    showError(passwordInput, passwordValidation, "Password is required");
    return false;
  } else if (isSignUp) {
    // Only validate password complexity in sign up mode
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!passwordRegex.test(passwordValue)) {
      showError(
        passwordInput,
        passwordValidation,
        "Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one special character"
      );
      return false;
    }
  }

  // If we reach here, password is valid
  showSuccess(passwordInput, passwordValidation);
  return true;
};

/**
 * Validates a full name
 * @param {string} fullnameValue - The full name value to validate
 * @param {HTMLElement} fullnameInput - The full name input element
 * @param {HTMLElement} fullnameValidation - The full name validation message element
 * @param {boolean} isSignUp - Whether we're in sign up mode
 * @returns {boolean} Whether the full name is valid
 */
export const validateFullname = (
  fullnameValue,
  fullnameInput,
  fullnameValidation,
  isSignUp
) => {
  if (!fullnameValue && isSignUp) {
    showError(fullnameInput, fullnameValidation, "Name is required");
    return false;
  } else if (fullnameValue) {
    showSuccess(fullnameInput, fullnameValidation);
    return true;
  }
  return true; // Not required in sign in mode
};

/**
 * Validates a confirm password field
 * @param {string} confirmValue - The confirm password value
 * @param {string} passwordValue - The password value to compare against
 * @param {HTMLElement} confirmInput - The confirm password input element
 * @param {HTMLElement} confirmValidation - The confirm password validation message element
 * @param {boolean} isSignUp - Whether we're in sign up mode
 * @returns {boolean} Whether the confirm password is valid
 */
export const validateConfirmPassword = (
  confirmValue,
  passwordValue,
  confirmInput,
  confirmValidation,
  isSignUp
) => {
  if (!confirmValue && isSignUp) {
    showError(confirmInput, confirmValidation, "Please confirm your password");
    return false;
  } else if (confirmValue !== passwordValue && isSignUp) {
    showError(confirmInput, confirmValidation, "Passwords do not match");
    return false;
  } else if (isSignUp) {
    showSuccess(confirmInput, confirmValidation);
    return true;
  }
  return true; // Not required in sign in mode
};
