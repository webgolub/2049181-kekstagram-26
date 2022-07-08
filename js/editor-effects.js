// Форма загрузки изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');
// Контейнер для слайдера
const sliderContainer = uploadForm.querySelector('.effect-level__slider');
// Контейнер для радиокнопок
const effectsRadioContainer = uploadForm.querySelector('.effects__list');

// Создание экземпляра слайдера
noUiSlider.create(sliderContainer, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
});

/* При смене эффекта выбором одного из значений среди радиокнопок,
добавлять превью соответствующий css-класс */

const onEffectsChange = (evt) => {

};
