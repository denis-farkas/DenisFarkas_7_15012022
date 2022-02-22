import {
  suggestionsIngredient,
  suggestionsAppliance,
  suggestionsUstensil,
} from './selectors.js';

export function getIngredients(collection) {
  const ingredientArray = [];
  collection.forEach((element) => {
    element.ingredients.forEach((ingredient) => {
      if (!ingredientArray.includes(ingredient)) {
        ingredientArray.push(ingredient);
      }
    });
  }); // utiliser set

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
    li.id = `optionIngredient-${i}`;
    li.role = 'option'; // necessary for any children of a role="listbox"
    li.textContent = element;
    li.className = 'option Ingredient';
    suggestionsIngredient.appendChild(li);
  });
}

export function getAppliance() {}
