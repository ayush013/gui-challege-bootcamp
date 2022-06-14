class Toast {
  constructor() {
    this.template = document.getElementById("toast");
    this.parentContainer = document.querySelector(".toast-container");

    this.create();
  }

  create() {
    const toastNode = this.template.content.cloneNode(true);
    const toast = toastNode.querySelector(".toast");
    toast.textContent = this.getRandomText();

    this.parentContainer.appendChild(toastNode);

    this.listenToastAnimationEnd(toast).then((e) => {
      toast.remove();
    });
  }

  getRandomText() {
    const randomString =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatum cum numquam aliquam placeat, minus, ullam reprehenderit perspiciatis maxime nam porro odio esse in magnam adipisci dicta similique incidunt nemo";

    const text = randomString
      .split(" ")
      .slice(
        parseInt((Math.random() * randomString.length) / 2),
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
