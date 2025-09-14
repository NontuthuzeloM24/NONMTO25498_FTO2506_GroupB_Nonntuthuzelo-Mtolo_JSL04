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

// keeps track of tasks
class TaskManager {
  constructor(tasks) {
    this.tasks = tasks;
  }

  getTasks(){
    return this.tasks;
  }

  getTaskById(id) {
    return this.tasks.find(tasks => tasks.id === id);
  }

  updateTask(updatedTask) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask };
    }
  }
}

// ============ Modal ============
// Handles modal open/close and form logic

class Modal {
  constructor() {
    this.modalWrapper = document.getElementById('modal-wrapper');
    this.closeBtn = this.modalWrapper.querySelector('.modal-close-btn');
    this.form = this.modalWrapper.querySelector('#task-form');
    this.titleInput = this.form.querySelector('#task-title');
    this.descriptionInput = this.form.querySelector('#task-description');
    this.statusSelect = this.form.querySelector('#task-status');

    this.currentTaskId = null;

    // bindings
    this.handleClose = this.handleClose.bind(this);
    this.handleBackDropClick = this.handleBackDropClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // event listeners
    this.closeBtn.addEventListener('click', this.handleClose);
    this.modalWrapper.addEventListener('click', this.handleBackDropClick);
    this.form.addEventListener('submit', this.handleSubmit);
  }

  open(task) {
    this.currentTaskId = task.id;
    this.titleInput.value = task.title;
    this.descriptionInput.value = task.description;
    this.statusSelect.value = task.status;
    this.modalWrapper.style.display = 'flex';
  }

  close() {
    this.modalWrapper.style.display = 'none';
    this.currentTaskId = null;
    this.form.reset()
  }

  handleClose() {
    this.close();
  }

  handleBackDropClick(e) {
  if (e.target === this.modalWrapper) {
      this.close();
   }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.currentTaskId === null) return;

    const updatedTask = {
      id: this.currentTaskId,
      title: this.titleInput.value.trim(),
      description: this.descriptionInput.value.trim(),
      status: this.statusSelect.value,
    };

    if (this.onSave) {
      this.onSave(updatedTask);
    }
    this.close();
  }
}

// ============ UI ============
// Handles rendering tasks and wiring click events on tasks
class UI {
  constructor(taskManager, modal) {
    this.taskManager = taskManager;
    this.modal = modal;

    // Containers for the 3 columns
    this.columns = {
      todo: document.querySelector('.column-div[data-status="todo"] .tasks-container'),
      doing: document.querySelector('.column-div[data-status="doing"] .tasks-container'),
      done: document.querySelector('.column-div[data-status="done"] .tasks-container'),
    };

    this.headers = {
      todo: document.getElementById('toDoText'),
      doing: document.getElementById('doingText'),
      done: document.getElementById('doneText'),
    };

     this.boardTitleElem = document.getElementById('header-board-name');
     this.boardsCountElem = document.getElementById('headline-sidepanel');

     // Bindings
     this.handleTaskClick = this.handleTaskClick.bind(this);
     this.handleTaskSave = this.handleTaskSave.bind(this);

     // Wire up modal save callback
     this.modal.onSave = this.handleTaskSave;

     // Initial render
     this.render();
  }

  createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-div');
    taskDiv.textContent = task.title;
    taskDiv.dataset.taskId = task.id;

    taskDiv.addEventListener('click', () => this.handleTaskClick(task.id));
    return taskDiv;
  }

  clearColumns() {
    Object.values(this.columns).forEach(column => column.innerHTML = '');
  }

  render() {
    this.clearColumns();

    const task = this.taskManager.getTasks();

    const counts = {
      todo: 0,
      doing: 0,
      done: 0,
    };

    task.forEach(task => {
      const taskElem = this.createTaskElement(task);
      this.columns[task.status].appendChild(taskElem);
      counts[task.status]++;
    });

    this.headers.todo.textContent = `TODO (${counts.todo})`;
    this.headers.doing.textContent = `DOING (${counts.doing})`;
    this.headers.done.textContent = `DONE (${counts.done})`;
  }

  handleTaskClick(taskId) {
    const task = this.taskManager.getTaskById(taskId);
    if(task) {
      this.modal.open(task);
    }
  }

  handleTaskSave(updatedTask) {
    this.taskManager.updateTask(updatedTask)
    this.render()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const manager = new TaskManager(initialTasks);
  const modal = new Modal();
  new UI(manager, modal);
});
