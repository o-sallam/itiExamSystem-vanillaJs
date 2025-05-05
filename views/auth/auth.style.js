/**
 * Auth page styles
 * Contains the CSS styles specific to the auth/authentication page
 */

export const authStyles = () => {
  return `
    <style>
      .container {
        background-image: linear-gradient(rgba(0, 0, 50, 0.8), rgba(0, 0, 50, 0.8)),
        url("assets/images/firstBg.jpg");
      }

      /* Validation styles */
      .validation-message {
        color: #ff3860;
        font-size: 12px;
        display: block;
        margin-top: 5px;
        margin-left: 25px;
        height: 0;
        overflow: hidden;
        transition: height 0.3s ease-in-out;
      }

      .validation-message.show {
        height: auto;
        margin-bottom: 5px;
      }

      .inputField.error input {
        border-color: #ff3860;
        border-width: 2px;
      }

      .inputField.success input {
        border-color: #23d160;
        border-width: 2px;
      }
    </style>
  `;
};
