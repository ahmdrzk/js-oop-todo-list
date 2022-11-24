import Component from "./component.js";
import Todo from "../models/todo.js";
import { todosState } from "../state/todos-state.js";

export default class AddTodo extends Component {
  constructor() {
    super("#main", "#add-todo");
    this.textInputElement = this.containerElement.querySelector("[type=text]");
    this.addButtonElement = this.containerElement.querySelector("[type=submit]");

    this.onAddTodo = this.onAddTodo.bind(this);

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.addButtonElement.addEventListener("click", this.onAddTodo);
  }

  onAddTodo(e) {
    e.preventDefault();
    const textInput = this.textInputElement.value;
    if (textInput.length < 2) {
      window.alert("Todo must be more than 1 char.");
    } else {
      todosState.addTodo(new Todo(Date.now(), textInput, false));
      this.textInputElement.value = "";
    }
  }
}
