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

function createProjectSideBarButton(project) {
  let projectContainer = document.querySelector(".projectContainer");
  let button = document.createElement("div");
  button.classList.add("project");
  button.innerText = project.name;
  projectContainer.appendChild(button);
}

export const createProjectButton = document.querySelector(
  ".createProjectButton"
);
createProjectButton.addEventListener("click", createProject);
