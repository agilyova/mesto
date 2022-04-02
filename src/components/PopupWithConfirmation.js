import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleFormSubmit = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
