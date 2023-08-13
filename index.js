let todos = [];
let filterValue = "all";

// selecting
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");

// events
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

// functions
function createTodos(todos) {
  let result = "";

  todos.forEach((todo) => {
    result += `<li class="todo ${
      todo.isCompleted ? "completed" : "uncompleted"
    }">
    <p>${todo.title}</p>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString(
      "fa-IR"
    )}</span>
    <span class="todo__check" data-todo-id=${
      todo.id
    }><i class="far fa-check-square"></i></span>
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
}

function addNewTodo(e) {
  e.preventDefault();

  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };

  todos.push(newTodo);

  // create todos on DOM
  filterTodos();
  todoInput.value = "";
}

function filterTodos() {
  switch (filterValue) {
    case "all": {
      createTodos(todos);
      break;
    }

    case "completed": {
      const filteredTodos = todos.filter((todo) => todo.isCompleted);
      createTodos(filteredTodos);
      break;
    }

    case "uncompleted": {
      const filteredTodos = todos.filter((todo) => !todo.isCompleted);
      createTodos(filteredTodos);
      break;
    }
  }
}

function removeTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((todo) => todo.id !== todoId);
  filterTodos();
}

function checkTodo(e) {
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((todo) => todo.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  filterTodos();
}
