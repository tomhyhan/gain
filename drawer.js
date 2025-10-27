

const cssStrong = `
    :root {
  /* color */
  --drawer-page-color: #edbf60;
  --slide-bg-color: #f0f0f0;

  /* size */
  --border-radius-small: 8px;
  --padding-small: 0.5rem;
  --padding-medium: 1rem;
  --padding-large: 1.5rem;
  --flex-gap-small: 0.5rem;
  --flex-gap-medium: 1.0rem;
  --drawer-content-height: 50vh;

  /* animation delay */
  --animation-delay: 0.3s;
}

/* sentinel */
.drawer-sentinel {
  width: 100%;
  height: 1px; 
  pointer-events: none;
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
  padding: var(--padding-medium);
}

.drawer-page ul {
  margin: 0;
  padding: 0;
}

.drawer-content__hidden {
  max-height: 0;
}

/* Slide */

/* Slide Flip animation */
/* Slide container*/ 
.swiper-slide.drawer-slide {
  background-color: transparent; 
  padding: 0; 
  perspective: 1000px; 
}

/* Slide card */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

/* Slide flip State */
.flip-card-inner.is-flipped {
  transform: rotateY(180deg);
}

/* Slide Cards Detail*/
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden; 

  background-color: var(--slide-bg-color); 
  border-radius: var(--border-radius-small);
  display: flex;
  flex-direction: column;
  padding: var(--padding-medium); 
  gap: var(--flex-gap-medium);
}

/* Slide Flip */
.flip-card-back {
  transform: rotateY(180deg);
  justify-content: space-between; 
}

.flip-card-back .drawer-slide__desc {
  overflow: auto;
  height: 100%;
}

.flip-btn--front,
.flip-btn--back {
  margin-top: auto;
  align-self: flex-end;
}

.drawer-slide__info {
  display: flex;
  gap: var(--flex-gap-small);
  width: 100%;
  align-items: center;
}

.drawer-slide__header {
  font-weight: bold;
  margin: 0;
  
  flex-shrink: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.drawer-slide__tooltip-wrapper {
  position: relative;
  display: flex; 
  align-items: center;
}

.drawer-slide__tooltip-icon {
  cursor: help; 
  font-size: medium;
  display: flex;
  align-items: center;
}

.drawer-slide__tooltip-text {
  visibility: hidden;
  opacity: 0;

  position: absolute;
  bottom: 130%; 
  left: 50%;
  transform: translateX(-50%) translateY(5px);
  background-color: black;
  color: white;
  padding: 3px 6px;
  font-size: small;
  border-radius: var(--border-radius-small);
  white-space: nowrap; 
  z-index: 10005;

  transition: all 0.3s ease-out
}

.drawer-slide__tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%; 
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.drawer-slide__tooltip-wrapper:hover .drawer-slide__tooltip-text {
  visibility: visible;
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.drawer-slide__image-wrapper {
  width: 100%;
  height: 50%;
  flex-shrink: 0; 
}

.drawer-slide__img {
  width: 100%;
  height: 100%;
  object-fit: fill;
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
    
    // listens to overlay click event
    app.overlay.setOnCloseListener(app.closeDrawer)
    
    app.loadProducts(apiService);
    
    app.sentinel = new BaseComponent(`<div class="drawer-sentinel"></div>`)
    app.sentinel.attachTo(root, "beforeend")
    app.createObserver()
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
    app.observer.observe(app.sentinel.element)
  }

  closeDrawer = () => {
    const app = this;
    if (!app.isDrawerOpen) return;
    app.isDrawerOpen = false;
    app.drawerHeader.toggleIcon();
    app.drawerContent.toggle();
    app.overlay.remove();
    app.observer.unobserve(app.sentinel.element)
  }

  createObserver = () => {
    const intersectionCallback = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) this.closeDrawer();
    }
    this.observer = new IntersectionObserver(intersectionCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    })
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
        grabCursor: true, 
        pagination : {
          el: ".swiper-pagination-drawer",
          type: "fraction"
        },
        navigation : {
          nextEl: ".swiper-button-next-drawer",
          prevEl: ".swiper-button-prev-drawer"
        },
        breakpoints: {
            0: {
              slidesPerView: 1,
              slidesPerGroup:1,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 2,
              slidesPerGroup:2,
              spaceBetween: 10
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 10
            }
          }
      })
    })
    .catch(e => {
      throw new Error(`Failed to load Swiper: ${e}`)
    })

  }
}

// class Slide extends BaseComponent {
//   constructor(product) {
//    super(`
//       <li class="swiper-slide drawer-slide">
//         <div class="drawer-slide__info">
//           <h8 class="drawer-slide__header">${product.header}</h8>
//           <div class="drawer-slide__tooltip-wrapper">
//             <span class="drawer-slide__tooltip-icon">${tooltipIcon}</span>
//             <span class="drawer-slide__tooltip-text">${product.tooltip}</span>
//           </div>
//         </div>
//         <div class="drawer-slide__image-wrapper">
//           <img class="drawer-slide__img" src="${product.image}" alt="${product.header}">
//         </div>
//         <p class="drawer-slide__desc">${product.description}</p>
//         <button class="drawer-slide__btn">Learn more</button>
//       </li>
//     `) 
//   }
// }

