import Todo from "./todos";
import Project from "./projects";
import "./styles/style.scss";
import { addUi } from "./dom";

const a0 = new Todo("0", "3/12/2023");
const a1 = new Todo("1", "3/12/2023");
const a2 = new Todo("2", "3/12/2023");
const a3 = new Todo("3", "3/12/2023");
const a4 = new Todo("4", "3/12/2023");

const defaultProject = new Project("default");

console.log(defaultProject);

defaultProject.addToDo(a0);
defaultProject.addToDo(a1);
defaultProject.addToDo(a2);
defaultProject.addToDo(a3);
defaultProject.addToDo(a4);

console.log(defaultProject);

defaultProject.removeToDo("3");
console.log(defaultProject);

addUi();
