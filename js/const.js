const GET_DATA_URL = 'https://26.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://26.javascript.pages.academy/kekstagram';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const TEXT_FIELD_NAMES = ['hashtags', 'description'];
const ESCAPE_KEYS = ['Escape', 'Esc'];
const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DEFAULT_TIMEOUT = 500;
const COMMENT_MAX_LENGTH = 140;
const RANDOM_PICTURES_COUNT = 10;
const MAX_HASHTAG = 5;

const Effect = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
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
  GET_DATA_URL,
  SEND_DATA_URL,
  RANDOM_PICTURES_COUNT,
  TEXT_FIELD_NAMES,
  ESCAPE_KEYS,
  ALERT_SHOW_TIME,
  DEBOUNCE_DEFAULT_TIMEOUT,
  COMMENT_MAX_LENGTH,
  MAX_HASHTAG,
  FILE_TYPES,
  HashtagLength,
  Effect,
  FilterType,
  ScaleValue,
};
