const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []; 

console.log(itemsArray);

document.querySelector("#add").addEventListener('click', () => {
  const item = document.querySelector("#item").value; 
  createItem(item);
});
document.querySelector("#clear").addEventListener('click', () => {
clearItems();
});

function createItem(item){
    itemsArray.push(item);  
    localStorage.setItem('items', JSON.stringify(itemsArray));
    location.reload();  
}
function clearItems() {
  itemsArray.length =0; // clear the array
  localStorage.setItem('items', JSON.stringify(itemsArray)); // save the array
  location.reload(); // reload the page
  
}

function displayItems() {
  let items = '';
  for (let index = 0; index < itemsArray.length; index++) {
    items += `
    <div class="item">
    <div class="input-controller">
        <textarea disabled> ${itemsArray[index]} </textarea>
        <div class="edit-controller">
            <i class="fa-solid fa-check deleteBtn"></i>
            <i class="fa-regular fa-pen-to-square editBtn"></i>
        </div>
    </div>
    <div class="update-controller">
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
    </div>
</div>
`;
    
  }
  document.querySelector(".to_do_list").innerHTML = items;
  
}
function displayDay() {
  var date = new Date();
  date = date.toString().split(' ');
  document.querySelector("#date").innerHTML = date[0] + " " + date[1] + " " + date[2] + " " + date[3];
}

window.onload = function() {
  displayItems();
  displayDay();
}