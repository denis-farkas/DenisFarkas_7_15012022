const recipesSection = document.querySelector('main');
function setCollection(collection) {
  localStorage.setItem('Repository', JSON.stringify(collection));
}

function getCollection() {
  let Repository = localStorage.getItem('Repository');
  Repository = JSON.parse(Repository);
  return Repository;
}

function displayCards(collection) {
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

function resetDisplayCards() {
  recipesSection.innerHTML = '';
}

function resetDisplayFilters() {
  suggestionsIngredient.innerHTML = '';
  suggestionsAppliance.innerHTML = '';
  suggestionsUstensil.innerHTML = '';
}

function init() {
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
