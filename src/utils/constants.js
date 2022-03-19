const kaliningrad = new URL("../images/kaliningrad.jpg", import.meta.url);
const kazan = new URL("../images/Kazan.jpg", import.meta.url);
const ekaterinburg = new URL("../images/Ekaterinburg.jpg", import.meta.url);
const piter = new URL("../images/St.Petersburg.jpg", import.meta.url);
const polyana = new URL("../images/Krasnaya_polyana.jpg", import.meta.url);
const baikal = new URL("../images/Baikal.jpg", import.meta.url);

const initialCards = [
  {
    name: "Калининград",
    link: kaliningrad,
  },
  {
    name: "Казань",
    link: kazan,
  },
  {
    name: "Екатеринбург",
    link: ekaterinburg,
  },
  {
    name: "Санкт-Петербург",
    link: piter,
  },
  {
    name: "Красная поляна",
    link: polyana,
  },
  {
    name: "Байкал",
    link: baikal,
  },
];

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn_action_add",
  inactiveButtonClass: "popup__btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddPlace = document.querySelector(".profile__add-button");
const formProfileEdit = document.querySelector(
  ".popup__form_action_edit-profile"
);
const nameInput = formProfileEdit.querySelector(".popup__input_type_name");

const jobInput = formProfileEdit.querySelector(".popup__input_type_about");

export {
  initialCards,
  validationSettings,
  buttonEditProfile,
  buttonAddPlace,
  nameInput,
  jobInput,
};
