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
    this.imageTemplate = document.getElementById("image");
    this.resultContainer = document.querySelector(".results-grid");
    this.store = [];
    this.activeFilter = "all";

    const data = await ApiUtil.getData();
    this.store = data;

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
        console.log(this.activeFilter);
      }
    });
  };

  renderResults = (filter) => {
    const filteredData =
      filter === "all" || !filter
        ? this.store
        : this.store.filter(({ category }) => category === filter);

    console.log(filteredData, filter, this.store);

    const fragmentNode = filteredData.reduce((fragment, image) => {
      const { download_url, author } = image;

      const imageClone = this.imageTemplate.content.cloneNode(true);
      const imageNode = imageClone.querySelector("img");
      imageNode.src = download_url;
      imageNode.alt = `An image by ${author}`;

      fragment.appendChild(imageClone);

      return fragment;
    }, new DocumentFragment());

    while (this.resultContainer.childElementCount) {
      this.resultContainer.firstElementChild.remove();
    }

    this.resultContainer.appendChild(fragmentNode);
  };
}

new Main(``);
