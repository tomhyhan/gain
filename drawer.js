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
  --slide-bg-color: #f0f0f0;

  /* size */
  --border-radius-small: 8px;
  --padding-small: 0.5rem;
  --padding-medium: 1rem;
  --flex-gap-small: 0.5rem;
  --flex-gap-medium: 1.0rem;
  --drawer-content-height: 50vh;

  /* animation delay */
  --animation-delay: 0.3s;
}

/* drawer page layout */
.drawer-page {
  position: fixed;
  bottom: 0;

  width: 100%;
  z-index: 10001;
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
  
.swiper.drawer-content {
  height: var(--drawer-content-height);
  padding: var(--padding-medium) 0;
}

.drawer-page ul {
  margin: 0;
}

.drawer-content__hidden {
  max-height: 0;
}

/* Slide */
.swiper-slide.drawer-slide {
  background-color: var(--slide-bg-color); 
  border-radius: var(--border-radius-small);
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--padding-medium); 
  gap: var(--flex-gap-medium)
}

.drawer-slide__info {
  display: flex;
  align-items: center; 
  gap: var(--flex-gap-small);
  width: 100%;
}

.drawer-slide__header {
  font-weight: bold;
  margin: 0;
  
  flex-shrink: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.drawer-slide__tooltip {
  background-color: var(--drawer-page-color);
  color: black;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  flex-shrink: 0; 
}

.drawer-slide__image-wrapper {
  width: 100%;
  height: 35%;
  flex-shrink: 0; 
}

.drawer-slide__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.drawer-slide__desc {
  margin: 0;
  font-size: small;

  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.drawer-slide__btn {
  margin-top:auto;
  align-self: flex-end;
  
  border: none;
  background-color: var(--drawer-page-color);
  padding: var(--padding-small) var(--padding-medium);
  border-radius: var(--border-radius-small);
  cursor: pointer;
  font-weight: bold;
  font-size: medium;
}

.drawer-slide__btn:hover {
  filter: brightness(0.95);
}

/* overlay */

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  z-index: 10000; /* header is 9999 */

  animation: fadeIn 0.3s ease-out
}

.drawer-overlay.remove {
  animation: fadeOut 0.3s ease-in forwards;
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

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes fadeOut {
  from {opacity: 1;}
  to {opacity: 0;}
}
`

class App {
  constructor(root) {
    const app = this; 

    if (!root) throw new Error("root must not be null");

    app.root = root;
    app.swiperInitialized = false;
    app.isDrawerOpen = false;

    // Single API service class to be used in App
    const apiService = new ApiService()

    app.injectSwiper()
    
    // attach page to body
    app.page = new PageComponent();
    app.page.attachTo(app.root);

    // add drawer header to page 
    app.drawerHeader = new Drawer();
    app.page.addChild(app.drawerHeader);

    // add drawer content to page 
    app.drawerContent = new DrawerContent(app.swiperLoadPromise);
    app.page.addChild(app.drawerContent);

    app.overlay = new Overlay();
    
    // toggle logic
    app.drawerHeader.setOnToggleListener(() => {
      app.isDrawerOpen? app.closeDrawer(): app.openDrawer()
    });

    // overlay listens to overlay click event
    app.overlay.setOnCloseListener(app.closeDrawer)

    app.loadProducts(apiService);
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

  loadProducts = async (apiService) =>  {
    const products = await apiService.getProducts()
    products.forEach(product => {
      const slide = new Slide(product);
      this.drawerContent.addChild(slide)
    })
  }

  openDrawer = () => {
    const app = this;
    if (app.isDrawerOpen) return;
    app.isDrawerOpen = true;
    app.drawerHeader.toggleIcon();
    app.drawerContent.toggle();
    app.overlay.attachTo(app.root);
  }

  closeDrawer = () => {
    const app = this;
    if (!app.isDrawerOpen) return;
    app.isDrawerOpen = false;
    app.drawerHeader.toggleIcon();
    app.drawerContent.toggle();
    app.overlay.remove();
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

  removeFrom(parent) {
    if (parent !== this.element.parentElement) {
      throw new Error("parent mismatch")
    }
    parent.removeChild(this.element)
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
        <div class='swiper drawer-content'>
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
      <li class="swiper-slide drawer-slide">
        <div class="drawer-slide__info">
          <h8 class="drawer-slide__header">${product.header}</h8>
          <span class="drawer-slide__tooltip">${product.tooltip}</span>
        </div>
        <div class="drawer-slide__image-wrapper">
          <img class="drawer-slide__img" src="${product.image}" alt="${product.header}">
        </div>
        <p class="drawer-slide__desc">${product.description}</p>
        <button class="drawer-slide__btn">Learn more</button>
      </li>
    `) 
  }
}

class Overlay extends BaseComponent {
  constructor() {
    super("<div class='drawer-overlay'></div>")
    const overlay = this;
    overlay.element.addEventListener("click", () => overlay.closeListener && overlay.closeListener())
  }

  setOnCloseListener = (listener) => {
    console.log("listener", listener)
    this.closeListener = listener
  }

  attachTo = (parent, position = "afterbegin") => {
    this.element.classList.remove("remove");
    super.attachTo(parent, position);
  }

  remove = () => {
    const overlay = this;
    overlay.element.classList.add("remove")
    overlay.element.addEventListener("animationend", () => {
      overlay.removeFrom(overlay.element.parentElement)
    }, {once:true})
  }
}

class ApiService {
  constructor() {
    this.baseUrl = "https://dummyjson.com/";
  }

  getProducts = async(limit = 5) => {
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

  normalizeProducts = (products) => {
    return products.map(product => {
      return {
        header: product.title,
        description: product.description,
        image: product.thumbnail,
        tooltip: product.category,
      }
    })
  }
}

const body = document.body
new App(body)