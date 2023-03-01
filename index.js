const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList= document.querySelector('.todo-list');

document.addEventListener('DOMContentLoaded',loadLocalStorage);
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteItem);

function addToDo(e){
  e.preventDefault();
  if(todoInput.value.trim() === ''){
    return;
  }
  const todoDiv = document.createElement('div');

  todoDiv.classList.add("todo");
  const todoArray = JSON.parse(window.localStorage.getItem("todos")) || [];
  todoArray.push(todoInput.value);
  window.localStorage.setItem("todos",JSON.stringify(todoArray));

  const todoListItem = document.createElement("li");
  todoListItem.classList.add("todo-item");
  todoListItem.innerText=todoInput.value;

  todoDiv.appendChild(todoListItem);

  const itemDelete = document.createElement("button");
  itemDelete.classList.add("todo-delete");
  itemDelete.innerHTML='<i class="fa-solid fa-trash"></i>';
  todoDiv.appendChild(itemDelete);

  todoList.appendChild(todoDiv);
  todoInput.value="";
}

function deleteItem(e){
  if(e.target.classList[0] === 'todo-delete'){
    e.target.parentElement.classList.add('fall');
    let temp = JSON.parse(window.localStorage.getItem('todos')).filter(x=>x!=e.target.parentElement.innerText);
    window.localStorage.removeItem('todos');
    window.localStorage.setItem('todos',JSON.stringify(temp));
    e.target.parentElement.remove();
  }
}

function loadLocalStorage(){
  let todoListArray = [];

  if(window.localStorage.getItem("todos") === null){
    window.localStorage.setItem("todos",JSON.stringify(todoListArray));
  }else{
    todoListArray.push( JSON.parse(window.localStorage.getItem('todos')));
  }

  todoListArray[0].forEach((item)=>{
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const todoListItem = document.createElement("li");
    todoListItem.classList.add("todo-item")
    todoListItem.innerText=item;
    todoDiv.appendChild(todoListItem);

    const itemDelete = document.createElement("button");
    itemDelete.classList.add("todo-delete");
    itemDelete.innerHTML='<i class="fa-solid fa-trash"></i>';
    todoDiv.appendChild(itemDelete);

    todoList.appendChild(todoDiv);
  })
}