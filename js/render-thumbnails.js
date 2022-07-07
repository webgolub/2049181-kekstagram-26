import {createThumbnail } from './create-thumbnail.js';
import { openPictureModal, closePictureModal } from './render-modal.js';
import { isEscKey } from './util.js';

const thumbnailsContainer = document.querySelector('.pictures');

// Обработчик нажатия на клавишу ESC на оверлее просмотра большого изображения
const onModalEscKeydown = (evt) => {
  if (isEscKey(evt)){
    evt.preventDefault();
    closePictureModal();
  }
};

// Обработчик клика по кнопке закрытия оверлея просмотра большого изображения
const onModalCloseButtonClick = (evt) => {
  evt.preventDefault();
  closePictureModal();
};

// Функция создания одной миниатюры
const renderThumbnail = (photo) => {
  const thumbnail = createThumbnail(photo);

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPictureModal(photo);
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  thumbnailsContainer.append(...photos.map(renderThumbnail));
};

export { renderThumbnails, onModalCloseButtonClick, onModalEscKeydown };
