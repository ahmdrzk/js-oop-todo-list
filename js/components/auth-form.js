import Component from "./component.js";
import UserInfo from "./user-info.js";
import AddTodo from "./add-todo.js";
import TodoList from "./todo-list.js";
import { authState } from "../state/auth-state.js";

export default class AuthForm extends Component {
  constructor() {
    super("#main", "#auth-form");
    this.dataListElement = this.containerElement.querySelector("#emails");
    this.emailInputElement = this.containerElement.querySelector("[type=email]");
    this.submitButtonElement = this.containerElement.querySelector("[type=submit]");

    this.onSubmit = this.onSubmit.bind(this);

    this.attachEventListeners();
    this.fetchUsers().then((userList) => this.renderUserList(userList));
  }

  attachEventListeners() {
    this.submitButtonElement.addEventListener("click", this.onSubmit);
  }

  fetchUsers() {
    return fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((data) => {
        this._userList = data.data;
        return data.data;
      });
  }

  renderUserList(userList) {
    this.dataListElement.innerText = "";
    userList.forEach((user) => {
      const optionElement = document.createElement("option");
      optionElement.value = user.email;
      this.dataListElement.append(optionElement);
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const userEmail = this.emailInputElement.value;
    const authedUser = this._userList.find((user) => user.email === userEmail);
    if (authedUser) {
      authState.login(authedUser);

      this.detachFromDom();
      new UserInfo();
      new AddTodo();
      new TodoList();
    } else {
      window.alert("Please enter a valid email.");
    }
  }
}
