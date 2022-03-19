export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(cardData, position = "after") {
    const card = this._renderer(cardData);
    if (position === "after") {
      this._container.append(card);
    } else {
      this._container.prepend(card);
    }
  }

  renderItems() {
    this._items.forEach((item) => this.addItem(item));
  }
}
