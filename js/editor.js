import { isEscKey } from './util.js';

// Значения атрибута name для текстовых полей
const TEXT_FIELD_NAMES = ['hashtags', 'description'];
// Форма загрузки изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');
// Поле загрузки изображения
const uploadFileInput = uploadForm.querySelector('#upload-file');
// Попап (форма) редактирования загружаемого изображения
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
// Кнопка закрытия оверлея
const imgUploadOverlayCancellButton = uploadForm.querySelector('#upload-cancel');

const isNotTextFields = (evt) => ! TEXT_FIELD_NAMES.includes(evt.target.name);

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

// Функция закрытия оверлея редактирования загружаемого изображения
function closeUploadOverlay () {

  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadForm.reset();
  document.removeEventListener('keydown', onImgUploadOverlayEscKeydown);
  imgUploadOverlayCancellButton.removeEventListener('click', onImgUploadOverlayCancelButtonClick);
}

// Событие изменения поля загрузки изображения
uploadFileInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');


  document.addEventListener('keydown', onImgUploadOverlayEscKeydown);
  imgUploadOverlayCancellButton.addEventListener('click', onImgUploadOverlayCancelButtonClick);
});

export {closeUploadOverlay};
