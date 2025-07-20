import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js'

// DOM узлы
const cardList = document.querySelector('.places__list');
const popupAll = document.querySelectorAll(".popup");
//Edit Profile
const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit= document.querySelector('.popup_type_edit');
const formEdit = document.querySelector('form[name="edit-profile"]');
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
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

// Функция удаления карточки
function removeCard(evt) {
    const itemDelete = evt.target.closest('.card');
    itemDelete.remove();
}

//Лайк карточки
function likeCard(evt){
    if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

// Вывод карточки на страницу
initialCards.forEach (function(itemData) {
    cardList.append(createCard(itemData, removeCard, likeCard, openPopupCard));
});

//Добавление анимации
popupAll.forEach (function(popup){
    popup.classList.add('popup_is-animated');
})

//Открытие окна "Редактировать профиль"
function handleEditButtonClick() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupTypeEdit);
}

editButton.addEventListener('click', handleEditButtonClick);

//Редактирование имени и информации о себе

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(popupTypeEdit);
}

formEdit.addEventListener('submit', handleFormEditSubmit);

//Открытие Формы добавления карточки
function handleAddButtonClick() {
    openModal(popupNewCard);
}

addButton.addEventListener('click', handleAddButtonClick);

//Добавление новой карточки
function handleFormNewPlaceSubmit(evt) {
    evt.preventDefault();
    
    const newCardData = {
        name: cardNameInput.value,
        link: linkInput.value
    };
    
    cardList.prepend(createCard(newCardData, removeCard, likeCard, openPopupCard ))

    formNewPlace.reset();
    closeModal(popupNewCard);
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

//Открытие попапа с картинкой
function openPopupCard (title, link) {
    popupImage.src = link;
    popupImage.alt = title;
    popupCaption.textContent = title;

    openModal(imagePopup);
}

