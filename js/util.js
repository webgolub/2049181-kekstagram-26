// Функция для проверки строки на максимальную длину
const checkTextLength = (text, length) => text.length <= length;

const isEscKey = (evt) => evt.key === 'Escape';


export {checkTextLength, isEscKey};
