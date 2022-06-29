import "./style.css";

const API = "https://picsum.photos/v2/list";

class Main {
  constructor() {
    this.galleryContainer = document.querySelector(".photo-gallery");
    this.pictureTemplate = document.getElementById("picture");
    this.cardTemplate = document.getElementById("card");

    this.fetchDataAndInitialize();

    this.galleryContainer.addEventListener(
      "click",
      this.onPictureClickListener
    );

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("fullscreen")) {
        this.onPictureClickListener(e);
      }
    });
  }

  fetchDataAndInitialize = () => {
    fetch(API)
      .then((r) => r.json())
      .then((list) => {
        const mediaTemplates = list.map(this.mapMediaToTemplate);
        const fragment = new DocumentFragment();
        mediaTemplates.forEach((template) => fragment.appendChild(template));
        this.galleryContainer.appendChild(fragment);
      });
  };

  mapMediaToTemplate = (media, index) => {
    const { download_url, width, height, url, author } = media;

    const mediaTemp = this.pictureTemplate.content.cloneNode(true);

    const img = mediaTemp.querySelector("img");

    img.setAttribute("data-index", index);
    img.setAttribute("src", download_url);
    img.setAttribute("alt", `Image of xyz by ${author}`);

    return mediaTemp;
  };

  onPictureClickListener = ({ target }) => {
    if (target.classList.contains("photo-gallery__image")) {
      const initialPositionBounds = target.getBoundingClientRect();

      const isFullscreenImage = target.classList.contains("fullscreen");

      const articleNode = isFullscreenImage
        ? this.closeFullScreenMode()
        : this.openFullScreenPicture(target);

      const finalPositionBounds = articleNode
        .querySelector(".photo-gallery__image")
        .getBoundingClientRect();

      const delta = {
        scaleX: initialPositionBounds.width / finalPositionBounds.width,
        scaleY: initialPositionBounds.height / finalPositionBounds.height,
        x: initialPositionBounds.left - finalPositionBounds.left,
        y: initialPositionBounds.top - finalPositionBounds.top,
      };

      requestAnimationFrame(() => {
        const { x, y, scaleX, scaleY } = delta;
        const image = articleNode.querySelector(".photo-gallery__image");

        !isFullscreenImage && articleNode.classList.add("animate");

        image.animate(
          [
            {
              transform: `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`,
            },
            {
              transform: `none`,
            },
          ],
          {
            duration: 300,
            easing: "ease",
          }
        );
      });
    }
  };

  openFullScreenPicture = (imageNode) => {
    const clonedImageNode = imageNode.cloneNode(true);

    const cardNode = this.cardTemplate.content.cloneNode(true);
    const article = cardNode.querySelector(".photo-gallery__detail");

    clonedImageNode.classList.add("fullscreen");

    article.prepend(clonedImageNode);

    document.body.appendChild(cardNode);

    return article;
  };

  closeFullScreenMode = () => {
    const article = document.querySelector(".photo-gallery__detail");
    const imageIndex = article
      .querySelector(".photo-gallery__image")
      .getAttribute("data-index");

    article.remove();

    return this.galleryContainer.children[Number(imageIndex)];
  };
}

new Main();
