class App {
  constructor(root) {
    const app = this; 
    app.root = root;

    console.assert(app.root != null, "root must exist")

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

    const modal = new Modal()

    // clicking overlay removes it
    overlay.element.addEventListener("click", () => {
      overlay.element.classList.add("remove")
      // animation time + buffer
      setTimeout(() => {
        overlay.element.remove()
      }, 350)
    })

    const formTriggerBtn = document.querySelector(".formTrigger__btn")
    formTriggerBtn.addEventListener("click", () => {
      const overlay = new Overlay()
      overlay.attachTo(document.body)
      overlay.putAboveFormTrigger()

      modal.element.classList.remove("remove");
      modal.attachTo(document.body)

      const closeModal = () => {
        overlay.element.classList.add("remove")
        modal.element.classList.add("remove")
        
        setTimeout(() => {
          overlay.element.remove()
          modal.element.remove() 
        }, 350)
      }

      overlay.element.addEventListener("click", closeModal)

      modal.element.querySelector(".form-modal__close").onclick = closeModal;
    })

    // navigate to from trigger when window size is lt 768
    if (window.innerWidth < 768) {
      app.page.element.scrollIntoView({
        behavior: 'smooth', block: 'center'
      });
    }
  }

  injectCSS = () => {
    const css = `
/* todo: define color variables using root */
/* form button  */
.form-btn {
  cursor: pointer;
  transition: all 0.1s linear;
  border: 2px solid #2b2b2b;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  box-shadow: 0 3px 2px 2px #4e4e4e;
}

.form-btn:hover {
  filter: brightness(80%);
}

.form-btn:focus, 
.form-btn:disabled, 
.form-btn:active {
  box-shadow: none;
}

.form-btn:focus {
  outline: 2px solid white;
  border: 2px solid skyblue;
}

.form-btn:disabled {
  cursor: not-allowed;
  filter: none;
  transform: none;
}

.form-btn:active {
}
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

.formTrigger {
}

.formTrigger__header {

}

.formTrigger__p {
  color: gray

}

.formTrigger__btn {
  color: white;
  background-color: black;
  background-color: green;
}


/* form modal */
.form-modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  z-index: 10003; /* Above form overlay */
  width: 90%;
  max-width: 500px;
  animation: fadeIn 0.3s ease-out;
}

.form-modal-container.remove {
  animation: fadeOut 0.3s ease-in forwards;
}


.form-modal__close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 2rem;
  font-weight: bold;
  color: #888;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1;
}

.form-modal__close:hover {
  color: #000;
}

.form-modal .checkbox-group {
  display: flex;
  align-items: flex-start;
  margin: 0.5rem 0;
}

.form-modal .checkbox-group input[type="checkbox"] {
  appearance: auto;
  -webkit-appearance: auto;
  -moz-appearance: auto;
  
  width: auto;
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


/* page break point: 768px */
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
      <button class="form-btn formTrigger__btn">Click here</button>
    </section>`)
  }
}

class Modal extends BaseComponent {
  constructor() {
    super(`<div class="form-modal-container">
            <button class="form-modal__close" aria-label="Close modal">&times;</button>      
            <form class="form-modal">
              <fieldset>
                <div>
                  <label for="fname">First name*</label>
                  <input type="text" id="fname" name="fname" required>
                  <label for="fname">Last name*</label>
                  <input type="text" id="fname" name="fname" required>
                </div>
                <label for="fname">Last name*</label>
                <input type="text" id="fname" name="fname" required>
              </fieldset>
              <fieldset>
                <label for="help">How can we help you?</label>
                <textarea id="help" name="help"></textarea>
              <div class="checkbox-group">
                <input type="checkbox" id="updates" name="updates">
                <label for="updates">Yes, I would like to receive updates and other information from Conversion.</label>
              </div>
                <button type="submit" class="form-btn modal-btn__submit">Get In Touch</button>
              </fieldset>
            </form>
          </div>`)
  }
}

class Overlay extends BaseComponent {
  constructor() {
    super("<div class='form-overlay'></div>")
  }

  putAboveFormTrigger = () => {
    const overlay = this
    const currentZIndex = window.getComputedStyle(overlay.element).zIndex;
    const currentZNum = parseInt(currentZIndex, 10) || 0;

    this.element.style.zIndex = currentZNum + 2;
  }
}

const formContainer = document.querySelector(".contact-form__form");
new App(formContainer)