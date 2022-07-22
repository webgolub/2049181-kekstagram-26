import { RANDOM_PICTURES_COUNT, FilterType } from './const.js';

const filterPictures = (pictures, filterType = FilterType.DEFAULT) => {
  switch (filterType){
    case FilterType.DEFAULT:
      return pictures.slice();

    case FilterType.RANDOM:
      return pictures.slice().sort(() => 0.5 - Math.random()).slice(0, RANDOM_PICTURES_COUNT);

    case FilterType.DISCUSSED:
      return pictures.slice().sort((pictureA, pictureB) =>
        pictureB.comments.length - pictureA.comments.length
      );
  }
};

export { filterPictures };
