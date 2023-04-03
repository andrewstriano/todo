class Project {
  constructor(name, dueDate, tasks, priority) {
    this.name = name;
    this.dueDate = dueDate;
    this.tasks = tasks;
    this.priority = priority;
  }

  addTask(task) {
    this.tasks.push(task);
  }
}
let name = "testProject";
let dueDate = "1/1/2001";
let tasks = ["task1", "task2", "task3"];
let priority = 1;
let testProject = new Project(name, dueDate, tasks, priority);

testProject.addTask("task4");
console.log(testProject.tasks);
