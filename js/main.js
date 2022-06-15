
const NAMES = [
  'Артём',
  'Макар',
  'Ирина',
  'Меченый',
  'Мария',
  'Елена',
  'Сергей',
  'Максим',
  'Джек',
  'Хуан Пабло',
  'Виктор',
  'Кристина',
  'Диана',
  'Ольга',
  'Володя',
  'Карина',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Моё первое фото.',
  'Это я с котаном.',
  'Весело было.',
  'Четвёртое описание.',
  'В отпуске.',
];

let commentId = 0;

let photoId = 0;

const getRandomPositiveInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (items) => items[getRandomPositiveInteger(0, items.length - 1)];

const checkStringLength = (text, length) => text.length <= length;
checkStringLength('some text', 5);

const createComment = () => {
  commentId++;
  return {
    id: commentId,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = () => {
  photoId++;
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({length: getRandomPositiveInteger(1, 3)}, createComment),
  };
};
//Генерация массива с «фотками»
Array.from({length: 25}, createPhoto);
