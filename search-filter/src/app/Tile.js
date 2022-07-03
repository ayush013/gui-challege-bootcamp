// TILE COMPONENT (CONSUMER)
// props -> title, desc, user avatar

export default class TileComponent {
  constructor(title, description, avatar) {
    this.template = document.getElementById("search-result");
    this.title = title;
    this.description = description;
    this.avatar = avatar;

    this.generateLayout();
  }

  generateLayout = () => {
    const cloneNode = this.template.content.cloneNode(true);

    this.layoutRef = cloneNode.querySelector(".search-result-card");
    this.layoutRef.querySelector(".title").textContent = this.title;
    this.layoutRef.querySelector(".avatar").setAttribute("src", this.avatar);
    // this.layoutRef.querySelector(".description").textContent = this.description;
  };

  getLayout = () => {
    return this.layoutRef;
  };
}
