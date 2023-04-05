export const projectContainer = document.querySelector(".projectContainer");
function expandProjectList() {
  projectContainer.classList.toggle("inactive");
}
export const projectDropDownButton = document.querySelector(".expand");
projectDropDownButton.addEventListener("click", expandProjectList);

export const modal = document.querySelector(".projectModal");
function toggleModal() {
  modal.classList.remove("inactive");
}
export const formContainer = document.querySelector(".formContainer");
function openModal() {
  toggleModal();
  window.onclick = function (event) {
    if (event.target !== formContainer && modal.classList.contains("active")) {
      modal.classList.add("inactive");
    }
  };
  modal.classList.add("active");
}

export const addProjectButton = document.querySelector(".addProjectButton");
addProjectButton.addEventListener("click", openModal);
