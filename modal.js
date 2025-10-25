class App {
  constructor(root) {
    const app = this; 
    app.root = root;

    // while developing
    app.injectCSS()

    // remove all elements in form container
    app.root.innerHTML = ""; 
    app.root.style.backgroundColor = "transparent";

    // trigger glass wall effect
    const overlay = new Overlay()
    overlay.attachTo(document.body)

    // attach page to form container
    app.page = new PageComponent();
    app.page.attachTo(app.root);

    // add form trigger to page 
    const formTrigger = new FormTrigger()
    app.page.addChild(formTrigger)

  }

  injectCSS = () => {
    const css = `
/* From Trigger */
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);
  z-index: 10000; /* header is 9999 */

}

.formTrigger {
  padding: 2rem;
  background-color: white;
  position: relative;
  z-index: 10001;
}

.formTrigger__header {

}

.formTrigger__p {
  color: gray

}

.formTrigger__btn {
  padding: 10px 15px;
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
      <h4 class="formTrigger__header">Hello Conversion!</h4>
      <p class="formTrigger__p">Click on the button below to contact us</p>
      <button class="formTrigger__btn">Click here</button>
    </section>`)
  }
}

class Overlay extends BaseComponent {
  constructor() {
    super("<div class='form-overlay'></div>")
  }
}

const formContainer = document.querySelector(".contact-form__form");
new App(formContainer)