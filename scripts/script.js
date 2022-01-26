const initialCards = [
  {
    name: 'Калининград',
    link: 'images/kaliningrad.jpg'
  },
  {
    name: 'Казань',
    link: 'images/Kazan.jpg'
  },
  {
    name: 'Екатеринбург',
    link: 'images/Ekaterinburg.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: 'images/St.Petersburg.jpg'
  },
  {
    name: 'Красная поляна',
    link: 'images/Krasnaya_polyana.jpg'
  },
  {
    name: 'Байкал',
    link: 'images/Baikal.jpg'
  }
];

const popup = document.querySelectorAll('.popup');

const cardTemplate = document.querySelector('#card').content;

const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = document.querySelector('.popup__form_action_edit-profile');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm  .querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description')

const addPlaceButton = document.querySelector('.profile__add-button');
const addCardForm = document.querySelector('.popup__form_action_add-card')
const placeName = document.querySelector('.popup__input_type_place-name');
const placeLink = document.querySelector('.popup__input_type_link');
const addCardPopup = document.querySelector('.popup_type_add-card');
const cards = document.querySelector('.cards');

const imageViewPopup = document.querySelector('.popup_type_image');
const imageCaption = imageViewPopup.querySelector('.popup__image-caption');
const imagePopup =  imageViewPopup.querySelector('.popup__image');


function createCard() {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

function fillCardsAttributes (card, imageSrc, cardTitle) {
  const cardElementImage = card.querySelector('.card__image');
  const cardElementTitle = card.querySelector('.card__title');

  cardElementImage.src = imageSrc;
  cardElementImage.alt = cardTitle;
  cardElementTitle.textContent = cardTitle;
}

function loadCards() {
  initialCards.forEach(item => {
    const cardElement = createCard();
    fillCardsAttributes(cardElement, item.link, item.name);
    cards.append(cardElement);
  })
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openEditProfilePopup() {
  openPopup(editProfilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openAddCardPopup() {
  openPopup(addCardPopup);
  placeName.value = '';
  placeLink.value = '';
}

function openImagePopup(evt) {
  if (evt.target.classList.contains('card__image')) {
    let caption = evt.target.closest('.card').querySelector('.card__title').textContent;
    let imageLink = evt.target.src;
    imageCaption.textContent = caption;
    imagePopup.alt = caption;
    imagePopup.src = imageLink;
    openPopup(imageViewPopup);
  }
}

function closePopup(evt) {
  if (evt.target.classList.contains('button__icon_action_close') ||
      evt.target.classList.contains('popup__btn_action_add') || //TODO Если поля обязательные и не заполнены?
      evt.target === evt.currentTarget) {
    this.classList.remove('popup_opened');
  }
}

function editProfileFormSubmitHandler(evt) {
   evt.preventDefault();
   if (nameInput.value.trim() !== '' && jobInput.value.trim() !== '' ) {
     profileName.textContent = nameInput.value.trim();
     profileJob.textContent = jobInput.value.trim();
   }
 }

function addPlaceFormSubmitHandler(evt) {
  evt.preventDefault();
  if (placeName.value.trim() !== '' && placeLink.value.trim() !== '' ) {
    const cardElement = createCard();
    fillCardsAttributes(cardElement, placeLink.value.trim(), placeName.value.trim());
    cards.prepend(cardElement);
  }
}

function deleteCard(evt) {
  if (evt.target.classList.contains('button__icon_type_trash')) {
    evt.composedPath().find(element => element.className === 'card').remove();
  }
}

function likeOrDislikeCard(evt) {
  if (evt.target.classList.contains('button__icon_type_like')) {
    evt.target.parentElement.classList.toggle('card__like-button_active'); }
 }

loadCards();

editButton.addEventListener('click', openEditProfilePopup);
editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);

addPlaceButton.addEventListener('click', openAddCardPopup);
addCardForm.addEventListener('submit', addPlaceFormSubmitHandler);

cards.addEventListener('click', deleteCard);
cards.addEventListener('click', likeOrDislikeCard);
cards.addEventListener('click',openImagePopup);

popup.forEach(item => item.addEventListener('click', closePopup));
