class App {
  constructor(root) {
    const app = this; 
    app.root = root;
    // remove all elements
    app.root.innerHTML = ""; 
    app.root.style.backgroundColor = "transparent";

    // attach page     
    app.page = new PageComponent();
    app.page.attachTo(app.root);

    // add form trigger to page 
    const formTrigger = new FormTrigger()
    app.page.addChild(formTrigger)
  }
}

class BaseComponent {
  constructor(innerHTML) {
    const template = document.createElement("template");
    template.innerHTML = innerHTML;
    this.element = template.content.firstElementChild;
  }

  attachTo = (parent, position="afterbegin") => {
    parent.insertAdjacentElement(position, this.element);
  }
}

class PageComponent extends BaseComponent {
  constructor() {
    super("<div class='page-section'></div>");
  }

  addChild = (child) => {
    child.attachTo(this.element, "beforeend")
  }
}

class FormTrigger extends BaseComponent {
  constructor() {
    super(`<section>
      <h1>Hello Conversion!</h1>
      <p>Click on the button below to contact us</p>
      <button>click here</button>
    </section>`)
  }
}

const formContainer = document.querySelector(".contact-form__form");
new App(formContainer)