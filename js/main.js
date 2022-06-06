// Возврат случайного целого числа из диапазона
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min >= 0 && max >=0 && max >= min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return -1;
};
getRandomNumber();

// Проверка строки на максимальну длину
const checkStringLength = (string, length) => string.length <= length;
checkStringLength();
