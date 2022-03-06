import {openPopup} from "./utils.js";

export class Card {
  constructor(data, cardSelector) {
    this._image = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementImage = this._element.querySelector('.card__image');
    const elementTitle = this._element.querySelector('.card__title');
    elementImage.src = this._image;
    elementImage.alt = this._name;
    elementTitle.textContent = this._name;

    return this._element;
  }

  _handleLikeClick() {
    this._element
      .querySelector('.button__icon_type_like')
      .closest('.card__like-button')
      .classList.toggle('card__like-button_active');
  };

  _handleDeleteClick() {
    this._element.remove();
  };

  _handleImageClick() {
    const popupImageView = document.querySelector('.popup_type_image');
    const imageCaption = popupImageView.querySelector('.popup__image-caption');
    const imageView = popupImageView.querySelector('.popup__image');

    imageCaption.textContent = this._name;
    imageView.alt = this._name;
    imageView.src = this._image;
    openPopup(popupImageView);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._element.querySelector('.card__trash-button').addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleImageClick();
    });
  }
}
