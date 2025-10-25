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

    // attach form trigger 
    const formTrigger = new FormTrigger()
    app.page.addChild(formTrigger)
  }
}

class PageComponent {
  constructor() {
    const template = document.createElement("template");
    template.innerHTML = "<div class='page-section'></div>";
    this.element = template.content.firstElementChild;
  }

  attachTo = (parent, position="afterbegin") => {
    parent.insertAdjacentElement(position, this.element);
  }

  addChild = (child) => {
    child.attachTo(this.element, "beforeend")
  }
}

class FormTrigger {
  constructor() {
    const template = document.createElement("template")
    template.innerHTML = `
    <section>
      <h1>Hello Conversion!</h1>
      <p>Click on the button below to contact us</p>
      <button>click here</button>
    </section>`
    this.element = template.content.firstElementChild
  }

  attachTo = (parent, position="afterbegin") => {
    parent.insertAdjacentElement(position, this.element);
  }
}

const formContainer = document.querySelector(".contact-form__form");
new App(formContainer)