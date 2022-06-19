import "./style.css";

(() => {
  const switchInput = document.querySelector(".switch input[type=checkbox]");
  const switchGroup = document.querySelector(".switch");
  const toggle = document.querySelector(".toggle");

  const drag = {
    trackWidth:
      switchInput.getBoundingClientRect().width -
      2 *
        Number(
          window
            .getComputedStyle(switchGroup)
            .getPropertyValue("padding")
            .split("px")?.[0]
        ),
    toggleWidth: toggle.getBoundingClientRect().width,
    startX: 0,
    currentX: 0,
  };

  switchInput.addEventListener("change", () => {
    switchGroup.setAttribute("aria-checked", switchInput.checked);
    switchGroup.classList.toggle("active");
  });

  switchGroup.addEventListener("keyup", ({ code }) => {
    if (code === "Space" || code === "Enter") {
      switchInput.click();
    }
  });

  switchInput.addEventListener("dragstart", (e) => {
    drag.startX = e.offsetX;
    toggle.classList.remove("click-toggle");
  });

  switchInput.addEventListener("dragover", (e) => {
    const distance = e.offsetX - drag.startX;
    const isForwardToggle = distance > 0;

    const translateX = isForwardToggle
      ? distance
      : drag.trackWidth - drag.toggleWidth - Math.abs(distance);

    if (Math.abs(distance) <= drag.trackWidth - drag.toggleWidth) {
      toggle.style.setProperty("transform", `translateX(${translateX}px)`);
    }
  });

  switchInput.addEventListener("dragend", (e) => {
    const distance = e.offsetX - drag.startX;

    toggle.style.removeProperty("transform");
    toggle.classList.add("click-toggle");

    if (Math.abs(distance) >= (drag.trackWidth - drag.toggleWidth) / 2) {
      switchInput.click();
    }
  });
})();
