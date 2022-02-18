const suggestionsUstensil = document.getElementById("suggestionsUstensil");
const autocompleteUstensil = document.getElementById("ustensil");
const searchInputUstensil = document.getElementById("searchInputUstensil");
let ustensilFiltered = [];



searchInputUstensil.addEventListener("input", handleInputUstensil);
filteredUstensil = localStorage.getItem("filteredUstensil");
filteredUstensil = JSON.parse(filteredUstensil);

filteredRecipes = localStorage.getItem("Repository");
filteredRecipes = JSON.parse(filteredRecipes);

function searchUstensil(filter){
  if(filter.length >2){
    filter= filter.toUpperCase();
    for(let i = 0; i < filteredUstensil.length; i++){
      ustensilValue = filteredUstensil[i].toUpperCase();
      if (ustensilValue.includes(filter)) {
        if(!ustensilFiltered.includes(filteredUstensil[i])){
        ustensilFiltered.push(filteredUstensil[i]);
        }
      }
    }

    suggestionsUstensil.innerHTML = "";
    suggestionsUstensil.classList.remove('toomuch');
    suggestionsUstensil.classList.remove('various3');
    suggestionsUstensil.classList.remove('various2');

    for(i=0; i <ustensilFiltered.length; i++){
      const li = document.createElement("li");
        li.id = 'optionUstensil-'+i; 
        li.role = "option"; 
        li.textContent = ustensilFiltered[i];
        li.className='option Ustensil';
        li.setAttribute("onclick", 'selectUstensil(" '+li.textContent+'")');
        suggestionsUstensil.appendChild(li);  
    } 
  }
}

function handleInputUstensil(event) {
  const userInput = event.target.value;
  if (userInput.length > 2) {
    searchUstensil(userInput);
    openSuggestionsUstensil(); 
  } else {
    getOptionsUstensils(filteredRecipes);
    closeSuggestionsUstensil(); 
  }
}

document.getElementById("ustensilB").addEventListener('click', function (event){
  openSuggestionsUstensil();
  event.stopPropagation();
})

function openSuggestionsUstensil() {
  suggestionsUstensil.hidden = false; // show popup
  autocompleteUstensil.setAttribute("aria-expanded", true); 
  window.addEventListener("click", closeSuggestionsUstensil); 
}


function closeSuggestionsUstensil() {
  suggestionsUstensil.hidden = true; // hide popup
  autocompleteUstensil.setAttribute("aria-expanded", false); 
  window.removeEventListener("click", closeSuggestionsUstensil); 
}





