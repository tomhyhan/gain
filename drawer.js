const chevronIcon = `<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round"
>
  <polyline points="18 15 12 9 6 15"></polyline>
</svg>`

const cssStrong = `
    :root {
  /* color */
  --drawer-page-color: #edbf60;

  /* size */
  --border-radius-small: 8px;
  --padding-small: 0.5rem;
  --padding-medium: 1rem;
}

/* drawer page layout */
.drawer-page {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;

  left: 50%;
  transform: translate(-50%);

  max-width: 400px;
  width: 100%;

  z-index: 1000;
  background-color: var(--drawer-page-color);
  
  border-radius: var(--border-radius-small) var(--border-radius-small) 0 0;
  padding: var(--padding-small) var(--padding-medium);
}

/* drawer */
.drawer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer__h {
  font-weight: bold;
}

.drawer__icon {
  cursor: pointer;
}

.drawer__icon.rotated {
  transform: rotate(180deg);
}

/* drawer content*/
.drawer-content__hidden {
  display: none;
}
`
class App {
  constructor(root) {
    const app = this; 
    app.root = root;

    console.assert(app.root != null, "root must exist")

    // while developing
    app.injectCSS()
    
    // attach page to body
    app.page = new PageComponent();
    app.page.attachTo(app.root);

    const drawerHeader = new Drawer();
    app.page.addChild(drawerHeader);

    const drawerContent = new DrawerContent();
    app.page.addChild(drawerContent);

    drawerHeader.setOnToggleListener(() => {
      drawerHeader.toggleIcon();
        drawerContent.toggle();
    });

  }
  injectCSS = () => {
    const css = cssStrong

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
    super("<div class='drawer-page'></div>");
  }

  addChild = (child) => {
    child.attachTo(this.element, "beforeend")
  }
}

class Drawer extends BaseComponent {
  constructor() {
    super(`
      <section class='drawer'>
        <h7 class='drawer__h'>Stickey drawer</h7>
        <span class="drawer__icon">${chevronIcon}</span>
      </section>`)
    const drawer = this
    drawer.toggleBtn = drawer.element.querySelector('.drawer__icon');

    drawer.toggleBtn.addEventListener('click', () => {
      console.log("clicked")
      drawer.onToggleListener && drawer.onToggleListener();
    });
  }

  setOnToggleListener = (listener) => {
    this.onToggleListener = listener
  }

  toggleIcon = () => {
    this.toggleBtn.classList.toggle('rotated')
  }
}

class DrawerContent extends BaseComponent {
  constructor() {
    super(`
      <div class='drawer-content drawer-content__hidden'>
        <ul>
          <li>list Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
        </ul>
      </div>
      `)
  }
  
  toggle = () => {
    this.element.classList.toggle("drawer-content__hidden")
  }
}

const body = document.body
new App(body)


class PokemonService {
  constructor() {
    this.url = ""
  }
}