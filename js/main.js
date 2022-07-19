import { getData } from './api.js';
import { renderPictures } from './picture.js';
import { debounce, showAlert } from './util.js';
import {filterPictures, setFilterChangeHandler} from './filter.js';
import './form.js';

// Отрисовка миниатюр
getData((pictures) => {
  renderPictures(filterPictures(pictures));
  setFilterChangeHandler(
    debounce(() => renderPictures(filterPictures(pictures)),
    )
  );
},
() => {
  showAlert('Данные с сервера не получены. Попробуйте обновить страницу');
});
