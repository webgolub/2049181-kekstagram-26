const KEY_VALUES = ['Escape', 'Esc'];
// Функция для проверки строки на максимальную длину
const checkTextLength = (text, maxLength) => text.length <= maxLength;
// Проверка что нажатая клавиша - ESC
const isEscKey = (evt) => KEY_VALUES.includes(evt.key);
/* Проверка что фокус не на поле ввода хэштегов или комментария
(ужасно длинное название, можно ли сократить до isNotFocusedOnInput? или появится ненужная неоднозначность?)
И можно ли оставить объявление массива с классами прямо в функции (не является ли это «магическими числами»?)
или нужно вынести его в константу в модуле data.js?*/

const isArrayUnique = (elements) => !elements.some((element, index) => elements.indexOf(element) !== index);

export { checkTextLength, isEscKey, isArrayUnique };
