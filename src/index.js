import './pages/index.css';
import { createCard, removeCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js'
import { enableValidation, clearValidation} from './components/validation.js';
import { getUserInfoApi, getCardsApi, updateUserInfoApi, addNewCardApi, updateAvatarApi} from './scripts/api.js'

// DOM узлы
const cardList = document.querySelector('.places__list');
const popupAll = document.querySelectorAll('.popup');
const closeButtonAll = document.querySelectorAll('.popup__close');
//Edit Profile
const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit= document.querySelector('.popup_type_edit');
const formEdit = document.querySelector('form[name="edit-profile"]');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
//New Card
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewPlace = document.querySelector('form[name="new-place"]');
const cardNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
const linkInput = formNewPlace.querySelector('.popup__input_type_url');
//Image popup
const imagePopup =   document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
//New Avatar
const avatarButton = document.querySelector('.profile__image-avatar-button');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formNewAvatar = document.querySelector('form[name="new-avatar"]');
const avatarInput = formNewAvatar.querySelector('#input_avatar-link');
//для хранения _id пользователя
let userId;

Promise.all([getUserInfoApi(), getCardsApi()])
    .then (([userInfo, cards]) => {
        userId = userInfo._id;

        profileTitle.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;

        console.log(userInfo);
        profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

        cards.forEach(cardData => {
            cardList.append(createCard(cardData, removeCard, likeCard, openPopupCard, userId));
        });
    })
    .catch(err => console.log(err));

//Объект настроек для проверки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//Включение валидации 
enableValidation(validationConfig);

//Закрытие модального окна через "Крестик"
closeButtonAll.forEach(function(button){
    button.addEventListener('click', function(evt) {
        const openedModal = evt.target.closest('.popup');
        closeModal(openedModal);
    });
});

//Добавление анимации
popupAll.forEach (function(popup){
    popup.classList.add('popup_is-animated');
});

//Открытие окна "Редактировать профиль"
function handleEditButtonClick() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(formEdit,validationConfig);
    openModal(popupTypeEdit);
}

editButton.addEventListener('click', handleEditButtonClick);

//Редактирование имени и информации о себе
function handleFormEditSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newAbout = jobInput.value;
    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    updateUserInfoApi(newName, newAbout)
        .then((updatedUser) => {
            profileTitle.textContent = updatedUser.name;
            profileDescription.textContent = updatedUser.about;
            closeModal(popupTypeEdit);
        })
         .catch((err) => { 
            console.log(err);
        })
        .finally(() => submitButton.textContent = 'Сохранить');
}

formEdit.addEventListener('submit', handleFormEditSubmit);

//Открытие окна "Обновить аватар"
function handleAvatarButtonClick() {
    formNewAvatar.reset();
    clearValidation(formNewAvatar, validationConfig);
    openModal(popupAvatar);
}

avatarButton.addEventListener('click', handleAvatarButtonClick);

//Добавление ссылки на новый аватар
function handleFormNewAvatarSubmit(evt) {
    evt.preventDefault();
    const newAvatarLink = avatarInput.value;
    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    updateAvatarApi(newAvatarLink)
        .then((updatedUser) => {
            profileImage.style.backgroundImage = `url(${updatedUser.avatar})`;
            closeModal(popupAvatar);
        })
        .catch((err) => { 
            console.log(err);
        })
        .finally(() => submitButton.textContent = 'Сохранить');
}

formNewAvatar.addEventListener('submit', handleFormNewAvatarSubmit);

//Открытие Формы добавления карточки
function handleAddButtonClick() {
    formNewPlace.reset();
    clearValidation(formNewPlace, validationConfig);
    openModal(popupNewCard);
}

addButton.addEventListener('click', handleAddButtonClick);

//Добавление новой карточки
function handleFormNewPlaceSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.target.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    const newCardData = {
        name: cardNameInput.value,
        link: linkInput.value
    };

    addNewCardApi(newCardData.name, newCardData.link)
        .then((createdCard) => {
            cardList.prepend(createCard(createdCard, removeCard, likeCard, openPopupCard, userId ))

            formNewPlace.reset();
            clearValidation(formNewPlace, validationConfig);
            closeModal(popupNewCard);
        })
        .catch((err) => { 
            console.log(err);
        })
        .finally(() => submitButton.textContent = 'Сохранить');
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

//Открытие попапа с картинкой
function openPopupCard (title, link) {
    popupImage.src = link;
    popupImage.alt = title;
    popupCaption.textContent = title;

    openModal(imagePopup);
}

