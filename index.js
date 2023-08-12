let todos = [];

// selecting
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");

// events
todoForm.addEventListener("submit", addNewTodo);
selectFilter.addEventListener("change", filterTodos);

// functions
function createTodos(todos) {
  let result = "";

  todos.forEach((todo) => {
    result += `<div class="todo">
    <li>${todo.title}</li>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString(
      "fa-IR"
    )}</span>
    <span class="todo__check" data-todo-id=${
      todo.id
    }><i class="far fa-check-square"></i></span>
    <span class="todo__remove" data-todo-id=${
      todo.id
    }><i class="far fa-trash-alt"></i></span>
    </div>`;
  });

  todoList.innerHTML = result;

  const removeBtns = document.querySelectorAll(".todo__remove");
  removeBtns.forEach((btn) => btn.addEventListener("click", removeTodo));
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
  createTodos(todos);
  todoInput.value = "";
}

function filterTodos(e) {
  const filter = e.target.value;

  switch (filter) {
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
  createTodos(todos);
}
