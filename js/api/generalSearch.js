const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keyup',testFilter);

let filter;
let checkTitle, checkIngredient, checkManual, checkAppliance, checkUstensils;
let titleValue;

function testFilter() {
  filter= searchInput.value.toUpperCase();
  if(filter.length > 2){
    search(filter);
  }else{
    init();
  }
}

function search(filter){
    let filteredRecipes = [];
    filter= searchInput.value.toUpperCase();

      for(let i = 0; i < recipes.length; i++){
        checkTitle = false;
        checkIngredient = false;
        checkManual = false;
        checkAppliance = false;
        checkUstensils = false;

        titleValue=recipes[i].name.toUpperCase();
        if (titleValue.includes(filter)) {
          checkTitle = true;
        }

        manualValue = recipes[i].description.toUpperCase();
        if (manualValue.includes(filter)) {
          checkManual = true;
        }
        
        for (let j = 0; j < recipes[i].ingredients.length; j += 1) {
          ingredientValue = recipes[i].ingredients[j].ingredient.toUpperCase();
          if (ingredientValue.includes(filter)) {
            checkIngredient = true;
          }
        }

        for (let l = 0; l < recipes[i].appliance.length; l += 1) {
          applianceValue = recipes[i].appliance[l].toUpperCase();
          if (applianceValue.includes(filter)) {
            checkAppliance = true;
          }
        }

        for (let m = 0; m < recipes[i].ustensils.length; m += 1) {
          ustensilValue = recipes[i].ustensils[m].toUpperCase();
          if (ustensilValue.includes(filter)) {
            checkUstensils = true;
          }
        }

        if (
          checkTitle ||
          checkIngredient ||
          checkManual ||
          checkAppliance ||
          checkUstensils
        ) {
          filteredRecipes.push(recipes[i]);
        }
      }
    localStorage.clear();
    resetDisplayCards();
    resetDisplayFilters();
    displayCards(filteredRecipes);
    getOptionsIngredients(filteredRecipes);
    getOptionsAppliance(filteredRecipes);
    getOptionsUstensils(filteredRecipes);
    localStorage.setItem('Repository', JSON.stringify(filteredRecipes));       
  }

  

init();
