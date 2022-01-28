function cardRecipeFactory(data) {
  const {id, name, servings, ingredients, time, description, appliance, ustensils} = data;

  function getCardRecipeDOM() {
    const card = document.createElement('div');
    card.className ="card";
    card.setAttribute('id', `${id}`);

    const cardBody =document.createElement('div');
    cardBody.className="card-body";
    card.appendChild(cardBody);

    const image = document.createElement('img');
    image.setAttribute('src', 'assets/images/imageneutre.png');
    image.setAttribute('alt', 'image recette');
    cardBody.appendChild(image);

    const heading = document.createElement('div');
    heading.className="row heading";
    cardBody.appendChild(heading);

    const heading_left= document.createElement('div');
    heading_left.className="heading_left";
    heading.appendChild(heading_left);
    const title = document.createElement('h5');
    title.className="card-title";
    title.textContent=`${name}`;
    heading_left.appendChild(title);

    const heading_right=document.createElement('div');
    heading_right.className="heading_right";
    heading.appendChild(heading_right);

    const timer = document.createElement('i');
    timer.className = "fa fa-clock";
    heading_right.appendChild(timer);

    const duration = document.createElement('span');
    duration.className="time";
    duration.textContent = `${time} min`;
    heading_right.appendChild(duration);

    const specifications = document.createElement('div');
    specifications.className= "row";
    cardBody.appendChild(specifications);
    const component = document.createElement('div');
    component.className = "ingredients col-6";
    specifications.appendChild(component);
    const listIngredients =document.createElement('ul');
    listIngredients.className="list_ingredients";
    ingredients.forEach(item => {
      const line = document.createElement('li');
      line.className = "card-text";
      if(item.quantity === undefined){item.quantity=''};
      if(item.unit === 'grammes'){item.unit='g'};
      if(item.unit === 'cuillère à soupe'){item.unit='cuillère'};
      if(item.unit === 'cuillères à soupe'){item.unit='cuillères'};
      if(item.unit === undefined){item.unit=''};
      line.textContent = item.ingredient+': '+item.quantity+' '+item.unit; 
      listIngredients.appendChild(line);
    });
    component.appendChild(listIngredients);

    const manual = document.createElement('div');
    manual.className="manual col-6";
    manual.textContent= `${description}`;
    specifications.appendChild(manual);

    return card;

  }
return {getCardRecipeDOM}
}
