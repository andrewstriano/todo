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
  let tasks = document.querySelectorAll(".task");
  let v = [];
  for (const value of tasks.values()) {
    v.push(value);
  }
  console.log((tasks));
}

export const createProjectButton = document.querySelector(
  ".createProjectButton"
);
createProjectButton.addEventListener("click", createProject);
