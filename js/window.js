// Шаблон попапа об успешной отправке
const successUploadModal = document.querySelector('#success').content.querySelector('.success');
// Кнопка закрытия попапа об успешной отправке данных
const successUploadTemplateCloseButton = successUploadModal.querySelector('.success__button');
// Шаблон попапа об ошибке при отправке
const failUploadModal = document.querySelector('#error').content.querySelector('.error');
// Кнопка закрытия попапа об ошибке при отправке
const failUploadTemplateCloseButton = failUploadModal.querySelector('.error__button');

// Колбэк для обработчика клика по кнопке закрытия окна о статусе загрузки данных
let onModalWindowCloseButtonClick = null;
// Колбэк для обработчика нажатия ESC на окне о статусе загрузки данных
let onModalWindowEscKeydown  = null;
// Колбэк для обработчика клика по зоне вокруг окна о статусе загрузки данных
let onModalWindowWrapperClick = null;

// Установка колбэка для обработчика клика по кнопке закрытия окна о статусе загрузки данных
const setModalCloseButtonClickHandler = (callback) => {
  onModalWindowCloseButtonClick = callback;
};

// Установка колбэка для обработчика клика по зоне вокруг окна о статусе загрузки данных
const setModalWindowWrapperClickHandler = (callback) => {
  onModalWindowWrapperClick = callback;
};

// Установка колбэка для обработчика нажатия ESC на окне о статусе загрузки данных
const setModalWindowEscKeydownHandler = (callback) => {
  onModalWindowEscKeydown = callback;
};

// Функция создания или удаления обработчика события клика по обёртке окна о статусе загрузки данных
const createOrRemoveWindowWrapperClickHandler = (success, action) => {
  if (success === 'success') {
    const windowSuccessWrapper = document.querySelector('.success');

    if (action === 'remove') {
      windowSuccessWrapper.removeEventListener('click', onModalWindowWrapperClick);
    } else {
      windowSuccessWrapper.addEventListener('click', onModalWindowWrapperClick);
    }
  } else if (success === 'fail') {
    const windowFailWrapper = document.querySelector('.error');

    if (action === 'remove') {
      windowFailWrapper.removeEventListener('click', onModalWindowWrapperClick);
    } else {
      windowFailWrapper.addEventListener('click', onModalWindowWrapperClick);
    }
  }
};

// Функция показа окна об успешной загрузке данных
const showSuccessUploadModal = () => {
  document.body.append(successUploadModal);
  document.body.classList.add('modal-open');
  successUploadTemplateCloseButton.addEventListener('click', onModalWindowCloseButtonClick);
  document.addEventListener('keydown', onModalWindowEscKeydown);
  createOrRemoveWindowWrapperClickHandler('success');
};

// Функция закрытия окна об успешной загрузке данных
const closeSuccessUploadModal = () => {
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalWindowEscKeydown);
  successUploadTemplateCloseButton.removeEventListener('click', onModalWindowCloseButtonClick);
  createOrRemoveWindowWrapperClickHandler('success', 'remove');
  successUploadModal.remove();
};

// Функция показа окна о неудачной загрузке данных
const showFailUploadModal = () => {
  document.body.append(failUploadModal);
  document.addEventListener('keydown', onModalWindowEscKeydown);
  failUploadTemplateCloseButton.addEventListener('click', onModalWindowCloseButtonClick);
  createOrRemoveWindowWrapperClickHandler('fail');

};

// Функция закрытия окна о неудачной загрузке данных
const closeFailUploadModal = () => {
  document.removeEventListener('keydown', onModalWindowEscKeydown);
  failUploadTemplateCloseButton.removeEventListener('click', onModalWindowCloseButtonClick);
  createOrRemoveWindowWrapperClickHandler('fail','remove');
  failUploadModal.remove();
};
export { showSuccessUploadModal, closeSuccessUploadModal, setModalCloseButtonClickHandler, setModalWindowEscKeydownHandler, setModalWindowWrapperClickHandler, showFailUploadModal, closeFailUploadModal };
