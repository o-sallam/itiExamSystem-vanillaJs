import Router from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  inisialLocalStorage();
  const appElement = document.getElementById("app");
  const router = new Router(appElement);
});

function inisialLocalStorage() {
  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }
}
