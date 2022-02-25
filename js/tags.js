import {
  resetDisplayCards,
  resetDisplayFilters,
  displayCards,
  searchTags,
  testFilter,
} from './functions';

import { getOptionsIngredients } from './ingredientFunctions';
import { getOptionsAppliances } from './applianceFuntions';
import { getOptionsUstensils } from './ustensilFunctions';

const tags = document.getElementById('tags');
let badges = [];

function removeOption(item, array) {
  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (array[i] === item) {
      array.splice(i, 1);
    }
  }
}

function checkTags() {
  if (localStorage.getItem('badges')) {
    badges = JSON.parse(localStorage.getItem('badges'));
    if (badges.length > 0) {
      const filteredTags = searchTags(badges);
      resetDisplayCards();
      resetDisplayFilters();
      displayCards(filteredTags);
      getOptionsIngredients(filteredTags);
      getOptionsAppliances(filteredTags);
      getOptionsUstensils(filteredTags);
    } else {
      testFilter();
    }
  }
}

export function selectOption(item, classe) {
  if (localStorage.getItem('badges')) {
    badges = JSON.parse(localStorage.getItem('badges'));
  }
  const badge = document.createElement('div');
  badge.className = `badge badge-pill ${classe}`;
  badge.setAttribute('id', item);
  badge.textContent = item;
  const icon = document.createElement('i');
  icon.className = 'far fa-times-circle ms-2';
  icon.setAttribute('onclick', `closeIcon("${item}")`);
  badge.appendChild(icon);
  tags.appendChild(badge); // show result with badge
  if (!badges.includes(item)) {
    badges.push(item);
    localStorage.setItem('badges', JSON.stringify(badges));
  }
  checkTags();
}

export function closeIcon(item) {
  badges = JSON.parse(localStorage.getItem('badges'));
  const cible = document.getElementById(item);
  tags.removeChild(cible);
  removeOption(item, badges);
  localStorage.setItem('badges', JSON.stringify(badges));
  checkTags();
}
