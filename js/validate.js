// Форма загрузки изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');
// Попап редактирования загружаемого изображения
const imgUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
// Поле ввода комментария
const commentInput = imgUploadOverlay.querySelector('.text__description');

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__form',
  errorClass: 'form-item__invalid',
  successClass: 'form-item__valid',
  errorTextParent: 'img-upload__field-wrapper:last-child',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
