import { removeElement } from './util.js';
import {
  showBigPicture,
  hideBigPicture,
  setBigPictureCloseButtonClickHandler,
  setBigPictureEscKeydownHandler
} from './big-picture.js';


// Контейнер для миниатюр
const picturesContainer = document.querySelector('.pictures');
// Шаблон миниатюры
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


// Создание узла миниатюры из объекта фотографии
const createPicture = (picture) => {
  const {url, comments, likes} = picture;
  const thumbnail = pictureTemplate.cloneNode(true);

  thumbnail.querySelector('img').src = url;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

// Функция создания одной миниатюры
const renderThumbnail = (photo) => {
  const thumbnail = createPicture(photo);

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();

    showBigPicture(photo);
  });

  return thumbnail;
};

const removePictures = () => {
  picturesContainer.querySelectorAll('.picture').forEach(removeElement);
};

// Функция рендера миниатюр из объекта с данными
const renderPictures = (pictures) => {
  picturesContainer.append(...pictures.map(renderThumbnail));
};

// Установка колбэка обработчика кнопки закрытия попапа большого изображения
setBigPictureCloseButtonClickHandler(() => {
  hideBigPicture();
});

// Установка колбэка обработчика нажатия ESC на попапе большого изображения
setBigPictureEscKeydownHandler (() => {
  hideBigPicture();
});

export { renderPictures, removePictures };
