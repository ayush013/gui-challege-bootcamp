import "./style.css";
import { debounce } from "../src/app/debounce";

class Tabs {
  constructor(tabRef) {
    if (!tabRef || !(tabRef instanceof HTMLElement)) {
      throw new Error("Tab instance not found");
    }
    this.tabLayout = tabRef;
    this.currentActive = 1;

    this.initializeTabs();
  }

  set currentActive(val) {
    this.setTabIndex(val);
    this.setInkBar(val);
    this.tabLayout
      .querySelector(".tab-content")
      .children[val - 1]?.scrollIntoView({
        behavior: "smooth",
      });
  }

  initializeListener = () => {
    const tabHeader = this.tabLayout.querySelector(".tab-header");
    const tabPanels = this.tabLayout.querySelector(".tab-content");
    const tabLinks = tabHeader.querySelectorAll("a");

    const tabClickListener = (e) => {
      if (e.target.nodeName === "A") {
        const { href } = e.target;
        const targetTab = parseInt(href.split("tab")?.[1], 10);

        this.currentActive = targetTab;
        e.preventDefault();

        this.onTabClick(e);
      }
    };

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
        this.setInkBar(activeTab + 1);
        tabLinks[activeTab].focus();
      }
    }, 100);

    tabHeader.addEventListener("click", tabClickListener);
    tabPanels.addEventListener("scroll", tabScrollListener);
  };

  initializeTabs = () => {
    this.setInkBar(1);
    this.initializeListener();
  };

  setInkBar = (activeIdx) => {
    this.tabLayout.querySelectorAll("a").forEach((tab, i) => {
      if (activeIdx === i + 1) {
        tab.style.borderBottomColor = `#32bbaf`;
      } else {
        tab.style.borderBottomColor = `transparent`;
      }
    });
  };

  setTabIndex = (activeIdx) => {
    this.tabLayout.querySelectorAll("a").forEach((tab, i) => {
      tab.setAttribute("tab-index", i + 1 === activeIdx ? 0 : -1);
    });
  };

  onTabClick = (e) => {};
}

const tabs = new Tabs(document.querySelector(".tab"));

console.log(tabs);
