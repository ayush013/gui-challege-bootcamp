import "./style.css";

(() => {
  const switchInput = document.querySelector(".switch input[type=checkbox]");
  const switchGroup = document.querySelector(".switch");

  switchInput.addEventListener("change", () => {
    switchGroup.setAttribute("aria-checked", switchInput.checked);
    switchGroup.classList.toggle("active");
  });

  switchGroup.addEventListener("keyup", ({ code }) => {
    if (code === "Space" || code === "Enter") {
      switchInput.click();
    }
  });
})();
