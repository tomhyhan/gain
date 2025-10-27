const cssString = `
/* todo: define color variables using root */
:root {
  /* colors */
  --inactive: #ddd;
  --progress-color: #568bda;
  --button-color: #2d2d2d;
  --button-bolder-color: #394e4b;

  /* size */
  --flex-small-gap: 5px;
  --flex-middle-gap: 10px;
  --border-width: 2px;

}
/* form button  */
.form-btn {
  cursor: pointer;
  transition: all 0.1s linear;
  border: var(--border-width) solid var(--button-bolder-color);
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  box-shadow: 0 var(--border-width) 0px 0px #3b3b3b;
  background-color: var(--button-color);
  color: white;
  font-weight: bold;
}

.form-btn:hover {
  filter: brightness(90%);
}

.form-btn:focus, 
.form-btn:disabled, 
.form-btn:active {
  box-shadow: none;
}

.form-btn:focus {
  outline: var(--border-width) solid white;
  border: var(--border-width) solid blue;
}

.form-btn:disabled {
  cursor: not-allowed;
  border-color: var(--inactive);
  color:var(--inactive);
  background-color: #f5f5f5;
}

.form-btn:active {
  filter: brightness(80%);
  border: var(--border-width) solid var(--button-bolder-color);
  outline: none;
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
  max-width: 680px;
  width: 100%;
  padding: 3.5rem 2rem;
  background-color: white;
  position: relative;
  z-index: 10001;
}

.formTrigger {
  display: flex;
  flex-direction: column;
}

.formTrigger__p {
  color: gray;
  margin-bottom: 3rem
}

.formTrigger__btn {
  align-self: flex-end;
}

/* form modal container */
.form-modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  z-index: 10003; /* Above form overlay */
  max-width: 500px;
  animation: fadeIn 0.3s ease-out;
  width: 100%;
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

/* form modal progress bar */

.form-progress-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Aligns circles */
  margin: 1rem;
  padding-top: 1rem; 
}

.form-progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-basis: 0; /* Distribute space evenly */
  flex-grow: 1;
  color: var(--progress-color);
}

.form-progress-step span {
  font-size: 0.8rem;
  margin-top: 10px;
  text-align: center;
}

/* The connecting line */
.form-progress-step:not(:first-child)::before {
  content: '';
  position: absolute;
  top: 20px; 
  right: 50%;
  width: 100%; 
  height: 4px;
  background-color: #ddd; /* Default inactive line */
  z-index: 1; /* Behind the icon */
}

.form-progress-icon {
  width: 40px;
  height: 40px;
  padding: 3px;
  border-radius: 50%;
  background-color: white;
  border: var(--border-width) solid var(--inactive); /* Default inactive border */
  color: var(--progress-color);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2; /* Above the line */
  cursor: pointer;
}

.form-progress-badge {
  display: none;
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  background-color: #198754; 
  border-radius: 50%;
  border: 1px solid var(--inactive);
  z-index: 3;
  align-items: center;
  justify-content: center;
}

.form-progress-badge::after {
  content: '✔';
  color: white;
  font-size: 13px;
  font-weight: bold;
}

/* Active Step */
.form-progress-step.active {
  color: var(--progress-color);
  font-weight: bold;
}
.form-progress-step.active .form-progress-icon {
  background-color: var(--progress-color);
  border-color: var(--progress-color);
  color: white;
}

/* Completed Step */
.form-progress-step.completed .form-progress-icon {
  background-color: var(--progress-color);
  border-color: var(--progress-color);
  color: white; 
}
.form-progress-step.completed::before, .form-progress-step.active::before{
  background-color: var(--progress-color); 
}
.form-progress-step.completed .form-progress-badge {
  display: flex; 
}

/* form modal */
.form-modal {
}

.form-step {
  display:flex;
  flex-direction: column;
  gap: var(--flex-middle-gap);
}

.form-step__name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--flex-small-gap);
}

.form-step__buttons {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: var(--flex-middle-gap)
}


.inputbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--flex-small-gap);
}

.inputbox-group__star {
  color: red;
}

.form-modal__close:hover {
  color: #000;
}

.inputbox-group input,
.inputbox-group textarea {
  padding: 9px 10px;
  border: var(--border-width) solid var(--inactive);
}

.form-modal .checkbox-group {
  display: flex;
  align-items: center;
  font-size: small;
}

.form-modal .checkbox-group input[type="checkbox"] {
  appearance: auto;
  -webkit-appearance: auto;
  -moz-appearance: auto;
  
  width: auto;
  margin-right: 8px;
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
@media (max-width: 768px) {
  .form-step__name {
    flex-direction: column;
    align-items: start;
  }
}

`
class App {
  constructor(root) {
    const app = this; 
    if (!root) {
      throw new Error("root must not be null")
    }
    app.root = root;

    // while developing
    app.injectCSS()

    // remove all elements in form container
    app.root.innerHTML = ""; 
    app.root.style.backgroundColor = "transparent";
    app.root.style.padding = 0;

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

    // clicking background removes overlay
    overlay.setOnCloseListner(() => {
      overlay.remove()});

    // clicking button opens a modal
    const formTriggerBtn = document.querySelector(".formTrigger__btn")
    formTriggerBtn.addEventListener("click", () => {
      const overlay = new Overlay()
      overlay.attachTo(document.body)
      overlay.putAboveFormTrigger()

      modal.attachTo(document.body)

      const closeModalListner = () => {
        overlay.remove()
        modal.remove()
      }

      // reuse overlay with different close logic
      overlay.setOnCloseListner(closeModalListner)
      modal.setOnCloseListner(closeModalListner)
    })

    // navigate to form trigger when window size is lt 768
    if (window.innerWidth < 768) {
      app.page.element.scrollIntoView({
        behavior: 'smooth', block: 'center'
      });
    }
  }

