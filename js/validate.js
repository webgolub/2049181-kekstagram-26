import { checkTextLength, isArrayUnique } from './util.js';
import {
  COMMENT_MAX_LENGTH,
  MAX_HASHTAG,
  ALLOWED_FILE_TYPES,
  HashtagLength,
  ValidateMessage,
} from './const.js';

// Форма загрузки изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');
// Попап редактирования загружаемого изображения
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
// Поле ввода комментария
const commentInput = imgUploadOverlay.querySelector('.text__description');
// Поле ввода хэштега
const hashtagsInput = imgUploadOverlay.querySelector('.text__hashtags');

const hashtagEndingRegExp = /[^-_=+;:,.]$/m;
const hashtagRegExp = /^#[a-zA-Zа-яА-ЯёЁ0-9]{0,}$/;

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form-item__invalid',
  successClass: 'form-item__valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

// Функция очистки от лишних пробелов, приведения к нижнему регистру и помещения в массив введённых хэштегов
const parseHashtagsInput = (value) => value !== '' ? value.trim().toLowerCase().split(' ') : [];

// Функция проверки соответствия разрешения файла перечню допустимых
const checkFileTypeMatch = (fileName) => {
  fileName = fileName.toLowerCase();
  return ALLOWED_FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
};

// Проверки комментариев и хэштегов на валидность

pristine.addValidator(commentInput, (value) => checkTextLength(value, COMMENT_MAX_LENGTH),
  ValidateMessage.COMMENT_TOO_LONG, 1, true);

pristine.addValidator(hashtagsInput, (value) => parseHashtagsInput(value).length <= MAX_HASHTAG,
  ValidateMessage.HASHTAG_TOO_MUCH, 1, true);

pristine.addValidator(hashtagsInput, (value) => value === '' || parseHashtagsInput(value).every((hashtag) => hashtagEndingRegExp.test(hashtag)),
  ValidateMessage.HASHTAG_WRONG_SEPARATOR, 1, true);

pristine.addValidator(hashtagsInput, (value) => isArrayUnique(parseHashtagsInput(value)),
  ValidateMessage.HASHTAG_NO_REPEAT, 1, true);

pristine.addValidator(hashtagsInput, (value) => value === '' || parseHashtagsInput(value).every((hashtag) => hashtagRegExp.test(hashtag)),
  ValidateMessage.HASHTAG_WRONG_CONTENT, 1, true);

pristine.addValidator(hashtagsInput, (value) => value === '' || parseHashtagsInput(value).every((hashtag) => hashtag.length >= HashtagLength.MIN && hashtag.length <= HashtagLength.MAX),
  ValidateMessage.HASHTAG_TOO_LONG, 1, true);

const validateUploadForm = () => pristine.validate();

export { validateUploadForm, checkFileTypeMatch };
