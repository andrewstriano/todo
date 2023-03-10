const mainContainer = document.querySelector(".content");

const addProjectButton = document.querySelector("#addProjectButton");
addProjectButton.innerText = "Add Project";

const projectFormContainer = document.querySelector(".projectFormContainer");
const modal = document.querySelector(".modal");

const projectForm = document.querySelector("#projectForm");
const formList = document.querySelector(".formList");

let formStatus = "inactive";

function openProjectForm() {
  projectFormContainer.classList.toggle("inactive");
  modal.classList.toggle("inactive");
  projectFormContainer.classList.toggle("active");
  modal.classList.toggle("active");
  mainContainer.classList.add("isBlurred");
  formStatus = "active";
}
addProjectButton.addEventListener("click", openProjectForm);

function closeProjectForm() {
  projectFormContainer.classList.toggle("inactive");
  modal.classList.toggle("inactive");
  projectFormContainer.classList.toggle("active");
  modal.classList.toggle("active");
  mainContainer.classList.remove("isBlurred");
  formStatus = "inactive";
}

window.addEventListener("click", closeFormOnOutsideClick);

function closeFormOnOutsideClick(event) {
  if (formStatus === "active" && event.target === modal) {
    closeProjectForm();
  }
}

const closeProjectFormButton = document.querySelector(
  ".closeProjectFormButton"
);
closeProjectFormButton.addEventListener("click", closeProjectForm);

const projectFormAddToDoButton = document.querySelector(
  ".projectFormAddToDoButton"
);

function openToDoInput(event) {
  event.preventDefault();
  const inputContainer = document.createElement("li");
  inputContainer.classList.add("inputContainer");
  const toDoLabel = document.createElement("label");
  toDoLabel.innerText = 'Enter your "to do":';
  const toDoInput = document.createElement("textarea");
  toDoInput.classList.add("projectFormToDoInput");
  inputContainer.append(toDoLabel, toDoInput);
  formList.append(inputContainer);
}

projectFormAddToDoButton.addEventListener("click", openToDoInput);

function addUi() {
  document.body.append(mainContainer);
}

export { mainContainer, addUi, addProjectButton };
