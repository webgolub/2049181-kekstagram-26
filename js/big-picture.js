// Модальное окно просмотра большого изображения
const modalWindow = document.querySelector('.big-picture');
// Контейнер для комментариев в модальном окне
const modalCommentsContainer = modalWindow.querySelector('.social__comments');
// Шаблон комментария в модальном окне
const modalCommentTemplate = modalCommentsContainer.querySelector(':first-child');
// Кнопка закрытия модального окна
const modalCloseButton = modalWindow.querySelector('#picture-cancel');
// Большое изображение в модальном окне
const modalBigPicture = modalWindow.querySelector('.big-picture__img').querySelector('img');
// Счётчик лайков в модальном окне
const modalLikesCount = modalWindow.querySelector('.likes-count');
// Счётчик комментариев в модальном окне
const modalCommentsCount = modalWindow.querySelector('.comments-count');
// Подпись к большому изображению
const modalSocialCaption = modalWindow.querySelector('.social__caption');
// Количество отображённых комментариев
const modalSocialCommentsCount = modalWindow.querySelector('.social__comment-count');
// Кнопка загрузки новой порции комментариев
const modalCommentsLoaderButton = modalWindow.querySelector('.comments-loader');
// Колбэк обработчика кнопки закрытия попапа большого изображения
let bigPictureCloseButtonClickHandler = null;
// Колбэк обработчика нажатия ESC на попапе большого изображения
let bigPictureEscKeydownHandler = null;

// Функция получения колбэка обработчика кнопки закрытия попапа большого изображения
const setBigPictureCloseButtonClickHandler = (callback) => {
  bigPictureCloseButtonClickHandler = callback;
};

// Функция получения колбэка обработчика нажатия ESC на попапе большого изображения
const setBigPictureEscKeydownHandler = (callback) => {
  bigPictureEscKeydownHandler = callback;
};

// Функция создания DOM-узла комментария
const createComment = (comment) => {
  const newComment = modalCommentTemplate.cloneNode(true);
  const commentImage = newComment.querySelector('img');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

// Функция рендера модального окна просмотра полноразмерного изображения
const renderModalWindow = ({url, likes, comments, description}) => {
  modalBigPicture.src = url;
  modalLikesCount.textContent = likes;
  modalCommentsCount.textContent = comments.length;
  modalSocialCaption.textContent = description;
  modalCommentsContainer.replaceChildren(...comments.map(createComment));
  modalSocialCommentsCount.classList.add('hidden');
  modalCommentsLoaderButton.classList.add('hidden');
};

// Функция открытия модального окна
const showBigPicture = (photo) => {
  // 1. Показать окно
  renderModalWindow(photo);
  modalWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  // 2. Добавить обработчики для закрытия
  modalCloseButton.addEventListener('click', bigPictureCloseButtonClickHandler);
  document.addEventListener('keydown', bigPictureEscKeydownHandler);
};

// Функция закрытия модального окна
const hideBigPicture = () => {
  // 1. Скрыть окно
  modalWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // 2. Удалить обработчики для закрытия
  modalCloseButton.removeEventListener('click', bigPictureCloseButtonClickHandler);
  document.removeEventListener('keydown', bigPictureEscKeydownHandler);
};

export {showBigPicture, hideBigPicture, setBigPictureCloseButtonClickHandler, setBigPictureEscKeydownHandler };
