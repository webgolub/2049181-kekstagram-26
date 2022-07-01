import {createThumbnail} from './create-thumbnail.js';
import {openPictureModal, closePictureModal} from './render-modal.js';
import {isEscKey} from './util.js';

const thumbnailsContainer = document.querySelector('.pictures');
// Кнопка закрытия модального окна
const modalCloseButton = document.querySelector('.big-picture').querySelector('#picture-cancel');

// Обработчик нажатия на клавишу ESC
const onModalEscKeydown = (evt) => {
  if (isEscKey(evt)){
    evt.preventDefault();
    closePictureModal();
  }
};

// Обработчик клика по кнопке закрытия модального окна
const onModalCloseButtonClick = (evt) => {
  evt.preventDefault();
  closePictureModal();
};


const renderThumbnail = (photo) => {
  const thumbnail = createThumbnail(photo);

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPictureModal(photo);
    modalCloseButton.addEventListener('click', onModalCloseButtonClick);
    document.addEventListener('keydown', onModalEscKeydown);
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  thumbnailsContainer.append(...photos.map(renderThumbnail));
};

export {renderThumbnails, onModalCloseButtonClick, onModalEscKeydown};
