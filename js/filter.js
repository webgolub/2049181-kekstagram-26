const filtersSelector = document.querySelector('.img-filters');
const filterButtons = filtersSelector.querySelectorAll('.img-filters__button');
let filterChangeCallback = null;

const setFilterChangeHandler = (callback) => {
  filterChangeCallback = callback;
};

const filterButtonClickHandler = (evt) => {
  const currentButton = evt.target;
  const activeButton = filtersSelector.querySelector('.img-filters__button--active');

  if (currentButton !== activeButton) {
    activeButton.classList.remove('img-filters__button--active');
    currentButton.classList.add('img-filters__button--active');
  }

  if (filterChangeCallback !== null) {
    filterChangeCallback(currentButton.id);
  }
};

const showFilters = () => {
  filtersSelector.classList.remove('img-filters--inactive');
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', filterButtonClickHandler);
  });
};

export { setFilterChangeHandler, showFilters };
