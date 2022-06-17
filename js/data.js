import {getRandomPositiveInteger, getRandomPositiveIntegerNoRepeat, getRandomArrayElement} from './util.js';

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
  'Жорж',
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

// Образование замыкания для функции получения случайного натурального числа из диапазона без повторов
const getRandomNoRepeatId = getRandomPositiveIntegerNoRepeat(1, 255);

// Создание объекта комментария
const createComment = () =>
  ({
    id: getRandomNoRepeatId(),
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  });

// Создание объекта поста с фотографией
const createPhoto = () => ({
  id: getRandomNoRepeatId(),
  url: `photos/${getRandomNoRepeatId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(15, 200),
  comments: Array.from({length: getRandomPositiveInteger(1, 3)}, createComment),
});

//Генерация массива постов с фотографиями
const createPhotos = () => Array.from({length: 25}, createPhoto);
const somePhotos = createPhotos();


export {somePhotos};
