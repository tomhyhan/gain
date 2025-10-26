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
// todo: disabled and color to white 
const cssStrong = `
    :root {
  /* color */
  --drawer-page-color: #edbf60;

  /* size */
  --border-radius-small: 8px;
  --padding-small: 0.5rem;
  --padding-medium: 1rem;
  --flex-gap-small: 0.5rem;
  --flex-gap-medium: 1.0rem;
  --drawer-content-height: 250px;

  /* animation delay */
  --animation-delay: 0.3s;
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

/* drawer header */
.drawer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 450px;
  width: 100%;
  margin: 0 auto; 

  background-color: var(--drawer-page-color);
  border-radius: var(--border-radius-small) var(--border-radius-small) 0 0;
  padding: var(--padding-small) var(--padding-medium);
}

.drawer.is-open {
  background-color: white;
}

.drawer.is-open .drawer__controls {
  visibility: visible;
  opacity: 1;
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

/* drawer header control*/
.drawer__controls {
  display: flex;
  align-items: center;
  gap: var(--flex-gap-medium);
  margin-left: 100px;

  visibility: hidden;
  opacity:0;
}

.drawer .swiper-button-next-drawer,
.drawer .swiper-button-prev-drawer {
  position: static;
  margin: 0;
  font-size: medium;
  font-weight: bold;
}

.drawer .swiper-button-prev-drawer::after,
.drawer .swiper-button-next-drawer::after {
  font-family: "swiper-icons"; 
  cursor:pointer;
}

.drawer .swiper-button-prev-drawer::after {
  content: "prev"; 
}

.drawer .swiper-button-next-drawer::after {
  content: "next"; 
}

.drawer .swiper-button-prev-drawer.swiper-button-disabled,
.drawer .swiper-button-next-drawer.swiper-button-disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.drawer .swiper-pagination-drawer {
  position: static;
  fron-weight: bold;
  font-size: small;
}

/* drawer content*/
.drawer-content-wrapper {
  width: 100%;
  background-color: white;
  max-height: var(--drawer-content-height);
}

.drawer-content {
  height: 100%;
}

.drawer-page ul {
  margin: 0;
}

.drawer-content__hidden {
  max-height: 0;
}

/* animation */
.drawer-content-wrapper, 
.drawer-content__hidden,
.drawer.is-open .drawer__controls,
.drawer__controls,
.drawer__icon.rotated,
.drawer__icon,
.drawer.is-open,
.drawer {
  transition: all var(--animation-delay) ease-in;
}
`

class App {
  constructor(root) {
    const app = this; 

    if (!root) throw new Error("root must not be null");

    app.root = root;
    app.swiperInitialized = false;

    // Single API service class to be used in App
    const apiService = new ApiService()

    app.injectSwiper()
    
    // attach page to body
    app.page = new PageComponent();
    app.page.attachTo(app.root);

    // add drawer header to page 
    const drawerHeader = new Drawer();
    app.page.addChild(drawerHeader);

    // add drawer content to page 
    const drawerContent = new DrawerContent(app.swiperLoadPromise);
    app.page.addChild(drawerContent);

    drawerHeader.setOnToggleListener(() => {
      drawerHeader.toggleIcon();
      drawerContent.toggle();
    });

    app.loadProducts(apiService, drawerContent);
  }
  
  injectSwiper = () => {
    // quick reference to css while in dev mode
    const css = cssStrong

    const styleElement = document.createElement("style");
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
    
    // // load swiper css
    const swiperCSS = document.createElement('link');
    swiperCSS.rel = "stylesheet";
    swiperCSS.href = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css";
    document.head.appendChild(swiperCSS);  
    
    // load swiper script
    this.swiperLoadPromise = new Promise((resolve, reject) => {
      const swiper = document.createElement("script");
      swiper.src = 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js';

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
    // try {
    //   await this.swiperLoadPromise;
    //   drawerContent.initSwiper()
    // } catch (e){
    //   throw new Error(e)
    // }
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
      <section class="drawer">
        <h7 class="drawer__h">Stickey drawer</h7>
        <div class="drawer__controls">
          <div class="swiper-button-prev-drawer"></div>
          <div class="swiper-pagination-drawer"></div>
          <div class="swiper-button-next-drawer"></div>
        </div>
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
    const drawer = this;
    drawer.toggleBtn.classList.toggle('rotated')
    drawer.element.classList.toggle('is-open')
  }
}

class DrawerContent extends BaseComponent {
  constructor(swiperLoadPromise) {
    super(`
      <div class="drawer-content-wrapper drawer-content__hidden">
        <div class='drawer-content swiper'>
          <ul class='swiper-wrapper'></ul>
        </div>
      </div>
      `)

    const drawerContent = this;
    drawerContent.swiperWrapper = drawerContent.element.querySelector(".swiper-wrapper");
    drawerContent.swiperContainer = drawerContent.element.querySelector(".drawer-content");
    
    drawerContent.swiperLoadPromise = swiperLoadPromise;
    drawerContent.swiperInitialized = false;
  }
  
  toggle = () => {
    const drawerContent = this;
    drawerContent.element.classList.toggle("drawer-content__hidden")

    const isOpen = !drawerContent.element.classList.contains('drawer-content__hidden');
    if (isOpen) drawerContent.initSwiper()
  }

  addChild = (child) => {
    child.attachTo(this.swiperWrapper, "beforeend") 
  }

  initSwiper = () => {
    const drawerContent = this;

    if (drawerContent.swiperInitialized) return;
    drawerContent.swiperInitialized = true;

    drawerContent.swiperLoadPromise
    .then(() => {
      drawerContent.swiper = new Swiper(drawerContent.swiperContainer, {
        slidesPerView: 3,
        spaceBetween:10,
        pagination : {
          el: ".swiper-pagination-drawer",
          type: "fraction"
        },
        navigation : {
          nextEl: ".swiper-button-next-drawer",
          prevEl: ".swiper-button-prev-drawer"
        }
      })
    })
    .catch(e => {
      throw new Error(`Failed to load Swiper: ${e}`)
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