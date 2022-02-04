export default function cardRecipeFactory(data) {
  const { id, name, ingredients, time, description, appliance, ustensils } =
    data;

  function getCardRecipeDOM() {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('id', `${id}`);
    card.setAttribute('data-appliance', `${appliance}`);
    card.setAttribute('data-ustensils', `${ustensils}`);

    const image = document.createElement('img');
    image.setAttribute('src', 'assets/images/imageneutre.png');
    image.setAttribute('alt', 'image recette');
    card.appendChild(image);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    card.appendChild(cardBody);

    const heading = document.createElement('div');
    heading.className = 'row heading';
    cardBody.appendChild(heading);

    const headingLeft = document.createElement('div');
    headingLeft.className = 'heading_left';
    heading.appendChild(headingLeft);
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = `${name}`;
    headingLeft.appendChild(title);

    const headingRight = document.createElement('div');
    headingRight.className = 'heading_right';
    heading.appendChild(headingRight);

    const timer = document.createElement('i');
    timer.className = 'fa fa-clock';
    headingRight.appendChild(timer);

    const duration = document.createElement('span');
    duration.className = 'time';
    duration.textContent = `${time} min`;
    headingRight.appendChild(duration);

    const specifications = document.createElement('div');
    specifications.className = 'specifications row';
    cardBody.appendChild(specifications);
    const component = document.createElement('div');
    component.className = 'ingredients col-6';
    specifications.appendChild(component);
    const listIngredients = document.createElement('ul');
    listIngredients.className = 'list_ingredients';
    ingredients.forEach((item) => {
      const line = document.createElement('li');
      line.className = 'card-text';
      if (item.quantity === undefined) {
        item.quantity = '';
      }
      if (item.unit === 'grammes') {
        item.unit = 'g';
      }
      if (item.unit === 'cuillère à soupe') {
        item.unit = 'cuillère';
      }
      if (item.unit === 'cuillères à soupe') {
        item.unit = 'cuillères';
      }
      if (item.unit === undefined) {
        item.unit = '';
      }
      line.textContent = `${item.ingredient}: ${item.quantity} ${item.unit}`;
      listIngredients.appendChild(line);
    });
    component.appendChild(listIngredients);

    const manual = document.createElement('div');
    manual.className = 'manual col-6';
    manual.textContent = `${description}`;
    specifications.appendChild(manual);

    return card;
  }
  return { getCardRecipeDOM };
}
