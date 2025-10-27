
class App {
  constructor(hero, why) {
    const heroElement = new Hero(hero);
    
    // deinfe ul component
    const values = new Values();

    // add child li(s)
    values.addChild(new Value("Increase conversion rates across your website"))
    values.addChild(new Value("Iterative site redesign"))
    values.addChild(new Value("Improve ROAS efficiency"))
    values.addChild(new Value("Standing or scaling an experimentation program"))
    values.addChild(new Value("Advance customer research"))

    heroElement.updateTitle("We are the best experimentation agency in the world")
    heroElement.addValues(values)
  }
}

class Hero {
  constructor(heroElement) {
    const hero = this;
    hero.element = heroElement;
    hero.h1 = hero.element.querySelector(".lm-hero__left h1")
    if (!hero.h1) throw new Error("h1 on hero section must exist") 
  }

  updateTitle = (newTitle) => {
    const hero = this;
    hero.h1.textContent = newTitle;
  }

  addValues = (values) => {
    const hero = this;
    values.attachTo(hero.h1, "afterend")
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
    super("<ul class='hero-ul'></ul>")
  }
}

class Value extends BaseComponent {
  constructor(text) {
    super(`<li class='hero-li'>${text}</li>`)
  }
}

const hero = document.querySelector(".lm-hero")
const why = document.querySelector(".lm-hero")
new App(hero, why)