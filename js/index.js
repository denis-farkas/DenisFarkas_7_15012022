import cardRecipeFactory from './factory/cardRecipe.js';
import recipes from '../data/recipes.js';

const recipesSection = document.querySelector('main');
function setCollection(collection) {
  localStorage.setItem('Repository', JSON.stringify(collection));
}

export function getCollection() {
  let Repository = localStorage.getItem('Repository');
  Repository = JSON.parse(Repository);
  return Repository;
}

export function displayCards(collection) {
  if (collection.length < 1) {
    const message = document.createElement('div');
    message.className = 'message';
    const phrase = document.createElement('h4');
    phrase.className = 'phrase';
    phrase.textContent = 'Aucune recette ne correspond à votre critère…';
    const subPhrase = document.createElement('h5');
    subPhrase.className = 'subPhrase';
    subPhrase.textContent =
      'Vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    message.appendChild(phrase);
    message.appendChild(subPhrase);
    recipesSection.appendChild(message);
  } else {
    for (let i = 0; i < collection.length; i += 1) {
      const filterModel = cardRecipeFactory(collection[i]);
      const cardRecipeDOM = filterModel.getCardRecipeDOM();
      recipesSection.appendChild(cardRecipeDOM);
    }
  }
}

export function resetDisplayCards() {
  recipesSection.innerHTML = '';
}

export function resetDisplayFilters() {
  suggestionsIngredient.innerHTML = '';
  suggestionsAppliance.innerHTML = '';
  suggestionsUstensil.innerHTML = '';
}

export function init() {
  localStorage.clear();
  resetDisplayCards();
  resetDisplayFilters();
  setCollection(recipes);
  const allRecipes = getCollection();
  displayCards(allRecipes);
  getOptionsIngredients(allRecipes);
  getOptionsAppliance(allRecipes);
  getOptionsUstensils(allRecipes);
}

init();
