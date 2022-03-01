import {
  suggestionsAppliance,
  autocompleteAppliance,
  searchInputAppliance,
  searchInput,
} from './selectors.js';

import recipes from '../data/recipes.js';

export function getAppliances(collection) {
  const applianceArray = new Set();

  collection.forEach((element) => {
    applianceArray.add(element.appliance);
  });

  return applianceArray;
}

export function getOptionsAppliances(collection) {
  const applianceArray = getAppliances(collection);

  localStorage.setItem(
    'filteredAppliance',
    JSON.stringify([...applianceArray])
  );
  suggestionsAppliance.innerHTML = '';

  const factor = applianceArray.size / 10;
  if (factor <= 1) {
    suggestionsAppliance.classList.remove('toomuch');
    suggestionsAppliance.classList.remove('various3');
    suggestionsAppliance.classList.remove('various2');
  } else if (factor > 1 && factor <= 2) {
    suggestionsAppliance.classList.remove('toomuch');
    suggestionsAppliance.classList.remove('various3');
    suggestionsAppliance.classList.add('various2');
  } else {
    suggestionsAppliance.classList.add('various3');
    suggestionsAppliance.classList.add('toomuch');
  }

  applianceArray.forEach((element) => {
    const li = document.createElement('li');
    li.id = `option-${element}`;
    li.textContent = element;
    li.className = 'option appliance';
    li.setAttribute(
      'onclick',
      `selectOption("${li.textContent}", "appliance")`
    );
    suggestionsAppliance.appendChild(li);
  });
}

export function getFilteredAppliance() {
  let filteredAppliance = [];
  if (localStorage.getItem('filteredAppliance')) {
    filteredAppliance = localStorage.getItem('filteredAppliance');
    filteredAppliance = JSON.parse(filteredAppliance);
  } else {
    filteredAppliance = getAppliances(recipes);
  }
  return filteredAppliance;
}

export function searchAppliance(filter) {
  const filteredAppliance = getFilteredAppliance();

  suggestionsAppliance.innerHTML = '';

  const Filter = filter.toUpperCase();

  const filteredApplianceArray = new Set();

  filteredAppliance.forEach((element) => {
    const applianceValue = element.toUpperCase();
    if (applianceValue.substr(0, Filter.length) === Filter) {
      filteredApplianceArray.add(element);
    }
  });

  const factor = filteredApplianceArray.size / 10;

  if (factor <= 1) {
    suggestionsAppliance.classList.remove('toomuch');
    suggestionsAppliance.classList.remove('various3');
    suggestionsAppliance.classList.remove('various2');
  } else if (factor <= 2) {
    suggestionsAppliance.classList.remove('toomuch');
    suggestionsAppliance.classList.remove('various3');
    suggestionsAppliance.classList.add('various2');
  } else {
    suggestionsAppliance.classList.add('various3');
    suggestionsAppliance.classList.add('toomuch');
  }

  filteredApplianceArray.forEach((element) => {
    const li = document.createElement('li');
    li.id = `option-${element}`;
    li.role = 'option';
    li.textContent = element;
    li.className = 'option appliance';
    li.setAttribute(
      'onclick',
      `selectOption("${li.textContent}", "appliance")`
    );
    suggestionsAppliance.appendChild(li);
  });
}

function closeSuggestionsAppliance() {
  searchInputAppliance.value = '';
  suggestionsAppliance.hidden = true; // hide popup
  autocompleteAppliance.setAttribute('aria-expanded', false); // tell assistive tech popup is hidden
  window.removeEventListener('click', closeSuggestionsAppliance); // don't need this anymore once it's closed
  // searchInput.focus(); // focus should stay on the input
}
function openSuggestionsAppliance() {
  suggestionsAppliance.hidden = false; // show popup
  autocompleteAppliance.setAttribute('aria-expanded', true); // tell assistive tech popup is shown
  window.addEventListener('click', closeSuggestionsAppliance); // clicking the body should close the popup
}

function handleInputAppliance() {
  const userInput = searchInputAppliance.value;
  if (userInput === undefined) {
    const searchInp = searchInput.value;
    if (searchInp === undefined) {
      getOptionsAppliances(recipes);
      openSuggestionsAppliance();
    } else {
      const filteredAppliance = JSON.parse(
        localStorage.getItem('filteredAppliance')
      );
      getOptionsAppliances(filteredAppliance);
      openSuggestionsAppliance();
    }
  } else {
    searchAppliance(userInput);
    openSuggestionsAppliance(); // show the suggestions if the user typed something
  }
}

searchInputAppliance.addEventListener('input', handleInputAppliance);

document.getElementById('applianceB').addEventListener('click', (event) => {
  handleInputAppliance(event);
  event.stopPropagation();
});
