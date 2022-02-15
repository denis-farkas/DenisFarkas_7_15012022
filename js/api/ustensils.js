const suggestionsUstensil = document.getElementById("suggestionsUstensil");
const autocompleteUstensil = document.getElementById("ustensil");
const searchInputUstensil = document.getElementById("searchInputUstensil");

document.getElementById("ustensilB").addEventListener('click', function (event){
  openSuggestionsUstensil();
  event.stopPropagation();
})


function openSuggestionsUstensil() {
  
  suggestionsUstensil.hidden = false; // show popup
  autocompleteUstensil.setAttribute("aria-expanded", true); // tell assistive tech popup is shown
  window.addEventListener("click", closeSuggestionsUstensil); // clicking the body should close the popup
}


function closeSuggestionsUstensil() {
  CURRENT_INDEX = -1; // reset back to initial value
  suggestionsUstensil.hidden = true; // hide popup
  autocompleteUstensil.setAttribute("aria-expanded", false); // tell assistive tech popup is hidden
  window.removeEventListener("click", closeSuggestionsUstensil); // don't need this anymore once it's closed
  //searchInput.focus(); // focus should stay on the input
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

function handleInputUstensil(event) {
  const userInput = event.target.value;
  suggestionsUstensil.innerHTML = ""; 
  getOptionsUstensils(filteredRecipes);
  if (userInput.length > 2) {
    openSuggestionsUstensil(); 
  } else {
    closeSuggestionsUstensil(); 
  }
}


function handleKeyDownUstensil(event) {
  switch (event.key) {
    case "Escape":
      closeSuggestionsUstensil();
      break;
    case "ArrowDown":
      highlightNext();
      break;
    case "ArrowUp":
      highlightPrev();
      break;
    case "Enter":
      selectItemSuggestionUstensil();}
}

function handleInputUstensil(event) {
  const userInput = event.target.value;
  suggestionsUstensil.innerHTML = ""; 
  getOptionsUstensils(filteredRecipes);
  if (userInput.length > 2) {
    openSuggestionsUstensil(); 
  } else {
    closeSuggestionsUstensil(); 
  }
}

searchInputUstensil.addEventListener("input", handleInputUstensil);
