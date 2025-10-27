class App {
  constructor(root) {
    const app = this; 
    if (!root) {
      throw new Error("root must not be null")
    }
    app.root = root;

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
    overlay.setOnCloseListner(() => overlay.remove());

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
      </div>
    `);

    const modal = this;
    modal.state = {
      currentStep: 1,
      maxStep:1
    };

    modal.progressbar = new ProgressBar()
    modal.addChild(modal.progressbar, "afterbegin")

    modal.form = new Form();
    modal.addChild(modal.form);

    modal.steps = modal.form.steps.map(step => step.element);
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
    modal.form.setOnNextListener(() => modal.validateStep(1) && modal.goToStep(2));
    modal.form.setOnBackListener(() => modal.goToStep(1));
    modal.form.setOnSubmitListener(() => modal.validateStep(2) && modal.goToStep(3));

    modal.progressbar.setOnStepClickListener((targetStep) => {
      if (targetStep <= modal.state.maxStep) 
        modal.goToStep(targetStep);
    }) 
  }

  validateStep = (stepNum) => {
    return this.form.validateStep(stepNum);
  }
}

class Form extends BaseComponent {
  constructor() {
    super(`<form class="form-modal"></form>`);

    const step1 = new FormStep(1);
    
    const nameFields = new InputGroup('<div class="form-step__name"></div>');
    nameFields.addInput(new TextInput("First name", "fname", "First name", true, "text"));
    nameFields.addInput(new TextInput("Last name", "lname", "Last name", false, "text"));

    step1.addInput(nameFields);
    step1.addInput(new TextInput("Work Email", "email", "Work Email", true, "email"));
    step1.addButtons({ onNext: () => this.nextListener && this.nextListener()});
    
    const step2 = new FormStep(2);
    step2.addInput(new TextInput( "How can we help you?", "help", "Tell us more about how we can help", true, "text", false ));
    step2.addInput(new CheckBoxInput());
    step2.addButtons({ 
      onBack: () => this.backListener && this.backListener(), 
      onSubmit: () => this.submitListener && this.submitListener()
    });

    const step3 = new FormStep(3);
    step3.addChild(new BaseComponent("<h4>Thank You!</h4>"));

    this.addChild(step1);
    this.addChild(step2);
    this.addChild(step3);

    this.steps = [step1, step2, step3];
  }

  setOnNextListener = (listener) => {
    this.nextListener = listener;
  }

  setOnBackListener = (listener) => {
    this.backListener = listener;
  }

  setOnSubmitListener = (listener) => {
    this.submitListener = listener;
  }
  
  validateStep = (stepNum) => {
    return this.steps[stepNum-1].validate()
  }
}

class FormStep extends BaseComponent {
  constructor(step) {
    super(`<div class="form-step" data-step="${step}"></div>`);
    this.inputs = [];
  }

  addInput = (input) => {
    this.addChild(input)
    this.inputs.push(input)
  }

  addButtons = ({ onNext, onBack, onSubmit }) => {
    const buttonsContainer = new BaseComponent(
      '<div class="form-step__buttons"></div>'
    );
    if (onBack) {
      const backBtn = new FormBtn('button', 'modal-btn__back', 'Back');
      backBtn.setOnClickListner(onBack);
      buttonsContainer.addChild(backBtn);
    }
    if (onNext) {
      const nextBtn = new FormBtn('button', 'modal-btn__next', 'Next');
      nextBtn.setOnClickListner(onNext);
      buttonsContainer.addChild(nextBtn);
    }
    if (onSubmit) {
      const submitBtn = new FormBtn('button', 'modal-btn__submit', 'Get In Touch');
      submitBtn.setOnClickListner(onSubmit);
      buttonsContainer.addChild(submitBtn);
    }
    this.addChild(buttonsContainer);
  }

  validate = () => {
    return this.inputs.every(input => input.validate());
  }
}

class InputGroup extends BaseComponent {
  constructor(innerHTML) {
    super(innerHTML);
    this.inputs = []; 
  }
  
  addInput(input) {
    this.addChild(input);
    this.inputs.push(input);
  }

  validate() {
    return this.inputs.every(input => input.validate());
  }
}

class FormBtn extends BaseComponent {
  constructor (type, btnClass, text) {
    super(`
      <button type="${type}" class="form-btn ${btnClass}">${text}</button>
    `)

    this.element.onclick = () => {
      this.clickListener && this.clickListener()
    }
  }

  setOnClickListner = (listener) => {
    this.clickListener = listener
  }
}

class TextInput extends BaseComponent {
  constructor(label, name, placeHolder, isRequired, type="text", isInputText=true) {
    const required = isRequired? "required": ""
    const star = isRequired? `<span class="inputbox-group__star">*</span>`: ""
    const input = isInputText 
    ?`<input type="${type}" id="${name}" name="${name}" placeholder="${placeHolder}" ${required}>`
    : `<textarea id="help" name="help" rows="4" placeholder="${placeHolder}" ${required}></textarea>`

    super(`
      <div class="inputbox-group">
        <label for="${name}">${label}${star}</label>
        ${input}
      </div>
      `)

    const textInput = this
    textInput.inputElement = this.element.querySelector(`#${name}`);
    textInput.label = label;
  }

  validate = () => {
    if (!this.inputElement.checkValidity()) {
      alert(`Please fill out all required fields.\n'${this.label}' is required.`);
      this.inputElement.focus();
      return false;
    }
    return true;
  }
}

class CheckBoxInput extends BaseComponent{
  constructor() {
    super(`
      <div class="checkbox-group">
        <input type="checkbox" id="updates" name="updates">
        <label for="updates">Yes, I would like to receive updates and other information from Conversion</label>
      </div>
    `)
  }
  validate = () => {
    return true
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