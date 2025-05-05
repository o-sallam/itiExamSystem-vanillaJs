export default {
  render: () => {
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
  },

  afterRender: () => {
    const signUpBtn = document.getElementById('signUpBtn');
    const signInBtn = document.getElementById('signInBtn');
    const nameField = document.getElementById('nameField');
    const title = document.getElementById('title');

    // Toggle between sign up and sign in modes
    signInBtn.addEventListener('click', () => {
      nameField.style.maxHeight = '0';
      title.innerHTML = 'Sign In';
      signUpBtn.classList.add('disabled');
      signInBtn.classList.remove('disabled');
      
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      console.log('Sign In Clicked');
      console.log({ email, password });

      // هنا تعمل عملية تسجيل الدخول مثلاً
    });

    signUpBtn.addEventListener('click', () => {
      nameField.style.maxHeight = '65px';
      title.innerHTML = 'Sign Up';
      signUpBtn.classList.remove('disabled');
      signInBtn.classList.add('disabled');
      
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      console.log('Sign Up Clicked');
      console.log({ username, email, password });

      // هنا تقدر تبعت داتا ل API أو تتحقق من المدخلات
    });
  }
};
