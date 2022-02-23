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

  localStorage.setItem('filteredIngredient', JSON.stringify(ingredientArray));
  suggestionsIngredient.innerHTML = '';

  if (ingredientArray.size > 10) {
    const factor = ingredientArray.length / 10;
    if (factor > 1 && factor <= 2) {
      suggestionsIngredient.classList.remove('toomuch');
      suggestionsIngredient.classList.remove('various3');
      suggestionsIngredient.classList.add('various2');
    } else if (factor > 2) {
      suggestionsIngredient.classList.add('various3');
      suggestionsIngredient.classList.add('toomuch');
    }
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
  let filteredIngredient = [];
  if (localStorage.getItem('filteredIngredient')) {
    filteredIngredient = localStorage.getItem('filteredIngredient');
    filteredIngredient = JSON.parse(filteredIngredient);
  } else {
    filteredIngredient = getOptionsIngredients(recipes);
  }
  return filteredIngredient;
}

export function searchIngredient(filter) {
  const filteredIngredient = getFilteredIngredient();
  if (filter.length > 2) {
    const Filter = filter.toUpperCase();

    const filteredIngredientArray = new Set();

    filteredIngredient.forEach((element) => {
      element.ingredients.forEach((item) => {
        if (!item.includes(Filter)) {
          filteredIngredientArray.add(item.ingredient);
        }
      });
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
  const userInput = searchInputIngredient.value;
  if (userInput === undefined) {
    const searchInp = searchInput.value;
    if (searchInp === undefined) {
      getOptionsIngredients(recipes);
      openSuggestionsIngredient();
    } else {
      const filteredIngredient = JSON.parse(
        localStorage.getItem('filteredIngredient')
      );
      getOptionsIngredients(filteredIngredient);
      openSuggestionsIngredient();
    }
  } else {
    searchIngredient(userInput);
    openSuggestionsIngredient(); // show the suggestions if the user typed something
  }
}

searchInputIngredient.addEventListener('input', handleInputIngredient);

document.getElementById('ingredientB').addEventListener('click', (event) => {
  handleInputIngredient(event);
  event.stopPropagation();
});
