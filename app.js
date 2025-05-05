import Router from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  const appElement = document.getElementById("app");
  const router = new Router(appElement);
});
