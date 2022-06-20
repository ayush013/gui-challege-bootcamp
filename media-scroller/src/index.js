import "./style.css";

(() => {
  const API = "https://picsum.photos/v2/list";
  const mediaTemplate = document.getElementById("media");
  const mediaScroller = document.querySelector(".media-scroller ul");

  fetch(API)
    .then((r) => r.json())
    .then((list) => {
      const mediaTemplates = list.map(mapMediaToTemplate);
      const fragment = new DocumentFragment();
      mediaTemplates.forEach((template) => fragment.appendChild(template));
      mediaScroller.appendChild(fragment);
    });

  const mapMediaToTemplate = (media) => {
    const { download_url, width, height, url, author } = media;

    const mediaTemp = mediaTemplate.content.cloneNode(true);

    const img = mediaTemp.querySelector("img");
    const anchor = mediaTemp.querySelector("a");

    const figcaption = mediaTemp.querySelector("figcaption");

    img.setAttribute("src", download_url);
    img.setAttribute("alt", `Image of xyz by ${author}`);
    // img.setAttribute("height", height);
    // img.setAttribute("width", width);

    anchor.setAttribute("href", url);

    figcaption.textContent = author;

    return mediaTemp;
  };
})();
