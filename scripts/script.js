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


function createCard(imageSrc, cardTitle) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__image');
  const cardElementTitle = cardElement.querySelector('.card__title');
  const cardElementLike = cardElement.querySelector('.card__like-button');
  const cardElementTrash = cardElement.querySelector('.card__trash-button');

  cardElementImage.src = imageSrc;
  cardElementImage.alt = cardTitle;
  cardElementTitle.textContent = cardTitle;

  cardElementImage.addEventListener('click', openImagePopup);
  cardElementLike.addEventListener('click', likeOrDislikeCard);
  cardElementTrash.addEventListener('click', deleteCard);

  return cardElement;
}

function loadCards() {
  initialCards.forEach(item => {
    const cardElement = createCard(item.link, item.name);
    cards.append(cardElement);
  });
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openEditProfilePopup() {
  openPopup(popupProfileEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openAddCardPopup() {
  openPopup(popupAddCard);
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
  if (placeName.value.trim() !== '' && placeLink.value.trim() !== '') {
    const cardElement = createCard(placeLink.value.trim(), placeName.value.trim());
    cards.prepend(cardElement);
  }
  formAddCard.reset();
  closePopup(popupAddCard);
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function likeOrDislikeCard(evt) {
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
