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
  for (let i = 0; i < collection.length; i += 1) {
    const filterModel = cardRecipeFactory(collection[i]);
    const cardRecipeDOM = filterModel.getCardRecipeDOM();
    recipesSection.appendChild(cardRecipeDOM);
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
}

init();
