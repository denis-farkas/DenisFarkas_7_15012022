const suggestionsIngredient = document.getElementById('suggestionsIngredient');
const autocompleteIngredient = document.getElementById('autocompleteIngredient');
const searchInputIngredient = document.getElementById("searchInputIngredient");
const tags = document.getElementById("tags");
let ingredientFiltered = [];



searchInputIngredient.addEventListener("input", handleInputIngredient);
filteredIngredient = localStorage.getItem("filteredIngredient");
filteredIngredient = JSON.parse(filteredIngredient);

filteredRecipes = localStorage.getItem("Repository");
filteredRecipes = JSON.parse(filteredRecipes);

function searchIngredient(filter){
  if(filter.length >2){
    filter= filter.toUpperCase();
    for(let i = 0; i < filteredIngredient.length; i++){
      ingredientValue = filteredIngredient[i].toUpperCase();
      if (ingredientValue === filter){
        if(!ingredientFiltered.includes(ingredientValue)){
        ingredientFiltered.push(ingredientValue);
        }
      }
    }

    suggestionsIngredient.innerHTML = "";
    suggestionsIngredient.classList.remove('toomuch');
    suggestionsIngredient.classList.remove('various3');
    suggestionsIngredient.classList.remove('various2');

    for(i=0; i <ingredientFiltered.length; i++){
      const li = document.createElement("li");
        li.id = 'optionIngredient-'+i; 
        li.role = "option"; 
        li.textContent = ingredientFiltered[i];
        li.className='option Ingredient';
        li.setAttribute("onclick", 'selectIngredient("'+li.textContent+'")');
        suggestionsIngredient.appendChild(li);  
    } 
  }
}

function handleInputIngredient(event) {
  const userInput = event.target.value;
  if (userInput.length > 2) {
    searchIngredient(userInput);
    openSuggestionsIngredient(); // show the suggestions if the user typed something
  } else {
    getOptionsIngredients(filteredRecipes);
    closeSuggestionsIngredient(); // close them if user backspaces to empty the input
  }
}

document.getElementById("ingredientB").addEventListener('click', function (event){
  openSuggestionsIngredient();
  event.stopPropagation();
})

function openSuggestionsIngredient() {
    suggestionsIngredient.hidden = false; // show popup
    autocompleteIngredient.setAttribute("aria-expanded", true); // tell assistive tech popup is shown
    window.addEventListener("click", closeSuggestionsIngredient); // clicking the body should close the popup
}


function closeSuggestionsIngredient() {
  suggestionsIngredient.hidden = true; // hide popup
  autocompleteIngredient.setAttribute("aria-expanded", false); // tell assistive tech popup is hidden
  window.removeEventListener("click", closeSuggestionsIngredient); // don't need this anymore once it's closed
  //searchInput.focus(); // focus should stay on the input
}
