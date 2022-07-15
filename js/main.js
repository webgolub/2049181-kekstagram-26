import { getData } from './api.js';
import { renderPictures } from './picture.js';
import { showAlert } from './util.js';
import './form.js';
import './validate.js';

// Отрисовка миниатюр
getData(renderPictures,
  () => {
    showAlert('Данные с сервера не получены. Попробуйте обновить страницу');
  }
);
