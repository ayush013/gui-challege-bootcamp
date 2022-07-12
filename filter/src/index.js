import ApiUtil, { MOCK_CATEGORIES } from "./app/ApiUtil";
import "./style.css";

class Main {
  constructor() {
    this.initializeApp();
  }

  set activeFilter(value) {
    this.renderResults(value);
  }

  initializeApp = async () => {
    this.resultContainer = document.querySelector(".results-grid");
    this.store = [];
    this.activeFilter = "all";
    this.previousRenderedNodes = [];

    const data = await ApiUtil.getData();
    this.store = data.map((img) => new ImageNode(img));

    this.renderResults(this.activeFilter);
    this.renderFilters();
    this.initFilterListener();
  };

  renderFilters = () => {
    const container = document.querySelector(".filter-container");

    const filterNodes = ["all", ...MOCK_CATEGORIES].reduce(
      (fragment, category) => {
        const button = document.createElement("button");
        button.innerText = category.toUpperCase();
        button.setAttribute("data-category", category);
        category === "all" && button.classList.add("selected");
        fragment.appendChild(button);
        return fragment;
      },
      new DocumentFragment()
    );

    container.appendChild(filterNodes);
  };

  initFilterListener = () => {
    const container = document.querySelector(".filter-container");

    container.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        this.activeFilter = e.target.getAttribute("data-category");
        container.childNodes.forEach((node) =>
          node.classList.remove("selected")
        );
        e.target.classList.add("selected");
      }
    });
  };

  getFilteredResults = (filter) =>
    filter === "all" || !filter
      ? this.store
      : this.store.filter((image) => image.getData().category === filter);

  renderResults = (filter) => {
    const filteredData = this.getFilteredResults(filter);

    const fragmentNode = filteredData.reduce((fragment, image) => {
      const imageClone = image.getLayout();

      fragment.appendChild(imageClone);

      return fragment;
    }, new DocumentFragment());

    while (this.resultContainer.childElementCount) {
      this.resultContainer.firstElementChild.remove();
    }

    this.resultContainer.appendChild(fragmentNode);

    this.animateNodes(filteredData);

    this.previousRenderedNodes = filteredData.map((image) => image.id);
  };

  animateNodes(data) {
    data.forEach((image) => {
      if (this.previousRenderedNodes.find((id) => id === image.id)) {
        image.initFlipAnimation();
      } else {
        image.getDefaultAnimation();
      }
    });
  }
}

class ImageNode {
  constructor(image) {
    this.imageTemplate = document.getElementById("image");
    this.data = image;
    this.id = image.id;
  }

  getLayout = () => {
    const { download_url, author } = this.data;
    this.imageClone = this.imageTemplate.content.cloneNode(true);
    this.imageNode = this.imageClone.querySelector("img");
    this.imageNode.src = download_url;
    this.imageNode.alt = `An image by ${author}`;
    return this.imageClone;
  };

  calculateLayoutBounds = () => {
    const bounds = this.imageNode.getBoundingClientRect();
    this.layoutBounds = {
      x: bounds.x,
      y: bounds.y,
    };
  };

  getLayoutBounds = () => this.layoutBounds;

  getData = () => this.data;

  getDefaultAnimation = () => {
    requestAnimationFrame(() => {
      this.imageNode.animate(
        [
          {
            transform: "scale(0)",
            opacity: 0,
          },
          {
            transform: "scale(1)",
            opacity: 1,
          },
        ],
        {
          duration: 300,
          easing: "ease",
        }
      );
    });
  };

  initFlipAnimation = () => {
    const oldBounds = this.getLayoutBounds();
    this.calculateLayoutBounds();
    const newBounds = this.getLayoutBounds();

    if (
      oldBounds &&
      (oldBounds.x !== newBounds.x || oldBounds.y !== newBounds.y)
    ) {
      requestAnimationFrame(() => {
        this.imageNode.animate(
          [
            {
              transform: `translate(${oldBounds.x - newBounds.x}px,${
                oldBounds.y - newBounds.y
              }px)`,
            },
            {
              transform: "translate(0,0)",
            },
          ],
          {
            duration: 300,
            easing: "ease",
          }
        );
      });
    } else {
      this.getDefaultAnimation();
    }
  };
}

new Main();
