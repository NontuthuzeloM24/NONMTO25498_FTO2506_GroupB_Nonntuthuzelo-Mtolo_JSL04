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
  const modalWrapper = document.createElement("div");
  modalWrapper.id = "modal-wrapper";
  modalWrapper.innerHTML = modalHTML;
  document.body.appendChild(modalWrapper);

  return modalWrapper;
}

let modalWrapper = null;
let currentEditingTask = null;

/**
 * Render a single task element.
 * @param {Object} task Task data.
 * @returns {HTMLElement} The created task element.
 */
function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task-div");
  taskElement.textContent = task.title;
  taskElement.style.cursor = "pointer";

  taskElement.addEventListener("click", () => openModal(task));

  return taskElement;
}

/**
 * Render all tasks in their respective columns.
 * @param {Array} tasks Array of task objects.
 */

function renderTasks(tasks) {
  Object.values(columContainers).forEach((container) => {container.innerHTML = "";});
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    columContainers[task.status].appendChild(taskElement);
  });
}

/**
 * Opens modal with the given task data populated.
 * @param {Object} task Task to edit.
 */

function openModal(task) {
  if (!modalWrapper) {
    modalWrapper = createModal();
    // Add event listener for closing the modal
    modalWrapper.querySelector(".modal-close-btn").addEventListener("click", closeModal);
    // Add event listener for form submission 
    modalWrapper.querySelector("#task-form").addEventListener("submit", handleFormSubmit);
    // Add event listener for clicking outside the modal content to close
    modalWrapper.addEventListener("click", (event) => {
      if (event.target === modalWrapper) {
        closeModal();
      }
    });
}

currentEditingTask = task;

// populate form fields
modalWrapper.querySelector("#task-title").value = task.title;
modalWrapper.querySelector("#task-description").value = task.description;
modalWrapper.querySelector("#task-status").value = task.status;

modalWrapper.style.display = "flex"; 
}

/** Closes the modal and clears current editing task.
 */
function closeModal() {
  if (modalWrapper) {
    modalWrapper.style.display = "none"
  }
  currentEditingTask = null;
}

/**
 * Handles form submission to update task data.
 * @param {Event} event Form submit.
 */

function handleFormSubmit(event) {
  event.preventDefault();
  if (!currentEditingTask) return;  

  const title = modalWrapper.querySelector("#task-title").value.trim();
  const description = modalWrapper.querySelector("#task-description").value.trim();
  const status = modalWrapper.querySelector("#task-status").value;

  if (title === "") {
    alert("Title cannot be empty")
    return;
  }

  // Update task data
  currentEditingTask.title = title;
  currentEditingTask.description = description;
  currentEditingTask.status = status;

  //Re-render tasks after update
  renderTasks(initialTasks);

  closeModal();
}

// Initial render
renderTasks(initialTasks);