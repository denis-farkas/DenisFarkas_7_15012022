let badgesIngredient = [];
let badgesUstensil = [];
let badgesAppliance = [];


function removeOption(item, array){
  for(let i=array.length-1; i>=0; i--){
    if(array[i] === item){
      array.splice(i, 1);
    }
  }
}

function checkTags(badgesIngredient, badgesAppliance, badgesUstensil){
  if(badgesIngredient.length > 0 || badgesAppliance.length > 0 || badgesUstensil > 0){
   const filteredTags = searchTags(badgesIngredient, badgesAppliance, badgesUstensil);
   console.log(filteredTags);
   resetDisplayCards();
   resetDisplayFilters();
   displayCards(filteredTags);
   getOptionsIngredients(filteredTags);
   getOptionsAppliance(filteredTags);
   getOptionsUstensils(filteredTags);
   localStorage.setItem('Repository', JSON.stringify(filteredTags)); 
 }else{
   filter= searchInput.value.toUpperCase();
   search(filter);
 }
}

function selectIngredient(item) {
  const badge = document.createElement('div');
  badge.className="badge badge-pill ingredient";
  badge.setAttribute("id", item);
  badge.textContent = item;
  const icon = document.createElement('i');
  icon.className="far fa-times-circle ms-2";
  icon.setAttribute("onclick", 'closeIconIngredient("'+item+'")');
  badge.appendChild(icon);
  tags.appendChild(badge); //show result with badge
  if (!badgesIngredient.includes(item)) {
    badgesIngredient.push(item);
  }
  checkTags(badgesIngredient, badgesAppliance, badgesUstensil);
}

function closeIconIngredient(item){
  const cible = document.getElementById(item);
  tags.removeChild(cible);
  removeOption(item, badgesIngredient);
  checkTags(badgesIngredient, badgesAppliance, badgesUstensil);
}


function selectUstensil(item) {
  const badge = document.createElement('div');
  badge.className="badge badge-pill ustensil";
  badge.setAttribute("id", item);
  badge.textContent = item;
  const icon = document.createElement('i');
  icon.className="far fa-times-circle ms-2";
  icon.setAttribute("onclick", 'closeIconUstensil("'+item+'")');
  badge.appendChild(icon);
  tags.appendChild(badge); //show result with badge
  badgesUstensil.push(item);
  checkTags(badgesIngredient, badgesAppliance, badgesUstensil);
}

function closeIconUstensil(item){
  const cible = document.getElementById(item);
  tags.removeChild(cible);
  removeOption(item, badgesUstensil);
  checkTags(badgesIngredient, badgesAppliance, badgesUstensil);
}


function selectAppliance(item) {
  const badge = document.createElement('div');
  badge.className="badge badge-pill appliance";
  badge.setAttribute("id", item);
  badge.textContent = item;
  const icon = document.createElement('i');
  icon.className="far fa-times-circle ms-2";
  icon.setAttribute("onclick", 'closeIconAppliance("'+item+'")');
  badge.appendChild(icon);
  tags.appendChild(badge); //show result with badge
  badgesAppliance.push(item);
  checkTags(badgesIngredient, badgesAppliance, badgesUstensil);
}

function closeIconAppliance(item){
  const cible = document.getElementById(item);
  tags.removeChild(cible);
  removeOption(item, badgesAppliance);
  checkTags(badgesIngredient, badgesAppliance, badgesUstensil);
}


function searchTags(badgesIngredient, badgesAppliance, badgesUstensil){
  let lastRecipes = getCollection();
  
  let checkTagsIngredient = true;
  let checkTagsAppliance = true;
  let checkTagsUstensil = true;
  let filteredTags = [];

  for (i=0; i < lastRecipes.length; i++){
   
    if(badgesIngredient.length > 0){
      let countIng = 0;
      for(j=0; j < badgesIngredient.length; j++){
        filter= badgesIngredient[j].toUpperCase();
        for (let k = 0; k < lastRecipes[i].ingredients.length; k++) {
          let ingredientValue = lastRecipes[i].ingredients[k].ingredient.toUpperCase();
          if (ingredientValue === filter) {
            countIng++;
          }
        }
        if (countIng !== badgesIngredient.length){
          checkTagsIngredient = false;
        }
      }
    }

    if(badgesAppliance.length > 0){
      let countApp = 0;
      for(j=0; j < badgesAppliance.length; j++){
        filter= badgesAppliance[j].toUpperCase();
        for (let k = 0; k < lastRecipes[i].appliance.length; k += 1) {
          applianceValue = lastRecipes[i].appliance[k].toUpperCase();
          
          if (applianceValue === filter) {
            countApp += 1
          }
        }
        if (countApp !== badgesAppliance.length){
          console.log('wrong');
          checkTagsAppliance = false;
        }
      }
      
    }

    if(badgesUstensil.length > 0){
      let countUst = 0;
      for(j=0; j < badgesUstensil.length; j++){
        filter= badgesUstensil[j].toUpperCase();
        for (let k = 0; k < lastRecipes[i].ustensil.length; k += 1) {
          applianceValue = lastRecipes[i].ustensil[k].toUpperCase();
          
          if (ustensilValue === filter) {
            countUst += 1
          }
        }
        if (countUst !== badgesustensil.length){
          console.log('wrong');
          checkTagsUstensil = false;
        }
      }
    }

    if (checkTagsIngredient == true && checkTagsAppliance == true && checkTagsUstensil == true){
      filteredTags.push(lastRecipes[i]);
    }

  }
  return filteredTags; 
}  


function removeOptionDifferent(item, array){
  const index = array.indexOf(item);
  if (index > -1){
    array.splice(index, 1); 
  }
}

