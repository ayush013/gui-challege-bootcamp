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

    this.attachDismissListener();

    document.body.appendChild(backdrop);
  }

  attachDismissListener() {
    const dismissBtn = this.backdropRef.querySelector(".dismiss");
    dismissBtn.addEventListener("click", () => {
      const dialog = this.backdropRef.querySelector(".dialog");
      dialog.classList.remove("fade-in");

      requestAnimationFrame(() => {
        dialog.classList.add("reverse");
        dialog.classList.add("fade-in");
      });

      dialog.addEventListener("animationend", this.dismissDialog.bind(this));
    });
  }

  dismissDialog() {
    this.backdropRef.remove();
  }
}
