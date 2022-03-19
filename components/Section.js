export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  addItem(element, position = "after") {
    if (position === "after") {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