class Slide extends BaseComponent {
  constructor(product) {
    super(`
      <li class="swiper-slide drawer-slide">
        <div class="flip-card-inner">
          
          <div class="flip-card-front">
            <div class="drawer-slide__info">
              <h8 class="drawer-slide__header">${product.header}</h8>
              <div class="drawer-slide__tooltip-wrapper">
                <span class="drawer-slide__tooltip-icon">${tooltipIcon}</span>
                <span class="drawer-slide__tooltip-text">${product.tooltip}</span>
              </div>
            </div>
            <div class="drawer-slide__image-wrapper">
              <img class="drawer-slide__img" src="${product.image}" alt="${product.header}">
            </div>
            <button class="drawer-slide__btn flip-btn--front">Learn more</button>
          </div>

          <div class="flip-card-back">
            <div class="drawer-slide__info">
              <h8 class="drawer-slide__header">${product.header}</h8>
            </div>
            <p class="drawer-slide__desc">${product.description}</p>
            <button class="drawer-slide__btn flip-btn--back">Go Back</button>
          </div>

        </div>
      </li>
    `);

    const flipCardInner = this.element.querySelector('.flip-card-inner');
    const frontBtn = this.element.querySelector('.flip-btn--front');
    const backBtn = this.element.querySelector('.flip-btn--back');

    const toggleFlip = () => {
      flipCardInner.classList.toggle('is-flipped');
    };

    frontBtn.addEventListener('click', toggleFlip);
    backBtn.addEventListener('click', toggleFlip);
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

  getProducts = async(limit = 7) => {
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


const chevronIcon = `<svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  // stroke-linecap="round" 
  stroke-linejoin="round"
>
  <polyline points="18 15 12 9 6 15"></polyline>
</svg>`

const tooltipIcon =  `<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
<g id="SVGRepo_bgCarrier" stroke-width="0"/>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
<g id="SVGRepo_iconCarrier"> <path d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z" fill="#000000"/> <path d="M12 13C11.8019 12.9974 11.6126 12.9176 11.4725 12.7775C11.3324 12.6374 11.2526 12.4481 11.25 12.25V8.75C11.25 8.55109 11.329 8.36032 11.4697 8.21967C11.6103 8.07902 11.8011 8 12 8C12.1989 8 12.3897 8.07902 12.5303 8.21967C12.671 8.36032 12.75 8.55109 12.75 8.75V12.25C12.7474 12.4481 12.6676 12.6374 12.5275 12.7775C12.3874 12.9176 12.1981 12.9974 12 13Z" fill="#000000"/> <path d="M12 16C11.8019 15.9974 11.6126 15.9176 11.4725 15.7775C11.3324 15.6374 11.2526 15.4481 11.25 15.25V14.75C11.25 14.5511 11.329 14.3603 11.4697 14.2197C11.6103 14.079 11.8011 14 12 14C12.1989 14 12.3897 14.079 12.5303 14.2197C12.671 14.3603 12.75 14.5511 12.75 14.75V15.25C12.7474 15.4481 12.6676 15.6374 12.5275 15.7775C12.3874 15.9176 12.1981 15.9974 12 16Z" fill="#000000"/> </g>
</svg>`

const body = document.body
new App(body)