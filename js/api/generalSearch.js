const searchInput = document.querySelector('.search-input');

let filter;
let checkTitle;
let checkIngredient;
let checkManual;
let checkAppliance;
let checkUstensils;
let titleValue;

/* fonctions qui chargent tout les ingrédients, appareils et ustensiles suite à la recherche globale */

function getOptionsIngredients(collection) {
  const ingredientArray = [];
  for (let i = 0; i < collection.length; i += 1) {
    for (let j = 0; j < collection[i].ingredients.length; j += 1) {
      if (!ingredientArray.includes(collection[i].ingredients[j].ingredient)) {
        ingredientArray.push(collection[i].ingredients[j].ingredient);
      }
    }
  }

  localStorage.setItem('filteredIngredient', JSON.stringify(ingredientArray));
  suggestionsIngredient.innerHTML = '';

  if (ingredientArray.length > 10) {
    const factor = ingredientArray.length / 10;
    if (factor > 1 && factor <= 2) {
      suggestionsIngredient.classList.remove('toomuch');
      suggestionsIngredient.classList.remove('various3');
      suggestionsIngredient.classList.add('various2');
    } else if (factor > 2) {
      suggestionsIngredient.classList.add('various3');
      suggestionsIngredient.classList.add('toomuch');
    }
  }

  for (let i = 0; i < ingredientArray.length; i += 1) {
    const li = document.createElement('li');
    li.id = `optionIngredient-${i}`;
    li.role = 'option'; // necessary for any children of a role="listbox"
    li.textContent = ingredientArray[i];
    li.className = 'option Ingredient';
    li.setAttribute('onclick', `selectIngredient("${li.textContent}")`);
    suggestionsIngredient.appendChild(li);
  }
  return ingredientArray;
}

function getOptionsAppliance(collection) {
  const applianceArray = [];
  for (let i = 0; i < collection.length; i += 1) {
    if (!applianceArray.includes(collection[i].appliance)) {
      applianceArray.push(collection[i].appliance);
    }
  }

  localStorage.setItem('filteredAppliance', JSON.stringify(applianceArray));
  suggestionsAppliance.innerHTML = '';

  if (applianceArray.length > 10) {
    const factor = applianceArray.length / 10;
    if (factor > 1 && factor <= 2) {
      suggestionsAppliance.classList.remove('toomuch');
      suggestionsAppliance.classList.remove('various3');
      suggestionsAppliance.classList.add('various2');
    } else if (factor > 2) {
      suggestionsAppliance.classList.add('various3');
      suggestionsAppliance.classList.add('toomuch');
    }
  }

  for (let i = 0; i < applianceArray.length; i += 1) {
    const li = document.createElement('li');
    li.id = `optionAppliance-${i}`;
    li.role = 'option';
    li.textContent = applianceArray[i];
    li.className = 'option Appliance';
    li.setAttribute('onclick', `selectAppliance("${li.textContent}")`);
    suggestionsAppliance.appendChild(li);
  }
  return applianceArray;
}

function getOptionsUstensils(collection) {
  const ustensilArray = [];
  for (let i = 0; i < collection.length; i += 1) {
    for (let j = 0; j < collection[i].ustensils.length; j += 1) {
      if (!ustensilArray.includes(collection[i].ustensils[j])) {
        ustensilArray.push(collection[i].ustensils[j]);
      }
    }
  }

  localStorage.setItem('filteredUstensil', JSON.stringify(ustensilArray));

  suggestionsUstensil.innerHTML = '';

  if (ustensilArray.length > 10) {
    const factor = ustensilArray.length / 10;
    if (factor > 1 && factor <= 2) {
      suggestionsUstensil.classList.remove('toomuch');
      suggestionsUstensil.classList.remove('various3');
      suggestionsUstensil.classList.add('various2');
    } else if (factor > 2) {
      suggestionsUstensil.classList.add('various3');
      suggestionsUstensil.classList.add('toomuch');
    }
  }
  for (let i = 0; i < ustensilArray.length; i += 1) {
    const li = document.createElement('li');
    li.id = `optionUstensil-${i}`;
    li.role = 'option';
    li.textContent = ustensilArray[i];
    li.className = 'option Ustensil';
    li.setAttribute('onclick', `selectUstensil("${li.textContent}")`);
    suggestionsUstensil.appendChild(li);
  }
  return ustensilArray;
}

/* Fonction de recherche globale */

function search() {
  const filteredRecipes = [];
  filter = searchInput.value.toUpperCase();

  for (let i = 0; i < recipes.length; i += 1) {
    checkTitle = false;
    checkIngredient = false;
    checkManual = false;
    checkAppliance = false;
    checkUstensils = false;

    titleValue = recipes[i].name.toUpperCase();
    if (titleValue.includes(filter)) {
      checkTitle = true;
    }

    const manualValue = recipes[i].description.toUpperCase();
    if (manualValue.includes(filter)) {
      checkManual = true;
    }

    for (let j = 0; j < recipes[i].ingredients.length; j += 1) {
      const ingredientValue =
        recipes[i].ingredients[j].ingredient.toUpperCase();
      if (ingredientValue.includes(filter)) {
        checkIngredient = true;
      }
    }

    for (let l = 0; l < recipes[i].appliance.length; l += 1) {
      const applianceValue = recipes[i].appliance[l].toUpperCase();
      if (applianceValue.includes(filter)) {
        checkAppliance = true;
      }
    }

    for (let m = 0; m < recipes[i].ustensils.length; m += 1) {
      const ustensilValue = recipes[i].ustensils[m].toUpperCase();
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
  resetDisplayCards();
  resetDisplayFilters();
  displayCards(filteredRecipes);
  getOptionsIngredients(filteredRecipes);
  getOptionsAppliance(filteredRecipes);
  getOptionsUstensils(filteredRecipes);
  localStorage.setItem('Repository', JSON.stringify(filteredRecipes));
}

function testFilter() {
  filter = searchInput.value.toUpperCase();
  if (filter.length > 2) {
    search(filter);
  } else {
    init();
  }
}

searchInput.addEventListener('keyup', testFilter);

init();
