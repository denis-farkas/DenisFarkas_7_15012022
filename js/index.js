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
  for(let i=0; i <collection.length; i++){
    const filterModel = cardRecipeFactory(collection[i]);
    const cardRecipeDOM = filterModel.getCardRecipeDOM();
    recipesSection.appendChild(cardRecipeDOM);
  };
}

function resetDisplayCards(){
  const recipesSection = document.querySelector('main');
  recipesSection.innerHTML = "";
}



function resetDisplayFilters(){
  suggestionsIngredient.innerHTML = "";
  suggestionsAppliance.innerHTML = "";
  suggestionsUstensil.innerHTML = "";
}

function init(){
  localStorage.clear();
  resetDisplayCards();
  resetDisplayFilters();
  setCollection(recipes);
  let allRecipes = getCollection();
  displayCards(allRecipes);
}

init();