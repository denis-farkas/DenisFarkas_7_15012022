const autocompleteIngredient = document.getElementById("autocompleteIngredient");
const autocompleteIngredient = document.getElementById("autocompleteIngredient");
const searchInputIngredient = document.getElementById("searchInputIngredient");
const suggestionsIngredient = document.getElementById("suggestionsIngredient");
const tags = document.getElementById("tags");

searchInputIngredient.addEventListener('keyup', search);

let filterIngredients, allCards;

allCards = document.querySelectorAll('.card');
filterIngredients= searchInputIngredient.value.toUpperCase();

let FilteredIngredient = INGREDIENTS; 

function search(){
  if (filter.length>2){
    for(i = 0; i < allCards.length; i++){
    
      checkIngredient= false;
      
      const ingredientArray= allCards[i].dataset.ingredients.split(',');
      ingredientValue = allTitles[i].textContent.toUpperCase();

      if(titleValue.includes(filter)){
       checkTitle = true;
      }
        for (j = 0; j < ingredientArray.length; j++){

          if(ingredientArray[j].toUpperCase().includes(filter)){
           checkIngredient = true;
          }
        }
        
        }

       if(checkTitle || checkIngredient){
          allCards[i].style.display = "flex";
       }else{
        allCards[i].style.display = "none";
       }
    }

  }
