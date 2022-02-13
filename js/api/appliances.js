const suggestionsAppliance = document.getElementById('suggestionsAppliance');
const autocompleteAppliance = document.getElementById('autocompleteAppliance');
const searchInputAppliance = document.getElementById("searchInputAppliance");


function getOptionsAppliance(collection) {
  let applianceArray =[];
  for (i=0; i <collection.length; i++){
    if(!applianceArray.includes(collection[i].appliance)){
      applianceArray.push(collection[i].appliance);
    }
  }
  
  for(i=0; i <applianceArray.length; i++){
    const li = document.createElement("li");
      li.id = 'optionAppliance-'+i; // we'll need this ID to track which one is highlighted
      li.role = "option"; // necessary for any children of a role="listbox"
      li.textContent = applianceArray[i];
      li.className='option Appliance';
      li.addEventListener("mouseover", () => updateIndex(index));
      li.addEventListener("click", selectItemSuggestionAppliance);
      suggestionsAppliance.appendChild(li);  
  }
  
  return applianceArray;
}


function openSuggestionsAppliance() {
  suggestionsAppliance.hidden = false; // show popup
  autocompleteAppliance.setAttribute("aria-expanded", true); // tell assistive tech popup is shown
  window.addEventListener("click", closeSuggestionsAppliance); // clicking the body should close the popup
}

function closeSuggestionsAppliance() {
  CURRENT_INDEX = -1; // reset back to initial value
  suggestionsAppliance.hidden = true; // hide popup
  autocompleteAppliance.setAttribute("aria-expanded", false); // tell assistive tech popup is hidden
  window.removeEventListener("click", closeSuggestionsAppliance); // don't need this anymore once it's closed
  //searchInput.focus(); // focus should stay on the input
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

function handleInputAppliance(event) {
  const userInput = event.target.value;
  suggestionsAppliance.innerHTML = ""; 
  getOptionsAppliance(filteredRecipes);
  if (userInput.length > 2) {
    openSuggestionsAppliance(); 
  } else {
    closeSuggestionsAppliance(); 
  }
}


function handleKeyDownAppliance(event) {
  switch (event.key) {
    case "Escape":
      closeSuggestionsAppliance();
      break;
    case "ArrowDown":
      highlightNext();
      break;
    case "ArrowUp":
      highlightPrev();
      break;
    case "Enter":
      selectItemSuggestionAppliance();}

}


searchInputAppliance.addEventListener("input", handleInputAppliance);
autocompleteAppliance.addEventListener("keydown", handleKeyDownAppliance);

