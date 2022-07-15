import { isEscKey } from './util.js';
import { resetScale, setScaleChangeHandler } from './scale.js';
import { resetEffects } from './effects.js';
import { validate } from './validate.js';
import { sendData } from './api.js';
import { showSuccessUploadModal, closeSuccessUploadModal, setModalCloseButtonClickHandler, setModalWindowEscKeydownHandler, setModalWindowWrapperClickHandler, showFailUploadModal, closeFailUploadModal} from './window.js';

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


// Функция установки коллбэка для функции отрисовки изменения масштаба изображения
setScaleChangeHandler((value) => {
  imgPreview.style.transform = `scale(${value / 100 })`;
});

// Установка колбэка для обработчика клика по кнопке закрытия окна информации о статусе загрузки данных
setModalCloseButtonClickHandler ((evt) => {
  if (evt.target.className === 'success__button') {
    closeSuccessUploadModal();
  } else {
    closeFailUploadModal();
  }
});

// Установка колбэка для обработчика нажатия ESC на окне информации о статусе загрузки данных
setModalWindowEscKeydownHandler ((evt) => {
  if (isEscKey(evt) & (document.body.lastChild.matches('.success'))) {
    closeSuccessUploadModal();
  } else if (isEscKey(evt)) {
    closeFailUploadModal();
  }
});

// Установка колбэка для обработчика клика по обёртке окна о статусе загрузки данных
setModalWindowWrapperClickHandler ((evt) => {
  if (evt.target.className === 'success') {
    closeSuccessUploadModal();
  } else if (evt.target.className === 'error') {
    closeFailUploadModal();
  }
});

// Проверка что фокус не на текстовых полях
const isNotTextFields = (evt) => ! TEXT_FIELD_NAMES.includes(evt.target.name);


// Функция сброса превью загружаемого изображения
const resetUploadPicture = () => {
  resetScale();
  resetEffects();
};

// Обработчик клика по кнопке закрытия оверлея редактирования загружаемого изображения
const onImgUploadOverlayCancelButtonClick = (evt) => {
  evt.preventDefault();
  resetUploadPicture();
  closeUploadOverlay();
};

// Обработчик нажатия на клавишу ESC на оверлее редактирования загружаемого изображения
const onImgUploadOverlayEscKeydown = (evt) => {
  const sendStatusWindow = document.querySelector('.error');
  if (isEscKey(evt) && isNotTextFields(evt) && !sendStatusWindow) {
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
      unblockSubmitButton();
      showFailUploadModal();
    },
    //body
    new FormData(uploadForm)
    );
  }
});


/* Обработчик события изменения формы, чтобы при закрытии попапа
   очищались предупреждения от старых проверок */
uploadForm.addEventListener('change', () => {
  validate();
});
