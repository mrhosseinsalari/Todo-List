const todos = [];

// selecting

const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");

// events

todoForm.addEventListener("submit", addNewTodo);

// functions

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
  let result = "";

  todos.forEach((todo) => {
    result += `<div class="todo">
    <li>${todo.title}</li>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString(
      "fa-IR"
    )}</span>
    <span data-todo-id=${todo.id}><i class="far fa-check-square"></i></span>
    <span data-todo-id=${todo.id}><i class="far fa-trash-alt"></i></span>
    </div>`;
  });

  todoList.innerHTML = result;
  todoInput.value = "";
}
