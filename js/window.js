import { isEscKey } from './util.js';

// Шаблон попапа об успешной отправке
const successUploadModal = document.querySelector('#success').content.querySelector('.success');
// Кнопка закрытия попапа об успешной отправке данных
const successUploadTemplateCloseButton = successUploadModal.querySelector('.success__button');
// Шаблон попапа об ошибке при отправке
const failUploadModal = document.querySelector('#error').content.querySelector('.error');
// Кнопка закрытия попапа об ошибке при отправке
const failUploadTemplateCloseButton = failUploadModal.querySelector('.error__button');

// Обработчик клика по кнопке закрытия окна о статусе загрузки данных
const modalWindowCloseButtonClickHandler = (evt) => {
  if (evt.target.className === 'success__button') {
    closeSuccessUploadModal();
  } else {
    closeFailUploadModal();
  }
};

// Обработчик нажатия ESC на окне о статусе загрузки данных
const modalWindowEscKeydownHandler  = (evt) => {
  if (isEscKey(evt)) {
    if ((document.querySelector('.success'))) {
      closeSuccessUploadModal();
    } else {
      closeFailUploadModal();
    }
  }
};

// Обработчик клика по зоне вокруг окна об успешной отправке
const successWindowWrapperClickHandler = (evt) => {
  if (evt.target.className !== 'success__inner' &&
      evt.target.className !== 'success__title') {
    closeSuccessUploadModal();}
};

// Обработчик клика по зоне вокруг окна об ошибке при отправке
const errorWindowWrapperClickHandler = (evt) => {
  if (evt.target.className !== 'error__inner' &&
      evt.target.className !== 'error__title') {
    closeFailUploadModal();
  }
};

// Функция показа окна об успешной загрузке данных
const showSuccessUploadModal = () => {
  document.body.append(successUploadModal);
  successUploadTemplateCloseButton.addEventListener('click', modalWindowCloseButtonClickHandler);
  document.addEventListener('keydown', modalWindowEscKeydownHandler);
  successUploadModal.addEventListener('click', successWindowWrapperClickHandler);
};

// Функция закрытия окна об успешной загрузке данных
function closeSuccessUploadModal () {
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', modalWindowEscKeydownHandler);
  successUploadModal.remove();
}

// Функция показа окна о неудачной загрузке данных
const showFailUploadModal = () => {
  document.body.append(failUploadModal);
  document.addEventListener('keydown', modalWindowEscKeydownHandler);
  failUploadTemplateCloseButton.addEventListener('click', modalWindowCloseButtonClickHandler);
  failUploadModal.addEventListener('click', errorWindowWrapperClickHandler);

};

// Функция закрытия окна о неудачной загрузке данных
function  closeFailUploadModal () {
  document.removeEventListener('keydown', modalWindowEscKeydownHandler);
  failUploadModal.remove();
}

export {
  showSuccessUploadModal,
  closeSuccessUploadModal,
  showFailUploadModal,
  closeFailUploadModal
};
