import {renderThumbnails} from './render-thumbnails.js';
import { createPhotos } from './data.js';

const somePhotos = createPhotos(25);
renderThumbnails(somePhotos);
