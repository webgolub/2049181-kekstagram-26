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
// Обработчик клика по зоне вокруг окна о статусе загрузки данных
const modalWindowWrapperClickHandler = (evt) => {
  if (evt.target.className === 'success') {
    closeSuccessUploadModal();
  } else if (evt.target.className === 'error') {
    closeFailUploadModal();
  }
};

// Функция показа окна об успешной загрузке данных
const showSuccessUploadModal = () => {
  document.body.append(successUploadModal);
  document.body.classList.add('modal-open');
  successUploadTemplateCloseButton.addEventListener('click', modalWindowCloseButtonClickHandler);
  document.addEventListener('keydown', modalWindowEscKeydownHandler);
  const windowSuccessWrapper = document.querySelector('.success');
  windowSuccessWrapper.addEventListener('click', modalWindowWrapperClickHandler);
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
  const windowFailWrapper = document.querySelector('.error');
  windowFailWrapper.addEventListener('click', modalWindowWrapperClickHandler);

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
