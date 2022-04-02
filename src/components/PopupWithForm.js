import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._inputsArray = Array.from(
      this._popup.querySelectorAll(".popup__input")
    );
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};

    this._inputsArray.forEach((input) => {
      inputValues[input.id] = input.value.trim();
    });
    return inputValues;
  }

  setButtonText(text = "Сохранить") {
    this._form.querySelector(".popup__btn_action_add").textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
