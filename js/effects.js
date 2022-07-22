import { Effect } from './const.js';

// Форма загрузки изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');
// Контейнер для слайдера
const sliderContainer = uploadForm.querySelector('.effect-level__slider');
// Контейнер для радиокнопок
const effectsRadioContainer = uploadForm.querySelector('.effects__list');
// Превью редактируемого изображения (добавил, чтобы не ругался линтер)
const imgPreview = uploadForm.querySelector('.img-upload__preview img');
// Поле уровня эффекта
const effectLevelValue = uploadForm.querySelector('.effect-level__value');

let currentEffect = Effect.NONE;

// Создание экземпляра слайдера
noUiSlider.create(sliderContainer, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

// Функция, добавляющая CSS-стили согласно заданному уровню эффекта
const renderEffectIntensity = () => {
  switch (currentEffect) {
    case Effect.NONE:
      imgPreview.style.filter = '';
      break;

    case Effect.CHROME:
      imgPreview.style.filter = `grayscale(${effectLevelValue.value})`;
      break;

    case Effect.SEPIA:
      imgPreview.style.filter = `sepia(${effectLevelValue.value})`;
      break;

    case Effect.MARVIN:
      imgPreview.style.filter = `invert(${effectLevelValue.value}%)`;
      break;

    case Effect.PHOBOS:
      imgPreview.style.filter = `blur(${effectLevelValue.value}px)`;
      break;

    case Effect.HEAT:
      imgPreview.style.filter = `brightness(${effectLevelValue.value})`;
      break;
  }
};

// Функция создания объекта настроек слайдера
const createOptions = ({min, max, step}) => ({
  range: {
    min,
    max,
  },
  start: max,
  step,
});

// Функция, обновляющая параметры слайдера согласно выбранной радиокнопки
const updateSliderOptions = () => {
  const slider = sliderContainer.noUiSlider;

  switch (currentEffect) {
    case Effect.NONE:
      sliderContainer.parentElement.classList.add('hidden');
      slider.updateOptions(createOptions({min: 0, max: 100, step: 1}));
      break;

    case Effect.CHROME:
    case Effect.SEPIA:
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions(createOptions({min: 0, max: 1, step: 0.1}));
      break;

    case Effect.MARVIN:
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions(createOptions({min: 0, max: 100, step: 1}));
      break;

    case Effect.PHOBOS:
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions(createOptions({min: 0, max: 3, step: 0.1}));
      break;

    case Effect.HEAT:
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions(createOptions({min: 1, max: 3, step: 0.1}));
      break;
  }
};

// Функция удаления классов эффектов
const removeEffectClass = () => {
  imgPreview.classList.remove(`effects__preview--${currentEffect}`);
};

// Функция сборса эффектов
const resetEffects = () => {
  removeEffectClass ();
  currentEffect = Effect.NONE;
  updateSliderOptions();
  imgPreview.style.filter = '';

};

// Функция, добавляющая к превью изображения класс эффекта согласно выбранной радиокнопки
const addEffectToImgPreview = () => {
  removeEffectClass ();

  if (currentEffect !== Effect.NONE) {
    imgPreview.classList.add(`effects__preview--${currentEffect}`);
  }
};

// Рендер эффекта
const renderEffect = (evt) => {
  removeEffectClass ();
  currentEffect = evt.target.value;
  imgPreview.style.filter = '';
  addEffectToImgPreview(currentEffect);
  updateSliderOptions(currentEffect);

};

// Слушетель изменения слайдера
sliderContainer.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderContainer.noUiSlider.get();
  renderEffectIntensity();
});

// Слушатель изменения блока радиокнопок выбора эффекта
effectsRadioContainer.addEventListener('change', (evt) => renderEffect(evt));

export { resetEffects };
