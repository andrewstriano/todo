import Task from "./tasks";

export default class Project {
  constructor(name, dueDate, tasks, priority) {
    this.name = name;
    this.dueDate = dueDate;
    this.tasks = tasks;
    this.priority = priority;
  }

  addTask(name, dueDate, description) {
    const task = new Task(name, dueDate, description);
    this.tasks.push(task);
  }
}
