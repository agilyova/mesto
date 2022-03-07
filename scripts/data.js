const initialCards = [
  {
    name: "Калининград",
    link: "images/kaliningrad.jpg",
  },
  {
    name: "Казань",
    link: "images/Kazan.jpg",
  },
  {
    name: "Екатеринбург",
    link: "images/Ekaterinburg.jpg",
  },
  {
    name: "Санкт-Петербург",
    link: "images/St.Petersburg.jpg",
  },
  {
    name: "Красная поляна",
    link: "images/Krasnaya_polyana.jpg",
  },
  {
    name: "Байкал",
    link: "images/Baikal.jpg",
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

export { initialCards, validationSettings };
