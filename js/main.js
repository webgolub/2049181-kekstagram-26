// Возврат случайного целого числа из диапазона
const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result) ;
};
getRandomPositiveInteger();

// Проверка строки на максимальну длину
const checkStringLength = (string, length) => string.length <= length;
checkStringLength();
