const suggestionsIngredient = document.getElementById('suggestionsIngredient');
const autocompleteIngredient = document.getElementById('autocompleteIngredient');
const searchInputIngredient = document.getElementById("searchInputIngredient");
let ingredientFiltered = [];
let CURRENT_INDEX = -1; // index of highlighted item—starts at -1 since 0 is the first item

autocompleteIngredient.addEventListener("keydown", handleKeyDownIngredient);
searchInputIngredient.addEventListener("input", handleInputIngredient);

function getOptionsIngredients(collection) {
  let ingredientArray = [];
    for (i=0; i <collection.length; i++){
      for(j=0; j <collection[i].ingredients.length; j++){
        if(!ingredientArray.includes(collection[i].ingredients[j].ingredient)){
          ingredientArray.push(collection[i].ingredients[j].ingredient);
        }
      } 
    }

    localStorage.setItem('filteredIngredient', JSON.stringify(ingredientArray));    
    suggestionsIngredient.innerHTML = "";
    if(ingredientArray.length > 10){
      let factor = (ingredientArray.length/10);
      console.log(factor);
      if(factor > 1 && factor <= 2){
        suggestionsIngredient.classList.remove('toomuch');
        suggestionsIngredient.classList.remove('various3');
        suggestionsIngredient.classList.add('various2');
      }else if(factor > 2){
        suggestionsIngredient.classList.add('various3');
        suggestionsIngredient.classList.add('toomuch');
      }
    }
    for(i=0; i<ingredientArray.length; i++){
      const li = document.createElement("li");
        li.id = 'optionIngredient-'+i; // we'll need this ID to track which one is highlighted
        li.role = "option"; // necessary for any children of a role="listbox"
        li.textContent = ingredientArray[i];
        li.className='option Ingredient';
        li.addEventListener("mouseover", () => updateIndex(i));
        li.addEventListener("click", selectItemSuggestionIngredient);
        suggestionsIngredient.appendChild(li);  
    }
    return ingredientArray;      
}

function searchIngredient(filter){
  let filteredRecipes = getCollection();
  console.log(filteredRecipes);
  if(filter.length >2){
    filter= filter.toUpperCase();
      for(let i = 0; i < filteredRecipes.length; i++){
        checkIngredient = false;
        for (let j = 0; j < filteredRecipes[i].ingredients.length; j += 1) {
          ingredientValue = filteredRecipes[i].ingredients[j].ingredient.toUpperCase();
          if (ingredientValue.includes(filter)) {
            ingredientFiltered.push(filteredRecipes[i].ingredients[j].ingredient);
          }
        }
      }
  }
    console.log(ingredientFiltered);
    localStorage.setItem('Repository', JSON.stringify(ingredientFiltered));       
  }



function openSuggestionsIngredient() {
    suggestionsIngredient.hidden = false; // show popup
    autocompleteIngredient.setAttribute("aria-expanded", true); // tell assistive tech popup is shown
    //window.addEventListener("click", closeSuggestionsIngredient); // clicking the body should close the popup
}


function closeSuggestionsIngredient() {
  CURRENT_INDEX = -1; // reset back to initial value
  suggestionsIngredient.hidden = true; // hide popup
  autocompleteIngredient.setAttribute("aria-expanded", false); // tell assistive tech popup is hidden
  window.removeEventListener("click", closeSuggestionsIngredient); // don't need this anymore once it's closed
  //searchInput.focus(); // focus should stay on the input
}


function selectItemSuggestionIngredient() {
  const badge = document.createElement('div');
  badge.className="badge badge-pill ingredient";
  badge.setAttribute('data-selected', "true");
  badge.textContent = ingredientFiltered[CURRENT_INDEX];
  const icon = document.createElement('i');
  icon.className="far fa-times-circle ms-2";
  badge.appendChild(icon);
  tags.appendChild(badge); //show result with badge
}

function handleInputIngredient(event) {
  const userInput = event.target.value;
  searchIngredient(userInput);
  if (userInput.length > 2) {
    openSuggestionsIngredient(); // show the suggestions if the user typed something
  } else {
    closeSuggestionsIngredient(); // close them if user backspaces to empty the input
  }
}

function updateIndex(newIndex) {
  const prevIndex = CURRENT_INDEX;
  CURRENT_INDEX = newIndex;
  autocompleteIngredient.setAttribute("aria-activedescendant", CURRENT_INDEX); // tells assistive-tech which li is highlighted
  const prevLi = document.getElementById(`option-${prevIndex}`);
  const currentLi = document.getElementById(`option-${CURRENT_INDEX}`);
  if (prevLi) prevLi.classList.remove("current"); // remove prev li background
  if (currentLi) currentLi.classList.add("current"); // add bg to new li
}

function highlightNext() {
  const newIndex = (CURRENT_INDEX + 1) % ingredientFiltered.length; // loops back to the first item after the last
  updateIndex(newIndex);
}

function highlightPrev() {
  const newIndex = (CURRENT_INDEX - 1 + ingredientFiltered.length) % ingredientFiltered.length; // loops back to the last item before first
  updateIndex(newIndex);
}

// runs on every keypress within the autocomplete
function handleKeyDownIngredient(event) {
  switch (event.key) {
    case "Escape":
      closeSuggestionsIngredient();
      break;
    case "ArrowDown":
      highlightNext();
      break;
    case "ArrowUp":
      highlightPrev();
      break;
    case "Enter":
      selectItemSuggestionIngredient();}

}
