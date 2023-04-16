import Project from "./project";
import Task from "./tasks";

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
export const submitTaskButton = document.querySelector(".submitTaskButton");
let tasks = [];
function createTaskInput() {
  const list = document.querySelector("#formList");
  const li = document.createElement("li");
  li.classList.add("taskInputs");

  const inputs = [
    { description: "Task Name", name: "task", type: "text", class: "task" },
    {
      description: "Task Due",
      name: "taskDueDate",
      type: "date",
      class: "taskDueDate",
    },
    {
      description: "Task Priority",
      name: "taskPriority",
      type: "number",
      class: "taskPriority",
    },
    {
      description: "Task Description",
      name: "description",
      type: "text",
      class: "description",
    },
  ];

  inputs.forEach((x) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    label.setAttribute("for", x.name);
    label.innerText = x.description;
    input.setAttribute("class", x.class);
    input.setAttribute("type", x.type);

    li.append(label, input);
  });

  list.insertBefore(li, addTaskButton.parentNode);
  addTaskButton.classList.toggle("inactive");
  submitTaskButton.classList.toggle("inactive");
}

function submitTask() {
  const name = document.querySelector(".task").value;
  const dueDate = document.querySelector(".taskDueDate").value;
  const priority = document.querySelector(".taskPriority").value;
  const description = document.querySelector(".description").value;
  const task = new Task(name, dueDate, description, priority);
  tasks.push(task);
  document.querySelector(".taskInputs").remove();
  addTaskButton.classList.toggle("inactive");
  submitTaskButton.classList.toggle("inactive");
  previewTask(task);
}
submitTaskButton.addEventListener("click", submitTask);
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
function previewTask(task) {
  const name = document.createElement("p");
  const dueDate = document.createElement("p");
  const priority = document.createElement("p");
  const description = document.createElement("p");
  const li = document.createElement("li");
  const list = document.querySelector("#formList");
  const taskNumber = document.createElement("p");

  taskNumber.innerText = `Task Number: ${tasks.length}`;
  name.innerText = `Name: ${task.name}`;
  dueDate.innerText = `Due: ${task.dueDate}`;
  priority.innerText = `Priority: ${task.priority}`;
  description.innerText = `Description: ${task.description}`;
  li.append(taskNumber, name, dueDate, priority, description);
  list.insertBefore(li, addTaskButton.parentNode);
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
    task.innerText = tasks[i].name;
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
  const nameInput = document.querySelector("#name");
  const dueDateInput = document.querySelector("#dueDate");
  const priorityInput = document.querySelector("#priority");
  const project = new Project(
    nameInput.value,
    dueDateInput.value,
    tasks,
    priorityInput.value
  );

  projects.push(project);
  createProjectSideBarButton(project);
  closeModal();
  nameInput.value = "";
  dueDateInput.value = "";
  priorityInput.value = "";
  tasks = [];
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
