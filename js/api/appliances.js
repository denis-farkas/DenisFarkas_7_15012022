const suggestionsAppliance = document.getElementById('suggestionsAppliance');
const autocompleteAppliance = document.getElementById('autocompleteAppliance');
const searchInputAppliance = document.getElementById("searchInputAppliance");
let applianceFiltered = [];

searchInputAppliance.addEventListener("input", handleInputAppliance);
filteredAppliance = localStorage.getItem("filteredAppliance");
filteredAppliance = JSON.parse(filteredAppliance);


function searchAppliance(filter){
  if(filter.length >2){
    filter= filter.toUpperCase();
    for(let i = 0; i < filteredAppliance.length; i++){
      applianceValue = filteredAppliance[i].toUpperCase();
      if (applianceValue.includes(filter)) {
        if(!applianceFiltered.includes(filteredAppliance[i])){
          applianceFiltered.push(filteredAppliance[i]);
        }
      }
    }

    suggestionsAppliance.innerHTML = "";
    suggestionsAppliance.classList.remove('toomuch');
    suggestionsAppliance.classList.remove('various3');
    suggestionsAppliance.classList.remove('various2');

    for(i=0; i <applianceFiltered.length; i++){
      const li = document.createElement("li");
        li.id = 'optionAppliance-'+i; 
        li.role = "option"; 
        li.textContent = applianceFiltered[i];
        li.className='option Appliance';
        li.setAttribute("onclick", 'selectAppliance(" '+li.textContent+'")');
        suggestionsAppliance.appendChild(li);  
    } 
  }
}

function handleInputAppliance(event) {
  const userInput = event.target.value;
  searchAppliance(userInput);
  if (userInput.length > 2) {
    openSuggestionsAppliance(); 
  } else {
    closeSuggestionsAppliance(); 
  }
}

document.getElementById("applianceB").addEventListener('click', function (event){
  openSuggestionsAppliance();
  event.stopPropagation();
})


function openSuggestionsAppliance() {
  suggestionsAppliance.hidden = false; // show popup
  autocompleteAppliance.setAttribute("aria-expanded", true); // tell assistive tech popup is shown
  window.addEventListener("click", closeSuggestionsAppliance); // clicking the body should close the popup
}

function closeSuggestionsAppliance() {
    suggestionsAppliance.hidden = true; // hide popup
    autocompleteAppliance.setAttribute("aria-expanded", false); // tell assistive tech popup is hidden
    window.removeEventListener("click", closeSuggestionsAppliance); // don't need this anymore once it's closed
    //searchInput.focus(); // focus should stay on the input
}


function selectAppliance(item) {
  const badge = document.createElement('div');
  badge.className="badge badge-pill appliance";
  badge.setAttribute("id", item);
  badge.textContent = item;
  const icon = document.createElement('i');
  icon.className="far fa-times-circle ms-2";
  icon.setAttribute("onclick", 'closeIcon("'+item+'")');
  badge.appendChild(icon);
  tags.appendChild(badge); //show result with badge
}