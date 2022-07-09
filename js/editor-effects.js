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

let currentEffect = 'none';

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
  let units = '';

  switch (currentEffect) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${effectLevelValue.value}${units})`;
      break;

    case 'sepia':
      imgPreview.style.filter = `sepia(${effectLevelValue.value}${units})`;
      break;

    case 'marvin':
      units = '%';
      imgPreview.style.filter = `invert(${effectLevelValue.value}${units})`;
      break;

    case 'phobos':
      units = 'px';
      imgPreview.style.filter = `blur(${effectLevelValue.value}${units})`;
      break;

    case 'heat':
      imgPreview.style.filter = `brightness(${effectLevelValue.value}${units})`;
      break;

    case 'none':
      imgPreview.style.filter = '';
      break;

  }
};

// Слушетель изменения слайдера
sliderContainer.noUiSlider.on('update', () => {
  effectLevelValue.value = sliderContainer.noUiSlider.get();
  renderEffectIntensity();
});

// Функция, обновляющая параметры слайдера согласно выбранной радиокнопки
const updateSliderOptions = (evt) => {
  const slider = sliderContainer.noUiSlider;

  switch (evt.target.value) {
    case 'none':
      sliderContainer.parentElement.classList.add('hidden');
      break;

    case 'chrome':
    case 'sepia':
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1,
      });
      break;

    case 'marvin':
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1,
      });
      break;

    case 'phobos':
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1,
      });
      break;

    case 'heat':
      sliderContainer.parentElement.classList.remove('hidden');
      slider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1,
      });
      break;
  }
};

// Функция сборса эффектов
const resetEffects = () => {
  imgPreview.className = '';
  imgPreview.style.filter = '';

};

// Функция, добавляющая к превью изображения класс эффекта согласно выбранной радиокнопки
const addEffectToImgPreview = (evt) => {
  imgPreview.className = '';

  if (evt.target.value !== 'none') {
    imgPreview.classList.add(`effects__preview--${evt.target.value}`);
  }
};

// Рендер эффекта
const renderEffect = (evt) => {
  currentEffect = evt.target.value;
  resetEffects();
  addEffectToImgPreview(evt);
  updateSliderOptions(evt);

};

effectsRadioContainer.addEventListener('change', (evt) => renderEffect(evt));

export {resetEffects};
