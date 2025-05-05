/**
 * Home page template
 * Contains the HTML structure for the home/authentication page
 */

export const authTemplate = () => {
  return `
    <div class="formBox">
      <h1 id="title">Sign Up</h1>
      <form>
        <div class="inputGroup">
          <div class="inputField" id="nameField">
            <i class="fa-solid fa-user"></i>
            <input type="text" id="fullname" placeholder="Enter Your Display Name" />
            <small class="validation-message" id="fullname-validation"></small>
          </div>
          <div class="inputField">
            <i class="fa-solid fa-envelope"></i>
            <input type="email" id="email" placeholder="Enter Your Email" />
            <small class="validation-message" id="email-validation"></small>
          </div>
          <div class="inputField">
            <i class="fa-solid fa-lock"></i>
            <input type="password" id="password" placeholder="Enter Your password" />
            <small class="validation-message" id="password-validation"></small>
          </div>
          <div class="inputField"  id="confirmPasswordField">
            <i class="fa-solid fa-lock"></i>
            <input type="password" id="confirm-password" placeholder="Confirm Your Password" />
            <small class="validation-message" id="confirm-password-validation"></small>
          </div>
        </div>
        <div class="btnField">
          <input class="btnsign" id="signUpBtn" type="button" value="Sign Up" />
          <input class="btnsign disabled" id="signInBtn" type="button" value="Sign in" />
        </div>
      </form>
    </div>
  `;
};
