class App {
  constructor(hero, why) {
    const heroElement = new Hero(hero);
    const whyElement = new Why(why);

    // deinfe ul component
    const values = new Values();

    // add child li(s)
    values.addChild(new Value("Increase conversion rates across your website"))
    values.addChild(new Value("Iterative site redesign"))
    values.addChild(new Value("Improve ROAS efficiency"))
    values.addChild(new Value("Standing or scaling an experimentation program"))
    values.addChild(new Value("Advance customer research"))

    // hero updates
    heroElement.updateTitle("We are the best experimentation agency in the world")
    heroElement.addValues(values)
    heroElement.updateButtonText("Contact us")
    heroElement.setOnVideoClick(() => whyElement.scrollIntoView())
  }
}

class Hero {
  constructor(heroElement) {
    const hero = this;
    hero.element = heroElement;
    hero.h1 = hero.element.querySelector(".lm-hero__left h1")
    hero.btn = hero.element.querySelector(".lm-hero__left .lm-hero__buttons").firstElementChild
    hero.videoBtn = hero.btn.nextElementSibling
    if (!hero.h1) throw new Error("h1 on hero section must exist") 
    if (!hero.btn) throw new Error("button on hero section must exist") 
    if (!hero.videoBtn) throw new Error("Video button on hero section must exist") 

    hero.videoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      hero.videoClickListener && hero.videoClickListener()
    }, true)
  }

  updateTitle = (newTitle) => {
    const hero = this;
    hero.h1.textContent = newTitle;
  }

  updateButtonText = (newbtnText) => {
    const hero = this;
    hero.btn.textContent = newbtnText;
  }

  addValues = (values) => {
    const hero = this;
    values.attachTo(hero.h1, "afterend")
  }

  setOnVideoClick = (listener) => {
    this.videoClickListener = listener
  }
}

class Why {
  constructor(whyElement) {
    this.whyElement = whyElement
  }

  scrollIntoView = () => {
    this.whyElement.scrollIntoView({ behavior: 'smooth' });
  }
}

class BaseComponent {
  constructor(innerHTML) {
    const template = document.createElement("template");
    template.innerHTML = innerHTML;
    this.element = template.content.firstElementChild;
  }

  attachTo(parent, position="afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }

  addChild(child) {
    child.attachTo(this.element, "beforeend")
  }
}

class Values extends BaseComponent {
  constructor() {
    super("<ul class='hero-values'></ul>")
  }
}

class Value extends BaseComponent {
  constructor(text) {
    super(`<li class='hero-values__item'>${text}</li>`)
  }
}

let appInitialized = false

function initApp() {
  const hero = document.querySelector(".lm-hero")
  const why = document.querySelector(".lm-why")

  const elementsExist = hero && why
  if (elementsExist && !appInitialized) {
    appInitialized = true
    new App(hero, why)
  } else if (!elementsExist && appInitialized) {
    appInitialized = false
  } 
}

const observer = new MutationObserver(() => initApp())
observer.observe(document.body, { childList: true, subtree: true })

initApp()
