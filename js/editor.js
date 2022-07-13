import { isEscKey } from './util.js';
import { resetScale, setScaleChangeHandler } from './editor-scale.js';
import { resetEffects } from './editor-effects.js';
import { validate } from './validate.js';
import { sendData } from './api.js';

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
// Превью редактируемого изображения
const imgPreview = uploadForm.querySelector('.img-upload__preview img');
// Кнопка отправки формы
const imgUploadOverlaySubmitButton =  uploadForm.querySelector('.img-upload__submit');
// Шаблон сообщения об успешной отправке
const successUploadTemplate = document.querySelector('#success').content.querySelector('.success');
// Шаблон сообщения об ошибке при отправке
const errorUploadTemplate = document.querySelector('#error').content;

// Проверка что фокус не на текстовых полях
const isNotTextFields = (evt) => ! TEXT_FIELD_NAMES.includes(evt.target.name);

// Функция сброса превью загружаемого изображения
const resetUploadPicture = () => {
  resetScale();
  resetEffects();
};
// Функция установки коллбэка для функции отрисовки изменения масштаба изображения
setScaleChangeHandler((value) => {
  imgPreview.style.transform = `scale(${value / 100 })`;
});

// Обработчик клика по кнопке закрытия оверлея редактирования загружаемого изображения
const onImgUploadOverlayCancelButtonClick = (evt) => {
  evt.preventDefault();
  resetUploadPicture();
  closeUploadOverlay();
};

// Обработчик нажатия на клавишу ESC на оверлее редактирования загружаемого изображения
const onImgUploadOverlayEscKeydown = (evt) => {
  if (isEscKey(evt) && isNotTextFields(evt)) {
    evt.preventDefault();
    resetUploadPicture();
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
  resetUploadPicture();

  document.addEventListener('keydown', onImgUploadOverlayEscKeydown);
  imgUploadOverlayCancellButton.addEventListener('click', onImgUploadOverlayCancelButtonClick);
});

const blockSubmitButton = () => {
  imgUploadOverlaySubmitButton.disabled = true;
  imgUploadOverlaySubmitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  imgUploadOverlaySubmitButton.disabled = false;
  imgUploadOverlaySubmitButton.textContent = 'Опубликовать';
};

// Функция показа окна об успешной загрузке данных
const showSuccessUploadModal = () => {
  const modal = successUploadTemplate.cloneNode(true);
  modal.querySelector('.success__button').addEventListener('click', () => {
    resetUploadPicture();
    closeUploadOverlay();
    modal.remove();
  });
  document.body.append(modal);
};
showSuccessUploadModal();

// Обработчик действия при отправке формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = validate();
  if(isValid) {
    blockSubmitButton();
    sendData(() => {
      // OnSucsess
      unblockSubmitButton();
      resetUploadPicture();
      closeUploadOverlay();
      uploadForm.reset();
      showSuccessUploadModal();

    },
    () => {
    // OnFail

    },
    //body
    new FormData(uploadForm)
    );
  }
});


/* Обработчик события изменения формы чтобы при закрытии попапа
   очищались предупреждения от старых проверок */
uploadForm.addEventListener('change', () => {
  validate();
});
