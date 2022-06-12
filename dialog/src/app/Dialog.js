export default class Dialog {
  constructor() {
    this.dialogTemplate = document.getElementById("dialog");
    this.backdropRef = null;

    this.create();
  }

  generateBackdrop() {
    const backdropElement = document.createElement("div");
    backdropElement.style.setProperty("background", "rgba(0,0,0,0.2)");
    backdropElement.style.setProperty("position", "fixed");
    backdropElement.style.setProperty("width", "100%");
    backdropElement.style.setProperty("height", "100%");
    backdropElement.style.setProperty("top", "0");
    backdropElement.style.setProperty("left", "0");
    backdropElement.style.setProperty("display", "flex");
    backdropElement.style.setProperty("justify-content", "center");
    backdropElement.style.setProperty("align-items", "center");
    backdropElement.style.setProperty("backdrop-filter", "blur(20px)");

    return backdropElement;
  }

  create() {
    const dialog = this.dialogTemplate.content.cloneNode(true);

    const backdrop = this.generateBackdrop();
    backdrop.appendChild(dialog);
    this.backdropRef = backdrop;

    const dismissBtn = this.backdropRef.querySelector(".dismiss");
    const cancelBtn = this.backdropRef.querySelector(".cancel");

    [cancelBtn, dismissBtn].forEach(this.attachDismissListener);

    document.body.appendChild(backdrop);

    this.addFocusToCancelButton();
  }

  attachDismissListener = (dismissBtn) => {
    const dismissBtnHandler = () => {
      const dialog = this.backdropRef.querySelector(".dialog");
      dialog.classList.remove("fade-in");

      dismissBtn.removeEventListener("click", dismissBtnHandler);

      requestAnimationFrame(() => {
        dialog.classList.add("reverse");
        dialog.classList.add("fade-in");
      });

      dialog.addEventListener("animationend", this.dismissDialog.bind(this));
    };

    dismissBtn.addEventListener("click", dismissBtnHandler);
  };

  addFocusToCancelButton() {
    const cancelBtn = this.backdropRef.querySelector(".cancel");
    cancelBtn.focus();
  }

  dismissDialog() {
    this.backdropRef.remove();
  }
}
