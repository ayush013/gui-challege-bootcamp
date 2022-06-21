import "./style.css";
import { debounce } from "../src/app/debounce";

(() => {
  const tabHeader = document.querySelector(".tab-header");
  const tabPanels = document.querySelector(".tab-content");
  const tabLinks = tabHeader.querySelectorAll("a");

  const setTabIndex = (activeIdx) => {
    tabLinks.forEach((tab, i) => {
      tab.setAttribute("tab-index", i + 1 === activeIdx ? 0 : -1);
    });
  };

  const setInkBar = (activeIdx) => {
    tabLinks.forEach((tab, i) => {
      if (activeIdx === i + 1) {
        tab.style.borderBottomColor = `#32bbaf`;
      } else {
        tab.style.borderBottomColor = `transparent`;
      }
    });
  };

  setInkBar(1);

  tabHeader.addEventListener("click", (e) => {
    if (e.target.nodeName === "A") {
      const { href } = e.target;

      const targetTab = parseInt(href.split("tab")?.[1], 10);
      setTabIndex(targetTab);
      setInkBar(targetTab);

      e.preventDefault();
      tabPanels.children[targetTab - 1]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  });

  const tabScrollListener = debounce((e) => {
    const parentBounds = e.target.getBoundingClientRect();
    const parenLeft = parentBounds.left;

    const activeTab = Array.from(
      tabPanels.querySelectorAll("article")
    ).findIndex((tab) => {
      const tabBounds = tab.getBoundingClientRect();

      if (Math.round(tabBounds.left - parenLeft) === 0) {
        return true;
      }

      return false;
    });

    if (activeTab !== -1) {
      setInkBar(activeTab + 1);
      tabLinks[activeTab].focus();
    }
  }, 100);

  tabPanels.addEventListener("scroll", tabScrollListener);
})();
