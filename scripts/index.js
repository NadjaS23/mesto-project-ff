// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function cardCreate(itemData, cardRemove) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__image').src = itemData.link;
    cardElement.querySelector('.card__image').alt = itemData.name; 
    cardElement.querySelector('.card__title').textContent = itemData.name;

    const buttonDelete = cardElement.querySelector('.card__delete-button');
    buttonDelete.addEventListener('click', cardRemove);

    return cardElement;
}
// @todo: Функция удаления карточки
function cardRemove(evt) {
    const itemDelete = evt.target.closest('.card');
    itemDelete.remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach (function(itemData) {
    cardList.append(cardCreate(itemData, cardRemove));
});