/* eslint-disable import/extensions */
import {
  suggestionsUstensil,
  autocompleteUstensil,
  searchInputUstensil,
  searchInput,
} from './selectors.js';

import recipes from '../data/recipes.js';

export function getUstensils(collection) {
  const ustensilArray = new Set();

  collection.forEach((element) => {
    element.ustensils.forEach((item) => {
      ustensilArray.add(item.toLowerCase());
    });
  });

  return ustensilArray;
}

export function getOptionsUstensils(collection) {
  const ustensilArray = getUstensils(collection);

  localStorage.setItem('filteredUstensil', JSON.stringify([...ustensilArray]));

  suggestionsUstensil.innerHTML = '';

  const factor = ustensilArray.size / 10;
  if (factor === 0) {
    suggestionsUstensil.classList.add('displayOff');
  } else if (factor <= 1) {
    suggestionsUstensil.classList.remove('displayOff');
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.remove('various2');
  } else if (factor <= 2) {
    suggestionsUstensil.classList.remove('displayOff');
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.add('various2');
  } else {
    suggestionsUstensil.classList.remove('displayOff');
    suggestionsUstensil.classList.add('various3');
    suggestionsUstensil.classList.add('toomuch');
  }
  ustensilArray.forEach((element) => {
    const li = document.createElement('li');
    li.id = `option-${element}`;
    li.textContent = element;
    li.className = 'option ustensil';
    li.setAttribute('onclick', `selectOption("${li.textContent}", "ustensil")`);
    suggestionsUstensil.appendChild(li);
  });
}

export function getFilteredUstensil() {
  let filteredUstensil;
  if (localStorage.getItem('filteredUstensil')) {
    filteredUstensil = localStorage.getItem('filteredUstensil');
    filteredUstensil = JSON.parse(filteredUstensil);
  } else {
    filteredUstensil = getUstensils(recipes);
  }
  return filteredUstensil;
}

export function searchUstensil(filter) {
  const filteredUstensil = getFilteredUstensil();

  suggestionsUstensil.innerHTML = '';

  const Filter = filter.toUpperCase();

  const filteredUstensilArray = new Set();

  filteredUstensil.forEach((element) => {
    const ustensilValue = element.toUpperCase();
    if (ustensilValue.substr(0, Filter.length) === Filter) {
      filteredUstensilArray.add(element);
    }
  });

  const factor = filteredUstensilArray.size / 10;

  if (factor === 0) {
    suggestionsUstensil.classList.add('displayOff');
  } else if (factor <= 1) {
    suggestionsUstensil.classList.remove('displayOff');
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.remove('various2');
  } else if (factor <= 2) {
    suggestionsUstensil.classList.remove('displayOff');
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.add('various2');
  } else {
    suggestionsUstensil.classList.remove('displayOff');
    suggestionsUstensil.classList.add('various3');
    suggestionsUstensil.classList.add('toomuch');
  }

  filteredUstensilArray.forEach((element) => {
    const li = document.createElement('li');
    li.id = `option-${element}`;
    li.role = 'option';
    li.textContent = element;
    li.className = 'option ustensil';
    li.setAttribute('onclick', `selectOption("${li.textContent}", "ustensil")`);
    suggestionsUstensil.appendChild(li);
  });
}

export function closeSuggestionsUstensil() {
  searchInputUstensil.value = '';
  searchInputUstensil.placeholder = 'Ustensiles';
  searchInputUstensil.classList.remove('neutre');
  autocompleteUstensil.classList.add('strict');
  suggestionsUstensil.hidden = true; // hide popup
  autocompleteUstensil.setAttribute('aria-expanded', false);
  window.removeEventListener('click', closeSuggestionsUstensil);
}
export function openSuggestionsUstensil() {
  searchInputUstensil.placeholder = 'Recherche un ustensile';
  searchInputUstensil.classList.add('neutre');
  autocompleteUstensil.classList.remove('strict');
  suggestionsUstensil.hidden = false; // show popup
  autocompleteUstensil.setAttribute('aria-expanded', true);
  window.addEventListener('click', closeSuggestionsUstensil);
}

export function handleInputUstensil() {
  const userInput = searchInputUstensil.value;
  if (userInput === undefined) {
    const searchInp = searchInput.value;
    if (searchInp === undefined) {
      const FilteredTags = localStorage.getItem('filteredTags');
      if (!FilteredTags) {
        getOptionsUstensils(recipes);
        openSuggestionsUstensil();
      } else {
        getOptionsUstensils(FilteredTags);
        openSuggestionsUstensil();
      }
    } else {
      const filteredUstensil = JSON.parse(localStorage.getItem('Repository'));
      getOptionsUstensils(filteredUstensil);
      openSuggestionsUstensil();
    }
  } else {
    searchUstensil(userInput);
    openSuggestionsUstensil(); // show the suggestions if the user typed something
  }
}
