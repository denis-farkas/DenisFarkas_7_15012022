import {
  suggestionsIngredient,
  autocompleteIngredient,
  searchInputIngredient,
  searchInput,
} from './selectors.js';

import recipes from '../data/recipes.js';

export function getIngredients(collection) {
  const ingredientArray = new Set();

  collection.forEach((element) => {
    element.ingredients.forEach((item) => {
      ingredientArray.add(item.ingredient);
    });
  });

  return ingredientArray;
}

export function getOptionsIngredients(collection) {
  const ingredientArray = getIngredients(collection);

  localStorage.setItem(
    'filteredIngredient',
    JSON.stringify([...ingredientArray])
  );
  suggestionsIngredient.innerHTML = '';

  const factor = ingredientArray.size / 10;
  if (factor <= 1) {
    suggestionsIngredient.classList.remove('toomuch');
    suggestionsIngredient.classList.remove('various3');
    suggestionsIngredient.classList.remove('various2');
  } else if (factor > 1 && factor <= 2) {
    suggestionsIngredient.classList.remove('toomuch');
    suggestionsIngredient.classList.remove('various3');
    suggestionsIngredient.classList.add('various2');
  } else {
    suggestionsIngredient.classList.add('various3');
    suggestionsIngredient.classList.add('toomuch');
  }

  ingredientArray.forEach((element) => {
    const li = document.createElement('li');
    li.id = `option-${element}`;
    li.textContent = element;
    li.className = 'option ingredient';
    li.setAttribute(
      'onclick',
      `selectOption("${li.textContent}", "ingredient")`
    );
    suggestionsIngredient.appendChild(li);
  });
}

export function getFilteredIngredient() {
  let filteredIngredient;
  if (localStorage.getItem('filteredIngredient')) {
    filteredIngredient = localStorage.getItem('filteredIngredient');
    filteredIngredient = JSON.parse(filteredIngredient);
  } else {
    filteredIngredient = getIngredients(recipes);
  }
  return filteredIngredient;
}

export function searchIngredient(filter) {
  const filteredIngredient = getFilteredIngredient();
  console.log(filteredIngredient);

  const Filter = filter.toUpperCase();

  const filteredIngredientArray = new Set();

  filteredIngredient.forEach((element) => {
    const ingredientValue = element.toUpperCase();
    if (ingredientValue.includes(Filter)) {
      filteredIngredientArray.add(element);
    }
  });

  suggestionsIngredient.innerHTML = '';
  suggestionsIngredient.classList.remove('toomuch');
  suggestionsIngredient.classList.remove('various3');
  suggestionsIngredient.classList.remove('various2');

  filteredIngredientArray.forEach((element) => {
    const li = document.createElement('li');
    li.id = `option-${element}`;
    li.textContent = element;
    li.className = 'option ingredient';
    li.setAttribute(
      'onclick',
      `selectOption("${li.textContent}", "ingredient")`
    );
    suggestionsIngredient.appendChild(li);
  });
}

function closeSuggestionsIngredient() {
  suggestionsIngredient.hidden = true; // hide popup
  autocompleteIngredient.setAttribute('aria-expanded', false); // tell assistive tech popup is hidden
  window.removeEventListener('click', closeSuggestionsIngredient); // don't need this anymore once it's closed
}
function openSuggestionsIngredient() {
  suggestionsIngredient.hidden = false; // show popup
  autocompleteIngredient.setAttribute('aria-expanded', true); // tell assistive tech popup is shown
  window.addEventListener('click', closeSuggestionsIngredient); // clicking the body should close the popup
}

export function handleInputIngredient() {
  if (searchInput.length <= 2) {
    if (searchInputIngredient <= 2) {
      getOptionsIngredients(recipes);
      openSuggestionsIngredient();
    } else {
      searchIngredient(searchInputIngredient);
      openSuggestionsIngredient();
    }
  } else {
    searchIngredient(searchInputIngredient);
    openSuggestionsIngredient();
  }
}

searchInputIngredient.addEventListener('input', handleInputIngredient);

document.getElementById('ingredientB').addEventListener('click', (event) => {
  handleInputIngredient(event);
  event.stopPropagation();
});
