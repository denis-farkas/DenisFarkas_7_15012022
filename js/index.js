import { init, testFilter } from './functions.js';

init();
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('keyup', testFilter);
