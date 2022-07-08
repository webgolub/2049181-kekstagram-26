const ESCAPE_KEYS = ['Escape', 'Esc'];
// Функция для проверки строки на максимальную длину
const checkTextLength = (text, maxLength) => text.length <= maxLength;
// Проверка что нажатая клавиша - ESC
const isEscKey = (evt) => ESCAPE_KEYS.includes(evt.key);
// Функция проверки массива на уникальность
const isArrayUnique = (items) => !items.some((item, index) => items.indexOf(item, index + 1) !== -1);


export { checkTextLength, isEscKey, isArrayUnique };
