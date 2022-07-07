import { onImgUploadOverlayCancelButtonClick, onImgUploadOverlayEscKeydown } from './render-thumbnails.js';


// Форма загрузки изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');
// Поле загрузки изображения
const uploadFileInput = uploadForm.querySelector('#upload-file');
// Попап (форма) редактирования загружаемого изображения
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
// Кнопка закрытия оверлея
const imgUploadOverlayCancellButton = uploadForm.querySelector('#upload-cancel');
// Проверка что фокус не на текстовых полях во время события


// Функция закрытия оверлея редактирования загружаемого изображения
const closeUploadOverlay = () => {

  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadForm.reset();
  document.removeEventListener('keydown', onImgUploadOverlayEscKeydown);
  imgUploadOverlayCancellButton.removeEventListener('click', onImgUploadOverlayCancelButtonClick);
};

// Событие изменения поля загрузки изображения
uploadFileInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');


  document.addEventListener('keydown', onImgUploadOverlayEscKeydown);
  imgUploadOverlayCancellButton.addEventListener('click', onImgUploadOverlayCancelButtonClick);
});

export {closeUploadOverlay};
