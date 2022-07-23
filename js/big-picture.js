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
// Архив со всеми элементами комментариев текущей фотографии
let currentPictureAllComments = [];
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
  commentsLoaderButton.classList.add('hidden');

  return newComment;
};

// Функция показа кнопки дозагрузки комментариев
const showCommentsLoaderButton = () => {
  commentsLoaderButton.classList.remove('hidden');
};

// Функция скрытия кнопки дозагрузки комментариев
const hideCommentsLoaderButton = () => {
  commentsLoaderButton.classList.add('hidden');
};

// Обработчик клика по кнопке дозагрузки комментариев
const commentsLoaderButtonClickHandler = () => {
  currentPictureAllComments
    .slice(commentsCounter, commentsCounter + COMMENTS_BLOCK_SIZE)
    .forEach((comment) => {modalCommentsContainer.appendChild(comment);});

  modalSocialCommentsCount.innerHTML =`${modalCommentsContainer.children.length} из ${currentPictureAllComments.length} комментариев`;
  commentsCounter += COMMENTS_BLOCK_SIZE;

  if (modalCommentsContainer.children.length === currentPictureAllComments.length) {
    hideCommentsLoaderButton();
  }
};

// Функция рендера комментариев на модальном окне просмотра полноразмерного изображения
const renderComments = (comments) => {
  currentPictureAllComments = comments.map(createComment);
  let commentsToRender = currentPictureAllComments.slice();

  if (currentPictureAllComments.length > COMMENTS_BLOCK_SIZE) {
    commentsToRender = currentPictureAllComments.slice(0, COMMENTS_BLOCK_SIZE);
    showCommentsLoaderButton();
    commentsLoaderButton.addEventListener('click', commentsLoaderButtonClickHandler);
  }

  modalSocialCommentsCount.innerHTML =`${commentsToRender.length} из ${currentPictureAllComments.length} комментариев`;
  modalCommentsContainer.replaceChildren(...commentsToRender);
};

// Функция рендера модального окна просмотра полноразмерного изображения
const renderModalWindow = ({url, likes, comments, description}) => {
  modalBigPicture.src = url;
  modalLikesCount.textContent = likes;
  modalSocialCaption.textContent = description;
  renderComments(comments);
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
  commentsCounter = COMMENTS_BLOCK_SIZE;
};

export {
  showBigPicture,
  hideBigPicture,
  setBigPictureCloseButtonClickHandler,
  setBigPictureEscKeydownHandler
};
