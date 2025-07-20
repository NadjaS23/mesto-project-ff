// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

// @todo: Функция создания карточки

export function createCard(itemData, removeCard, likeCard, openPopupCard ) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle =  cardElement.querySelector('.card__title');

    cardImage.src = itemData.link;
    cardImage.alt = itemData.name; 
    cardTitle.textContent = itemData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);

    const likeButton = cardElement.querySelector('.card__like-button')
    likeButton.addEventListener('click', likeCard);

    cardImage.addEventListener('click', () => openPopupCard(itemData.name, itemData.link));

    return cardElement;
}

// Функция удаления карточки
export function removeCard(evt) {
    const itemDelete = evt.target.closest('.card');
    itemDelete.remove();
}

//Лайк карточки
export function likeCard(evt){
    if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}


