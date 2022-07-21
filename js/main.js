import { getData } from './api.js';
import { debounce, showAlert } from './util.js';
import { renderPictures, removePictures } from './picture.js';
import { showFilters, setFilterChangeHandler} from './filter.js';
import { filterPictures } from './filter-pictures.js';
import './form.js';
import { FilterType } from './const.js';

// Отрисовка миниатюр
getData((pictures) => {
  showFilters();
  renderPictures(pictures);
  setFilterChangeHandler(
    debounce((filterType) => {
      if (FilterType === FilterType.DEFAULT){
        return;
      }
      removePictures();
      renderPictures(filterPictures(pictures, filterType));
    },
    )
  );
},
() => {
  showAlert('Данные с сервера не получены. Попробуйте обновить страницу');
});
