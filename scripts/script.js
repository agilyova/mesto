import {Card} from './Card.js';
import {FormValidator} from "./FormValidator.js";
import {openPopup, closePopup} from "./utils.js";
import {initialCards,validationSettings} from "./data.js";

const popups = document.querySelectorAll('.popup');

const buttonEdit = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_type_edit-profile');
const formProfileEdit = document.querySelector('.popup__form_action_edit-profile');
const nameInput = formProfileEdit.querySelector('.popup__input_type_name');
const jobInput = formProfileEdit.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description')

const buttonAddPlace = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.popup__form_action_add-card')
const placeName = document.querySelector('.popup__input_type_place-name');
const placeLink = document.querySelector('.popup__input_type_link');
const popupAddCard = document.querySelector('.popup_type_add-card');
const cards = document.querySelector('.cards');

initialCards.forEach(item => {
  const card = new Card(item, '#card');
  const cardElement = card.generateCard();

  cards.append(cardElement);
})

const validatorEditForm = new FormValidator(formProfileEdit, validationSettings);
validatorEditForm.enableValidation();

const validatorCardAddForm = new FormValidator(formAddCard, validationSettings);
validatorCardAddForm.enableValidation();

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfileEdit);
  validatorEditForm.setActualValidationState(popupProfileEdit);
}

function openAddCardPopup() {
  openPopup(popupAddCard);
  validatorCardAddForm.setActualValidationState(popupAddCard);
}

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  if (nameInput.value.trim() !== '' && jobInput.value.trim() !== '') {
    profileName.textContent = nameInput.value.trim();
    profileJob.textContent = jobInput.value.trim();
  }
  closePopup(popupProfileEdit);
}

function addPlaceFormSubmitHandler(evt) {
  evt.preventDefault();

  const data = {
    name: placeName.value.trim(),
    link: placeLink.value.trim()
  }

  if (data.name !== '' && data.link !== '') {
    cards.prepend(new Card(data, '#card').generateCard());
  }

  formAddCard.reset();
  closePopup(popupAddCard);
}

buttonEdit.addEventListener('click', openEditProfilePopup);
formProfileEdit.addEventListener('submit', editProfileFormSubmitHandler);

buttonAddPlace.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', addPlaceFormSubmitHandler);

popups.forEach(item => item.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('button__icon_action_close') ||
    evt.target === evt.currentTarget) {
    closePopup(item);
  }
}));
