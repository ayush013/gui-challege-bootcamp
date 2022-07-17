import "./style.css";

(() => {
  const splitButtonGroup = document.querySelector(".button-group");

  splitButtonGroup.addEventListener("click", (event) => {
    if (event.target.nodeName !== "BUTTON") return;
    console.log(event.target.innerText);
    event.target.blur();
  });

  document.addEventListener("keyup", (e) => {
    const { code, target } = e;
    if (code === "Escape") {
      target.blur();
      return;
    }
    if (target.getAttribute("role") === "menuitem") {
      if (code === "ArrowUp") {
        target.previousElementSibling?.focus();
      } else if (code === "ArrowDown") {
        target.nextElementSibling?.focus();
      }
    }
  });
})();
