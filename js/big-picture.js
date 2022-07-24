import { isEscKey } from './util.js';
import { COMMENTS_BLOCK_SIZE } from './const.js';

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
// Подпись к большому изображению
const modalSocialCaption = modalWindow.querySelector('.social__caption');
// Количество отображённых комментариев
const modalSocialCommentsCount = modalWindow.querySelector('.social__comment-count');
// Кнопка загрузки новой порции комментариев
const commentsLoaderButton = modalWindow.querySelector('.social__comments-loader');
// Колбэк обработчика кнопки закрытия попапа большого изображения
let bigPictureCloseButtonClickHandler = null;
// Колбэк обработчика нажатия ESC на попапе большого изображения
let bigPictureEscKeydownHandler = null;
// Архив элементов комментариев текущей фотографии
let currentComments = [];
// Счётчик для показа больше 5 комментариев
let commentsCounter = COMMENTS_BLOCK_SIZE;

// Функция получения колбэка обработчика кнопки закрытия попапа большого изображения
const setBigPictureCloseButtonClickHandler = (callback) => {
  bigPictureCloseButtonClickHandler = callback;
};

// Функция получения колбэка обработчика нажатия ESC на попапе большого изображения
const setBigPictureEscKeydownHandler = (callback) => {
  bigPictureEscKeydownHandler = (evt) => {
    if (isEscKey(evt)){
      evt.preventDefault();

      callback();
    }
  };
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

// Функция показа/скрытия кнопки «дозагрузки» нового блока комментариев
const handleCommentsLoaderButton = () => {
  if (currentComments.length === modalCommentsContainer.children.length) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
};

// Функция сброса счётчика и архива комментариев в исходное состояние
const resetCurrentComments = () => {
  commentsCounter = COMMENTS_BLOCK_SIZE;
  currentComments = [];
};

// Функция обновления количества отрисованных комментариев
const updateCommentsCount = () => {
  modalSocialCommentsCount.innerHTML =`${modalCommentsContainer.children.length} из <span class="comments-count">${currentComments.length}</span> комментариев`;
};

// Функция рендера комментариев на модальном окне просмотра полноразмерного изображения
const renderComments = (comments) => {
  modalCommentsContainer.append(...comments.map(createComment));
};

// Обработчик клика по кнопке дозагрузки комментариев
const commentsLoaderButtonClickHandler = () => {
  renderComments(currentComments.slice(commentsCounter, commentsCounter + COMMENTS_BLOCK_SIZE));
  updateCommentsCount();
  handleCommentsLoaderButton();
  commentsCounter += COMMENTS_BLOCK_SIZE;
};

// Функция показа комментариев на модальном окне просмотра полноразмерного изображения
const showComments = (comments) => {
  currentComments = comments;

  if (currentComments.length <= COMMENTS_BLOCK_SIZE) {
    renderComments(currentComments);
  } else {
    renderComments(currentComments.slice(0, COMMENTS_BLOCK_SIZE));
    commentsLoaderButton.addEventListener('click', commentsLoaderButtonClickHandler);
  }
};

// Функция рендера модального окна просмотра полноразмерного изображения
const renderModalWindow = ({url, likes, comments, description}) => {
  modalBigPicture.src = url;
  modalLikesCount.textContent = likes;
  modalSocialCaption.textContent = description;
  modalCommentsContainer.textContent = '';
  showComments(comments);
  updateCommentsCount();
  handleCommentsLoaderButton();
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
  commentsLoaderButton.removeEventListener('click', commentsLoaderButtonClickHandler);
  // 3. Вернуть счётчик и архив комментариев в исходное состояние
  resetCurrentComments();
};

export {
  showBigPicture,
  hideBigPicture,
  setBigPictureCloseButtonClickHandler,
  setBigPictureEscKeydownHandler
};
