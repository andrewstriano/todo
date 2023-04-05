import Task from "./tasks";

class Project {
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
const name = "testProject";
const dueDate = "1/1/2001";
const task1 = new Task("task1", "1/1/21", "test task desc.");
const task2 = new Task("task2", "1/1/21", "test task desc.");
const task3 = new Task("task3", "1/1/21", "test task desc.");
const tasks = [task1, task2, task3];
const priority = 1;
const testProject = new Project(name, dueDate, tasks, priority);

testProject.addTask("task4", "1/1/21", "test task desc");
console.log(testProject);
