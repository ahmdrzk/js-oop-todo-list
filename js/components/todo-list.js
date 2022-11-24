import Component from "./component.js";
import TodoItem from "./todo-item.js";
import { todosState } from "../state/todos-state.js";

export default class TodoList extends Component {
  constructor() {
    super("#main", "#todo-list");
    this.listElement = this.containerElement.querySelector("ul");

    todosState.subscribe((todosEntities) => this.renderListItems(todosEntities));
    this.fetchTodos();
  }

  fetchTodos() {
    fetch("https://dummyjson.com/todos?limit=6")
      .then((res) => res.json())
      .then((data) => {
        todosState.addTodosEntities(data.todos);
      });
  }

  renderListItems(todosEntities) {
    this.listElement.innerText = "";
    Object.values(todosEntities).forEach((todo) => {
      new TodoItem(this.listElement.nodeName, todo);
    });
  }
}
