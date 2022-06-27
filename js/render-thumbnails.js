// Нахождение шаблона миниатюры
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
// Нахождение контейнера для миниатюр в разметке
const thumbnailsContainer = document.querySelector('.pictures');

// Функция для отрисовки миниатюр на основе массива объектов
const renderThumbnails = (thumbnails) => {
  const thumbnailsContainerFragment = document.createDocumentFragment();

  thumbnails.forEach(({url, comments, likes}) => {
    const element = thumbnailTemplate.cloneNode(true);
    element.querySelector('img').src = url;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.querySelector('.picture__likes').textContent = likes;
    thumbnailsContainerFragment.appendChild(element);
  });

  thumbnailsContainer.appendChild(thumbnailsContainerFragment);
};

export {renderThumbnails};
