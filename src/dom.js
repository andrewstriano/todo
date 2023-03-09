const mainContainer = document.createElement("div");
mainContainer.classList.add("content");

function addUi() {
  document.body.append(mainContainer);
}

export { mainContainer, addUi };
