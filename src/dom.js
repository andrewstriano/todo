import { projects, Project, addProject } from "./projects";
import Todo from "./todos";

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
  inputContainer.classList.add("toDoGroups");

  const toDoTitleLabel = document.createElement("label");
  toDoTitleLabel.innerText = 'Enter your "to do" title:';
  const toDoTitle = document.createElement("input");
  toDoTitle.setAttribute("type", "text");
  toDoTitle.classList.add("projectFormToDoInput");

  const toDoDueDateLabel = document.createElement("label");
  toDoDueDateLabel.setAttribute("for", "date");
  toDoDueDateLabel.innerText = "When do you need to do this by?";
  const toDoDueDate = document.createElement("input");
  toDoDueDate.setAttribute("type", "date");
  toDoDueDate.setAttribute("id", "date");

  const toDoPriorityLabel = document.createElement("label");
  toDoPriorityLabel.setAttribute("for", "priority");
  toDoPriorityLabel.innerText = "Set priority on a scale of 1-100";
  const toDoPriority = document.createElement("input");
  toDoPriority.setAttribute("type", "number");
  toDoPriority.setAttribute("id", "priority");

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancelToDoButton");
  cancelButton.classList.add("form-button");
  cancelButton.innerText = "Cancel To Do";
  cancelButton.addEventListener("click", cancelToDo);

  inputContainer.append(
    toDoTitleLabel,
    toDoTitle,
    toDoDueDateLabel,
    toDoDueDate,
    toDoPriorityLabel,
    toDoPriority,
    cancelButton
  );
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

function createProject(e) {
  e.preventDefault();
  const projectTitle = document.getElementById("title").value;
  const projectDueDate = document.getElementById("dueDate").value;
  const groups = document.getElementsByClassName("toDoGroups");
  const todoParam = [];
  const toDos = [];
  for (let index = 0; index < groups.length; index++) {
    const inputs = groups[index].getElementsByTagName("input");
    const values = [];
    for (let j = 0; j < inputs.length; j++) {
      values.push(inputs[j].value);
    }
    toDos.push(values);
  }
  toDos.forEach((element) => {
    const todoObject = new Todo(element[0], element[1], element[2]);
    todoParam.push(todoObject);
  });

  const newProject = new Project(projectTitle, projectDueDate, todoParam);
  projects.push(newProject);
  console.log(projects[0].toDos[0]);
  displayProjects(projects);
}

function displayProjects(projectsArray) {
  for (let i = 0; i < projectsArray.length; i++) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project");
    const projectHeader = document.createElement("div");
    projectHeader.classList.add("projectHeader");
    const projectTitle = document.createElement("p");
    projectTitle.classList.add("name");
    projectTitle.innerText = projectsArray[i].name;
    const projectDueDate = document.createElement("p");
    projectDueDate.classList.add("projectDueDate");
    projectDueDate.innerText = `Due by: ${projectsArray[i].dueDate}`;
    const toDosContainer = document.createElement("div");
    toDosContainer.classList.add("toDos");

    for (let j = 0; j < projectsArray[i].toDos.length; j++) {
      const toDoN = projectsArray[i].toDos[j].name;
      const toDoD = projectsArray[i].toDos[j].dueDate;
      const toDoP = projectsArray[i].toDos[j].priority;

      const toDoContainer = document.createElement("div");
      toDoContainer.classList.add("todo");
      const toDoName = document.createElement("p");
      toDoName.classList.add("title");
      toDoName.innerText = toDoN;
      const toDoDueDate = document.createElement("p");
      toDoDueDate.classList.add("toDoDueDate");
      toDoDueDate.innerText = `Due by: ${toDoD}`;
      const toDoPriority = document.createElement("p");
      toDoPriority.innerText = toDoP;

      toDoContainer.append(toDoName, toDoDueDate, toDoPriority);
      toDosContainer.append(toDoContainer);
    }
    projectHeader.append(projectTitle, projectDueDate);
    projectContainer.append(projectHeader, toDosContainer);
    document.querySelector(".projectDisplay").append(projectContainer);
  }
}

export { mainContainer, addUi, addProjectButton };
