const suggestionsIngredient = document.getElementById('suggestionsIngredient');
const autocompleteIngredient = document.getElementById(
  'autocompleteIngredient'
);
const searchInputIngredient = document.getElementById('searchInputIngredient');

const ingredientFiltered = [];

let filteredIngredient = localStorage.getItem('filteredIngredient');
filteredIngredient = JSON.parse(filteredIngredient);

function searchIngredient(filter) {
  if (filter.length > 2) {
    const Filter = filter.toUpperCase();
    for (let i = 0; i < filteredIngredient.length; i += 1) {
      const ingredientValue = filteredIngredient[i].toUpperCase();
      if (ingredientValue.includes(Filter)) {
        if (!ingredientFiltered.includes(filteredIngredient[i])) {
          ingredientFiltered.push(filteredIngredient[i]);
        }
      }
    }

    suggestionsIngredient.innerHTML = '';
    suggestionsIngredient.classList.remove('toomuch');
    suggestionsIngredient.classList.remove('various3');
    suggestionsIngredient.classList.remove('various2');

    for (let i = 0; i < ingredientFiltered.length; i += 1) {
      const li = document.createElement('li');
      li.id = `optionIngredient-${i}`;
      li.role = 'option';
      li.textContent = ingredientFiltered[i];
      li.className = 'option Ingredient';
      li.setAttribute('onclick', `selectIngredient("${li.textContent}")`);
      suggestionsIngredient.appendChild(li);
    }
  }
}

function closeSuggestionsIngredient() {
  suggestionsIngredient.hidden = true; // hide popup
  autocompleteIngredient.setAttribute('aria-expanded', false); // tell assistive tech popup is hidden
  window.removeEventListener('click', closeSuggestionsIngredient); // don't need this anymore once it's closed
}
function openSuggestionsIngredient() {
  suggestionsIngredient.hidden = false; // show popup
  autocompleteIngredient.setAttribute('aria-expanded', true); // tell assistive tech popup is shown
  window.addEventListener('click', closeSuggestionsIngredient); // clicking the body should close the popup
}

function handleInputIngredient(event) {
  const userInput = event.target.value;
  console.log(userInput);
  if (userInput.length > 2) {
    searchIngredient(userInput);
    openSuggestionsIngredient(); // show the suggestions if the user typed something
  } else {
    // eslint-disable-next-line no-undef
    getOptionsIngredients(filteredRecipes);
    closeSuggestionsIngredient(); // close them if user backspaces to empty the input
  }
}

searchInputIngredient.addEventListener('input', handleInputIngredient);

document.getElementById('ingredientB').addEventListener('click', (event) => {
  openSuggestionsIngredient();
  event.stopPropagation();
});
