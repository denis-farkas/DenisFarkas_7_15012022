async function getRecipes() {
  try {
    const response = await fetch('./data/recipes.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error(error);
  }
}

function displayCards(recipes) {
  const recipesSection = document.querySelector('.recipes');

  recipes.forEach((item) =>{
    const filterModel = cardRecipeFactory(item);
    const cardRecipeDOM = filterModel.getCardRecipeDOM();
    recipesSection.appendChild(cardRecipeDOM);
  });
}

function getOptionsIngredient(recipes) {
for (i=0; i <recipes.length; i++){
  console.log(recipes.length);
  for(j=0; j <recipes[i].ingredients.length; j++){
    console.log(recipes[i].ingredients.length);
    const li = document.createElement("li");
    li.id = 'optionIngredient-'+ recipes[i].id+'-'+j; // we'll need this ID to track which one is highlighted
    li.role = "option"; // necessary for any children of a role="listbox"
    li.textContent = recipes[i].ingredients[j].ingredient;
    li.className='option Ingredient';
    li.addEventListener("mouseover", () => updateIndex(index));
    li.addEventListener("click", selectIngredient);
    
    const option = document.querySelectorAll('.option');
    for(k=0; k < option.length; k++){
      if(li.textContent === option[k].textContent){
        li.setAttribute('display', 'none');
      }
    }
    suggestionsIngredient.appendChild(li);
  }
     
    }
  }   

/*function displayOptionsIngredient(recipes) {
const suggestionsIngredient = document.getElementById("suggestionsIngredient");
recipes.forEach((item) =>{
  const optionsModel = optionFactory(item);
  const optionIngredientDOM = optionsModel.getOptionIngredientDOM();
  suggestionsIngredient.appendChild(optionIngredientDOM);
})
const listIngredients = document.querySelectorAll('.card-text');
const ingredientsArray=[];

  for (j=0; j<listIngredients.length ; j++){
    ingredients = listIngredients[j].textContent.split(':')
    if(!ingredientsArray.includes(ingredients[0])){
      ingredientsArray.push(ingredients[0]);
    }


}*/


function displayOptionsAppliance(recipes) {
  const suggestionsAppliance = document.getElementById("suggestionsAppliance");
  recipes.forEach((item) =>{
    const optionsModel = optionFactory(item);
    const optionApplianceDOM = optionsModel.getOptionApplianceDOM();
    suggestionsAppliance.appendChild(optionApplianceDOM);
  })
}

function displayOptionsUstensil(recipes) {
  const suggestionsUstensil = document.getElementById("suggestionsUstensil");
  recipes.forEach((item) =>{
    const optionsModel = optionFactory(item);
    const optionUstensilDOM = optionsModel.getOptionUstensilDOM();
    suggestionsUstensil.appendChild(optionUstensilDOM);
  })
}


async function init() {
  try {
    // Récupère les datas des photographes
    const { recipes } = await getRecipes();
    displayCards(recipes);
    getOptionsIngredient(recipes);
  } catch (err) {
    console.error(err);
  }
}

init();

const searchInputGeneral = document.querySelector('.search-input');
let filter, allCards, allIngredients, allTitles, allManual, listIngredients;
let checkTitle, checkIngredient, checkManual, checkAppliance, checkUstensils;
let titleValue;

searchInputGeneral.addEventListener('keyup', search);


function search(){
  allCards = document.querySelectorAll(".card");
  allTitles = document.querySelectorAll("h5");
  allManual = document.querySelectorAll(".manual");

  filter= searchInputGeneral.value.toUpperCase();

  if (filter.length > 2){
   
    for(let i = 0; i < allCards.length; i++){
      checkTitle = false;
      checkIngredient = false;
      checkManual = false;
      checkAppliance = false;
      checkUstensils = false;

      const ingredientArray = allCards[i].dataset.ingredient.split(',');
      const applianceArray = allCards[i].dataset.appliance.split(',');
      const ustensilsArray = allCards[i].dataset.ustensils.split(',');

      titleValue = allTitles[i].textContent.toUpperCase();
      if (titleValue.includes(filter)) {
        checkTitle = true;
      }

      manualValue = allManual[i].textContent.toUpperCase();
      if (manualValue.includes(filter)) {
        checkManual = true;
      }
      
      for (let j = 0; j < ingredientArray.length; j += 1) {
        ingredientValue = ingredientArray[j].toUpperCase();
        if (ingredientValue.includes(filter)) {
          checkIngredient = true;
        }
      }

      for (let l = 0; l < applianceArray.length; l += 1) {
        if (applianceArray[l].toUpperCase().includes(filter)) {
          checkAppliance = true;
        }
      }

      for (let m = 0; m < ustensilsArray.length; m += 1) {
        if (ustensilsArray[m].toUpperCase().includes(filter)) {
          checkUstensils = true;
        }
      }

      if (
        checkTitle ||
        checkIngredient ||
        checkManual ||
        checkAppliance ||
        checkUstensils
      ) {
        allCards[i].style.display = 'flex';
      } else {
        allCards[i].style.display = 'none';
      }
    }
    const element = allCards[i];
    displayOptionsIngredient(element) ;
  }
}
