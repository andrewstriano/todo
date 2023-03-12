class Project {
  constructor(name, dueDate) {
    this.name = name;
    this.dueDate = dueDate;
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

const projects = [];

function addProject(project) {
  projects.push(project);
}

export { Project, projects, addProject };
