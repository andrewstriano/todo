export const projectContainer = document.querySelector(".projectContainer");
function expandProjectList() {
  projectContainer.classList.toggle("inactive");
}
export const projectDropDownButton = document.querySelector(".expand");
projectDropDownButton.addEventListener("click", expandProjectList);
export const modal = document.querySelector(".projectModal");
export const formContainer = document.querySelector(".formContainer");
export const content = document.querySelector(".content");

function closeModal() {
  modal.classList.remove("active");
  modal.classList.add("inactive");
  content.classList.remove("isBlurred");
}

function openModal() {
  modal.classList.remove("inactive");
  modal.classList.add("active");
  content.classList.add("isBlurred");

  modal.addEventListener("click", (e) => {
    if (e.target !== formContainer) {
      closeModal();
    }
  });
}
export const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.addEventListener("click", openModal);
