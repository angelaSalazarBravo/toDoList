const taskInput = document.querySelector(".search");
const addButton = document.querySelector("form button");
const taskList = document.querySelector("ul");
const emptyMessage = document.querySelector("div p");
const taskCount = document.querySelectorAll("span")[1];

addButton.addEventListener("click", addTask);

taskList.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("btn-delete")) {
    deleteTask(e.target);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadTasksFromLocalStorage();
});

function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    return;
  }

  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
      <p>${taskText}</p>
      <button class="btn-delete">X</button>
    `;

  taskList.appendChild(taskItem);

  // que no se vea la tarea despues de añadirla
  taskInput.value = "";
  taskInput.focus();

  updateTaskCount();
  saveTaskToLocalStorage(taskText);
}

function deleteTask(target) {
  const taskItem = target.parentElement;
  taskList.removeChild(taskItem);

  updateTaskCount();
  removeTaskFromLocalStorage(taskItem.querySelector("p").textContent);
}

function updateTaskCount() {
  const taskItems = document.querySelectorAll("ul li");
  taskCount.textContent = taskItems.length;

  if (taskItems.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
}
function saveTaskToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((taskText) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <p>${taskText}</p>
        <button class="btn-delete">X</button>
      `;
    taskList.appendChild(taskItem);
  });

  updateTaskCount();
}

function removeTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
