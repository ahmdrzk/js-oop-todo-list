import Component from "./component.js";
import { authState } from "../state/auth-state.js";

export default class UserInfo extends Component {
  constructor() {
    super("#main", "#user-info");
    this.headingElement = this.containerElement.querySelector("header > *:first-of-type");
    this.imageElement = this.containerElement.querySelector("img");

    this.renderContent();
  }

  renderContent() {
    const { name, avatar } = authState.getCurrentUser().info;
    this.headingElement.innerText = `Welcome back, ${name}`;
    this.imageElement.src = avatar;
    this.imageElement.alt = name;
  }
}
