import Auth from "./views/auth/index.js";
import Exams from "./views/exams/index.js";
import Questions from "./views/questions/index.js";

const routes = {
  "/": Auth,
  "/exams": Exams,
  "/questions": Questions,
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

    // Check if user is already logged in and trying to access the login page
    if (path === "/" && localStorage.getItem("currentUser")) {
      // Redirect to exams page if user is already logged in
      history.pushState(null, null, "/exams");
      this.appElement.innerHTML = routes["/exams"].render();

      // Call afterRender for the exams page
      if (routes["/exams"].afterRender) {
        routes["/exams"].afterRender();
      }
      return;
    }

    this.appElement.innerHTML = view.render();

    // Call afterRender method if it exists
    if (view.afterRender) {
      view.afterRender();
    }
  }
}
