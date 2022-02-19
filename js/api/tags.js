const tags = document.getElementById('tags');
let badgesIngredient = [];
let badgesUstensil = [];
let badgesAppliance = [];
let filteredTags = [];

function removeOption(item, array) {
  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (array[i] === item) {
      array.splice(i, 1);
    }
  }
}

function checkTags() {
  if (localStorage.getItem('ingredientTags')) {
    badgesIngredient = JSON.parse(localStorage.getItem('ingredientTags'));
  }
  if (localStorage.getItem('ustensilTags')) {
    badgesUstensil = JSON.parse(localStorage.getItem('ustensilTags'));
  }
  if (localStorage.getItem('applianceTags')) {
    badgesAppliance = JSON.parse(localStorage.getItem('applianceTags'));
  }

  if (
    badgesIngredient.length > 0 ||
    badgesAppliance.length > 0 ||
    badgesUstensil.length > 0
  ) {
    filteredTags = searchTags();
    console.log(filteredTags);
    resetDisplayCards();
    resetDisplayFilters();
    displayCards(filteredTags);
    getOptionsIngredients(filteredTags);
    getOptionsAppliance(filteredTags);
    getOptionsUstensils(filteredTags);
  } else {
    const filter = searchInput.value.toUpperCase();
    search(filter);
  }
}

function selectIngredient(item) {
  const badge = document.createElement('div');
  badge.className = 'badge badge-pill ingredient';
  badge.setAttribute('id', item);
  badge.textContent = item;
  const icon = document.createElement('i');
  icon.className = 'far fa-times-circle ms-2';
  icon.setAttribute('onclick', `closeIconIngredient("${item}")`);
  badge.appendChild(icon);
  tags.appendChild(badge); // show result with badge
  if (!badgesIngredient.includes(item)) {
    badgesIngredient.push(item);
    localStorage.setItem('ingredientTags', JSON.stringify(badgesIngredient));
  }
  checkTags();
}

function closeIconIngredient(item) {
  const cible = document.getElementById(item);
  tags.removeChild(cible);
  removeOption(item, badgesIngredient);
  console.log(badgesIngredient);
  localStorage.setItem('ingredientTags', JSON.stringify(badgesIngredient));
  checkTags();
}

function selectUstensil(item) {
  const badge = document.createElement('div');
  badge.className = 'badge badge-pill ustensil';
  badge.setAttribute('id', item);
  badge.textContent = item;
  const icon = document.createElement('i');
  icon.className = 'far fa-times-circle ms-2';
  icon.setAttribute('onclick', `closeIconUstensil("${item}")`);
  badge.appendChild(icon);
  tags.appendChild(badge); // show result with badge
  badgesUstensil.push(item);
  localStorage.setItem('ustensilTags', JSON.stringify(badgesUstensil));
  checkTags();
}

function closeIconUstensil(item) {
  const cible = document.getElementById(item);
  tags.removeChild(cible);
  removeOption(item, badgesUstensil);
  localStorage.setItem('ustensilTags', JSON.stringify(badgesUstensil));
  checkTags();
}

function selectAppliance(item) {
  const badge = document.createElement('div');
  badge.className = 'badge badge-pill appliance';
  badge.setAttribute('id', item);
  badge.textContent = item;
  const icon = document.createElement('i');
  icon.className = 'far fa-times-circle ms-2';
  icon.setAttribute('onclick', `closeIconAppliance("${item}")`);
  badge.appendChild(icon);
  tags.appendChild(badge); // show result with badge
  badgesAppliance.push(item);
  localStorage.setItem('applianceTags', JSON.stringify(badgesAppliance));
  checkTags();
}

function closeIconAppliance(item) {
  const cible = document.getElementById(item);
  tags.removeChild(cible);
  removeOption(item, badgesAppliance);
  localStorage.setItem('applianceTags', JSON.stringify(badgesAppliance));
  checkTags();
}

function searchTags() {
  filteredTags = [];
  const lastRecipes = getCollection();

  for (let i = 0; i < lastRecipes.length; i += 1) {
    let checkTagsIngredient = false;
    let checkTagsAppliance = false;
    let checkTagsUstensil = false;

    if (badgesIngredient.length > 0) {
      let countIng = 0;

      for (let j = 0; j < badgesIngredient.length; j += 1) {
        const filter = badgesIngredient[j].toUpperCase();
        for (let k = 0; k < lastRecipes[i].ingredients.length; k += 1) {
          const ingredientValue =
            lastRecipes[i].ingredients[k].ingredient.toUpperCase();
          if (ingredientValue === filter) {
            countIng += 1;
          }
        }
        if (countIng === badgesIngredient.length) {
          checkTagsIngredient = true;
        }
      }
    } else {
      checkTagsIngredient = true;
    }

    if (badgesAppliance.length > 0) {
      let countApp = 0;
      for (let j = 0; j < badgesAppliance.length; j += 1) {
        const filter = badgesAppliance[j].toUpperCase();
        for (let k = 0; k < lastRecipes[i].appliance.length; k += 1) {
          const applianceValue = lastRecipes[i].appliance[k].toUpperCase();

          if (applianceValue === filter) {
            countApp += 1;
          }
        }
        if (countApp === badgesAppliance.length) {
          checkTagsAppliance = true;
        }
      }
    } else {
      checkTagsAppliance = true;
    }

    if (badgesUstensil.length > 0) {
      let countUst = 0;

      for (let j = 0; j < badgesUstensil.length; j += 1) {
        const filter = badgesUstensil[j].toUpperCase();
        for (let k = 0; k < lastRecipes[i].ustensils.length; k += 1) {
          const ustensilValue = lastRecipes[i].ustensils[k].toUpperCase();

          if (ustensilValue === filter) {
            countUst += 1;
          }
        }
        if (countUst === badgesUstensil.length) {
          checkTagsUstensil = true;
        }
      }
    } else {
      checkTagsUstensil = true;
    }
    if (checkTagsIngredient && checkTagsAppliance && checkTagsUstensil) {
      filteredTags[i] = lastRecipes[i];
    }
  }
  console.log(filteredTags);
  return filteredTags;
}

function removeOptionDifferent(item, array) {
  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
  }
}
