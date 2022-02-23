import { suggestionsUstensil } from './selectors.js';

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
