import Component from "./component.js";
import { authState } from "../state/auth-state.js";

export default class Layout extends Component {
  constructor() {
    super("body", "#layout");
    this.logoutButtonElement = this.containerElement.querySelector("[type=button]");

    this.onLogout = this.onLogout.bind(this);

    authState.subscribe(() => this.renderContent());
    this.renderContent();
    this.attachEventListeners();
  }

  renderContent() {
    if (authState.getCurrentUser().isAuth) {
      this.logoutButtonElement.style.display = "block";
    }
  }

  attachEventListeners() {
    this.logoutButtonElement.addEventListener("click", this.onLogout);
  }

  onLogout() {
    authState.logout();
    window.location.reload();
  }
}
