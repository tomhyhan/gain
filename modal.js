class App {
  constructor(root) {
    const app = this; 
    app.root = root;

    console.assert(app.root != null, "root should exist")

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

    overlay.element.addEventListener("click", () => {
      overlay.element.classList.add("remove")
      // animation time + buffer
      setTimeout(() => {
        overlay.element.remove()
      }, 350)
    })

    if (window.innerWidth < 768) {
      app.page.element.scrollIntoView({
        behavior: 'smooth', block: 'center'
      });
    }
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
  background-color: rgba(0,0,0,0.4);
  z-index: 10000; /* header is 9999 */

  animation: fadeIn 0.3s ease-out
}

.form-overlay.remove {
  animation: fadeOut 0.3s ease-in forwards;
}

.form-page {
  padding: 2rem;
  background-color: white;
  position: relative;
  z-index: 10001;
}

.form-page.dismiss {
  animation: 
}

.formTrigger {
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


/* animation */
@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fadeOut {
  from {opacity: 1;}
  to {opacity: 0;}
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