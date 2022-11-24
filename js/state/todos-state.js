import State from "./state.js";
import Todo from "../models/todo.js";

class TodosState extends State {
  static instance;
  _todosEntities = {};

  constructor() {
    super();
    this.getTodosEntities = this.getTodosEntities.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  static createInstance() {
    if (!this.instance) {
      this.instance = new TodosState();
    }
    return this.instance;
  }

  getTodosEntities() {
    return this._todosEntities;
  }

  addTodosEntities(todosArr) {
    todosArr.forEach((todo) => {
      this._todosEntities[todo.id] = new Todo(todo.id, todo.todo, todo.completed);
    });

    this.callListeners(this._todosEntities);
  }

  addTodo(todoItem) {
    this._todosEntities[todoItem.id] = new Todo(todoItem.id, todoItem.text, todoItem.isCompleted);

    this.callListeners(this._todosEntities);
  }

  updateTodo(todoId, updatedProp) {
    const storedTodoItem = this._todosEntities[todoId];
    if (storedTodoItem) {
      this._todosEntities[todoId] = { ...storedTodoItem, ...updatedProp };
    }

    this.callListeners(this._todosEntities);
  }

  deleteTodo(todoId) {
    const storedTodoItem = this._todosEntities[todoId];
    if (storedTodoItem) {
      delete this._todosEntities[todoId];
    }

    this.callListeners(this._todosEntities);
  }
}

export const todosState = TodosState.createInstance();
