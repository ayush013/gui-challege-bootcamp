import Dialog from "./app/Dialog";
import "./style.css";

(() => {
  const button2 = document.querySelector(".btn-large-dialog");

  button2.addEventListener("click", (e) => {
    const dialog = new Dialog();
  });
})();
