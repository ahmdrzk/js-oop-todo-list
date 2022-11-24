import Component from "./component.js";
import { todosState } from "../state/todos-state.js";

export default class TodoItem extends Component {
  constructor(containerSelector, todo) {
    super(containerSelector, "#todo-item");
    this.listItemElement = this.containerElement.lastElementChild;
    this.listItemElement.id = todo.id;
    this.checkboxElement = this.listItemElement.querySelector("[type=checkbox]");
    this.paraElement = this.listItemElement.querySelector("p");
    this.editInputElement = this.listItemElement.querySelector("[type=text]");
    this.startEditButtonElement = this.listItemElement.querySelector("button:first-of-type");
    this.editButtonElement = this.listItemElement.querySelector("button:nth-of-type(2)");
    this.deleteButtonElement = this.listItemElement.querySelector("button:last-of-type");

    this.onStartEdit = this.onStartEdit.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.renderContent(todo);
    this.attachEventListeners(todo);
  }

  renderContent(todo) {
    this.checkboxElement.checked = todo.isCompleted;
    this.paraElement.innerText = todo.text;
    this.editInputElement.value = todo.text;
  }

  attachEventListeners(todo) {
    this.checkboxElement.addEventListener("change", (e) => this.onUpdate(todo.id, { isCompleted: e.target.checked }));
    this.startEditButtonElement.addEventListener("click", this.onStartEdit);
    this.editButtonElement.addEventListener("click", () =>
      this.onUpdate(todo.id, { text: this.editInputElement.value })
    );
    this.deleteButtonElement.addEventListener("click", () => this.onDelete(todo.id));
  }

  onStartEdit() {
    this.paraElement.style.display = "none";
    this.startEditButtonElement.style.display = "none";

    this.editInputElement.style.display = "block";
    this.editButtonElement.style.display = "block";
  }

  onUpdate(todoId, updatedProp) {
    todosState.updateTodo(todoId, updatedProp);
  }

  onDelete(todoId) {
    todosState.deleteTodo(todoId);
  }
}
