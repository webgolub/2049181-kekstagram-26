import { getData } from './api.js';
import { renderPictures, deleteRenderedPictures } from './picture.js';
import { showAlert } from './util.js';
import './form.js';
// !!! Не забыть разобраться с имрортом из filter.js
import './filter.js';

// Отрисовка миниатюр
getData((pictures) => {

  renderPictures(pictures);
},
() => {
  showAlert('Данные с сервера не получены. Попробуйте обновить страницу');
});
// !!! Не забыть рарзобраться с этой функцией
deleteRenderedPictures();
