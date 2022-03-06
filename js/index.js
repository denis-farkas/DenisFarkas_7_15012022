/* eslint-disable import/extensions */
import { init, testFilter } from './functions.js';
import { selectOption, closeIcon } from './tags.js';
import {
  searchInputIngredient,
  searchInputUstensil,
  searchInputAppliance,
} from './selectors.js';
import {
  closeSuggestionsAppliance,
  handleInputAppliance,
} from './applianceFunctions.js';
import {
  closeSuggestionsIngredient,
  handleInputIngredient,
} from './ingredientFunctions.js';
import {
  closeSuggestionsUstensil,
  handleInputUstensil,
} from './ustensilFunctions.js';

window.selectOption = selectOption;
window.closeIcon = closeIcon;

init();
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('keyup', testFilter);

searchInputIngredient.addEventListener('input', (event) => {
  closeSuggestionsAppliance();
  closeSuggestionsUstensil();
  handleInputIngredient(event);
});

document.getElementById('ingredientB').addEventListener('click', (event) => {
  closeSuggestionsAppliance();
  closeSuggestionsUstensil();
  handleInputIngredient(event);
  event.stopPropagation();
});

searchInputAppliance.addEventListener('input', (event) => {
  closeSuggestionsIngredient();
  closeSuggestionsUstensil();
  handleInputAppliance(event);
});

document.getElementById('applianceB').addEventListener('click', (event) => {
  closeSuggestionsIngredient();
  closeSuggestionsUstensil();
  handleInputAppliance(event);
  event.stopPropagation();
});

searchInputUstensil.addEventListener('input', (event) => {
  closeSuggestionsAppliance();
  closeSuggestionsIngredient();
  handleInputUstensil(event);
});

document.getElementById('ustensilB').addEventListener('click', (event) => {
  closeSuggestionsAppliance();
  closeSuggestionsIngredient();
  handleInputUstensil(event);
  event.stopPropagation();
});
