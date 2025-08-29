export const apiConfig = {
  apiUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: '70ba7b98-5460-4b30-aa50-9ca450779a58',
    'Content-Type': 'application/json'
  }
};

//Проверка статуса-ответа сервера
function checkStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

//Получение информации о пользователе с сервера
export function getUserInfoApi() {
  return fetch(`${apiConfig.apiUrl}/users/me`, {
  headers: apiConfig.headers
  })
  .then(checkStatus);
}

//Загрузка карточек с сервера
 export function getCardsApi() {
  return fetch(`${apiConfig.apiUrl}/cards`, {
  headers: apiConfig.headers
  })
  .then(checkStatus);
}

//Редактирование профиля
export function updateUserInfoApi( newName, newAbout ) {
  return fetch(`${apiConfig.apiUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({ 
      name: newName, 
      about: newAbout 
    })
  })
  .then(checkStatus);
};

//Добавление новой карточки
export function addNewCardApi(newName, newLink) {
  return fetch(`${apiConfig.apiUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: newName, 
      link: newLink
    }) 
  })
  .then(checkStatus);
};

//Удаление карточки
export function deleteCardApi (cardId) {
  return fetch(`${apiConfig.apiUrl}/cards/${cardId}`, {
    method: 'DELETE', 
    headers: apiConfig.headers
  })
  .then(checkStatus);
};

//Отображение количества лайков карточки
export function likeCardApi(cardId) {
  return fetch(`${apiConfig.apiUrl}/cards/likes/${cardId}`, {
    method: 'PUT', 
    headers: apiConfig.headers
  })
  .then(checkStatus);
};

//Снятие лайка
export function unlikeCardApi(cardId) {
  return fetch(`${apiConfig.apiUrl}/cards/likes/${cardId}`, {
    method: 'DELETE', 
    headers: apiConfig.headers
  })
  .then(checkStatus);
};

//Обновление аватара пользователя
export function updateAvatarApi(newAvatar) {
  return fetch(`${apiConfig.apiUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: apiConfig.headers,
      body: JSON.stringify({ 
        avatar: newAvatar 
      })
    })
    .then(checkStatus);
};