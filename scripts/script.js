let editButton = document.querySelector('.profile__edit-button');
let closePopUpButton = document.querySelector('.popup__btn_action_close');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement  .querySelector('.popup__input_type_about');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description')

function openPopUp() {
  let popUp = document.querySelector('.popup');
  popUp.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopUp() {
  let popUp = document.querySelector('.popup');
  popUp.classList.remove('popup_opened');
}

 function formSubmitHandler(evt) {
   evt.preventDefault();
   if (nameInput.value.trim() !== '' && jobInput.value.trim() !== '' ) {
     profileName.textContent = nameInput.value.trim();
     profileJob.textContent = jobInput.value.trim();
     closePopUp();
   }
 }

editButton.addEventListener('click', openPopUp);
closePopUpButton.addEventListener('click', closePopUp);
formElement.addEventListener('submit', formSubmitHandler);
