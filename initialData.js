const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },

  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];

// DOM elements
const columContainers = {
  todo: document.querySelector('[data-status="todo"] .tasks-container'),
  doing: document.querySelector('[data-status="doing"] .tasks-container'),
  done: document.querySelector('[data-status="done"] .tasks-container'),
};

const columnHeaders = {
  todo: document.querySelector('[data-status="todo"] .columnHeader'),
  doing: document.querySelector('[data-status="doing"] .columnHeader'),
  done: document.querySelector('[data-status="done"] .columnHeader'),
}

let modalWrapper = null;
let currentEditingTask = null;

// Create and insert modal HTML into the document
function createModal() {
  const modalHTML = `
    <div class="modal-backdrop" style="display:none;">
      <div class="modal-content">
        <button class="modal-close-btn">&times;</button>
        <h3>Edit Task</h3>
        <form id="task-form">
          <label>
            Title
            <input type="text" id="task-title" name="title" required />
          </label>
          <label>
            Description
            <textarea id="task-description" name="description" rows="4"></textarea>
          </label>
          <label>
            Status
            <select id="task-status" name="status">
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  `;
    const wrapper = document.createElement("div");
  wrapper.id = "modal-wrapper";
  wrapper.innerHTML = modalHTML;
  document.body.appendChild(wrapper);

  // Event listeners
  wrapper.querySelector(".modal-close-btn").addEventListener("click", closeModal);
  wrapper.querySelector("#task-form").addEventListener("submit", handleFormSubmit);
  wrapper.querySelector(".modal-backdrop").addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  });

  return wrapper;
}

/**
 * Create a single task element
 */
function createTaskElement(task) {
  const taskEl = document.createElement("div");
  taskEl.classList.add("task-div");
  taskEl.textContent = task.title;
  taskEl.style.cursor = "pointer";
  taskEl.addEventListener("click", () => openModal(task));
  return taskEl;
}

/**
 * Update column headers with task counts (e.g. TODO (3))
 */
function updateColumnHeaders(tasks) {
  const counts = { todo: 0, doing: 0, done: 0 };
  tasks.forEach((task) => counts[task.status]++);
  Object.keys(columnHeaders).forEach((status) => {
    columnHeaders[status].textContent = `${status.toUpperCase()} (${counts[status]})`;
  });
}

/**
 * Render all tasks to the DOM
 */
function renderTasks(tasks) {
  // Clear each column
  Object.values(columContainers).forEach((c) => (c.innerHTML = ""));

  tasks.forEach((task) => {
    const el = createTaskElement(task);
    columContainers[task.status].appendChild(el);
  });

  updateColumnHeaders(tasks);
}

/**
 * Open modal and populate with selected task
 */
function openModal(task) {
  if (!modalWrapper) {
    modalWrapper = createModal();
  }

  currentEditingTask = task;

  modalWrapper.querySelector("#task-title").value = task.title;
  modalWrapper.querySelector("#task-description").value = task.description;
  modalWrapper.querySelector("#task-status").value = task.status;

  modalWrapper.querySelector(".modal-backdrop").style.display = "flex";
}

/**
 * Close the modal
 */
function closeModal() {
  if (modalWrapper) {
    modalWrapper.querySelector(".modal-backdrop").style.display = "none";
  }
  currentEditingTask = null;
}

/**
 * Handle task form submission
 */
function handleFormSubmit(e) {
  e.preventDefault();
  if (!currentEditingTask) return;

  const title = modalWrapper.querySelector("#task-title").value.trim();
  const description = modalWrapper.querySelector("#task-description").value.trim();
  const status = modalWrapper.querySelector("#task-status").value;

  if (title === "") {
    alert("Title cannot be empty");
    return;
  }

  // Update task object
  currentEditingTask.title = title;
  currentEditingTask.description = description;
  currentEditingTask.status = status;

  renderTasks(initialTasks);
  closeModal();
}

// === Initialize the App ===
document.addEventListener("DOMContentLoaded", () => {
  renderTasks(initialTasks);
});