
document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('.menu-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (addButton) {
    addButton.addEventListener('click', () => {
      const item = document.querySelector("#item").value; 
      createItem(item);
    });
  } else {
    console.error("Add button not found");
  }

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      clearItems();
    });
  } else {
    console.error("Clear button not found");
  }

  if (menuIcon) {
    menuIcon.addEventListener('click', () => {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
  } else {
    console.error("Menu icon not found");
  }
  displayItems();
  displayDay();
});



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
 
    if (item.trim() !== "") { // Kiểm tra xem item có rỗng không
      const timestamp = new Date().toLocaleString(); 
      itemsArray.push({ content: item, timestamp: timestamp });  
      localStorage.setItem('items', JSON.stringify(itemsArray));
      displayItems(); 
    }
    else{
      alert("Nhập nội dung đã bạn eey :v");
    }

}
function clearItems() {
  itemsArray.length =0; 
  localStorage.setItem('items', JSON.stringify(itemsArray)); // save the array
  location.reload(); 
  
}

function displayItems() {
  let items = '';
  for (let index = 0; index < itemsArray.length; index++) {
    items += `
    <div class="item">
    <div class="input-controller ">
        <textarea disabled> ${itemsArray[index].content} </textarea>
        <div class="edit-controller">
            <i class="fa-solid fa-x deleteBtn"></i>
            <i class="fa-regular fa-pen-to-square editBtn"></i>
        </div>
    </div>
     <div class="timestamp">Created at: ${itemsArray[index].timestamp}</div>
    <div class="update-controller">
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
    </div>
</div>
`;
  
  }
  document.querySelector(".to_do_list").innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();

  
}


function activateDeleteListeners(){
  let deleteBtn = document.querySelectorAll('.deleteBtn');
  deleteBtn.forEach((button, index) => {
    button.addEventListener('click', () => {
      deleteItem(index);
    });
  });
}
function activateEditListeners(){
  let editBtn = document.querySelectorAll('.editBtn');
  const updateController = document.querySelectorAll('.update-controller');
  const inputs = document.querySelectorAll('.input-controller textarea');
  editBtn.forEach((button, index)=>{
    button.addEventListener('click', () => {
      updateController[index].style.display = 'block';
     inputs[index].disabled = false;
      
    });
  })
}

function activateSaveListeners(){
let saveBtn = document.querySelectorAll('.saveBtn');
const inputs = document.querySelectorAll('.input-controller textarea');
saveBtn.forEach((button,index)=>{
  button.addEventListener('click',()=>{
    updateItem(index, inputs[index].value);
  })
})
}

function activateCancelListeners(){
  let cancelBtn = document.querySelectorAll('.cancelBtn');
  const inputs = document.querySelectorAll('.input-controller textarea');
  const updateController = document.querySelectorAll('.update-controller');
  cancelBtn.forEach((button, index)=>{
    button.addEventListener('click', () => {
      updateController[index].style.display = 'none';
     inputs[index].disabled = true;

    });
  })

}
function updateItem(index, value){
  itemsArray[index].content = value;
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
  
}

function deleteItem(index){
  itemsArray.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
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