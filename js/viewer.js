const overlay = document.querySelector('.big-picture');
const commentsContainer = overlay.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector(':first-child').cloneNode(true);

// Обработчик события - закрытие модального окна по клавише ESC
const closeBigPictureEscHandler = (evt) => {
  if (evt.keyCode === 27){
    overlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener ('keydown', closeBigPictureEscHandler);
    // eslint-disable-next-line no-use-before-define
    overlay.querySelector('#picture-cancel').addEventListener('click', closeBigPictureClickHandler);
  }
};

// Обработчик события - закрытие модального окна по клику на кнопку закрытия
const closeBigPictureClickHandler = function () {
  overlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener ('keydown', closeBigPictureEscHandler);
  overlay.querySelector('#picture-cancel').addEventListener('click', closeBigPictureClickHandler);
};

// Функция рендера комменариев внутри модального окна
const renderComments = (items) => {

  const elementsArray = [];
  commentsContainer.textContent = '';
  for (let i = 0; i < items.length; i++) {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('img').src = items[i].avatar;
    comment.querySelector('img').alt = items[i].name;
    comment.querySelector('.social__text').textContent = items[i].message;
    elementsArray.push(comment);
    commentsContainer.append(...elementsArray);
  }
};

// Функция рендера модального окна просмотра полноразмерного изображения
const renderFullsizeViewer = ({url, likes, comments, description}) => function (evt) {
  evt.preventDefault();
  overlay.classList.remove('hidden');
  overlay.querySelector('#picture-cancel').addEventListener('click', closeBigPictureClickHandler);
  overlay.querySelector('.big-picture__img').querySelector('img').src = url;
  overlay.querySelector('.likes-count').textContent = likes;
  overlay.querySelector('.comments-count').textContent = comments.length;
  overlay.querySelector('.social__caption').textContent = description;
  renderComments(comments);
  overlay.querySelector('.social__comment-count').classList.add('hidden');
  overlay.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', closeBigPictureEscHandler);
};

export {renderFullsizeViewer};