  injectCSS = () => {
    const css = cssString;

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

  attachTo(parent, position="afterbegin") {
    this.element.classList.remove("remove");
    parent.insertAdjacentElement(position, this.element);
  }

  removeFrom(parent) {
    if (parent !== this.element.parentElement) {
      throw new Error("parent mismatch")
    }
    parent.removeChild(this.element)
  }

  remove() {
    this.element.classList.add("remove")
    this.element.addEventListener("animationend", () => {
      this.removeFrom(this.element.parentElement)
    }, {once:true})
  }

  addChild(child, position="beforeend") {
    child.attachTo(this.element, position)
  }
}

class PageComponent extends BaseComponent {
  constructor() {
    super("<div class='form-page'></div>");
  }

}

class FormTrigger extends BaseComponent {
  constructor() {
    super(`<section class="formTrigger">
      <h3 class="formTrigger__header">Hello Conversion!</h3>
      <p class="formTrigger__p">Click on the button below to contact us</p>
      <button class="form-btn formTrigger__btn">Click here</button>
    </section>`)
  }
}

class Modal extends BaseComponent {
  constructor() {
    super(`
      <div class="form-modal-container">
        <button class="form-modal__close" aria-label="Close modal">&times;</button>

        <form class="form-modal">
          <div class="form-step" data-step="1">
            <div class="form-step__name">
              <div class="inputbox-group">
                <label for="fname">First name<span class="inputbox-group__star">*</span></label>
                <input type="text" id="fname" name="fname" placeholder="First name" required>
              </div>
              <div class="inputbox-group">
                <label for="lname">Last name</label>
                <input type="text" id="lname" name="lname" placeholder="Last name">
              </div>
              </div>
            <div class="inputbox-group">
              <label for="email">Work Email<span class="inputbox-group__star">*</span></label>
              <input type="email" id="email" name="email" required placeholder="Work Email">
            </div>
            <div class="form-step__buttons">
              <button type="button" class="form-btn modal-btn__next">Next</button>
            </div>
          </div>
      
          <div class="form-step" data-step="2">
            <div class="inputbox-group">
              <label for="help">How can we help you?<span class="inputbox-group__star">*</span></label>
              <textarea id="help" name="help" rows="4" placeholder="Tell us more about how we can help" required></textarea>
            </div>
            <div class="checkbox-group">
              <input type="checkbox" id="updates" name="updates">
              <label for="updates">Yes, I would like to receive updates and other information from Conversion</label>
            </div>
            <div class="form-step__buttons">
              <button type="button" class="form-btn modal-btn__back">Back</button>
              <button type="submit" class="form-btn modal-btn__submit">Get In Touch</button>
            </div>
          </div>
      
          <div class="form-step" data-step="3">
            <h4>Thank You!</h4>
          </div>
        </form>
      </div>
    `);

    const modal = this;
    modal.state = {
      currentStep: 1,
      maxStep:1
    };

    modal.progressbar = new ProgressBar()
    modal.addChild(modal.progressbar, "afterbegin")

    modal.form = modal.element.querySelector(".form-modal");
    modal.steps = modal.element.querySelectorAll(".form-step");
    modal.progressSteps = modal.element.querySelectorAll(".form-progress-step");
    
    const closeBtn = modal.element.querySelector(".form-modal__close");
    closeBtn.onclick = () => modal.closeListener && modal.closeListener()

    modal.addEventListeners();
    modal.render();
  }

  setOnCloseListner = (listener) => {
    this.closeListener = listener
  }

