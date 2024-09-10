const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []; 

console.log(itemsArray);

document.querySelector("#add").addEventListener('click', () => {
  const item = document.querySelector("#item").value; 
  createItem(item);
});

function createItem(item){
    itemsArray.push(item);  
    localStorage.setItem('items', JSON.stringify(itemsArray));
    location.reload();  
}

function displayDay() {
  var date = new Date();
  date = date.toString().split(' ');
  document.querySelector("#date").innerHTML = date[0] + " " + date[1] + " " + date[2] + " " + date[3];
}

window.onload = displayDay;