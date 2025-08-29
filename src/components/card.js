import { likeCardApi, unlikeCardApi, deleteCardApi } from "../scripts/api";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

// Функция создания карточки
export function createCard(itemData, removeCard, likeCard, openPopupCard, userId) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle =  cardElement.querySelector('.card__title');

    cardImage.src = itemData.link;
    cardImage.alt = itemData.name; 
    cardTitle.textContent = itemData.name;

    //кнопка удаления - показываем только для своих карточек
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (itemData.owner._id === userId) {
        deleteButton.addEventListener('click', () => removeCard(itemData._id, cardElement));
    } else {
        deleteButton.remove();
    }

    //лайки
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    likeCount.textContent = itemData.likes.length;

    if (itemData.likes.some((like) => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeButton.addEventListener('click', () => likeCard(itemData._id, likeButton, likeCount));

    cardImage.addEventListener('click', () => openPopupCard(itemData.name, itemData.link));

    return cardElement;
}

// Функция удаления карточки
export function removeCard(cardId, cardElement) {
    deleteCardApi(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => console.log(err));
}

//Лайк карточки
export function likeCard(cardId, likeButton, likeCount) {
    if (likeButton.classList.contains('card__like-button_is-active')) {
        unlikeCardApi(cardId)
            .then ((updatedCard) => {
               likeButton.classList.remove('card__like-button_is-active');
               likeCount.textContent = updatedCard.likes.length;
            })
            .catch((err) => console.log(err));
    } else {
        likeCardApi(cardId)
            .then((updatedCard) => {
               likeButton.classList.add('card__like-button_is-active');
               likeCount.textContent = updatedCard.likes.length;
            })
            .catch((err) => console.log(err));
    }
}

