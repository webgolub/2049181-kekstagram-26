const filtersSelector = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

filtersSelector.classList.remove('img-filters--inactive');

let selectedButton = filterDefaultButton;

const filterChangeHandler = (evt) => {
  switch (evt.target.id){
    case 'filter-default':
      if (selectedButton.id !== 'filter-default'){
        evt.target.classList.add('img-filters__button--active');
        selectedButton.classList.remove('img-filters__button--active');
        selectedButton = filterDefaultButton;
      }
      break;
    case 'filter-random':
      if (selectedButton.id !== 'filter-random'){
        evt.target.classList.add('img-filters__button--active');
        selectedButton.classList.remove('img-filters__button--active');
        selectedButton = filterRandomButton;
      }
      break;
    case 'filter-discussed':
      if (selectedButton.id !== 'filter-discussed'){
        evt.target.classList.add('img-filters__button--active');
        selectedButton.classList.remove('img-filters__button--active');
        selectedButton = filterDiscussedButton;
      }
      break;
  }
};

filtersSelector.addEventListener('click', filterChangeHandler);
