/* eslint-disable no-underscore-dangle */
export default class Todo {
  constructor(name, dueDate, priority) {
    this.name = name;
    this.dueDate = dueDate;
    this._priority = priority;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get priority() {
    return this._priority;
  }

  set priority(number) {
    this._priority = number;
  }

  get notes() {
    return this._notes;
  }

  set notes(string) {
    this._notes = string;
  }
}
