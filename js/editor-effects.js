const Effects = {
  NONE: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

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

let currentEffect = Effects.NONE;

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
    case Effects.NONE:
      imgPreview.style.filter = '';
      break;

    case Effects.CHROME:
      imgPreview.style.filter = `grayscale(${effectLevelValue.value})`;
      break;

    case Effects.SEPIA:
      imgPreview.style.filter = `sepia(${effectLevelValue.value})`;
      break;

    case Effects.MARVIN:
      imgPreview.style.filter = `invert(${effectLevelValue.value}%)`;
      break;

    case Effects.PHOBOS:
      imgPreview.style.filter = `blur(${effectLevelValue.value}px)`;
      break;

    case Effects.HEAT:
      imgPreview.style.filter = `brightness(${effectLevelValue.value})`;
      break;
  }
};

// Функция, обновляющая параметры слайдера согласно выбранной радиокнопки
const updateSliderOptions = () => {
  const slider = sliderContainer.noUiSlider;
  const createOptionsObject = (min, max, step) => ({
    range: {
      min: min,
      max: max,
    },
    start: max,
    step: step,
  });

  switch (currentEffect) {
    case Effects.NONE:
      sliderContainer.parentElement.classList.add('hidden');
      slider.updateOptions(createOptionsObject(0, 100, 1));
      break;

    case Effects.CHROME:
    case Effects.SEPIA:
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions(createOptionsObject(0, 1, 0.1));
      break;

    case Effects.MARVIN:
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions(createOptionsObject(0, 100, 1));
      break;

    case Effects.PHOBOS:
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions(createOptionsObject(0, 3, 0.1));
      break;

    case Effects.HEAT:
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions(createOptionsObject(1, 3, 0.1));
      break;
  }
};

// Функция удаления классов эффектов
const removeEffectsClasses = (element) => {
  element.className.split(' ').forEach((item) => {
    if(/effects__preview--/.test(item)) {element.classList.remove(item);} });
};
// Функция сборса эффектов
const resetEffects = () => {
  currentEffect = Effects.NONE;
  updateSliderOptions();
  removeEffectsClasses (imgPreview);
  imgPreview.style.filter = '';

};

// Функция, добавляющая к превью изображения класс эффекта согласно выбранной радиокнопки
const addEffectToImgPreview = () => {
  removeEffectsClasses (imgPreview);

  if (currentEffect !== 'none') {
    imgPreview.classList.add(`effects__preview--${currentEffect}`);
  }
};

// Рендер эффекта
const renderEffect = (evt) => {
  currentEffect = evt.target.value;
  removeEffectsClasses (imgPreview);
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

export {resetEffects};
