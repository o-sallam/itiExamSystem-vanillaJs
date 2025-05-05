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
            <input type="text" id="username" placeholder="Enter Your user name" />
          </div>
          <div class="inputField">
            <i class="fa-solid fa-envelope"></i>
            <input type="email" id="email" placeholder="Enter Your Email" />
          </div>
          <div class="inputField">
            <i class="fa-solid fa-lock"></i>
            <input type="password" id="password" placeholder="Enter Your password" />
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
