export class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    currenUser
  ) {
    this._id = data._id;
    this._src = data.link;
    this._name = data.name;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._likes = data.likes;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._currenUser = currenUser;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".button__icon_type_like");
    this._trashButton = this._element.querySelector(".card__trash-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._countLikes = this._element.querySelector(".card__like-amount");
    this._setEventListeners();
    this.updateLikes(this._likes);
    this._updateLikeFilling();

    if (this._owner._id !== this._currenUser) {
      this._trashButton.remove();
    }

    this._cardImage.src = this._src;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }

  updateLikes(newLikes) {
    this._likes = newLikes;
    this._countLikes.textContent = this._likes.length;
    /*    this.isLiked()
          ? this._likeButton.classList.add("card__like-button_active")
          : this._likeButton.classList.remove("card__like-button_active");*/
  }

  _updateLikeFilling() {
    this.isLiked() ? this.fillLike() : this.eraseLikeFilling();
  }

  fillLike() {
    this._likeButton.classList.add("card__like-button_active");
  }

  eraseLikeFilling() {
    this._likeButton.classList.remove("card__like-button_active");
  }

  isLiked() {
    return this._likes.map((user) => user._id).includes(this._currenUser);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this._element);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._src);
    });
  }
}
