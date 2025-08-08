const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskCategory = document.getElementById("taskCategory");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  const today = new Date().setHours(0,0,0,0);

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    // Checkbox
    const checkbox = document.createElement("div");
    checkbox.className = "checkbox";
    if (task.completed) checkbox.classList.add("checked");
    checkbox.addEventListener("click", () => toggleTask(index));

    // Task text
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    // Category
    const category = document.createElement("span");
    category.className = `category ${task.category}`;
    category.textContent = task.category;

    // Date
    const date = document.createElement("span");
    date.className = "date";
    const taskDue = new Date(task.date).setHours(0,0,0,0);
    if (taskDue < today && !task.completed) {
      date.classList.add("overdue");
    }
    date.textContent = task.date;

    // Left content
    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.appendChild(checkbox);
    left.appendChild(category);
    left.appendChild(span);

    // Right content
    const right = document.createElement("div");
    right.style.display = "flex";
    right.style.alignItems = "center";
    right.style.gap = "6px";
    right.appendChild(date);

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(index, li));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    right.appendChild(actions);

    li.appendChild(left);
    li.appendChild(right);

    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = {
    text: taskInput.value.trim(),
    category: taskCategory.value,
    date: taskDate.value,
    completed: false
  };
  tasks.push(newTask);
  taskInput.value = "";
  taskCategory.value = "";
  taskDate.value = "";
  renderTasks();
});

// Toggle Completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Edit Task
function editTask(index) {
  const updatedText = prompt("Edit task:", tasks[index].text);
  if (updatedText !== null && updatedText.trim() !== "") {
    tasks[index].text = updatedText.trim();
    renderTasks();
  }
}

// Delete Task with fade-out
function deleteTask(index, li) {
  li.style.opacity = "0";
  setTimeout(() => {
    tasks.splice(index, 1);
    renderTasks();
  }, 400); // matches CSS transition
}

// Initial render
renderTasks();
