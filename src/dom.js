import Project from "./project";

export const projectContainer = document.querySelector(".projectContainer");
function expandProjectList() {
  projectContainer.classList.toggle("inactive");
}
export const projectDropDownButton = document.querySelector(".expand");
projectDropDownButton.addEventListener("click", expandProjectList);
export const modalContainer = document.querySelector(".projectModal");
export const formContainer = document.querySelector(".formContainer");
export const content = document.querySelector(".content");

function closeModal() {
  modalContainer.classList.remove("active");
  modalContainer.classList.add("inactive");
  content.classList.remove("isBlurred");
}

function openModal() {
  modalContainer.classList.remove("inactive");
  modalContainer.classList.add("active");
  content.classList.add("isBlurred");

  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      closeModal();
    }
  });
}
export const addTaskButton = document.querySelector(".addTaskButton");
let taskCount = 0;
function createTaskInput() {
  const list = document.querySelector("#formList");
  const li = document.createElement("li");
  const taskNameLabel = document.createElement("label");
  const taskName = document.createElement("input");
  taskNameLabel.setAttribute("for", "task");
  taskNameLabel.innerText = "Task Name:";
  taskName.setAttribute("class", "task");
  taskName.setAttribute("type", "text");
  taskName.dataset.taskCount = taskCount;

  const taskDueDateLabel = document.createElement("label");
  const taskDueDate = document.createElement("input");
  taskDueDateLabel.setAttribute("for", "taskDueDate");
  taskDueDateLabel.innerText = "Task Due:";
  taskDueDate.setAttribute("class", "taskDueDate");
  taskDueDate.setAttribute("type", "date");
  taskDueDate.dataset.taskCount = taskCount;

  const taskPriorityLabel = document.createElement("label");
  const taskPriority = document.createElement("input");
  taskPriorityLabel.setAttribute("for", "taskPriority");
  taskPriorityLabel.innerText = "Task Priority:";
  taskPriority.setAttribute("class", "taskPriority");
  taskPriority.setAttribute("type", "number");
  taskPriority.dataset.taskCount = taskCount;

  taskNameLabel.setAttribute("for", "task");
  taskNameLabel.innerText = "Task Name:";
  taskName.setAttribute("class", "task");
  taskName.setAttribute("type", "text");
  taskName.dataset.taskCount = taskCount;

  li.append(
    taskNameLabel,
    taskName,
    taskDueDateLabel,
    taskDueDate,
    taskPriorityLabel,
    taskPriority
  );
  list.insertBefore(li, addTaskButton.parentNode);
  taskCount++;
  console.log(taskCount);
}

addTaskButton.addEventListener("click", createTaskInput);

export const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.addEventListener("click", openModal);

const projects = [];

function completeTask(event) {
  const index = event.target.index;
  const project = event.target.project;
  event.target.project.tasks.splice(index, 1);
  event.target.parentNode.remove();
}

function displayProject(event) {
  const project = event.target.project;
  const displayContainer = document.createElement("div");
  displayContainer.classList.add("display");

  const heading = document.createElement("div");
  heading.classList.add("projectHeading");

  const title = document.createElement("h1");
  title.innerText = `Title: ${project.name}`;

  const dueDate = document.createElement("h2");
  dueDate.innerText = project.dueDate;

  const priority = document.createElement("h3");
  priority.innerText = project.priority;

  const completeProjectButton = document.createElement("button");
  completeProjectButton.innerText = "X";
  completeProjectButton.project = project;
  completeProjectButton.addEventListener("click", completeProject);

  const taskList = document.createElement("ol");
  const tasks = project.tasks;

  for (let i = 0; i < tasks.length; i++) {
    const task = document.createElement("li");
    const completeTaskButton = document.createElement("button");
    completeTaskButton.innerText = "X";
    completeTaskButton.project = project;
    completeTaskButton.index = i;
    completeTaskButton.addEventListener("click", completeTask);
    task.innerText = tasks[i];
    task.append(completeTaskButton);
    taskList.appendChild(task);
  }
  heading.append(title, dueDate, priority, completeProjectButton);
  displayContainer.append(heading, taskList);
  document.querySelector(".main").append(displayContainer);
  console.log(project);
}
function createProjectSideBarButton(project) {
  const button = document.createElement("div");
  button.classList.add("project");
  button.project = project;
  button.innerText = project.name;
  button.addEventListener("click", displayProject);
  projectContainer.appendChild(button);
}

function createProject() {
  const taskNodeList = document.querySelectorAll(".task");
  const tasks = [];
  for (let i = 0; i < taskNodeList.length; i++) {
    const val = taskNodeList[i].value;
    tasks.push(val);
  }
  const name = document.querySelector("#name").value;
  const dueDate = document.querySelector("#dueDate").value;
  const priority = document.querySelector("#priority").value;
  const project = new Project(name, dueDate, tasks, priority);

  projects.push(project);
  createProjectSideBarButton(project);
}

function refreshSideBarList() {
  document.querySelector(".projectContainer").innerHTML = "";
  projects.forEach((project) => {
    createProjectSideBarButton(project);
  });
}
function completeProject(event) {
  const proj = event.target.project;
  const index = projects.indexOf(proj);
  projects.splice(index, 1);
  event.target.parentNode.parentNode.remove();
  refreshSideBarList();
}

export const createProjectButton = document.querySelector(
  ".createProjectButton"
);
createProjectButton.addEventListener("click", createProject);
