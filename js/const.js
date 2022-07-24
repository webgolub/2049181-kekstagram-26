const ALLOWED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DEFAULT_TIMEOUT = 500;
const COMMENT_MAX_LENGTH = 140;
const RANDOM_PICTURES_COUNT = 10;
const MAX_HASHTAG = 5;
const COMMENTS_BLOCK_SIZE = 5;

const RequestUrl ={
  GET: 'https://26.javascript.pages.academy/kekstagram/data',
  POST: 'https://26.javascript.pages.academy/kekstagram',
};

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const ScaleValue = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const HashtagLength = {
  MIN: 2,
  MAX: 20
};

export{
  RANDOM_PICTURES_COUNT,
  ALERT_SHOW_TIME,
  DEBOUNCE_DEFAULT_TIMEOUT,
  COMMENT_MAX_LENGTH,
  MAX_HASHTAG,
  COMMENTS_BLOCK_SIZE,
  ALLOWED_FILE_TYPES,
  RequestUrl,
  HashtagLength,
  FilterType,
  ScaleValue,
};
