import { isEscKey } from './util.js';
import { showBigPicture, hideBigPicture, setBigPictureCloseButtonClickHandler, setBigPictureEscKeydownHandler } from './big-picture.js';

// Контейнер для миниатюр
const picturessContainer = document.querySelector('.pictures');
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

// Обработчик нажатия на клавишу ESC на попапе просмотра большого изображения
const onModalEscKeydown = (evt) => {
  if (isEscKey(evt)){
    evt.preventDefault();

    hideBigPicture();
  }
};

// Обработчик клика по кнопке закрытия попапа просмотра большого изображения
const onModalCloseButtonClick = () => {
  hideBigPicture();
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

// Функция рендера миниатюр из объекта с данными
const renderPictures = (photos) => {
  picturessContainer.append(...photos.map(renderThumbnail));
};

// Установка колбэка обработчика кнопки закрытия попапа большого изображения
setBigPictureCloseButtonClickHandler(() => {
  onModalCloseButtonClick();
});
// Установка колбэка обработчика нажатия ESC на попапе большого изображения
setBigPictureEscKeydownHandler ((evt) => {
  onModalEscKeydown(evt);
});

export { renderPictures };
