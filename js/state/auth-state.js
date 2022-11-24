import State from "./state.js";
import User from "../models/user.js";

class AuthState extends State {
  static instance;
  _user = { isAuth: false, info: { id: "", email: "", name: "", avatar: "" } };

  constructor() {
    super();
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  static createInstance() {
    if (!this.instance) {
      this.instance = new AuthState();
    }
    return this.instance;
  }

  getCurrentUser() {
    return this._user;
  }

  login(userInfo) {
    this._user = {
      isAuth: true,
      info: new User(userInfo.id, userInfo.email, `${userInfo.first_name} ${userInfo.last_name}`, userInfo.avatar),
    };

    this.callListeners(this._user);
  }

  logout() {
    this._user = { isAuth: false, info: { id: "", email: "", name: "", avatar: "" } };

    this.callListeners(this._user);
  }
}

export const authState = AuthState.createInstance();
