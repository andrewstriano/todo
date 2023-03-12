import { projects, Project, addProject } from "./projects";

const mainContainer = document.querySelector(".content");
const addProjectButton = document.querySelector("#addProjectButton");
addProjectButton.innerText = "Add Project";
const projectFormContainer = document.querySelector(".projectFormContainer");
const modal = document.querySelector(".modal");
const projectForm = document.querySelector("#projectForm");
const formList = document.querySelector(".formList");
const projectFormAddToDoButton = document.querySelector(
  ".projectFormAddToDoButton"
);
const closeProjectFormButton = document.querySelector(
  ".closeProjectFormButton"
);
const submitProjectButton = document.querySelector(".submitProjectButton");
const projectTitle = document.querySelector("#title");
const projectDueDate = document.querySelector("#dueDate");
let formStatus = "inactive";

// functions
function openProjectForm() {
  projectFormContainer.classList.toggle("inactive");
  modal.classList.toggle("inactive");
  projectFormContainer.classList.toggle("active");
  modal.classList.toggle("active");
  mainContainer.classList.add("isBlurred");
  formStatus = "active";
}

function closeProjectForm() {
  projectFormContainer.classList.toggle("inactive");
  modal.classList.toggle("inactive");
  projectFormContainer.classList.toggle("active");
  modal.classList.toggle("active");
  mainContainer.classList.remove("isBlurred");
  formStatus = "inactive";
}

function closeFormOnOutsideClick(event) {
  if (formStatus === "active" && event.target === modal) {
    closeProjectForm();
  }
}

function cancelToDo(event) {
  event.target.parentNode.remove();
}

function openToDoInput(event) {
  event.preventDefault();

  const inputContainer = document.createElement("li");
  inputContainer.classList.add("inputContainer");

  const toDoLabel = document.createElement("label");
  toDoLabel.innerText = 'Enter your "to do":';

  const toDoInput = document.createElement("textarea");
  toDoInput.classList.add("projectFormToDoInput");

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancelToDoButton");
  cancelButton.classList.add("form-button");
  cancelButton.innerText = "Cancel To Do";
  cancelButton.addEventListener("click", cancelToDo);

  inputContainer.append(toDoLabel, toDoInput, cancelButton);
  formList.append(inputContainer);
}

function addUi() {
  document.body.append(mainContainer);
}

// event listeners
closeProjectFormButton.addEventListener("click", closeProjectForm);

window.addEventListener("click", closeFormOnOutsideClick);

addProjectButton.addEventListener("click", openProjectForm);

projectFormAddToDoButton.addEventListener("click", openToDoInput);

submitProjectButton.addEventListener("click", createProject);

function createProject() {
  let name = projectTitle.value;
  let dueDate = projectDueDate.value;
  const newProject = new Project(name, dueDate);
  addProject(newProject);
  createToDoList();
}

function createToDoList() {
  const toDoNodeList = document.querySelectorAll(".projectFormToDoInput");
  console.log(toDoNodeList);
  const toDoArray = Array.from(toDoNodeList);
  const toDoValues = toDoArray.map((e) => e.value);
  console.log(toDoValues);
}

export { mainContainer, addUi, addProjectButton };
