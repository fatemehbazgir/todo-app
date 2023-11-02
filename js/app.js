const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const alertMessage = document.getElementById("alert-message");
const todosBody = document.querySelector("tbody");
const todos = JSON.parse(localStorage.getItem("todos")) || [];
const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};
const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    task,
    date,
    completed: false,
  };
  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    showAlert("Todo added to successfuly", "success");
  } else {
    showAlert("Please enter a todo!", "error");
  }
};
const displayTodos = () => {
  todosBody.innerHTML = "";
  if (!todos.length) {
    todosBody.innerHTML = "<tr><td>No Task Found!</td></tr>";
  }
  todos.forEach((todo) => {
    todosBody.innerHTML += `
    <tr>
    <td>${todo.task}</td>
    <td>${todo.date || "No Date"}</td>
    <td>${todo.completed ? "Completed" : "Pending"}</td>
    <td>
    <button>Edit</button>
    <button>Do</button>
    <button>Delete</button>
    </td>
    </tr>
    `;
  });
};
const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

addButton.addEventListener("click", addHandler);
