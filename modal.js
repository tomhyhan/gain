class App {
  constructor(root) {
    const app = this; 
    app.root = root;

    // while developing
    app.injectCSS()

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

  injectCSS = () => {
    const css = `
/* From Trigger */
.formTrigger {
  padding: 2rem;

}

.formTrigger__header {

}

.formTrigger__p {
  color: gray

}

.formTrigger__btn {
  padding: 2px 3px;
  color: white;
  background-color: black;
  cursor: pointer;
}

    `
    const styleElement = document.createElement("style");
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
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
    super("<div class='form-page'></div>");
  }

  addChild = (child) => {
    child.attachTo(this.element, "beforeend")
  }
}

class FormTrigger extends BaseComponent {
  constructor() {
    super(`<section class="formTrigger">
      <h3 class="formTrigger__header">Hello Conversion!</h3>
      <p class="formTrigger__p">Click on the button below to contact us</p>
      <button class="formTrigger__btn">Click here</button>
    </section>`)
  }
}

const formContainer = document.querySelector(".contact-form__form");
new App(formContainer)