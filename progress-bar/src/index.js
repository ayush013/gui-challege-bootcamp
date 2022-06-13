import "./style.css";

(() => {
  const progressBar = document.querySelector(".progress-bar");
  const progress = document.querySelector(".progress-bar .progress");
  const triggerBtn = document.querySelector("button");

  const MODES = {
    PROGRESS: true,
    INDETERMINATE: false,
  };

  let currentMode = MODES.INDETERMINATE;

  triggerBtn.addEventListener("click", () => {
    currentMode = !currentMode;

    switch (currentMode) {
      case MODES.PROGRESS: {
        const progressPercent = parseInt(Math.random() * 100);
        progress.classList.remove("indeterminate");
        progress.style.setProperty("width", `${progressPercent}%`);
        progressBar.setAttribute("aria-valuenow", progressPercent);
        break;
      }
      case MODES.INDETERMINATE: {
        progressBar.removeAttribute("aria-valuenow");
        progress.classList.add("indeterminate");
        progress.style.setProperty("width", `100%`);
        break;
      }
    }
  });
})();
