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

export function getOptionsAppliance(collection) {
  const applianceArray = getAppliances(collection);

  localStorage.setItem('filteredAppliance', JSON.stringify(applianceArray));
  suggestionsAppliance.innerHTML = '';

  const factor = applianceArray.length / 10;
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
