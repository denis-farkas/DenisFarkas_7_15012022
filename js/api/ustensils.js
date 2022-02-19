const suggestionsUstensil = document.getElementById('suggestionsUstensil');
const autocompleteUstensil = document.getElementById('ustensil');
const searchInputUstensil = document.getElementById('searchInputUstensil');

const ustensilFiltered = [];

let filteredUstensil = localStorage.getItem('filteredUstensil');
filteredUstensil = JSON.parse(filteredUstensil);

function searchUstensil(filter) {
  if (filter.length > 2) {
    const Filter = filter.toUpperCase();
    for (let i = 0; i < filteredUstensil.length; i += 1) {
      const ustensilValue = filteredUstensil[i].toUpperCase();
      if (ustensilValue.includes(Filter)) {
        if (!ustensilFiltered.includes(filteredUstensil[i])) {
          ustensilFiltered.push(filteredUstensil[i]);
        }
      }
    }

    suggestionsUstensil.innerHTML = '';
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.remove('various2');

    for (let i = 0; i < ustensilFiltered.length; i += 1) {
      const li = document.createElement('li');
      li.id = `optionUstensil-${i}`;
      li.role = 'option';
      li.textContent = ustensilFiltered[i];
      li.className = 'option Ustensil';
      li.setAttribute('onclick', `selectUstensil("${li.textContent}")`);
      suggestionsUstensil.appendChild(li);
    }
  }
}

function closeSuggestionsUstensil() {
  suggestionsUstensil.hidden = true; // hide popup
  autocompleteUstensil.setAttribute('aria-expanded', false);
  window.removeEventListener('click', closeSuggestionsUstensil);
}
function openSuggestionsUstensil() {
  suggestionsUstensil.hidden = false; // show popup
  autocompleteUstensil.setAttribute('aria-expanded', true);
  window.addEventListener('click', closeSuggestionsUstensil);
}

function handleInputUstensil(event) {
  const userInput = event.target.value;
  if (userInput.length > 2) {
    searchUstensil(userInput);
    openSuggestionsUstensil();
  } else {
    // eslint-disable-next-line no-undef
    getOptionsUstensils(filteredRecipes);
    closeSuggestionsUstensil();
  }
}

searchInputUstensil.addEventListener('input', handleInputUstensil);

document.getElementById('ustensilB').addEventListener('click', (event) => {
  openSuggestionsUstensil();
  event.stopPropagation();
});
