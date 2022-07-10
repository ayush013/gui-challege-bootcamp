import "./style.css";

class Switch {
  constructor(switchEl) {
    if (!switchEl && !(switchEl instanceof HTMLElement)) {
      throw new Error("Invalid selector");
    }

    this.switchGroupEl = switchEl;
    this.isActive = false;

    this.initialize();
  }

  initialize = () => {
    this.switchInput = this.switchGroupEl.querySelector(
      ".switch input[type=checkbox]"
    );
    this.switchGroup = this.switchGroupEl.querySelector(".switch");
    this.toggle = this.switchGroupEl.querySelector(".toggle");

    this.calculateDragState();

    this.addToggleListener();
    this.addTouchListeners();
    this.addKeyboardListener();
    this.addDragListeners();
  };

  calculateDragState = () => {
    const toggleWidth = this.toggle.getBoundingClientRect().width;

    this._dragState = {
      trackWidth:
        this.switchInput.getBoundingClientRect().width -
        toggleWidth -
        2 *
          Number(
            window
              .getComputedStyle(this.switchGroup)
              .getPropertyValue("padding")
              .split("px")?.[0]
          ),
      startX: 0,
    };
  };

  addDragListeners = () => {
    this.switchInput.addEventListener("dragstart", this._dragstart);
    this.switchInput.addEventListener("dragover", this._dragmove);
    this.switchInput.addEventListener("dragend", this._dragend);
  };

  addTouchListeners = () => {
    this.switchInput.addEventListener("touchstart", this._dragstart);
    this.switchInput.addEventListener("touchmove", this._dragmove);
    this.switchInput.addEventListener("touchend", this._dragend);
  };

  addKeyboardListener = () => {
    this.switchGroup.addEventListener("keyup", ({ code }) => {
      if (code === "Space" || code === "Enter") {
        this.switchInput.click();
      }
    });
  };

  addToggleListener = () => {
    this.switchInput.addEventListener("change", () => {
      const newState = this.switchInput.checked;
      this.isActive = newState;
      this.onToggle(newState);
      this.switchGroup.setAttribute("aria-checked", newState);
      this.switchGroup.classList.toggle("active");
    });
  };

  _dragstart = (e) => {
    const isTouchEvent = e instanceof TouchEvent;
    this._dragState.startX = isTouchEvent
      ? e.changedTouches[0].clientX
      : e.offsetX;
    this.toggle.classList.remove("toggle-transition");
  };

  _dragmove = (e) => {
    const isTouchEvent = e instanceof TouchEvent;
    const offset = isTouchEvent ? e.changedTouches[0].clientX : e.offsetX;
    const distance = offset - this._dragState.startX;
    const isForwardToggle = distance > 0;
    const translateX = isForwardToggle
      ? distance
      : this._dragState.trackWidth - Math.abs(distance);
    if (Math.abs(distance) <= this._dragState.trackWidth) {
      this.toggle.style.setProperty("transform", `translateX(${translateX}px)`);
    }
  };

  _dragend = (e) => {
    const isTouchEvent = e instanceof TouchEvent;
    const offset = isTouchEvent ? e.changedTouches[0]?.clientX : e.offsetX;
    const distance = offset - this._dragState.startX;
    this.toggle.style.removeProperty("transform");
    this.toggle.classList.add("toggle-transition");
    if (Math.abs(distance) >= this._dragState.trackWidth / 2) {
      this.switchInput.click();
    }
  };

  onToggle = (val) => {};
}

console.log(new Switch(document.querySelector(".switch-group")));
