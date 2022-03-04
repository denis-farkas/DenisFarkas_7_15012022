/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const suggestionsAppliance = document.getElementById('suggestionsAppliance');
const autocompleteAppliance = document.getElementById('autocompleteAppliance');
const searchInputAppliance = document.getElementById('searchInputAppliance');

function getFilteredAppliance() {
  let filteredAppliance = [];
  if (localStorage.getItem('filteredAppliance')) {
    filteredAppliance = localStorage.getItem('filteredAppliance');
    filteredAppliance = JSON.parse(filteredAppliance);
  } else {
    filteredAppliance = getAppliances(recipes);
  }
  return filteredAppliance;
}

function searchAppliance(filter) {
  const filteredAppliance = getFilteredAppliance();

  suggestionsAppliance.innerHTML = '';

  const Filter = filter.toUpperCase();

  const applianceFiltered = [];

  for (let i = 0; i < filteredAppliance.length; i += 1) {
    const applianceValue = filteredAppliance[i].toUpperCase();
    if (applianceValue.substr(0, Filter.length) === Filter) {
      if (!applianceFiltered.includes(filteredAppliance[i].toLowerCase())) {
        applianceFiltered.push(filteredAppliance[i].toLowerCase());
      }
    }
  }

  const factor = applianceFiltered.length / 10;

  if (factor <= 1) {
    suggestionsAppliance.classList.remove('toomuch');
    suggestionsAppliance.classList.remove('various3');
    suggestionsAppliance.classList.remove('various2');
  } else if (factor <= 2) {
    suggestionsAppliance.classList.remove('toomuch');
    suggestionsAppliance.classList.remove('various3');
    suggestionsAppliance.classList.add('various2');
  } else {
    suggestionsAppliance.classList.add('various3');
    suggestionsAppliance.classList.add('toomuch');
  }

  for (let i = 0; i < applianceFiltered.length; i += 1) {
    const li = document.createElement('li');
    li.id = `optionAppliance-${i}`;
    li.role = 'option';
    li.textContent = applianceFiltered[i];
    li.className = 'option appliance';
    li.setAttribute(
      'onclick',
      `selectOption("${li.textContent}", "appliance")`
    );
    suggestionsAppliance.appendChild(li);
  }
}

function closeSuggestionsAppliance() {
  searchInputAppliance.value = '';
  suggestionsAppliance.hidden = true; // hide popup
  autocompleteAppliance.setAttribute('aria-expanded', false); // tell assistive tech popup is hidden
  window.removeEventListener('click', closeSuggestionsAppliance); // don't need this anymore once it's closed
  // searchInput.focus(); // focus should stay on the input
}
function openSuggestionsAppliance() {
  suggestionsAppliance.hidden = false; // show popup
  autocompleteAppliance.setAttribute('aria-expanded', true); // tell assistive tech popup is shown
  window.addEventListener('click', closeSuggestionsAppliance); // clicking the body should close the popup
}

function handleInputAppliance() {
  const userInput = searchInputAppliance.value;
  if (!userInput) {
    const searchInp = searchInput.value;
    if (!searchInp) {
      if (!localStorage.getItem('filteredTags')) {
        getOptionsAppliance(recipes);
        openSuggestionsAppliance();
      } else {
        getOptionsAppliance(filteredTags);
        openSuggestionsAppliance();
      }
    } else {
      const filteredAppliance = JSON.parse(localStorage.getItem('Repository'));
      getOptionsAppliance(filteredAppliance);
      openSuggestionsAppliance();
    }
  } else {
    searchAppliance(userInput);
    openSuggestionsAppliance(); // show the suggestions if the user typed something
  }
}

searchInputAppliance.addEventListener('input', handleInputAppliance);

document.getElementById('applianceB').addEventListener('click', (event) => {
  handleInputAppliance(event);
  event.stopPropagation();
});
