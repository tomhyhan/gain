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

  left: 0;
  width: 100%;

  z-index: 1000;
  
}

/* drawer */
.drawer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 400px;
  width: 100%;
  margin: 0 auto; 

  background-color: var(--drawer-page-color);
  border-radius: var(--border-radius-small) var(--border-radius-small) 0 0;
  padding: var(--padding-small) var(--padding-medium);
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
.drawer-content {
  width: 100%;
  background-color: white;
  height: 200px;
}

.drawer-page ul {
  margin: 0;
}

.drawer-content__hidden {
  display: none;
}
`
class App {
  constructor(root) {
    const app = this; 
    app.root = root;

    console.assert(app.root != null, "root must exist")

    const apiService = new ApiService()

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

    app.loadProducts(apiService, drawerContent);
  }
  injectCSS = () => {
    const css = cssStrong

    const styleElement = document.createElement("style");
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
    // swiper
    const swiperCSS = document.createElement('link');
    swiperCSS.rel = "stylesheet";
    swiperCSS.href = "https://unpkg.com/swiper/swiper-bundle.min.css";
    document.head.appendChild(swiperCSS);  
    
    this.swiperLoadPromise = new Promise((resolve, reject) => {
      const swiper = document.createElement("script");
      swiper.src = 'https://unpkg.com/swiper/swiper-bundle.min.js';

      swiper.onload = () => resolve()
      swiper.onerror = () => reject(new Error("Failed to load Swiper"))
      document.head.appendChild(swiper);
    })
  }

  loadProducts = async (apiService, drawerContent) => {
    const products = await apiService.getProducts()
    products.forEach(product => {
      const slide = new Slide(product);
      drawerContent.addChild(slide)
    })
    try {
      await this.swiperLoadPromise;
      drawerContent.initSwiper()
    } catch (e){
      throw new Error(e)
    }

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

  addChild = (child) => {
    child.attachTo(this.element, "beforeend")
  }
}

class PageComponent extends BaseComponent {
  constructor() {
    super("<div class='drawer-page'></div>");
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
      <div class='drawer-content drawer-content__hidden swiper'>
        <ul class='swiper-wrapper'></ul>
      </div>
      `)
    
    this.swiperWrapper = this.element.querySelector(".swiper-wrapper")
  }
  
  toggle = () => {
    this.element.classList.toggle("drawer-content__hidden")
  }

  addChild = (child) => {
    console.log("this.swiperWrapper", this.swiperWrapper)
    child.attachTo(this.swiperWrapper, "beforeend") 
  }

  initSwiper = () => {
    this.swiper = new Swiper(this.element, {
      slidesPerView: "auto",
      spaceBetween:10
    })
  }
}

class Slide extends BaseComponent {
  constructor(product) {
   super(`
      <li class="drawer-slide swiper-slide">
        <img class="drawer-slide__img" src="${product.image}" alt="${product.header}">
        <div class="drawer-slide__info">
          <h4 class="drawer-slide__header">${product.header}</h4>
          <p class="drawer-slide__desc">${product.description}</p>
        </div>
        <button class="drawer-slide__btn">view</button>
      </li>
    `) 
  }
}

class ApiService {
  constructor() {
    this.baseUrl = "https://dummyjson.com/";
  }

  getProducts = async (limit = 5) => {
    const url = `${this.baseUrl}products?limit=${limit}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return this.normalizeProducts(data.products); 
    } catch (e) {
      throw new Error(`("Failed to fetch products:", ${e}`)
    }
  }

  normalizeProducts = (products) =>{
    return products.map(product => {
      return {
        header: product.title,
        description: product.description,
        image: product. thumbnail,
      }
    })
  }
}

const body = document.body
new App(body)