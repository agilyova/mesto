export class FormValidator {
  constructor(formElement, data) {
    this._formElement = formElement;
    this._data = data;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._data.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._data.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._data.inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", "disabled");
    } else {
      this._buttonElement.classList.remove(this._data.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  }

  setActualValidationState() {
    this._inputList.forEach((inputElement) => {
      if (inputElement.validity.valid) {
        this._hideInputError(inputElement);
      }
      this._toggleButtonState();
    });
  } //С resetValidation не поняла, тк setActualValidationState как раз и выставляет корректное состояние валидации

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
