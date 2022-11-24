export default class State {
  constructor() {
    this._listeners = [];
    this.subscribe = this.subscribe.bind(this);
    this.callListeners = this.callListeners.bind(this);
  }

  subscribe(fn) {
    this._listeners.push(fn);
  }

  callListeners(state) {
    this._listeners.forEach((fn) => fn(state));
  }
}
