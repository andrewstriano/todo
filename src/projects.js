export default class Project {
  constructor(name) {
    this.name = name;
    this.toDos = [];
  }

  addToDo(todo) {
    this.toDos.push(todo);
  }

  removeToDo(name) {
    const index = this.toDos.findIndex((item) => item.name === name);
    if (this.toDos[index].name === name) {
      this.toDos.splice(index, 1);
    }
  }
}
