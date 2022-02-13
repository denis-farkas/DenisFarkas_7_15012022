/* Combo boxes*/
// get our DOM nodes
const searchInputIngredient = document.getElementById("searchInputIngredient");
const searchInputAppliance = document.getElementById("searchInputAppliance");
const searchInputUstensil = document.getElementById("searchInputUstensil");

// state to keep track of
let filteredIngredient =  JSON.parse(localStorage.getItem('filteredIngredient'));  
let filteredAppliance = JSON.parse(localStorage.getItem('filteredAppliance'));  
let filteredUstensil = JSON.parse(localStorage.getItem('filteredUstensil'));  
console.log(filteredIngredient);
let CURRENT_INDEX = -1; // index of highlighted item—starts at -1 since 0 is the first item

function openSuggestionsIngredient() {
  suggestionsIngredient.hidden = false; // show popup
  autocompleteIngredient.setAttribute("aria-expanded", true); // tell assistive tech popup is shown
  window.addEventListener("click", closeSuggestionsIngredient); // clicking the body should close the popup
}

function openSuggestionsAppliance() {
  suggestionsAppliance.hidden = false; // show popup
  autocompleteAppliance.setAttribute("aria-expanded", true); // tell assistive tech popup is shown
  window.addEventListener("click", closeSuggestionsAppliance); // clicking the body should close the popup
}

function openSuggestionsUstensil() {
  suggestionsUstensil.hidden = false; // show popup
  autocompleteUstensil.setAttribute("aria-expanded", true); // tell assistive tech popup is shown
  window.addEventListener("click", closeSuggestionsUstensil); // clicking the body should close the popup
}


function closeSuggestionsIngredient() {
  CURRENT_INDEX = -1; // reset back to initial value
  suggestionsIngredient.hidden = true; // hide popup
  autocompleteIngredient.setAttribute("aria-expanded", false); // tell assistive tech popup is hidden
  window.removeEventListener("click", closeSuggestionsIngredient); // don't need this anymore once it's closed
  //searchInput.focus(); // focus should stay on the input
}


function closeSuggestionsAppliance() {
  CURRENT_INDEX = -1; // reset back to initial value
  suggestionsAppliance.hidden = true; // hide popup
  autocompleteAppliance.setAttribute("aria-expanded", false); // tell assistive tech popup is hidden
  window.removeEventListener("click", closeSuggestionsAppliance); // don't need this anymore once it's closed
  //searchInput.focus(); // focus should stay on the input
}


function closeSuggestionsUstensil() {
  CURRENT_INDEX = -1; // reset back to initial value
  suggestionsUstensil.hidden = true; // hide popup
  autocompleteUstensil.setAttribute("aria-expanded", false); // tell assistive tech popup is hidden
  window.removeEventListener("click", closeSuggestionsUstensil); // don't need this anymore once it's closed
  //searchInput.focus(); // focus should stay on the input
}


function selectItemSuggestionIngredient() {
  const badge = document.createElement('div');
  badge.className="badge badge-pill ingredient";
  badge.setAttribute('data-selected', "true");
  badge.textContent = FILTERED[CURRENT_INDEX];
  const icon = document.createElement('i');
  icon.className="far fa-times-circle ms-2";
  badge.appendChild(icon);
  tags.appendChild(badge); //show result with badge
}

function selectItemSuggestionAppliance() {
  const badge = document.createElement('div');
  badge.className="badge badge-pill appliance";
  badge.setAttribute('data-selected', "true");
  badge.textContent = FILTERED[CURRENT_INDEX];
  const icon = document.createElement('i');
  icon.className="far fa-times-circle ms-2";
  badge.appendChild(icon);
  tags.appendChild(badge); //show result with badge
}

function selectItemSuggestionUstensil() {
  const badge = document.createElement('div');
  badge.className="badge badge-pill ustensil";
  badge.setAttribute('data-selected', "true");
  badge.textContent = FILTERED[CURRENT_INDEX];
  const icon = document.createElement('i');
  icon.className="far fa-times-circle ms-2";
  badge.appendChild(icon);
  tags.appendChild(badge); //show result with badge
}

function updateIndex(newIndex) {
  const prevIndex = CURRENT_INDEX;
  CURRENT_INDEX = newIndex;
  autocomplete.setAttribute("aria-activedescendant", CURRENT_INDEX); // tells assistive-tech which li is highlighted
  const prevLi = document.getElementById(`option-${prevIndex}`);
  const currentLi = document.getElementById(`option-${CURRENT_INDEX}`);
  if (prevLi) prevLi.classList.remove("current"); // remove prev li background
  if (currentLi) currentLi.classList.add("current"); // add bg to new li
}

// is called every time the user types into the input
function handleInputIngredient(event) {
  const userInput = event.target.value;
  FILTERED = filteredIngredient.filter(f => f.includes(userInput)); // filter our fruit based on what was typed
  suggestions.innerHTML = ""; // clear out old suggestions
  FILTERED.forEach(createOption);
  if (userInput.length > 2) {
    openSuggestionsIngredient(); // show the suggestions if the user typed something
  } else {
    closeSuggestionsIngredient(); // close them if user backspaces to empty the input
  }
}

function handleInputAppliance(event) {
  const userInput = event.target.value;
  FILTERED = filteredAppliance.filter(f => f.includes(userInput)); 
  suggestionsAppliance.innerHTML = ""; 
  FILTERED.forEach(createOption);
  if (userInput.length > 2) {
    openSuggestionsAppliance(); 
  } else {
    closeSuggestionsAppliance(); 
  }
}

function handleInputUstensil(event) {
  const userInput = event.target.value;
  FILTERED = filteredUstensil.filter(f => f.includes(userInput)); 
  suggestionsUstensil.innerHTML = ""; 
  FILTERED.forEach(createOption);
  if (userInput.length > 2) {
    openSuggestionsUstensil(); 
  } else {
    closeSuggestionsUstensil(); 
  }
}



searchInputIngredient.addEventListener("input", handleInputIngredient);
searchInputAppliance.addEventListener("input", handleInputAppliance);
searchInputUstensil.addEventListener("input", handleInputUstensil);

function highlightNext() {
  const newIndex = (CURRENT_INDEX + 1) % FILTERED.length; // loops back to the first item after the last
  updateIndex(newIndex);
}

function highlightPrev() {
  const newIndex = (CURRENT_INDEX - 1 + FILTERED.length) % FILTERED.length; // loops back to the last item before first
  updateIndex(newIndex);
}

// runs on every keypress within the autocomplete
function handleKeyDown(event) {
  switch (event.key) {
    case "Escape":
      closeSuggestions();
      break;
    case "ArrowDown":
      highlightNext();
      break;
    case "ArrowUp":
      highlightPrev();
      break;
    case "Enter":
      selectItem();}

}

autocomplete.addEventListener("keydown", handleKeyDown);