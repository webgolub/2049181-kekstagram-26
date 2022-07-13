import {onModalEscKeydown, onModalCloseButtonClick} from './picture.js';

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
const openPictureModal = (photo) => {
  // 1. Показать окно
  renderModalWindow(photo);
  modalWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  // 2. Добавить обработчики для закрытия
  modalCloseButton.addEventListener('click', onModalCloseButtonClick);
  document.addEventListener('keydown', onModalEscKeydown);
};

// Функция закрытия модального окна
const closePictureModal = () => {
  // 1. Скрыть окно
  modalWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // 2. Удалить обработчики для закрытия
  modalCloseButton.removeEventListener('click', onModalCloseButtonClick);
  document.removeEventListener('keydown', onModalEscKeydown);
};

export {openPictureModal, closePictureModal};
