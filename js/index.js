
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


async function init() {
  try {
    // Récupère les datas des photographes
    const { recipes } = await getRecipes();
    displayCards(recipes);
  } catch (err) {
    console.error(err);
  }
}

init();

const searchInputGeneral = document.querySelector('.search-input');
let filter, allCards, allTitles, allManual;
let checkTitle, checkAppliance, checkUstensils;
let titleValue;


searchInputGeneral.addEventListener('keyup', search);



function search(){
  allCards = document.querySelectorAll(".card");
  console.log(allCards);
  allTitles = document.querySelectorAll("h5");
  allManual = document.querySelectorAll(".manual");
  filter= searchInputGeneral.value.toUpperCase();

  if (filter.length > 2){
   
    for(let i = 0; i < allCards.length; i++){
      checkTitle = false;
      checkAppliance = false;
      checkUstensils = false;

      const applianceArray = allCards[i].dataset.appliance.split(',');
      const ustensilsArray = allCards[i].dataset.ustensils.split(',');

      titleValue = allTitles[i].textContent.toUpperCase();
      console.log(titleValue);
      if(titleValue.includes(filter)){
       checkTitle = true;
      }
        for (let j = 0; j < applianceArray.length; j++){

          if(applianceArray[j].toUpperCase().includes(filter)){
           checkAppliance = true;
          }
        }
        
        for (let k = 0; k < ustensilsArray.length; k++){
          if(ustensilsArray[k].toUpperCase().includes(filter)){
           checkUstensils = true
          }
        }

       if(checkTitle || checkAppliance || checkUstensils){
          allCards[i].style.display = "flex";
         
       }else{
        allCards[i].style.display = "none";
       }
    }

  }
}