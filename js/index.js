import { init, testFilter } from './functions.js';
import { selectOption, closeIcon } from './tags.js';

window.selectOption = selectOption;
window.closeIcon = closeIcon;

init();
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('keyup', testFilter);
