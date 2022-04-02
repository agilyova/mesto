import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._button = this._popup.querySelector(".popup__btn_action_add");
    this._handleFormSubmit = handleFormSubmit;
  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleFormSubmit = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", () => {
      this._handleFormSubmit();
    });
  }

  _handleEnterSubmit = (evt) => {
    if (evt.key === "Enter") {
      this._handleFormSubmit();
    }
  };

  open() {
    super.open();
    document.addEventListener("keydown", this._handleEnterSubmit);
  }

  close() {
    super.close();
    document.removeEventListener("keydown", this._handleEnterSubmit);
  }
}
