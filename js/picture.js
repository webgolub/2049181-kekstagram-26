import { openPictureModal, closePictureModal } from './big-picture.js';
import { isEscKey } from './util.js';
// Контейнер для миниатюр
const thumbnailsContainer = document.querySelector('.pictures');

// Нахождение шаблона миниатюры
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создание узла миниатюры из объекта фотографии
const createThumbnail = (photo) => {
  const {url, comments, likes} = photo;
  const thumbnail = thumbnailTemplate.cloneNode(true);


  thumbnail.querySelector('img').src = url;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

// Обработчик нажатия на клавишу ESC на оверлее просмотра большого изображения
const onModalEscKeydown = (evt) => {
  if (isEscKey(evt)){
    evt.preventDefault();
    closePictureModal();
  }
};

// Обработчик клика по кнопке закрытия оверлея просмотра большого изображения
const onModalCloseButtonClick = (evt) => {
  evt.preventDefault();
  closePictureModal();
};

// Функция создания одной миниатюры
const renderThumbnail = (photo) => {
  const thumbnail = createThumbnail(photo);

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPictureModal(photo);
  });

  return thumbnail;
};

const renderPictures = (photos) => {
  thumbnailsContainer.append(...photos.map(renderThumbnail));
};

export { renderPictures, onModalCloseButtonClick, onModalEscKeydown };
