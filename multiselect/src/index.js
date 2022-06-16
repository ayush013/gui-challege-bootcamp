import "./style.css";

(() => {
  const formData = new FormData(document.querySelector("form"));
  console.warn("Checkboxes", Array.from(formData.entries()));
})();
