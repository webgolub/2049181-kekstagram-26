import {
  ALERT_SHOW_TIME,
  DEBOUNCE_DEFAULT_TIMEOUT
} from './const.js';

const ESCAPE_KEYS = ['Escape', 'Esc'];
// Функция для проверки строки на максимальную длину
const checkTextLength = (text, maxLength) => text.length <= maxLength;
// Проверка что нажатая клавиша - ESC
const isEscKey = (evt) => ESCAPE_KEYS.includes(evt.key);
// Функция проверки массива на уникальность
const isArrayUnique = (items) => !items.some((item, index) => items.indexOf(item, index + 1) !== -1);
// Функция вывода пользователю сообщещния об ошибке
const showAlert = (text) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');
  alertContainer.textContent = text;
  document.body.append(alertContainer);
  setTimeout(() => alertContainer.remove(), ALERT_SHOW_TIME);
};
// Функция взята из интернета и доработана
const debounce = (callback, timeoutDelay = DEBOUNCE_DEFAULT_TIMEOUT) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, timeoutDelay, ...rest);
  };
};
// Функция удаления элемента
const removeElement = (element) => {
  element.remove();
};

export {
  checkTextLength,
  isEscKey,
  isArrayUnique,
  showAlert,
  debounce,
  removeElement
};
