import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageCaption = this._popup.querySelector(".popup__image-caption");
    this._imageView = this._popup.querySelector(".popup__image");
  }

  open(name, link) {
    this._imageCaption.textContent = name;
    this._imageView.alt = name;
    this._imageView.src = link;

    super.open();
  }
}
