import {
  suggestionsIngredient,
  suggestionsAppliance,
  suggestionsUstensil,
} from './selectors.js';

export function getIngredients(collection) {
  const ingredientArray = new Set();

  collection.forEach((element) => {
    element.ingredients.forEach((item) => {
      ingredientArray.add(item.ingredient);
    });
  });

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

  ingredientArray.forEach((element) => {
    const li = document.createElement('li');
    li.id = `option-${element}`;
    li.textContent = element;
    li.className = 'option ingredient';
    li.setAttribute(
      'onclick',
      `selectOption("${li.textContent}", "ingredient")`
    );
    suggestionsIngredient.appendChild(li);
  });
}

export function getAppliances(collection) {
  const applianceArray = new Set();

  collection.forEach((element) => {
    applianceArray.add(element.appliance);
  });

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

export function getUstensils(collection) {
  const ustensilArray = new Set();

  collection.forEach((element) => {
    element.ustensils.forEach((item) => {
      ustensilArray.add(item);
    });
  });

  localStorage.setItem('filteredUstensil', JSON.stringify(ustensilArray));

  suggestionsUstensil.innerHTML = '';

  if (ustensilArray.size > 10) {
    const factor = ustensilArray.size / 10;
    if (factor > 1 && factor <= 2) {
      suggestionsUstensil.classList.remove('toomuch');
      suggestionsUstensil.classList.remove('various3');
      suggestionsUstensil.classList.add('various2');
    } else if (factor > 2) {
      suggestionsUstensil.classList.add('various3');
      suggestionsUstensil.classList.add('toomuch');
    }
  }

  ustensilArray.forEach((element) => {
    const li = document.createElement('li');
    li.id = `option-${element}`;
    li.textContent = element;
    li.className = 'option ustensil';
    li.setAttribute('onclick', `selectOption("${li.textContent}", "ustensil")`);
    suggestionsUstensil.appendChild(li);
  });
}
