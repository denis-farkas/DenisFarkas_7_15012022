/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const suggestionsIngredient = document.getElementById('suggestionsIngredient');
const autocompleteIngredient = document.getElementById(
  'autocompleteIngredient'
);
const searchInputIngredient = document.getElementById('searchInputIngredient');

function getFilteredIngredient() {
  let filteredIngredient = [];
  if (localStorage.getItem('filteredIngredient')) {
    filteredIngredient = localStorage.getItem('filteredIngredient');
    filteredIngredient = JSON.parse(filteredIngredient);
  } else {
    filteredIngredient = getIngredients(recipes);
  }
  return filteredIngredient;
}

function searchIngredient(filter) {
  const filteredIngredient = getFilteredIngredient();

  suggestionsIngredient.innerHTML = '';

  const Filter = filter.toUpperCase();

  const ingredientFiltered = [];

  for (let i = 0; i < filteredIngredient.length; i += 1) {
    const ingredientValue = filteredIngredient[i].toUpperCase();
    if (ingredientValue.substr(0, Filter.length) === Filter) {
      if (!ingredientFiltered.includes(filteredIngredient[i].toLowerCase())) {
        ingredientFiltered.push(filteredIngredient[i].toLowerCase());
      }
    }
  }

  const factor = ingredientFiltered.length / 10;
  if (factor === 0) {
    suggestionsIngredient.classList.add('displayOff');
  } else if (factor <= 1) {
    suggestionsIngredient.classList.remove('displayOff');
    suggestionsIngredient.classList.remove('toomuch');
    suggestionsIngredient.classList.remove('various3');
    suggestionsIngredient.classList.remove('various2');
  } else if (factor <= 2) {
    suggestionsIngredient.classList.remove('displayOff');
    suggestionsIngredient.classList.remove('toomuch');
    suggestionsIngredient.classList.remove('various3');
    suggestionsIngredient.classList.add('various2');
  } else {
    suggestionsIngredient.classList.remove('displayOff');
    suggestionsIngredient.classList.add('various3');
    suggestionsIngredient.classList.add('toomuch');
  }

  for (let i = 0; i < ingredientFiltered.length; i += 1) {
    const li = document.createElement('li');
    li.id = `optionIngredient-${i}`;
    li.role = 'option';
    li.textContent = ingredientFiltered[i];
    li.className = 'option ingredient';
    li.setAttribute(
      'onclick',
      `selectOption("${li.textContent}", "ingredient")`
    );
    suggestionsIngredient.appendChild(li);
  }
}

function closeSuggestionsIngredient() {
  searchInputIngredient.value = '';
  searchInputIngredient.placeholder = 'Ingrédients';
  searchInputIngredient.classList.remove('neutre');
  autocompleteIngredient.classList.add('strict');
  suggestionsIngredient.hidden = true; // hide popup
  autocompleteIngredient.setAttribute('aria-expanded', false); // tell assistive tech popup is hidden
  window.removeEventListener('click', closeSuggestionsIngredient); // don't need this anymore once it's closed
}
function openSuggestionsIngredient() {
  searchInputIngredient.placeholder = 'Recherche un ingrédient';
  searchInputIngredient.classList.add('neutre');
  suggestionsIngredient.hidden = false; // show popup
  autocompleteIngredient.classList.remove('strict');
  autocompleteIngredient.setAttribute('aria-expanded', true); // tell assistive tech popup is shown
  window.addEventListener('click', closeSuggestionsIngredient); // clicking the body should close the popup
}

function handleInputIngredient() {
  let repository;
  const userInput = searchInputIngredient.value;
  if (userInput === undefined) {
    const searchInp = searchInput.value;
    if (searchInp === undefined) {
      if (localStorage.getItem('badges') === null) {
        repository = setCollection();
        getOptionsIngredients(repository);
        openSuggestionsIngredient();
      } else {
        repository = getCollection();
        getOptionsIngredients(repository);
        openSuggestionsIngredient();
      }
    } else {
      repository = getCollection();
      getOptionsIngredients(repository);
      openSuggestionsIngredient();
    }
  } else {
    repository = getCollection();
    searchIngredient(userInput, repository);
    openSuggestionsIngredient();
  }
}

searchInputIngredient.addEventListener('input', handleInputIngredient);

document.getElementById('ingredientB').addEventListener('click', (event) => {
  handleInputIngredient(event);
  event.stopPropagation();
});
