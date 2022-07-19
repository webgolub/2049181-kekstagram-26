const RANDOM_PICTURES_COUNT = 10;
const filtersSelector = document.querySelector('.img-filters');
let selectedFilterButton = document.querySelector('#filter-default');
let filterChangeCallback = null;

const setFilterChangeHandler = (callback) => {
  filterChangeCallback = callback;
};

const filterButtonClickHandler = (evt) => {
  switch (evt.target.id){
    case 'filter-default':
      if (selectedFilterButton.id !== 'filter-default'){
        evt.target.classList.add('img-filters__button--active');
        selectedFilterButton.classList.remove('img-filters__button--active');
        selectedFilterButton = evt.target;
      }
      break;

    case 'filter-random':
      if (selectedFilterButton.id !== 'filter-random'){
        evt.target.classList.add('img-filters__button--active');
        selectedFilterButton.classList.remove('img-filters__button--active');
        selectedFilterButton = evt.target;
      }
      break;

    case 'filter-discussed':
      if (selectedFilterButton.id !== 'filter-discussed'){
        evt.target.classList.add('img-filters__button--active');
        selectedFilterButton.classList.remove('img-filters__button--active');
        selectedFilterButton = evt.target;
      }
      break;
  }
  filterChangeCallback();
};


const filterPictures = (pictures) => {
  filtersSelector.classList.remove('img-filters--inactive');
  let filteredPictures = pictures;

  switch (selectedFilterButton.id){
    case 'filter-random':
      filteredPictures = pictures.slice().sort(() => 0.5 - Math.random()).slice(0, RANDOM_PICTURES_COUNT);
      break;

    case 'filter-discussed':
      filteredPictures = pictures.slice().sort((pictureA, pictureB) =>
        pictureB.comments.length - pictureA.comments.length
      );
      break;
  }
  return filteredPictures;
};

filtersSelector.addEventListener('click', filterButtonClickHandler);

export { setFilterChangeHandler, filterPictures };
