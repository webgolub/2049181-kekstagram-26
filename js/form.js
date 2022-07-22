import { isEscKey, showAlert } from './util.js';
import { resetScale, setScaleChangeHandler } from './scale.js';
import { resetEffects } from './effects.js';
import { validateUploadForm, checkFileTypeMatch } from './validate.js';
import { sendData } from './api.js';
import { showSuccessUploadModal, showFailUploadModal } from './window.js';

const TEXT_FIELD_NAMES = ['hashtags', 'description'];
// Форма загрузки изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');
// Поле загрузки изображения
const uploadFileInput = uploadForm.querySelector('#upload-file');
// Превью редактируемого изображения
const imgPreview = uploadForm.querySelector('.img-upload__preview img');
// Попап (форма) редактирования загружаемого изображения
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
// Кнопка закрытия оверлея
const imgUploadOverlayCancellButton = uploadForm.querySelector('#upload-cancel');
// Кнопка отправки формы
const imgUploadOverlaySubmitButton =  uploadForm.querySelector('.img-upload__submit');


// Функция установки коллбэка для функции отрисовки изменения масштаба изображения
setScaleChangeHandler((value) => {
  imgPreview.style.transform = `scale(${value / 100 })`;
});

// Проверка что фокус не на текстовых полях
const isNotTextFields = (evt) => ! TEXT_FIELD_NAMES.includes(evt.target.name);


// Функция сброса превью загружаемого изображения
const resetUploadPicture = () => {
  resetScale();
  resetEffects();
};

// Обработчик клика по кнопке закрытия оверлея редактирования загружаемого изображения
const imgUploadOverlayCancelButtonClickHandler = (evt) => {
  evt.preventDefault();
  resetUploadPicture();
  closeUploadOverlay();
};

// Обработчик нажатия на клавишу ESC на оверлее редактирования загружаемого изображения
const imgUploadOverlayEscKeydownHandler = (evt) => {
  if (isEscKey(evt) && isNotTextFields(evt)) {
    const isErrorWindowClosed = document.querySelector('.error') === null;
    if (isErrorWindowClosed) {
      evt.preventDefault();
      resetUploadPicture();
      closeUploadOverlay();
    }
  }
};

// Функция сброса состояния оверлея редактирования загружаемого изображения
const resetUploadOverlay = () => {
  uploadForm.reset();
  resetUploadPicture();
  URL.revokeObjectURL(imgPreview.src);
  imgPreview.src ='';
};

// Функция закрытия оверлея редактирования загружаемого изображения
function closeUploadOverlay () {

  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetUploadOverlay();
  document.removeEventListener('keydown', imgUploadOverlayEscKeydownHandler);
  imgUploadOverlayCancellButton.removeEventListener('click', imgUploadOverlayCancelButtonClickHandler);
}

// Функция отрисовки превью выбранного изображения
const renderPicturePreview = () => {
  const file = uploadFileInput.files[0];

  if (checkFileTypeMatch(file.name)) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

// Событие изменения поля загрузки изображения
uploadFileInput.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetUploadPicture();
  renderPicturePreview();
  validateUploadForm();

  document.addEventListener('keydown', imgUploadOverlayEscKeydownHandler);
  imgUploadOverlayCancellButton.addEventListener('click', imgUploadOverlayCancelButtonClickHandler);
});

// Функция блокирования кнопки отправки формы
const blockSubmitButton = () => {
  imgUploadOverlaySubmitButton.disabled = true;
  imgUploadOverlaySubmitButton.textContent = 'Публикую...';
};

// Функция разблокирования кнопки отправки формы
const unblockSubmitButton = () => {
  imgUploadOverlaySubmitButton.disabled = false;
  imgUploadOverlaySubmitButton.textContent = 'Опубликовать';
};

// Обработчик действия при отправке формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (! checkFileTypeMatch(uploadFileInput.files[0].name)) {
    showAlert('Выбран неверный тип файла. Закройте форму и выберите изображение для загрузки.');
    return;
  }

  if(! validateUploadForm()) {
    return;
  }

  blockSubmitButton();

  sendData(() => {
    // OnSucsess
    unblockSubmitButton();
    closeUploadOverlay();
    showSuccessUploadModal();
  },
  () => {
    // OnFail
    unblockSubmitButton();
    showFailUploadModal();
  },
  //body
  new FormData(uploadForm)
  );

});


