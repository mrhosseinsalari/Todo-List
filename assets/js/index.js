// let todos = [];
let filterValue = "all";
let dateValue = "";

jalaliDatepicker.startWatch();

// selecting
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");
const dateInput = document.querySelector(".date-input");

const backDrop = document.querySelector(".backdrop");
const editModal = document.querySelector(".edit-modal");
const closeModal = document.querySelector(".close-modal");

const editTodoInput = document.querySelector(".edit-input");
const editTodoForm = document.querySelector(".edit-form");

// events
document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodos(todos);
});

todoForm.addEventListener("submit", addNewTodo);

selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

dateInput.addEventListener("change", (e) => {
  dateValue = e.target.value;
  filterTodos();
});

backDrop.addEventListener("click", closeEditModal);
closeModal.addEventListener("click", closeEditModal);

// functions
function createTodos(todos) {
  let result = "";

  todos.forEach((todo) => {
    result += `<li class="todo ${
      todo.isCompleted ? "completed" : "uncompleted"
    }">
    <span class="todo__check" data-todo-id=${
      todo.id
    }><i class="far fa-check-square"></i></span>
    <p>${todo.title}</p>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString(
      "fa-IR"
    )}</span>
    <span class="todo__edit" data-todo-id=${
      todo.id
    }><i class="fas fa-edit"></i></span>
    <span class="todo__remove" data-todo-id=${
      todo.id
    }><i class="far fa-trash-alt"></i></span>
    </li>`;
  });

  todoList.innerHTML = result;

  const removeBtns = document.querySelectorAll(".todo__remove");
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));

  const checkBtns = document.querySelectorAll(".todo__check");
  checkBtns.forEach((btn) => btn.addEventListener("click", checkTodo));

  const editBtns = document.querySelectorAll(".todo__edit");
  editBtns.forEach((btn) => btn.addEventListener("click", showEditModal));
}

function addNewTodo(e) {
  e.preventDefault();

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };

  // todos.push(newTodo);
  saveTodo(newTodo);

  // create todos on DOM
  filterTodos();
  todoInput.value = "";
}

function filterTodos() {
  const todos = getAllTodos();

  switch (filterValue) {
    case "all": {
      filterTodosByDate(todos);
      break;
    }

    case "completed": {
      const filteredTodos = todos.filter((todo) => todo.isCompleted);
      filterTodosByDate(filteredTodos);
      break;
    }

    case "uncompleted": {
      const filteredTodos = todos.filter((todo) => !todo.isCompleted);
      filterTodosByDate(filteredTodos);
      break;
    }
  }
}

function filterTodosByDate(todos) {
  if (dateValue !== "") {
    const dateSplitted = dateValue.split("/");
    const [year, month, day] = dateSplitted.map((number) => Number(number));

    const convertedDate = farvardin
      .solarToGregorian(year, month, day)
      .join("-");

    const selectedDate = new Date(convertedDate).toLocaleDateString();

    const filteredTodos = todos.filter((todo) => {
      const todoCreatedDate = new Date(todo.createdAt).toLocaleDateString();
      return todoCreatedDate === selectedDate;
    });

    createTodos(filteredTodos);
  } else {
    createTodos(todos);
  }
}

function removeTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((todo) => todo.id !== todoId);
  saveAllTodos(todos);
  filterTodos();
}

function checkTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((todo) => todo.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodos(todos);
  filterTodos();
}

function showEditModal(e) {
  backDrop.classList.add("d-block");
  editModal.classList.add("show-modal");

  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((todo) => todo.id === todoId);
  editTodoInput.value = todo.title;

  editTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    todo.title = editTodoInput.value;
    closeEditModal();

    saveAllTodos(todos);
    filterTodos();
  });
}

function closeEditModal() {
  backDrop.classList.remove("d-block");
  editModal.classList.remove("show-modal");
}

// localStorage ==> web API
function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}

function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);

  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}

function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
