import Auth from "./views/auth/index.js";
import Exams from "./views/exams/index.js";

const routes = {
  "/": Auth,
  "/exams": Exams,
};

export default class Router {
  constructor(appElement) {
    this.appElement = appElement;

    // Handle initial page load
    window.addEventListener("popstate", () => this.render());

    // Handle link clicks
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        this.navigateTo(e.target.href);
      }
    });

    // Initial render
    this.render();
  }

  navigateTo(url) {
    history.pushState(null, null, url);
    this.render();
  }

  render() {
    const path = window.location.pathname;
    const view = routes[path] || routes["/"];

    this.appElement.innerHTML = view.render();

    // Call afterRender method if it exists
    if (view.afterRender) {
      view.afterRender();
    }
  }
}
