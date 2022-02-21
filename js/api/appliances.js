/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const suggestionsAppliance = document.getElementById('suggestionsAppliance');
const autocompleteAppliance = document.getElementById('autocompleteAppliance');
const searchInputAppliance = document.getElementById('searchInputAppliance');

const applianceFiltered = [];

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

  if (filter.length > 2) {
    const Filter = filter.toUpperCase();
    for (let i = 0; i < filteredAppliance.length; i += 1) {
      const applianceValue = filteredAppliance[i].toUpperCase();
      if (applianceValue.includes(Filter)) {
        if (!applianceFiltered.includes(filteredAppliance[i])) {
          applianceFiltered.push(filteredAppliance[i]);
        }
      }
    }

    suggestionsAppliance.innerHTML = '';
    suggestionsAppliance.classList.remove('toomuch');
    suggestionsAppliance.classList.remove('various3');
    suggestionsAppliance.classList.remove('various2');

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
}

function closeSuggestionsAppliance() {
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
  if (userInput === undefined) {
    const searchInp = searchInput.value;
    if (searchInp === undefined) {
      getOptionsAppliance(recipes);
      openSuggestionsAppliance();
    } else {
      const filteredAppliance = JSON.parse(
        localStorage.getItem('filteredAppliance')
      );
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
  openSuggestionsAppliance();
  event.stopPropagation();
});
