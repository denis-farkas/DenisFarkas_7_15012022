document.addEventListener("DOMContentLoaded", (event) => {
  
const searchInputGeneral = document.querySelector('.search-input');
let filter, allCards, allTitles, allManual;
let checkTitle, checkAppliance, checkUstensils;
let titleValue;
allCards = document.querySelectorAll(".card");
console.log(allCards);
allTitles = document.querySelectorAll("h5");
allManual = document.querySelectorAll(".manual");

searchInputGeneral.addEventListener('keyup', search);



function search(){
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

});
