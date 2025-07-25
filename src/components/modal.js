export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape);
    popup.addEventListener('click', closeModalByOverlay);
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape);
    popup.removeEventListener('click', closeModalByOverlay);
}

function closeModalByOverlay(evt){
    if(!evt.target.classList.contains('.popup__content')) {
        closeModal(evt.target);
    }
}

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
        closeModal(openedPopup);
        }
    }
}