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
  todo: document.querySelector('[data-status="todo"] .task-container'),
  doing: document.querySelector('[data-status="doing"] .task-container'),
  done: document.querySelector('[data-status="done"] .task-container'),
};

function createTaskElement(task) {
  const taskElement = document.createElement("div");
  div.classList.add("task-div");
  div.textContent = task.title;
  div.addeventListener("click", () => openModal(task));
  return div;
}

function renderTasks(tasks) {
  Object.values(columContainers).forEach((container) => {container.innerHTML = "";});
  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    columContainers[task.status].appendChild(taskElement);
  });
}

