import { renderThumbnails } from './render-thumbnails.js';
import './editor.js';
import './validate.js';
import './api.js';
import { getData } from './api.js';


// Отрисовка миниатюр
getData(renderThumbnails);
