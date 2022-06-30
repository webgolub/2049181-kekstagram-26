import { renderFullsizeViewer } from './viewer.js';
const element = thumbnailTemplate.cloneNode(true);

// Нахождение шаблона миниатюры
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
// Нахождение контейнера для миниатюр в разметке
const thumbnailsContainer = document.querySelector('.pictures');

// Функция для отрисовки миниатюр на основе массива объектов
const renderThumbnails = (photos) => {

  const thumbnailElements = [];
  photos.forEach(({url, comments, likes, description}) => {

    const thumbnailClickHandler = renderFullsizeViewer({url, comments, likes, description});
    element.querySelector('img').src = url;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.querySelector('.picture__likes').textContent = likes;
    element.addEventListener('click', thumbnailClickHandler);
    thumbnailElements.push(element);
  });

  thumbnailsContainer.append(...thumbnailElements);
};

// Обработчик событий для миниатюры
const thumbnailClickHandler = (thumbnail) => {
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderFullsizeViewer(thumbnail);

  });
};

export {renderThumbnails};
