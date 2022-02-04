const autocompleteIngredient = document.getElementById("autocompleteIngredient");
const searchInputIngredient = document.getElementById("searchInputIngredient");
const suggestionsIngredient = document.getElementById("suggestionsIngredient");
const tags = document.getElementById("tags");


let filterIngredients;

allCards = document.querySelectorAll('.card');

filterIngredients= searchInputIngredient.value.toUpperCase();

function getfilteredIngredients(){
  let filteredIngredients=[];
  console.log(filteredIngredients);
  for(let i = 0; i < allCards.length; i++){
    const ingredientArray= allCards[i].dataset.ingredient.split(',');
    console.log(ingredientArray);
          for(j=0; j <ingredientArray.length; j++){
           filteredIngredients.push(ingredientArray[j])
          }       
  }
return filteredIngredients;    
}


      function openSuggestionsIngredient() {
        suggestionsIngredient.hidden = false; // show popup
        autocompleteIngredient.setAttribute("aria-expanded", true); // tell assistive tech popup is shown
        window.addEventListener("click", closeSuggestionsIngredient); // clicking the body should close the popup
      }
      function closeSuggestionsIngredient() {
        CURRENT_INDEX = -1; // reset back to initial value
        suggestionsIngredient.hidden = true; // hide popup
        autocompleteIngredient.setAttribute("aria-expanded", false); // tell assistive tech popup is hidden
        window.removeEventListener("click", closeSuggestionsIngredient); // don't need this anymore once it's closed
        //searchInput.focus(); // focus should stay on the input
      }

      function selectIngredient() {
        const badge = document.createElement('div');
        badge.className="badge badge-pill ingredient";
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
  const INGREDIENTS = getfilteredIngredients();
  console.log(INGREDIENTS);
  FILTERED = INGREDIENTS.filter(f => f.includes(userInput)); // filter our fruit based on what was typed
  suggestionsIngredient.innerHTML = ""; // clear out old suggestions
  FILTERED.forEach(createOptionIngredient);
  if (userInput.length > 2) {
    openSuggestionsIngredient(); // show the suggestions if the user typed something
  } else {
    closeSuggestionsIngredient(); // close them if user backspaces to empty the input
  }
}

  function createOptionIngredient(name, index) {
    const li = document.createElement("li");
    li.id = `option-${index}`; // we'll need this ID to track which one is highlighted
    li.role = "option"; // necessary for any children of a role="listbox"
    li.textContent = name;
    li.addEventListener("mouseover", () => updateIndex(index));
    li.addEventListener("click", selectIngredient);
    suggestionsIngredient.appendChild(li);
  }

  searchInputIngredient.addEventListener("input", handleInputIngredient);

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


  function highlightNext() {
    const newIndex = (CURRENT_INDEX + 1) % FILTERED.length; // loops back to the first item after the last
    updateIndex(newIndex);
  }
  
  function highlightPrev() {
    const newIndex = (CURRENT_INDEX - 1 + FILTERED.length) % FILTERED.length; // loops back to the last item before first
    updateIndex(newIndex);
  }

  autocompleteIngredient.addEventListener("keydown", handleKeyDown);