import "./style.css";

const API = "https://picsum.photos/v2/list";
const DIRECTION = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

class Stories {
  constructor() {
    this.data = [];
    this.storiesContainer = document.querySelector(".stories");

    this.computeStoryDimensions();
    this.initialize();
  }

  fetchData = () => {
    return fetch(API)
      .then((r) => r.json())
      .then((res) => {
        this.data = res.reduce((acc, el, i) => {
          i % 3 === 0 ? acc.push([el]) : acc[acc.length - 1].push(el);
          return acc;
        }, []);

        return this.data;
      });
  };

  computeStoryDimensions = () => {
    this.dimensions = {
      storiesWidth: this.storiesContainer.getBoundingClientRect().width,
    };
  };

  initialize = () => {
    this.fetchData().then((data) => {
      const fragment = new DocumentFragment();
      data.forEach((list) => {
        const userStory = new UserStory(list);
        fragment.appendChild(userStory.getLayout());
      });

      this.storiesContainer.appendChild(fragment);
    });

    this.addStoryClickListener();
  };

  addStoryClickListener = () => {
    this.storiesContainer.addEventListener("click", this.switchStories);
  };

  switchStories = (e) => {
    const { offsetX, target } = e;
    const { storiesWidth } = this.dimensions;

    const direction =
      offsetX > storiesWidth / 2 ? DIRECTION.RIGHT : DIRECTION.LEFT;

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
}

class UserStory {
  constructor(list) {
    this.storyTemplate = document.getElementById("story");
    this.data = list;

    this.layout = this.initialize(list);
  }

  initialize = () => {
    const mediaTemplates = this.data.map(this.mapMediaToTemplate);
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    mediaTemplates.forEach((template) => userDiv.prepend(template));

    return userDiv;
  };

  getLayout = () => this.layout;

  mapMediaToTemplate = ({ download_url: url, author }) => {
    const template = this.storyTemplate.content.cloneNode(true);
    const img = template.querySelector("img");
    img.setAttribute("src", url);
    img.setAttribute("alt", `An image by ${author}`);
    return template;
  };
}

new Stories();
