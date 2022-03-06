export class FormValidator {

  constructor(formElement, data) {
    this._formElement = formElement;
    this._data = data;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._data.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._data.inactiveButtonClass);//TODO убрать добавление класса и перенести стили в :disabled?
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._data.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  setActualValidationState(popup) {
    const inputList = Array.from(popup.querySelectorAll(this._data.inputSelector));
    const buttonElement = popup.querySelector(this._data.submitButtonSelector);
    inputList.forEach((inputElement) => {
      if (inputElement.validity.valid) {
        this._hideInputError(inputElement);
      }
      this._toggleButtonState(inputList, buttonElement);
    })
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
    const buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
      this._setEventListeners();
  };
}
