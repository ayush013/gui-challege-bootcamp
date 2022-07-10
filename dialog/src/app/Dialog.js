export default class Dialog {
  constructor() {
    this.dialogTemplate = document.getElementById("dialog");
    this.backdropRef = null;
    this.isOpen = false;

    this.open();
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

  open() {
    const dialog = this.dialogTemplate.content.cloneNode(true);

    const backdrop = this.generateBackdrop();
    backdrop.appendChild(dialog);
    this.backdropRef = backdrop;

    this.attachDismissListener();

    document.body.appendChild(backdrop);
    this.isOpen = true;

    this.addFocusToCancelButton();
  }

  attachDismissListener = () => {
    const dismissBtnHandler = (dismissBtn) => {
      const dialog = this.backdropRef.querySelector(".dialog");
      dialog.classList.remove("fade-in");

      dismissBtn.removeEventListener("click", dismissBtnHandler);

      requestAnimationFrame(() => {
        dialog.classList.add("reverse");
        dialog.classList.add("fade-in");
        this.close();
      });
    };

    this.backdropRef.addEventListener("click", (e) => {
      e.target.classList.contains("close") && dismissBtnHandler(e.target);
    });
  };

  addFocusToCancelButton() {
    const cancelBtn = this.backdropRef.querySelector(".cancel");
    cancelBtn.focus();
  }

  close() {
    const { matches: motionOK } = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    );
    const dialog = this.backdropRef.querySelector(".dialog");
    this.isOpen = false;

    if (motionOK) {
      Promise.allSettled(dialog.getAnimations().map((a) => a.finished)).then(
        () => this.backdropRef.remove()
      );
    } else {
      this.backdropRef.remove();
    }
  }
}