  goToStep = (targetStep) => {
    const modal = this;
    const currentStep = modal.state.currentStep;

    if (targetStep > currentStep) {
      if (!modal.validateStep(currentStep)) return;
    }
    modal.state.currentStep = targetStep;
    modal.state.maxStep = Math.max(modal.state.maxStep, targetStep)
    modal.render();
  }
  
  render = () => {
    const modal = this;
    const currentStepNum = modal.state.currentStep;

    modal.steps.forEach(step => step.style.display = (step.dataset.step == currentStepNum) ? "flex" : "none");

    modal.progressbar.update(currentStepNum, modal.state.maxStep)
  }

  addEventListeners = () => {
    const modal = this
    const nextBtn = modal.element.querySelector(".modal-btn__next");
    nextBtn.addEventListener("click", () => modal.goToStep(2));

    const backBtn = modal.element.querySelector(".modal-btn__back");
    backBtn.addEventListener("click", () => modal.goToStep(1));

    modal.form.addEventListener("submit", (e) => {
      e.preventDefault();
      modal.goToStep(3);
    })

    modal.progressbar.setOnStepClickListener((targetStep) => {
      if (targetStep <= modal.state.maxStep) 
        modal.goToStep(targetStep);
    }) 
  }

  validateStep = (stepNum) => {
    const currentStepEl = this.element.querySelector(`.form-step[data-step="${stepNum}"]`);
    const inputs = currentStepEl.querySelectorAll("input[required], textarea[required]");
    
    let allValid = true;
    for (const input of inputs) {
      if (!input.checkValidity()) {
        allValid = false;
        alert(`Please fill out all required fields.\n'${input.labels[0].innerText}' is required.`);
        input.focus();
        break; 
      }
    }
    return allValid;
  }
}

class ProgressBar extends BaseComponent {
  constructor() {
    super(`<div class="form-progress-bar"></div>`)
    const progressbar = this;
    
    progressbar.step1 = new ProgressStep(1, userIcon, "User Information")
    progressbar.step2 = new ProgressStep(2, inqueryIcon, "Inquery")
    progressbar.step3 = new ProgressStep(3, completeIcon, "Complete")

    progressbar.steps = [progressbar.step1, progressbar.step2, progressbar.step3]
    progressbar.steps.forEach(step => progressbar.addChild(step))
    
  }
  
  setOnStepClickListener(listener) {
    this.steps.forEach(step => step.setOnStepClickListener(listener));
  }

  update = (currentStep, maxStep) => {
    this.steps.forEach((step, idx) => {
      const stepIdx = idx + 1;

      if (stepIdx < currentStep) step.setCompleted();
      else if (stepIdx === currentStep) step.setActive();
      else step.setInactive();

      step.setClickable(stepIdx <= maxStep);
    })
  }
}

class ProgressStep extends BaseComponent {
  constructor(step, icon, text) {
    super(`
      <div class="form-progress-step" data-step=${step}>
        <div class="form-progress-icon">
          ${icon}
          <div class="form-progress-badge"></div>
        </div>
        <span>${text}</span>
      </div>
    `)
    const progressStep = this;
    progressStep.icon = progressStep.element.querySelector(".form-progress-icon")
    progressStep.element.addEventListener("click", () => {
      progressStep.stepClickListener && progressStep.stepClickListener(step)
    })
  }

  setOnStepClickListener(listener) {
    this.stepClickListener = listener;
  }

  setActive = () => {
    this.element.classList.add("active")
    this.element.classList.remove("completed")
  }

  setCompleted = () => {
    this.element.classList.add("completed")
    this.element.classList.remove("active")
  }

  setInactive = () => {
    this.element.classList.remove("active", "completed")
  }

  setClickable = (clickable) => {
    this.icon.style.cursor = clickable? "pointer": "default"
  }
}


class Overlay extends BaseComponent {
  constructor() {
    super("<div class='form-overlay'></div>")
    const overlay = this;
    overlay.element.addEventListener("click", () => overlay.closeListener && overlay.closeListener())
  }

  setOnCloseListner = (listener) => {
    this.closeListener = listener
  }

  putAboveFormTrigger = () => {
    const overlay = this
    const currentZIndex = window.getComputedStyle(overlay.element).zIndex;
    const currentZNum = parseInt(currentZIndex, 10) || 0;

    this.element.style.zIndex = currentZNum + 2;
  }
}

const userIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A1.5 1.5 0 0 1 18 21.75H6a1.5 1.5 0 0 1-1.499-1.632Z" /></svg>`

const inqueryIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>`

const completeIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5" /></svg>`

const formContainer = document.querySelector(".contact-form__form");
new App(formContainer)