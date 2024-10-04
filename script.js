let draggedItem = null;
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
  activateDragAndDrop();
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

function createItem(item) {

  if (item.trim() !== "") {
    const timestamp = new Date().toLocaleString();
    itemsArray.push({ content: item, timestamp: timestamp, status: "achieved" });
    localStorage.setItem('items', JSON.stringify(itemsArray));
    displayItems();
  }
  else {
    alert("Nhập nội dung đã bạn êy :v");
  }

}
function clearItems() {
  itemsArray.length = 0;
  localStorage.setItem('items', JSON.stringify(itemsArray)); // save the array
  location.reload();

}

function displayItems(filter = 'all') {
  let items = '';
  for (let index = 0; index < itemsArray.length; index++) {
    if (filter === 'all' || filter === itemsArray[index].status) {
      items += `
    <div class="item  draggable="true" data-index="${index}">
    <div class="input-controller ">
     <input type="checkbox" class="tickBtn" ${itemsArray[index].completed ? 'checked' : ''}>
         <textarea disabled class="${itemsArray[index].completed ? 'textarea-strikethrough' : ''}">${itemsArray[index].content}</textarea>
        <div class="edit-controller">
            <i class="fa-solid fa-x deleteBtn"></i>
            <i class="fa-regular fa-pen-to-square editBtn"></i>
        </div>
    </div>
    
    <div class="update-controller">
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
    </div>
<div class="status-time-container"  draggable ="true">
     <div class="status-controller">
                <label for="status-select-${index}"> </label>
                <select id="status-select-${index}" class="status-select">
                    <option value="achieved" ${itemsArray[index].status === 'achieved' ? 'selected' : ''}>✅ Achieved</option>
                    <option value="in-progress" ${itemsArray[index].status === 'in-progress' ? 'selected' : ''}>🔄 In-progress</option>
                    <option value="Issue" ${itemsArray[index].status === 'Issue' ? 'selected' : ''}>⚠️ Issue</option>
                    <option value="completed" ${itemsArray[index].status === 'completed' ? 'selected' : ''}>🌱 Next Plant</option>
                </select>
            </div>

    <div class="timestamp"> ${itemsArray[index].timestamp}</div>
    </div>
</div>
`;
    }

  }
  document.querySelector(".to_do_list").innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
  activateStatusListeners();
  activateDragAndDrop();
  activateTickListeners();

}
document.querySelector("#status-filter").addEventListener('change', (e) => {
  displayItems(e.target.value);
});

function activateStatusListeners() {
  const statusSelects = document.querySelectorAll('.status-select');
  statusSelects.forEach((select, index) => {
    select.addEventListener('change', () => {
      itemsArray[index].status = select.value;
      localStorage.setItem('items', JSON.stringify(itemsArray));
    });
  });
}



function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll('.deleteBtn');
  deleteBtn.forEach((button, index) => {
    button.addEventListener('click', () => {
      deleteItem(index);
    });
  });
}
function activateEditListeners() {
  let editBtn = document.querySelectorAll('.editBtn');
  const updateController = document.querySelectorAll('.update-controller');
  const inputs = document.querySelectorAll('.input-controller textarea');
  editBtn.forEach((button, index) => {
    button.addEventListener('click', () => {
      updateController[index].style.display = 'block';
      inputs[index].disabled = false;

    });
  })
}

function activateSaveListeners() {
  let saveBtn = document.querySelectorAll('.saveBtn');
  const inputs = document.querySelectorAll('.input-controller textarea');
  saveBtn.forEach((button, index) => {
    button.addEventListener('click', () => {
      updateItem(index, inputs[index].value);
    })
  })
}

function activateCancelListeners() {
  let cancelBtn = document.querySelectorAll('.cancelBtn');
  const inputs = document.querySelectorAll('.input-controller textarea');
  const updateController = document.querySelectorAll('.update-controller');
  cancelBtn.forEach((button, index) => {
    button.addEventListener('click', () => {
      updateController[index].style.display = 'none';
      inputs[index].disabled = true;

    });
  })

}
function updateItem(index, value) {
  itemsArray[index].content = value;
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();

}

function deleteItem(index) {
  itemsArray.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  location.reload();
}
function displayDay() {
  var date = new Date();
  date = date.toString().split(' ');
  document.querySelector("#date").innerHTML = date[0] + " " + date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
  displayItems();
  displayDay();
}
function activateDragAndDrop() {
  const draggables = document.querySelectorAll('.item');
  const container = document.querySelector('.to_do_list');

  draggables.forEach(draggable => {
    addDragAndDropEvents(draggable);
  });

  container.addEventListener('dragover', function (e) {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggingElement = document.querySelector('.dragging');
    if (afterElement == null) {
      container.appendChild(draggingElement);
    } else {
      container.insertBefore(draggingElement, afterElement);
    }
  });
}

function addDragAndDropEvents(item) {
  item.addEventListener('dragstart', () => {
    draggedItem = item;
    setTimeout(() => item.classList.add('dragging'), 0);
  });

  item.addEventListener('dragend', () => {
    setTimeout(() => {
      draggedItem = null;
      item.classList.remove('dragging');
      updateItemsOrder();
    }, 0);
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateItemsOrder() {
  const items = document.querySelectorAll('.item');
  const newOrder = Array.from(items).map(item => {
    return itemsArray[item.getAttribute('data-index')];
  });

  itemsArray = newOrder;
  localStorage.setItem('items', JSON.stringify(itemsArray));

}

function activateTickListeners() {
  const tickBtns = document.querySelectorAll('.tickBtn');
  tickBtns.forEach((button, index) => {
    button.addEventListener('click', () => {
      itemsArray[index].completed = button.checked;
      const textarea = button.nextElementSibling;
      if (button.checked) {
        textarea.classList.add('textarea-strikethrough');
      } else {
        textarea.classList.remove('textarea-strikethrough');
      }
      localStorage.setItem('items', JSON.stringify(itemsArray));
    });
  });
}

document.getElementById("hamburger-icon").addEventListener("click", function () {
  var dropdown = document.getElementById("dropdown-menu");
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
});