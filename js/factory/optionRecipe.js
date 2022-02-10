function optionFactory(data) {
  const { id, name, ingredients, time, description, appliance, ustensils } =
  data;

  
  /*for (const i in ingredients) {
    if(!ingredientArray.includes(ingredients[i].ingredient)){
      ingredientArray.push(ingredients[i].ingredient);
    }
  }*/

  

  function getOptionIngredientDOM() {
    console.log(ingredients);
  for (i=0; i< ingredients.length; i++){
        const li = document.createElement("li");
        li.id = 'optionIngredient-'+ id; // we'll need this ID to track which one is highlighted
        li.role = "option"; // necessary for any children of a role="listbox"
        li.textContent = ingredients[i].ingredient;
        li.addEventListener("mouseover", () => updateIndex(index));
        li.addEventListener("click", selectIngredient);
        return li;
      }
    }   
  
     
    

  function getOptionApplianceDOM() {
    const options = document.createElement('ul');
    options.className ='suggestions Appliance';
    options.setAttribute('role', 'listbox');
    options.setAttribute('hidden', 'true');
    for (i=0; i<applianceArray.length; i++){
      const li = document.createElement("li");
      li.id = `option-${index}-${i}`; // we'll need this ID to track which one is highlighted
      li.role = "option"; // necessary for any children of a role="listbox"
      li.textContent = name;
      li.addEventListener("mouseover", () => updateIndex(index));
      li.addEventListener("click", selectAppliance);
      options.appendChild(li);
      return li;
    }
  }

  return { getOptionIngredientDOM, getOptionApplianceDOM };
}