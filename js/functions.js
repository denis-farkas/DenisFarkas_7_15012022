import {
  suggestionsIngredient,
  suggestionsAppliance,
  suggestionsUstensil,
  recipesSection,
  searchInput,
} from './selectors.js';

import { getOptionsIngredients } from './ingredientFunctions.js';
import { getOptionsAppliances } from './applianceFunctions.js';
import { getOptionsUstensils } from './ustensilFunctions.js';

import cardRecipeFactory from './factory/cardRecipe.js';

import recipes from '../data/recipes.js';

export function setCollection(collection) {
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
  getOptionsAppliances(allRecipes);
  getOptionsUstensils(allRecipes);
}

/* Fonction de recherche globale */

export function search(Filter) {
  const filteredRecipes = [];
  recipes.forEach((recipe) => {
    if (
      recipe.name.toUpperCase().includes(Filter) ||
      recipe.description.toUpperCase().includes(Filter) ||
      recipe.ingredients.filter((ingredients) =>
        ingredients.ingredient.toUpperCase().includes(Filter)
      ).length > 0
    ) {
      filteredRecipes.push(recipe);
    }
  });
  resetDisplayCards();
  resetDisplayFilters();
  displayCards(filteredRecipes);
  getOptionsIngredients(filteredRecipes);
  getOptionsAppliances(filteredRecipes);
  getOptionsUstensils(filteredRecipes);
  localStorage.setItem('Repository', JSON.stringify(filteredRecipes));
}

export function testFilter() {
  const Filter = searchInput.value.toUpperCase();
  if (Filter.length > 2) {
    search(Filter);
  } else {
    init();
  }
}

export function searchTags(item) {
  const filteredRecipes = localStorage.getItem('Repository');
  const filteredTags = [];

  filteredRecipes.forEach((element) => {
    const propertiesArray = new Set();
    const result = [];
    element.ingredients.forEach((component) => {
      propertiesArray.add(component.ingredient.toUpperCase());
    });
    element.ustensils.forEach((component) => {
      propertiesArray.add(component.toUpperCase());
    });

    propertiesArray.add(element.appliance.toUpperCase());

    item.forEach((component) => {
      const value = component.toUpperCase();
      const isCorrect = propertiesArray.has(value);
      if (isCorrect) {
        result.push(isCorrect);
      }
    });

    if (item.length === result.length) {
      filteredTags.push(element);
    }
  });

  localStorage.setItem('Repository', JSON.stringify(filteredTags));
  return filteredTags;
}
