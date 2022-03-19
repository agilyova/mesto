import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const imageCaption = this._popup.querySelector(".popup__image-caption");
    const imageView = this._popup.querySelector(".popup__image");

    imageCaption.textContent = name;
    imageView.alt = name;
    imageView.src = link;

    super.open();
  }
}
