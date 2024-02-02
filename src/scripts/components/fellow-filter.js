export default class FellowFilter extends HTMLElement {
  connectedCallback() {
    const form = this.querySelector("form");
    const formSelect = form.querySelector("select");
    const formOptions = form.querySelectorAll("option");
    const heading = this.querySelector("h2");
    const filterItems = this.querySelectorAll(".fellows-grid article");
    // Array.from(formOptions).forEach((option) =>
    //   console.log(option.textContent)
    // );

    const init = new URLSearchParams(window.location.search);
    // console.log("options", formOptions);
    // console.log("items", filterItems);

    for (const value of init.values()) {
      // console.log("init value", value);
      Array.from(formSelect.options).forEach((option) => {
        if (option.value === value) {
          option.selected = true;
        }
      });
    }

    form.addEventListener("submit", (event) => {
      onChange();
      event.preventDefault();
    });
    form.addEventListener("change", onChange);

    onChange();

    function onChange() {
      //   console.log("triggered onChange");
      const selected = formSelect.options[formSelect.selectedIndex].value;
      console.log("selected option: ", selected);

      const data = new FormData(form);
      console.log("form data", data);
      filter(data);
      const permalink = new URLSearchParams(data).toString();
      console.log("permalink", permalink);
      if (permalink !== document.location.search) {
        const newUrl = permalink ? `?${permalink}` : document.location.pathname;
        history.pushState({}, null, newUrl);
      }
    }

    function filter(data) {
      // console.log(filterItems);
      let selectedTag;

      for (const [name, value] of data.entries()) {
        console.log("name", name, "value", value);
        selectedTag = value;
      }

      console.log("selectedTag", selectedTag);
      heading.textContent = Array.from(formOptions).find(
        (option) => option.value === selectedTag
      ).textContent;

      filterItems.forEach((item) => {
        const itemTags = item.dataset.filterTag.split(",");
        // console.log("item tags", itemTags);

        if (itemTags.includes(selectedTag) || selectedTag === "all") {
          // why doesn't item.hidden work?
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    }
  }
}

customElements.define("fellow-filter", FellowFilter);
