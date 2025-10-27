const cssString = `
:root {
  --text-shadow: 0 0 6px rgba(0, 0, 0, 0.9);
}

.lm-hero .lm-hero__left .lm-hero__header {
  font-size: 2.8rem;
  margin-bottom: 0.5rem;
}

.lm-hero .lm-hero__left .lm-hero__buttons .btn-video {
  text-shadow: var(--text-shadow);
  position: relative;
  z-index: 1;
}

.hero-values {
  list-style-type: none; 
  position: relative;
  z-index: 1;
}

.hero-values__item {
  position: relative;     
  padding-left: 30px;     
  margin-bottom: 0.75rem; 
  color: white;
  text-shadow: var(--text-shadow);
}

/* use check mark intead */
.hero-values__item::before {
  content: ''; 
  position: absolute;
  left: 0;
  top: 1px; 

  width: 20px;
  height: 20px;

  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M866.133333 258.133333L362.666667 761.6l-204.8-204.8L98.133333 618.666667 362.666667 881.066667l563.2-563.2z' fill='%2343A047'/%3E%3C/svg%3E");
}

@media (max-width: 1100px) { 
  .lm-hero .lm-hero__left .lm-hero__buttons {
    flex-direction:row;
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.9);
    z-index:1
  }
}

@media (max-width: 950px) { 
  .lm-hero .lm-hero__left {
    padding: 2rem 1rem;
  }
  .lm-hero .lm-hero__left .lm-hero__image {
    height: 25vh;
  }
}

@media (max-width: 480px) { 
  .lm-hero .lm-hero__left .lm-hero__image {
    height: 10vh;
  }
  .hero-values {
    margin: 0;
  }
}
`
class App {
  constructor(hero, why) {
    const heroElement = new Hero(hero);
    const whyElement = new Why(why);
    console.log("inited")
    this.injectCSS()
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
    heroElement.updateButtonText("Contact us")
    heroElement.onVideoClick(() => whyElement.scrollIntoView())
  }

  injectCSS = () => {
    const css = cssString;

    const styleElement = document.createElement("style");
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
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

  onVideoClick = (listener) => {
    this.videoClickListener = listener
  }
}

class Why {
  constructor(whyElement) {
    const why = this;
    why.whyElement = whyElement

  }

  scrollIntoView = () => {
    this.whyElement.scrollIntoView({
      behavior: 'smooth'
    });
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
