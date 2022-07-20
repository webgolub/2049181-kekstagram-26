const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};
const RANDOM_PICTURES_COUNT = 10;
const filtersSelector = document.querySelector('.img-filters');
let filterChangeCallback = null;

const setFilterChangeHandler = (callback) => {
  filterChangeCallback = callback;
};

const showFiltersSelector = () => filtersSelector.classList.remove('img-filters--inactive');

const filterButtonClickHandler = (evt) => {
  if (!evt.target.classList.contains('img-filters')){
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    if (!filtersSelector.classList.contains('img-filters--inactive')){
      filterChangeCallback();
    }
  }
};

const filterPictures = (pictures) => {
  let filteredPictures = pictures;

  switch (document.querySelector('.img-filters__button--active').id){
    case Filter.DEFAULT:
      filteredPictures = pictures.slice();
      break;

    case Filter.RANDOM:
      filteredPictures = pictures.slice().sort(() => 0.5 - Math.random()).slice(0, RANDOM_PICTURES_COUNT);
      break;

    case Filter.DISCUSSED:
      filteredPictures = pictures.slice().sort((pictureA, pictureB) =>
        pictureB.comments.length - pictureA.comments.length
      );
      break;
  }
  return filteredPictures;
};

filtersSelector.addEventListener('click', filterButtonClickHandler);

export { setFilterChangeHandler, showFiltersSelector, filterPictures };
