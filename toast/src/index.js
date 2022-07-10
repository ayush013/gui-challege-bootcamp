import Toast from "./app/Toast";
import "./style.css";

(() => {
  const button = document.querySelector(".toast-btn");

  button.addEventListener("click", () => console.log(new Toast()));
})();
