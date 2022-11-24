export default class Component {
  constructor(containerSelector, templateSelector) {
    this.containerElement = document.querySelector(containerSelector);
    this.templateElement = document.querySelector(templateSelector);
    this.templateContentClone = this.templateElement.content.cloneNode(true);

    this.detachFromDom = this.detachFromDom.bind(this);

    this.attachToDom();
  }

  attachToDom() {
    this.containerElement.append(this.templateContentClone);
  }

  detachFromDom() {
    this.containerElement.innerText = null;
  }
}
