class Toast {
  constructor() {
    this.template = document.getElementById("toast");
    this.parentContainer = document.querySelector(".toast-container");
    this.timeout = 5000;

    this.create();
  }

  create() {
    const toastNode = this.template.content.cloneNode(true);
    this.toast = toastNode.querySelector(".toast");
    this.toast.textContent = this.getRandomText();

    this.parentContainer.appendChild(toastNode);

    setTimeout(this.dismissToast, this.timeout);
  }

  animateFadeOutToast = () => {
    return new Promise((resolve) => {
      this.toast.animate(
        [
          {
            opacity: 0,
            transform: "translateY(-50px)",
          },
        ],
        { duration: 300, easing: "ease", fill: "forwards" }
      );
      setTimeout(resolve, 300);
    });
  };

  dismissToast = () => {
    this.animateFadeOutToast().then(() => {
      this.listenToastAnimationEnd(toast).then(() => {
        this.toast.remove();
      });
    });
  };

  getRandomText() {
    const randomString =
      "Lorem ipsum dolor \n sit amet consectetur adipisicing elit.\n Error voluptatum cum numquam aliquam placeat, minus,\n ullam reprehenderit perspiciatis maxime \n nam porro odio esse \n in magnam adipisci dicta similique incidunt nemo";

    const text = randomString
      .split(" ")
      .slice(
        parseInt(Math.random() * randomString.length),
        parseInt(Math.random() * randomString.length)
      )
      .join(" ");
    return text.length > 10 && text.length < 50 ? text : this.getRandomText();
  }

  async listenToastAnimationEnd(toast) {
    const animationPromises = toast.getAnimations().map((a) => a.finished);

    return await Promise.allSettled(animationPromises);
  }
}

export default Toast;
