import { checkTextLength, isArrayUnique } from './util.js';

// Максимальная длинна комментария
const COMMENT_MAX_LENGTH = 140;

// Перечисление настроек хэштегов
const Hashtags = {
  AMOUNT: 5,
  MIN_LENGTH: 2,
  MAX_LENGTH: 20
};

// Форма загрузки изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');
// Попап редактирования загружаемого изображения
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
// Поле ввода комментария
const commentInput = imgUploadOverlay.querySelector('.text__description');
// Поле ввода хэштега
const hashtagsInput = imgUploadOverlay.querySelector('.text__hashtags');

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form-item__invalid',
  successClass: 'form-item__valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

// Функция очистки от лишних пробелов, приведения к нижнему регистру и помещения в массив введённых хэштегов
const prepareHashtags = (value) => value !== '' ? value.trim().toLowerCase().split(' ') : [];

// Проверки комментариев и хэштегов на валидность

pristine.addValidator(commentInput, (comment) => checkTextLength(comment, COMMENT_MAX_LENGTH),
  'Комментарий не должен быть длиннее 140 символов');

pristine.addValidator(hashtagsInput, (hashtags) => prepareHashtags(hashtags).length <= Hashtags.AMOUNT,
  'Не больше 5 хэштегов');

pristine.addValidator(hashtagsInput, (hashtags) => hashtags === '' || prepareHashtags(hashtags).every((value) => /[^-_=+;:,.]$/m.test(value)),
  'Хэштеги разделяются пробелом');

pristine.addValidator(hashtagsInput, (hashtags) => isArrayUnique(prepareHashtags(hashtags)),
  'Хэштеги не должны повторяться');

pristine.addValidator(hashtagsInput, (hashtags) => hashtags === '' || prepareHashtags(hashtags).every((value) => /^#[a-zA-Zа-яА-ЯёЁ0-9]{0,}$/.test(value)),
  'Хэштег начинается с # и состоит только из букв и цифр');

pristine.addValidator(hashtagsInput, (hashtags) => hashtags === '' || prepareHashtags(hashtags).every((value) => value.length >= Hashtags.MIN_LENGTH && value.length <= Hashtags.MAX_LENGTH),
  'Длина хэштега — от 1 до 19 символов после #');

// Обработчик действия при отправке формы
uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if(!isValid) {
    evt.preventDefault();}
});

/* Обработчик события изменения формы чтобы при закрытии попапа
   очищались предупреждений от старых проверок */
uploadForm.addEventListener('change', () => {
  pristine.validate();
});
