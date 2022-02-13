const suggestionsUstensil = document.getElementById('suggestionsUstensil');
const autocompleteUstensil = document.getElementById('autocompleteUstensil');
const searchInputUstensil = document.getElementById("searchInputUstensil");


function getOptionsUstensils(collection) {
  let ustensilArray = [];
  for (i=0; i <collection.length; i++){
    for(j=0; j <collection[i].ustensils.length; j++){
      if(!ustensilArray.includes(collection[i].ustensils[j])){
        ustensilArray.push(collection[i].ustensils[j]);
      }
    } 
  }

  localStorage.setItem('filteredUstensil', JSON.stringify(ustensilArray));    

  for(i=0; i <ustensilArray.length; i++){
    const li = document.createElement("li");
      li.id = 'optionUstensil-'+i; // we'll need this ID to track which one is highlighted
      li.role = "option"; // necessary for any children of a role="listbox"
      li.textContent = ustensilArray[i];
      li.className='option Ustensil';
      li.addEventListener("mouseover", () => updateIndex(index));
      li.addEventListener("click", selectItemSuggestionUstensil);
      suggestionsUstensil.appendChild(li);  
  } 
  return ustensilArray;  
}


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
