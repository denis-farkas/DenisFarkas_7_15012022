/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const suggestionsUstensil = document.getElementById('suggestionsUstensil');
const autocompleteUstensil = document.getElementById('ustensil');
const searchInputUstensil = document.getElementById('searchInputUstensil');

const ustensilFiltered = [];

function getFilteredUstensil() {
  let filteredUstensil = [];
  if (localStorage.getItem('filteredUstensil')) {
    filteredUstensil = localStorage.getItem('filteredUstensil');
    filteredUstensil = JSON.parse(filteredUstensil);
  } else {
    filteredUstensil = getUstensil(recipes);
  }
  return filteredUstensil;
}

function searchUstensil(filter) {
  const filteredUstensil = getFilteredUstensil();

  const Filter = filter.toUpperCase();

  for (let i = 0; i < filteredUstensil.length; i += 1) {
    const ustensilValue = filteredUstensil[i].toUpperCase();
    let count = 0;
    for (let j = 0; j < Filter.length; j += 1) {
      const char = Filter.charAt(j);
      const charFiltered = ustensilValue.charAt(j);
      if (char === charFiltered) {
        count += 1;
      }
    }
    if (count === Filter.length)
      if (!ustensilFiltered.includes(filteredUstensil[i])) {
        ustensilFiltered.push(filteredUstensil[i]);
      }
  }
  console.log(filteredUstensil);

  suggestionsUstensil.innerHTML = '';
  const factorUstensil = ustensilFiltered.length / 10;
  if (factorUstensil <= 1) {
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.remove('various2');
  } else if (factorUstensil > 1 && factorUstensil <= 2) {
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.add('various2');
  } else {
    suggestionsUstensil.classList.add('various3');
    suggestionsUstensil.classList.add('toomuch');
  }

  for (let i = 0; i < ustensilFiltered.length; i += 1) {
    const li = document.createElement('li');
    li.id = `optionUstensil-${i}`;
    li.role = 'option';
    li.textContent = ustensilFiltered[i];
    li.className = 'option ustensil';
    li.setAttribute('onclick', `selectOption("${li.textContent}", "ustensil")`);
    suggestionsUstensil.appendChild(li);
  }
}

function closeSuggestionsUstensil() {
  searchInputUstensil.value = '';
  suggestionsUstensil.hidden = true; // hide popup
  autocompleteUstensil.setAttribute('aria-expanded', false);
  window.removeEventListener('click', closeSuggestionsUstensil);
}
function openSuggestionsUstensil() {
  suggestionsUstensil.hidden = false; // show popup
  autocompleteUstensil.setAttribute('aria-expanded', true);
  window.addEventListener('click', closeSuggestionsUstensil);
}

function handleInputUstensil() {
  const userInput = searchInputUstensil.value;
  if (!userInput) {
    const searchInp = searchInput.value;
    if (!searchInp) {
      getOptionsUstensil(recipes);
      openSuggestionsUstensil();
    } else {
      const filteredUstensil = JSON.parse(
        localStorage.getItem('filteredUstensil')
      );
      getOptionsUstensil(filteredUstensil);
      openSuggestionsUstensil();
    }
  } else {
    searchUstensil(userInput);
    openSuggestionsUstensil(); // show the suggestions if the user typed something
  }
}

searchInputUstensil.addEventListener('input', handleInputUstensil);

document.getElementById('ustensilB').addEventListener('click', (event) => {
  openSuggestionsUstensil();
  event.stopPropagation();
});