// Отрисовка окна с полноразмерным изображением
const overlay = document.querySelector('.big-picture');

const commentsContainer = overlay.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector(':first-child').cloneNode(true);

const closeBigPictureEscHandler = (evt) => {
  if (evt.keyCode === 27){
    overlay.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener ('keydown', closeBigPictureEscHandler);
  }
};

const closeBigPictureClickHandler = () => {
  overlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener ('keydown', closeBigPictureEscHandler);
};

const renderComments = (elements) => {

  const elementsArray = [];
  commentsContainer.textContent = '';
  for (let i = 0; i < elements.length; i++) {
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('img').src = elements[i].avatar;
    comment.querySelector('img').alt = elements[i].name;
    comment.querySelector('.social__text').textContent = elements[i].message;
    elementsArray.push(comment);
    commentsContainer.append(...elementsArray);
  }
};

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
