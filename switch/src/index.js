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

  const dragstart = (e) => {
    const isTouchEvent = e instanceof TouchEvent;

    drag.startX = isTouchEvent ? e.touches[0].clientX : e.offsetX;
    toggle.classList.remove("click-toggle");
  };

  const dragmove = (e) => {
    const isTouchEvent = e instanceof TouchEvent;

    const offset = isTouchEvent ? e.touches[0].clientX : e.offsetX;
    const distance = offset - drag.startX;

    const isForwardToggle = distance > 0;

    const translateX = isForwardToggle
      ? distance
      : drag.trackWidth - drag.toggleWidth - Math.abs(distance);

    if (Math.abs(distance) <= drag.trackWidth - drag.toggleWidth) {
      toggle.style.setProperty("transform", `translateX(${translateX}px)`);
    }
  };

  const dragend = (e) => {
    const isTouchEvent = e instanceof TouchEvent;

    const offset = isTouchEvent ? e.changedTouches[0]?.clientX : e.offsetX;
    const distance = offset - drag.startX;

    toggle.style.removeProperty("transform");
    toggle.classList.add("click-toggle");

    if (Math.abs(distance) >= (drag.trackWidth - drag.toggleWidth) / 2) {
      switchInput.click();
    }
  };

  switchInput.addEventListener("dragstart", dragstart);
  switchInput.addEventListener("dragover", dragmove);
  switchInput.addEventListener("dragend", dragend);

  switchInput.addEventListener("touchstart", dragstart);
  switchInput.addEventListener("touchmove", dragmove);
  switchInput.addEventListener("touchend", dragend);
})();
