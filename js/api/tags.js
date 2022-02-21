/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const tags = document.getElementById('tags');
let badges = [];

function removeOption(item, array) {
  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (array[i] === item) {
      array.splice(i, 1);
    }
  }
}

function checkTags() {
  if (localStorage.getItem('badges')) {
    badges = JSON.parse(localStorage.getItem('badges'));
    if (badges.length > 0) {
      // eslint-disable-next-line no-use-before-define
      filteredTags = searchTags(badges);
      resetDisplayCards();
      resetDisplayFilters();
      displayCards(filteredTags);
      getOptionsIngredients(filteredTags);
      getOptionsAppliance(filteredTags);
      getOptionsUstensils(filteredTags);
    } else {
      testFilter();
    }
  }
}

function selectOption(item, classe) {
  if (localStorage.getItem('badges')) {
    badges = JSON.parse(localStorage.getItem('badges'));
  }
  const badge = document.createElement('div');
  badge.className = `badge badge-pill ${classe}`;
  badge.setAttribute('id', item);
  badge.textContent = item;
  const icon = document.createElement('i');
  icon.className = 'far fa-times-circle ms-2';
  icon.setAttribute('onclick', `closeIcon("${item}")`);
  badge.appendChild(icon);
  tags.appendChild(badge); // show result with badge
  if (!badges.includes(item)) {
    badges.push(item);
    localStorage.setItem('badges', JSON.stringify(badges));
  }
  checkTags();
}

function closeIcon(item) {
  badges = JSON.parse(localStorage.getItem('badges'));
  const cible = document.getElementById(item);
  tags.removeChild(cible);
  removeOption(item, badges);
  localStorage.setItem('badges', JSON.stringify(badges));
  checkTags();
}

function searchTags(item) {
  const lastRecipes = getCollection();
  const filteredTags = [];

  for (let i = 0; i < lastRecipes.length; i += 1) {
    const ingredientArray = [];
    const count = [];

    for (let j = 0; j < lastRecipes[i].ingredients.length; j += 1) {
      ingredientArray.push(
        lastRecipes[i].ingredients[j].ingredient.toUpperCase()
      );
    }

    ingredientArray.push(lastRecipes[i].appliance.toUpperCase());

    for (let j = 0; j < lastRecipes[i].ustensils.length; j += 1) {
      ingredientArray.push(lastRecipes[i].ustensils[j].toUpperCase());
    }

    for (let k = 0; k < item.length; k += 1) {
      const value = item[k].toUpperCase();
      if (ingredientArray.includes(value)) {
        count[k] = 'true';
      } else {
        count[k] = 'false';
      }
    }
    if (!count.includes('false')) {
      filteredTags.push(lastRecipes[i]);
    }
  }
  return filteredTags;
}
