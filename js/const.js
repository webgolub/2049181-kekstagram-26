const ALLOWED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DEFAULT_TIMEOUT = 500;
const COMMENT_MAX_LENGTH = 140;
const RANDOM_PICTURES_COUNT = 10;
const MAX_HASHTAG = 5;
const COMMENTS_BLOCK_SIZE = 5;

const AlertMessage = {
  GET_DATA_ERROR: 'Данные с сервера не получены. Попробуйте обновить страницу',
  WRONG_FILE_TYPE: 'Выбран неверный тип файла. Закройте форму и выберите изображение для загрузки.',
};

const ValidateMessage = {
  COMMENT_TOO_LONG: 'Комментарий не должен быть длиннее 140 символов',
  HASHTAG_TOO_MUCH: 'Не больше 5 хэштегов',
  HASHTAG_TOO_LONG: 'Длина хэштега — от 1 до 19 символов после #',
  HASHTAG_NO_REPEAT: 'Хэштеги не должны повторяться',
  HASHTAG_WRONG_CONTENT: 'Хэштег начинается с # и состоит только из букв и цифр',
  HASHTAG_WRONG_SEPARATOR: 'Хэштеги разделяются пробелом',
};

const RequestUrl ={
  GET: 'https://26.javascript.pages.academ/kekstagram/data',
  POST: 'https://26.javascript.pages.academy/kekstagram',
};

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const SubmitButtonText = {
  BLOCKED: 'Публикую...',
  UNBLOCKED: 'Опубликовать',
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
  AlertMessage,
  ValidateMessage,
  RequestUrl,
  HashtagLength,
  FilterType,
  SubmitButtonText,
  ScaleValue,
};
