const ScaleValue = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

// Форма загрузки изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');
// Поле вывода масштаба
const scaleValueDisplay = uploadForm.querySelector('.scale__control--value');
// Превью редактируемого изображения
const imgPreview = uploadForm.querySelector('.img-upload__preview img');
// Функция полученя целого числа из значения поля
const getFieldIntegerValue = (field) => Number(field.value.split('%')[0]);

// Функция проверки что значение масштаба в допустимом диапазоне
const isScaleValueInRange = () =>
  getFieldIntegerValue(scaleValueDisplay) >= ScaleValue.MIN &&
  getFieldIntegerValue(scaleValueDisplay) <= ScaleValue.MAX;

// Функция изменения масштаба по клику на кнопки
const onScaleButtonsClick = (evt) => {
  let inicialScaleValue = getFieldIntegerValue(scaleValueDisplay);

  if (isScaleValueInRange()) {

    if (evt.target.classList.contains('scale__control--bigger') &&
    inicialScaleValue !== ScaleValue.MAX) {
      scaleValueDisplay.value =  `${inicialScaleValue += ScaleValue.STEP}%`;

    } else if (evt.target.classList.contains('scale__control--smaller') &&
    inicialScaleValue !== ScaleValue.MIN) {
      scaleValueDisplay.value = `${inicialScaleValue -= ScaleValue.STEP}%`;
    }
    imgPreview.style.transform =`scale(${(inicialScaleValue * 0.01)}`;
  }
};

export {onScaleButtonsClick};
