import { questionsTemplate } from "./questions.template.js";
import { questionsStyles } from "./questions.style.js";

export default {
  render: () => {
    return `
      ${questionsTemplate()}
      ${questionsStyles()}
    `;
  },

  afterRender: () => {
    // Logic for the Questions page goes here
  },
};
