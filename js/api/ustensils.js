/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const suggestionsUstensil = document.getElementById('suggestionsUstensil');
const autocompleteUstensil = document.getElementById('ustensil');
const searchInputUstensil = document.getElementById('searchInputUstensil');

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

  suggestionsUstensil.innerHTML = '';

  const Filter = filter.toUpperCase();

  const ustensilFiltered = [];

  for (let i = 0; i < filteredUstensil.length; i += 1) {
    const ustensilValue = filteredUstensil[i].toUpperCase();
    if (ustensilValue.substr(0, Filter.length) === Filter) {
      if (!ustensilFiltered.includes(filteredUstensil[i].toLowerCase())) {
        ustensilFiltered.push(filteredUstensil[i].toLowerCase());
      }
    }
  }

  const factor = ustensilFiltered.length / 10;
  if (factor === 0) {
    suggestionsUstensil.classList.add('displayOff');
  } else if (factor <= 1) {
    suggestionsUstensil.classList.remove('displayOff');
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.remove('various2');
  } else if (factor <= 2) {
    suggestionsUstensil.classList.remove('displayOff');
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.add('various2');
  } else {
    suggestionsUstensil.classList.remove('displayOff');
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
  searchInputUstensil.placeholder = 'Ustensiles';
  searchInputUstensil.classList.remove('neutre');
  autocompleteUstensil.classList.add('strict');
  suggestionsUstensil.hidden = true; // hide popup
  autocompleteUstensil.setAttribute('aria-expanded', false);
  window.removeEventListener('click', closeSuggestionsUstensil);
}
function openSuggestionsUstensil() {
  searchInputUstensil.placeholder = 'Recherche un ustensile';
  searchInputUstensil.classList.add('neutre');
  autocompleteUstensil.classList.remove('strict');
  suggestionsUstensil.hidden = false; // show popup
  autocompleteUstensil.setAttribute('aria-expanded', true);
  window.addEventListener('click', closeSuggestionsUstensil);
}

function handleInputUstensil() {
  const userInput = searchInputUstensil.value;
  if (userInput === undefined) {
    const searchInp = searchInput.value;
    if (searchInp === undefined) {
      if (!localStorage.getItem('filteredTags')) {
        getOptionsUstensils(recipes);
        openSuggestionsUstensil();
      } else {
        getOptionsUstensils(filteredTags);
        openSuggestionsUstensil();
      }
    } else {
      const filteredUstensil = JSON.parse(localStorage.getItem('Repository'));
      getOptionsUstensils(filteredUstensil);
      openSuggestionsUstensil();
    }
  } else {
    searchUstensil(userInput);
    openSuggestionsUstensil(); // show the suggestions if the user typed something
  }
}

searchInputUstensil.addEventListener('input', handleInputUstensil);

document.getElementById('ustensilB').addEventListener('click', (event) => {
  handleInputUstensil(event);
  event.stopPropagation();
});
