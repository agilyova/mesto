const popup = document.querySelectorAll('.popup');

const cardTemplate = document.querySelector('#card').content;

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

const popupImageView = document.querySelector('.popup_type_image');
const imageCaption = popupImageView.querySelector('.popup__image-caption');
const imageView = popupImageView.querySelector('.popup__image');

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementTitle = cardElement.querySelector('.card__title');
  const cardElementLike = cardElement.querySelector('.card__like-button');
  const cardElementTrash = cardElement.querySelector('.card__trash-button');

  cardElementImage.src = card.link;
  cardElementImage.alt = card.name;
  cardElementTitle.textContent = card.name;

  cardElementImage.addEventListener('click', openImagePopup);
  cardElementLike.addEventListener('click', handleLikeClick);
  cardElementTrash.addEventListener('click', deleteCard);

  return cardElement;
}

function loadCards() {
  initialCards.forEach(item => {
    cards.append(createCard(item));
  });
}

function handleEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfileEdit);
  setActualValidationState(popupProfileEdit);
}

function openAddCardPopup() {
  openPopup(popupAddCard);
  setActualValidationState(popupAddCard);
}

function openImagePopup(evt) {
  if (evt.target.classList.contains('card__image')) {
    const caption = evt.target.closest('.card').querySelector('.card__title').textContent;
    const imageLink = evt.target.src;
    imageCaption.textContent = caption;
    imageView.alt = caption;
    imageView.src = imageLink;
    openPopup(popupImageView);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
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
    cards.prepend(createCard(data));
  }

  formAddCard.reset();
  closePopup(popupAddCard);
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function handleLikeClick(evt) {
  evt.currentTarget.classList.toggle('card__like-button_active');
}

loadCards();

buttonEdit.addEventListener('click', openEditProfilePopup);
formProfileEdit.addEventListener('submit', editProfileFormSubmitHandler);

buttonAddPlace.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', addPlaceFormSubmitHandler);

popup.forEach(item => item.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('button__icon_action_close') ||
    evt.target === evt.currentTarget) {
    closePopup(item);
  }
}));
