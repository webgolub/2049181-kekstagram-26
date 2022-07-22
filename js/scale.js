import { ScaleValue } from './const.js';

// Поле вывода масштаба
const scaleValueDisplay = document.querySelector('.scale__control--value');
// Кнопка увеличения масштаба
const scaleUpButton = document.querySelector('.scale__control--bigger');
//Кнопка уменьшения масштаба
const scaleDownButton = document.querySelector('.scale__control--smaller');

let currentScale = ScaleValue.MAX;
let scaleChangeCallback = null;

const setScaleChangeHandler = (callback) => {
  scaleChangeCallback = callback;
};

const renderScale = (value) => {
  currentScale = value;
  scaleValueDisplay.value = `${value}%`;
  scaleChangeCallback(value);
};

const resetScale = () => {
  renderScale(ScaleValue.MAX);
};

scaleUpButton.addEventListener('click', () => {
  const nextScale = currentScale + ScaleValue.STEP;
  if (nextScale <= ScaleValue.MAX) {
    renderScale(nextScale);
  }
});

scaleDownButton.addEventListener('click', () => {
  const nextScale = currentScale - ScaleValue.STEP;
  if (nextScale >= ScaleValue.MIN) {
    renderScale(nextScale);
  }
});

export {resetScale, setScaleChangeHandler};
