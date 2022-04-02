import "./index.css";

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { api } from "../components/Api.js";

import {
  validationSettings,
  buttonEditProfile,
  buttonEditAvatar,
  buttonAddPlace,
  nameInput,
  jobInput,
} from "../utils/constants.js";

const popupWithImage = new PopupWithImage(".popup_type_image");
const popupConfirmDelete = new PopupWithConfirmation(
  ".popup_type_confirm-delete",
  handleDeleteFormSubmit
);
const popupProfileEdit = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);
const popupEditAvatar = new PopupWithForm(
  ".popup_type_edit-avatar",
  handleEditAvatarFormSubmit
);
const popupAddCard = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit
);

const user = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

Promise.all([api.getUserInfo(), api.getCards()])
  .then((res) => {
    user.setUserInfo(res[0]);
    user.setUserAvatar(res[0].avatar);

    res[1].forEach((item) => {
      cardsList.addItem(item);
    });
  })
  .catch((res) => console.log(res));

/*Отрисовка карточек*/
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card",
    handleCardImageClick,
    handleDeleteClick,
    handleLikeClick,
    user.id
  );
  return card.generateCard();
}

const cardsList = new Section(
  {
    items: [],
    renderer: (item) => {
      return createCard(item);
    },
  },
  ".cards"
);

/*Валидация*/
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

/*Обработчики*/
function handleCardImageClick(name, link) {
  popupWithImage.open(name, link);
}

function handleLikeClick(card) {
  if (card.isLiked()) {
    api
      .deleteCardLike(card._id)
      .then((data) => {
        card.updateLikes(data.likes);
        card.eraseLikeFilling();
      })
      .catch((res) => console.log(res));
  } else {
    api
      .likeCard(card._id)
      .then((data) => {
        card.updateLikes(data.likes);
        card.fillLike();
      })
      .catch((res) => console.log(res));
  }
}

function handleDeleteClick(card) {
  popupConfirmDelete.open();
  popupConfirmDelete.changeSubmitHandler(() => {
    handleDeleteFormSubmit(card);
  });
}

function handleDeleteFormSubmit(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      card.deleteCard();
      card = null;
      popupConfirmDelete.close();
    })
    .catch((res) => console.log(res));
}

function handleEditAvatarFormSubmit(data) {
  popupEditAvatar.setButtonText("Сохранение");
  api
    .updateUserAvatar({ link: data["avatar-input"] })
    .then((data) => {
      user.setUserAvatar(data.avatar);
      popupEditAvatar.close();
    })
    .catch((res) => console.log(res))
    .finally(() => {
      popupEditAvatar.setButtonText("Сохранить");
    });
}

function handleProfileFormSubmit(data) {
  popupProfileEdit.setButtonText("Сохранение");
  api
    .editUserInfo({ name: data["name-input"], about: data["about-input"] })
    .then((userData) => {
      user.setUserInfo(userData);
      popupProfileEdit.close();
    })
    .catch((res) => {
      console.log(res);
    })
    .finally(() => {
      popupProfileEdit.setButtonText("Сохранить");
    });
}

function handleAddCardFormSubmit(dataset) {
  popupAddCard.setButtonText("Создание...");
  const data = {
    name: dataset["place-name-input"],
    link: dataset["url-input"],
  };
  api
    .insertCard(data)
    .then((item) => {
      cardsList.addItem(item, "before");
      popupAddCard.close();
    })
    .catch((res) => console.log(res))
    .finally(() => {
      popupAddCard.setButtonText("Создать");
    });
}

function openEditProfilePopup() {
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;

  formValidators["edit-profile"].resetValidation();

  popupProfileEdit.open();
}

function openAddCardPopup() {
  formValidators["add-card"].resetValidation();
  popupAddCard.open();
}

function openEditAvatarPopup() {
  formValidators["edit-avatar"].resetValidation();
  popupEditAvatar.open();
}

popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupProfileEdit.setEventListeners();
popupConfirmDelete.setEventListeners();

buttonEditProfile.addEventListener("click", openEditProfilePopup);
buttonAddPlace.addEventListener("click", openAddCardPopup);
buttonEditAvatar.addEventListener("click", openEditAvatarPopup);
