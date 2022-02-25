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
      ustensilArray.add(item);
    });
  });

  return ustensilArray;
}

export function getOptionsUstensils(collection) {
  const ustensilArray = getUstensils(collection);

  localStorage.setItem('filteredUstensil', JSON.stringify([...ustensilArray]));

  suggestionsUstensil.innerHTML = '';

  const factor = ustensilArray.size / 10;
  if (factor <= 1) {
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.remove('various2');
  } else if (factor > 1 && factor <= 2) {
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.add('various2');
  } else {
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

function getFilteredUstensil() {
  let filteredUstensil = [];
  if (localStorage.getItem('filteredUstensil')) {
    filteredUstensil = localStorage.getItem('filteredUstensil');
    filteredUstensil = JSON.parse(filteredUstensil);
  } else {
    filteredUstensil = getOptionsUstensils(recipes);
  }
  return filteredUstensil;
}

export function searchUstensil(filter) {
  const filteredUstensil = getFilteredUstensil();

  if (filter.length > 2) {
    const Filter = filter.toUpperCase();

    const filteredUstensilArray = new Set();

    filteredUstensil.forEach((element) => {
      element.ustensils.forEach((item) => {
        const ustensilValue = item.toUpperCase();
        if (ustensilValue.includes(Filter)) {
          filteredUstensilArray.add(item);
        }
      });
    });

    suggestionsUstensil.innerHTML = '';
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.remove('various2');

    filteredUstensilArray.forEach((element) => {
      const li = document.createElement('li');
      li.id = `option-${element}`;
      li.role = 'option';
      li.textContent = element;
      li.className = 'option ustensil';
      li.setAttribute(
        'onclick',
        `selectOption("${li.textContent}", "ustensil")`
      );
      suggestionsUstensil.appendChild(li);
    });
  }
}

function closeSuggestionsUstensil() {
  suggestionsUstensil.hidden = true; // hide popup
  autocompleteUstensil.setAttribute('aria-expanded', false);
  window.removeEventListener('click', closeSuggestionsUstensil);
}
function openSuggestionsUstensil() {
  suggestionsUstensil.hidden = false; // show popup
  autocompleteUstensil.setAttribute('aria-expanded', true);
  window.addEventListener('click', closeSuggestionsUstensil);
}

function handleInputUstensil() {
  const userInput = searchInputUstensil.value;
  if (userInput === undefined) {
    const searchInp = searchInput.value;
    if (searchInp === undefined) {
      getOptionsUstensils(recipes);
      openSuggestionsUstensil();
    } else {
      const filteredUstensil = JSON.parse(
        localStorage.getItem('filteredUstensil')
      );
      getOptionsUstensils(filteredUstensil);
      openSuggestionsUstensil();
    }
  } else {
    searchUstensil(userInput);
    openSuggestionsUstensil(); // show the suggestions if the user typed something
  }
}

searchInputUstensil.addEventListener('input', handleInputUstensil);

document.getElementById('ustensilB').addEventListener('click', (event) => {
  openSuggestionsUstensil();
  event.stopPropagation();
});
