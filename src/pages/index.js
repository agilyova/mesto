import "./index.css";

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import {
  initialCards,
  validationSettings,
  buttonEditProfile,
  buttonAddPlace,
  nameInput,
  jobInput,
} from "../utils/constants.js";

function createCard(item) {
  const card = new Card(item, "#card", handleCardImageClick);
  return card.generateCard();
}

//Отрисовка карточек

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    },
  },
  ".cards"
);

cardsList.renderer();

//Валидация
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

//Попап просмотра образов
const popupWithImage = new PopupWithImage(".popup_type_image");

popupWithImage.setEventListeners();

function handleCardImageClick(name, link) {
  popupWithImage.open(name, link);
}

//Попап редактирования профиля
const popupProfileEdit = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);

const user = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

function handleProfileFormSubmit(data) {
  user.setUserInfo({ name: data["name-input"], info: data["about-input"] });
  popupProfileEdit.close();
}

popupProfileEdit.setEventListeners();

//Попап добавления карточек
const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit
);

function handleAddCardFormSubmit(dataset) {
  const data = [
    {
      name: dataset["place-name-input"],
      link: dataset["url-input"],
    },
  ];

  const card = new Section(
    {
      items: data,
      renderer: (item) => {
        const cardElement = createCard(item);
        card.addItem(cardElement, "before");
      },
    },
    ".cards"
  );
  card.renderer();
  popupAddCard.close();
}

popupAddCard.setEventListeners();

function openEditProfilePopup() {
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.info;

  formValidators["edit-profile"].setActualValidationState();
  popupProfileEdit.open();
}

function openAddCardPopup() {
  formValidators["add-card"].setActualValidationState();
  popupAddCard.open();
}

buttonEditProfile.addEventListener("click", openEditProfilePopup);
buttonAddPlace.addEventListener("click", openAddCardPopup);
