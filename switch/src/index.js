import "./style.css";

(() => {
  const switchInput = document.querySelector(".switch input[type=checkbox]");
  const switchGroup = document.querySelector(".switch");
  const toggle = document.querySelector(".toggle");

  const drag = {
    paddding: Number(
      window
        .getComputedStyle(switchGroup)
        .getPropertyValue("padding")
        .split("px")?.[0]
    ),
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
    drag.startX = e.offsetX - drag.paddding;
    toggle.classList.remove("click-toggle");
  });
  switchInput.addEventListener("dragover", (e) => {
    const distance = e.offsetX - drag.startX;
    console.log(distance, drag.trackWidth);
    if (distance <= drag.trackWidth - drag.toggleWidth) {
      toggle.style.setProperty("transform", `translateX(${distance}px)`);
    }
  });
  switchInput.addEventListener("dragend", (e) => {
    const distance = e.offsetX - drag.startX;
    if (distance >= (drag.trackWidth - drag.toggleWidth) / 2) {
      toggle.style.removeProperty("transform");
      toggle.classList.add("click-toggle");
      switchInput.click();
    }
  });
})();
