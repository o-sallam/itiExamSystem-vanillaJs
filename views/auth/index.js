import { authTemplate } from "./auth.template.js";
import { authStyles } from "./auth.style.js";

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
    const confirmPasswordFiled = document.getElementById(
      "confirmPasswordField"
    );
    const fullname = document.getElementById("fullname");
    let isSignUp = true;

    const handleSignIn = () => {
      nameField.style.maxHeight = "0";
      confirmPasswordFiled.style.maxHeight = "0";
      title.innerHTML = "Sign In";
      signUpBtn.classList.add("disabled");
      signInBtn.classList.remove("disabled");
      if (!isSignUp) {
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        console.log("Sign In Clicked");
        console.log({ email: emailValue, password: passwordValue });
        // Authentication logic for sign in
        // Example: authenticateUser(email, password);
      }
      isSignUp = false;
    };

    const handleSignUp = () => {
      nameField.style.maxHeight = "65px";
      confirmPasswordFiled.style.maxHeight = "65px";

      title.innerHTML = "Sign Up";
      signUpBtn.classList.remove("disabled");
      signInBtn.classList.add("disabled");
      if (isSignUp) {
        const fullnameValue = fullname.value.trim();
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        console.log("Sign Up Clicked");
        console.log({
          fullname: fullnameValue,
          email: emailValue,
          password: passwordValue,
        });

        // Registration logic for sign up
        // Example: registerUser(username, email, password);
      }
      isSignUp = true;
    };

    // Toggle between sign up and sign in modes
    signInBtn.onclick = handleSignIn;
    signUpBtn.onclick = handleSignUp;
  },
};
