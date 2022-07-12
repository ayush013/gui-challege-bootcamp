import "./style.css";
const API = "https://picsum.photos/v2/list";

fetch(API)
  .then((r) => r.json())
  .then((list) => {
    // const mediaTemplates = list.map(mapMediaToTemplate);
    // const fragment = new DocumentFragment();
    // mediaTemplates.forEach((template) => fragment.appendChild(template));
    // mediaScroller.appendChild(fragment);
  });
