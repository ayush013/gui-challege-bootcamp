import "./style.css";

(() => {
  const API = "https://picsum.photos/v2/list";

  const stories = document.querySelector(".stories");
  const storyTemplate = document.getElementById("story");

  fetch(API)
    .then((r) => r.json())
    .then((res) => {
      const listSubArrays = res.reduce((acc, el, i) => {
        i % 3 === 0 ? acc.push([el]) : acc[acc.length - 1].push(el);
        return acc;
      }, []);
      stories.style.setProperty("--users", listSubArrays.length);
      const fragment = new DocumentFragment();
      listSubArrays.forEach((list) => {
        const mediaTemplates = list.map(mapMediaToTemplate);
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");
        mediaTemplates.forEach((template) => userDiv.appendChild(template));
        fragment.appendChild(userDiv);
      });

      stories.appendChild(fragment);
    });

  const mapMediaToTemplate = ({ download_url: url, author }) => {
    const template = storyTemplate.content.cloneNode(true);
    const img = template.querySelector("img");
    img.setAttribute("src", url);
    img.setAttribute("alt", `An image by ${author}`);
    return template;
  };

  const dimensions = {
    storiesWidth: stories.getBoundingClientRect().width,
    storiesX: stories.getBoundingClientRect().x,
  };

  const DIRECTION = {
    LEFT: "LEFT",
    RIGHT: "RIGHT",
  };

  const switchStories = (e) => {
    const { clientX, target } = e;
    const { storiesWidth, storiesX } = dimensions;

    const direction =
      clientX - storiesX > storiesWidth / 2 ? DIRECTION.RIGHT : DIRECTION.LEFT;

    const motionOK = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;

    const scrollOptions = motionOK ? { behavior: "smooth" } : undefined;

    switch (direction) {
      case DIRECTION.RIGHT:
        {
          const nextImage = target.previousElementSibling;
          const nextUser = target.parentElement.nextElementSibling;
          if (nextImage) {
            nextImage.classList.remove("hidden");
            target.classList.add("hidden");
          } else if (nextUser) {
            nextUser?.scrollIntoView(scrollOptions);
          }
        }
        break;
      case DIRECTION.LEFT: {
        const previousImage = target.nextElementSibling;
        const previousUser = target.parentElement.previousElementSibling;

        if (previousImage) {
          previousImage.classList.remove("hidden");
          target.classList.add("hidden");
        } else if (previousUser) {
          previousUser?.scrollIntoView(scrollOptions);
        }
      }
    }
  };

  stories.addEventListener("click", switchStories);
})();
