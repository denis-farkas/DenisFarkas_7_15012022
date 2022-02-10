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

function storeFiltre(collection) {
  try{
   let filtre = [];
    for(i=0; i < collection.length; i++){
      filtre = filtre.push(JSON.stringify(collection.id));
    }

    localStorage.setItem('Filter', filtre);
  } catch (error) {
    console.error(error);
  }
}

function getFilteredCollection(collection) {
  try{
    const filtre = localStorage.getItem('Filter');
    for(i=0; i < filtre.length; i++){
      for(j=0; j < collection.length; j++)
      if(filtre[i].id === JSON.stringify(collection[j].id)){
        filteredCollection = filteredCollection.push(JSON.stringify(collection[j]));
      }
      return filteredCollection;
    }
   }catch (error) {
     console.error(error);
   }

}

async function init(){
  try {
    const collection = await getRecipes();
    const arrayCollection = JSON.stringify(collection);
    console.log(arrayCollection);
    storeFiltre(collection);
    const newcollection = getFilteredCollection(collection);
    console.log(newcollection);
  }catch (err) {
    console.error(err);
  }
}

init();

