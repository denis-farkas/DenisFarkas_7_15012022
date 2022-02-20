const soluce = ['Lait de Coco', 'sucre'];
const filteredTags = [];

function searchTags(item) {
  for (let i = 0; i < recipes.length; i += 1) {
    const ingredientArray = [];
    const count = [];

    for (let j = 0; j < recipes[i].ingredients.length; j += 1) {
      ingredientArray.push(recipes[i].ingredients[j].ingredient.toUpperCase());
    }

    ingredientArray.push(recipes[i].appliance.toUpperCase);

    for (let j = 0; j < recipes[i].ustensils.length; j += 1) {
      ingredientArray.push(recipes[i].ustensils[j].toUpperCase());
    }

    console.log(ingredientArray);

    for (let k = 0; k < item.length; k += 1) {
      const value = item[k].toUpperCase();
      console.log(value);
      if (ingredientArray.includes(value)) {
        count[k] = 'true';
      } else {
        count[k] = 'false';
      }
    }
    console.log(count);
    if (!count.includes('false')) {
      filteredTags.push(recipes[i]);
    }
  }
  return filteredTags;
}

searchTags(soluce);
console.log(filteredTags);
