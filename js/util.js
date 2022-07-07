const KEY_VALUES = ['Escape', 'Esc'];
// Функция для проверки строки на максимальную длину
const checkTextLength = (text, maxLength) => text.length <= maxLength;
// Проверка что нажатая клавиша - ESC
const isEscKey = (evt) => KEY_VALUES.includes(evt.key);
// Функция проверки массива на уникальность
const isArrayUnique = (elements) => !elements.some((element, index) => elements.indexOf(element) !== index);

export { checkTextLength, isEscKey, isArrayUnique };
