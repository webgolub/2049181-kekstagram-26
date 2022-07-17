const ESCAPE_KEYS = ['Escape', 'Esc'];
const ALERT_SHOW_TIME = 5000;
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

export {
  checkTextLength,
  isEscKey,
  isArrayUnique,
  showAlert
};
