const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn_action_add",
  inactiveButtonClass: "popup__btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonEditAvatar = document.querySelector(".profile__avatar-container");
const buttonAddPlace = document.querySelector(".profile__add-button");
const formProfileEdit = document.querySelector(
  ".popup__form_action_edit-profile"
);
const nameInput = formProfileEdit.querySelector(".popup__input_type_name");

const jobInput = formProfileEdit.querySelector(".popup__input_type_about");

export {
  validationSettings,
  buttonEditProfile,
  buttonEditAvatar,
  buttonAddPlace,
  nameInput,
  jobInput,
};
