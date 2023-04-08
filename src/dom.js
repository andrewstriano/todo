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
function createTaskInput() {
  const list = document.querySelector("#formList");
  const li = document.createElement("li");
  const label = document.createElement("label");
  const input = document.createElement("input");
  label.setAttribute("for", "task");
  label.innerText = "New Task:";
  input.setAttribute("class", "task");
  input.setAttribute("type", "text");
  li.append(label, input);
  list.insertBefore(li, addTaskButton.parentNode);
}

addTaskButton.addEventListener("click", createTaskInput);

export const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.addEventListener("click", openModal);

const projects = [];

function createProject() {
  let taskNodeList = document.querySelectorAll(".task");
  let tasks = [];
  for (let i = 0; i < taskNodeList.length; i++) {
    const val = taskNodeList[i].value;
    tasks.push(val);
  }
  let name = document.querySelector("#name").value;
  let dueDate = document.querySelector("#dueDate").value;
  let priority = document.querySelector("#priority").value;
  let project = new Project(name, dueDate, tasks, priority);

  projects.push(project);
  createProjectSideBarButton(project);
}

function completeProject(event) {
  let proj = event.target.project;
  let index = projects.indexOf(proj);
  projects.splice(index, 1);
  event.target.parentNode.parentNode.remove();
  console.log(projects);
  refreshSideBarList();
}

function refreshSideBarList() {
  document.querySelector(".projectContainer").innerHTML = "";
  projects.forEach((project) => {
    createProjectSideBarButton(project);
  });
}

function completeTask(event) {
  let index = event.target.index;
  let project = event.target.project;
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
  title.innerText = project.name;

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

export const createProjectButton = document.querySelector(
  ".createProjectButton"
);
createProjectButton.addEventListener("click", createProject);
