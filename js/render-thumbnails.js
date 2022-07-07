import {createThumbnail } from './create-thumbnail.js';
import { openPictureModal, closePictureModal } from './render-modal.js';
import { isEscKey } from './util.js';
import { closeUploadOverlay } from './editor.js';

// Значения атрибута name для текстовых полей
const TEXT_FIELD_NAMES = ['hashtags', 'description'];
const thumbnailsContainer = document.querySelector('.pictures');

const isNotTextFields = (evt) => ! TEXT_FIELD_NAMES.includes(evt.target.name);

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

// Обработчик клика по кнопке закрытия оверлея редактирования загружаемого изображения
const onImgUploadOverlayCancelButtonClick = (evt) => {
  evt.preventDefault();
  closeUploadOverlay();
};

// Обработчик нажатия на клавишу ESC на оверлее редактирования загружаемого изображения
const onImgUploadOverlayEscKeydown = (evt) => {
  if (isEscKey(evt) && isNotTextFields(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
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

export {renderThumbnails, onModalCloseButtonClick, onModalEscKeydown, onImgUploadOverlayCancelButtonClick, onImgUploadOverlayEscKeydown};
