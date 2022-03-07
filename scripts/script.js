import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards, validationSettings } from "./data.js";

const popups = document.querySelectorAll(".popup");

const buttonEdit = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit-profile");
const formProfileEdit = document.querySelector(
  ".popup__form_action_edit-profile"
);
const nameInput = formProfileEdit.querySelector(".popup__input_type_name");
const jobInput = formProfileEdit.querySelector(".popup__input_type_about");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__description");

const buttonAddPlace = document.querySelector(".profile__add-button");
const formAddCard = document.querySelector(".popup__form_action_add-card");
const placeName = document.querySelector(".popup__input_type_place-name");
const placeLink = document.querySelector(".popup__input_type_link");
const popupAddCard = document.querySelector(".popup_type_add-card");
const cards = document.querySelector(".cards");

const popupImageView = document.querySelector(".popup_type_image");
const imageCaption = popupImageView.querySelector(".popup__image-caption");
const imageView = popupImageView.querySelector(".popup__image");

function createCard(item) {
  const card = new Card(item, "#card", handleCardImageClick);
  return card.generateCard();
}

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  cards.append(cardElement);
});

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

function handleEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEsc);
}

function handleCardImageClick(name, link) {
  imageCaption.textContent = name;
  imageView.alt = name;
  imageView.src = link;
  openPopup(popupImageView);
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfileEdit);
  formValidators["edit-profile"].setActualValidationState();
}

function openAddCardPopup() {
  openPopup(popupAddCard);
  formValidators["add-card"].setActualValidationState();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (nameInput.value.trim() !== "" && jobInput.value.trim() !== "") {
    profileName.textContent = nameInput.value.trim();
    profileJob.textContent = jobInput.value.trim();
  }
  closePopup(popupProfileEdit);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: placeName.value.trim(),
    link: placeLink.value.trim(),
  };

  if (data.name !== "" && data.link !== "") {
    cards.prepend(createCard(data));
  }

  formAddCard.reset();
  closePopup(popupAddCard);
}

buttonEdit.addEventListener("click", openEditProfilePopup);
formProfileEdit.addEventListener("submit", handleProfileFormSubmit);

buttonAddPlace.addEventListener("click", openAddCardPopup);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);

popups.forEach((item) => {
  item.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("button__icon_action_close") ||
      evt.target === evt.currentTarget
    ) {
      closePopup(item);
    }
  });
});
