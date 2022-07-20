import { getData } from './api.js';
import { renderPictures, deleteRenderedPictures } from './picture.js';
import { debounce, showAlert } from './util.js';
import {filterPictures, showFiltersSelector, setFilterChangeHandler} from './filter.js';
import './form.js';

// Отрисовка миниатюр
getData((pictures) => {
  showFiltersSelector();
  renderPictures(pictures);
  setFilterChangeHandler(
    debounce(() => {
      deleteRenderedPictures();
      renderPictures(filterPictures(pictures));
    },
    )
  );
},
() => {
  showAlert('Данные с сервера не получены. Попробуйте обновить страницу');
});
