const STORAGE_KEYS = {
  cart: "novamart_cart",
  theme: "novamart_theme"
};

const PRODUCTS = [
  {
    id: "p-1001",
    name: "AeroPulse Noise Cancelling Headphones",
    price: 249.0,
    rating: 4.8,
    category: "Electronics",
    stock: 22,
    images: [
      "images/products/p-1001-1.jpg",
      "images/products/p-1001-2.jpg",
      "images/products/p-1001-3.jpg"
    ],
    description:
      "Immersive sound, smart noise control, and a weightless design made for all-day listening."
  },
  {
    id: "p-1002",
    name: "Lucent Pro Smartwatch",
    price: 199.0,
    rating: 4.4,
    category: "Electronics",
    stock: 18,
    images: [
      "images/products/p-1002-1.jpg",
      "images/products/p-1002-2.jpg"
    ],
    description:
      "Track every workout, monitor sleep, and stay connected with a vivid always-on display."
  },
  {
    id: "p-1003",
    name: "Lumen Desk Lamp",
    price: 89.0,
    rating: 4.1,
    category: "Home",
    stock: 40,
    images: [
      "images/products/p-1003-1.jpg",
      "images/products/p-1003-2.jpg"
    ],
    description:
      "Warm ambient lighting with adaptive brightness and touch controls."
  },
  {
    id: "p-1004",
    name: "Meridian Lounge Chair",
    price: 399.0,
    rating: 4.7,
    category: "Home",
    stock: 5,
    images: [
      "images/products/p-1004-1.jpg",
      "images/products/p-1004-2.jpg"
    ],
    description:
      "Low-profile comfort with premium upholstery and sculpted oak legs."
  },
  {
    id: "p-1005",
    name: "Verve Travel Backpack",
    price: 129.0,
    rating: 4.3,
    category: "Fashion",
    stock: 30,
    images: [
      "images/products/p-1005-1.jpg",
      "images/products/p-1005-2.jpg"
    ],
    description:
      "Water-resistant fabric, modular storage, and a sleek commuter silhouette."
  },
  {
    id: "p-1006",
    name: "Nova Knit Sneakers",
    price: 149.0,
    rating: 4.6,
    category: "Fashion",
    stock: 14,
    images: [
      "images/products/p-1006-1.jpg",
      "images/products/p-1006-2.jpg"
    ],
    description:
      "Breathable knit uppers with cushioned midsoles for everyday wear."
  },
  {
    id: "p-1007",
    name: "Trail Edge Outdoor Jacket",
    price: 189.0,
    rating: 4.2,
    category: "Sports",
    stock: 21,
    images: [
      "images/products/p-1007-1.jpg",
      "images/products/p-1007-2.jpg"
    ],
    description:
      "Weather-ready outer layer with sealed seams and thermal lining."
  },
  {
    id: "p-1008",
    name: "PulseFit Yoga Mat",
    price: 64.0,
    rating: 4.5,
    category: "Sports",
    stock: 50,
    images: [
      "images/products/p-1008-1.jpg",
      "images/products/p-1008-2.jpg"
    ],
    description:
      "Extra grip, cushioned support, and a textured finish for stability."
  },
  {
    id: "p-1009",
    name: "Crest Espresso Machine",
    price: 499.0,
    rating: 4.9,
    category: "Home",
    stock: 8,
    images: [
      "images/products/p-1009-1.jpg",
      "images/products/p-1009-2.jpg"
    ],
    description:
      "Cafe-grade espresso with steam wand and precise temperature control."
  },
  {
    id: "p-1010",
    name: "Metro Wireless Keyboard",
    price: 79.0,
    rating: 4.0,
    category: "Electronics",
    stock: 33,
    images: [
      "images/products/p-1010-1.jpg",
      "images/products/p-1010-2.jpg"
    ],
    description:
      "Minimal mechanical feel with multi-device pairing and long battery life."
  },
  {
    id: "p-1011",
    name: "Alloy Fitness Kettlebell",
    price: 54.0,
    rating: 4.3,
    category: "Sports",
    stock: 60,
    images: [
      "images/products/p-1011-1.jpg",
      "images/products/p-1011-2.jpg"
    ],
    description:
      "Ergonomic grip with balanced weight distribution for strength training."
  },
  {
    id: "p-1012",
    name: "Aurora Silk Bedding Set",
    price: 219.0,
    rating: 4.7,
    category: "Home",
    stock: 11,
    images: [
      "images/products/p-1012-1.jpg",
      "images/products/p-1012-2.jpg"
    ],
    description:
      "Premium silk blend sheets with breathable softness and low sheen."
  }
];

class StorageManager {
  get(key, fallback) {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    try {
      return JSON.parse(stored);
    } catch (error) {
      return fallback;
    }
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

class ProductManager {
  constructor(products) {
    this.products = products;
  }

  list() {
    return [...this.products];
  }

  getById(id) {
    return this.products.find((product) => product.id === id);
  }

  filter({ category, price, rating, availability }) {
    return this.products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesPrice = product.price <= price;
      const matchesRating = product.rating >= rating;
      const matchesAvailability = !availability || product.stock > 0;
      return matchesCategory && matchesPrice && matchesRating && matchesAvailability;
    });
  }
}

class CartManager {
  constructor(storage) {
    this.storage = storage;
  }

  getCart() {
    return this.storage.get(STORAGE_KEYS.cart, []);
  }

  saveCart(cart) {
    this.storage.set(STORAGE_KEYS.cart, cart);
  }

  addItem(productId, quantity = 1) {
    const cart = this.getCart();
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.qty += quantity;
    } else {
      cart.push({ id: productId, qty: quantity });
    }
    this.saveCart(cart);
  }

  updateItem(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find((entry) => entry.id === productId);
    if (item) {
      item.qty = Math.max(1, quantity);
    }
    this.saveCart(cart);
  }

  removeItem(productId) {
    const cart = this.getCart().filter((item) => item.id !== productId);
    this.saveCart(cart);
  }

  getTotals(products) {
    const cart = this.getCart();
    const subtotal = cart.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? sum + product.price * item.qty : sum;
    }, 0);
    const tax = subtotal * 0.08;
    return { subtotal, tax, total: subtotal + tax };
  }

  getCount() {
    return this.getCart().reduce((sum, item) => sum + item.qty, 0);
  }
}

class AnimationController {
  initReveal() {
    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => el.classList.add("reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
  }

  initScrollTop() {
    const button = document.querySelector("[data-scroll-top]");
    if (!button) return;
    window.addEventListener("scroll", () => {
      button.classList.toggle("show", window.scrollY > 400);
    });
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
}

class UIController {
  constructor({ productManager, cartManager, storage }) {
    this.productManager = productManager;
    this.cartManager = cartManager;
    this.storage = storage;
    this.toast = document.querySelector("[data-toast]");
  }

  initCommon() {
    this.bindTheme();
    this.bindMobileNav();
    this.bindMegaMenu();
    this.bindSearch();
    this.bindCartDrawer();
    this.updateCartCount();
    this.bindWishlist();
  }

  bindTheme() {
    const toggle = document.querySelector("[data-theme-toggle]");
    const stored = this.storage.get(STORAGE_KEYS.theme, null);
    if (stored) {
      document.documentElement.dataset.theme = stored;
    }
    toggle?.addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      this.storage.set(STORAGE_KEYS.theme, next);
      const label = toggle.querySelector("span");
      if (label) label.textContent = next === "dark" ? "Dark" : "Light";
    });
  }

  bindMobileNav() {
    const toggle = document.querySelector("[data-mobile-toggle]");
    const header = document.querySelector("[data-header]");
    toggle?.addEventListener("click", () => header?.classList.toggle("nav-open"));
  }

  bindMegaMenu() {
    const toggle = document.querySelector("[data-mega-toggle]");
    const menu = document.querySelector("[data-mega-menu]");
    if (!toggle || !menu) return;
    let closeTimeout;

    const openMenu = () => {
      clearTimeout(closeTimeout);
      menu.classList.add("open");
    };
    const closeMenu = () => {
      closeTimeout = setTimeout(() => menu.classList.remove("open"), 160);
    };

    toggle.addEventListener("mouseenter", openMenu);
    toggle.addEventListener("mouseleave", closeMenu);
    menu.addEventListener("mouseenter", openMenu);
    menu.addEventListener("mouseleave", closeMenu);

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && event.target !== toggle) {
        menu.classList.remove("open");
      }
    });

    const megaContent = document.querySelector("[data-mega-content]");
    const megaButtons = document.querySelectorAll("[data-mega-category]");
    const megaData = {
      electronics: ["Audio", "Computers", "Smart Home", "Wearables"],
      home: ["Kitchen", "Living Room", "Bedroom", "Lighting"],
      fashion: ["Footwear", "Outerwear", "Bags", "Accessories"],
      sports: ["Training", "Outdoor", "Cycling", "Recovery"]
    };

    const renderMega = (key) => {
      if (!megaContent) return;
      megaContent.innerHTML = megaData[key]
        .map(
          (item) => `
            <div class="mega-card">
              <strong>${item}</strong>
              <span>Explore ${item.toLowerCase()} essentials</span>
            </div>
          `
        )
        .join("");
    };

    renderMega("electronics");
    megaButtons.forEach((button) => {
      button.addEventListener("click", () => {
        megaButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        renderMega(button.dataset.megaCategory);
      });
    });
  }

  bindSearch() {
    const input = document.querySelector("[data-search-input]");
    const suggestions = document.querySelector("[data-search-suggestions]");
    if (!input || !suggestions) return;

    input.addEventListener("input", (event) => {
      const query = event.target.value.trim().toLowerCase();
      if (!query) {
        suggestions.classList.remove("open");
        suggestions.innerHTML = "";
        return;
      }
      const matches = this.productManager
        .list()
        .filter((product) => product.name.toLowerCase().includes(query))
        .slice(0, 5);
      suggestions.innerHTML = matches
        .map(
          (product) =>
            `<button type="button" data-product-id="${product.id}">${product.name}</button>`
        )
        .join("");
      suggestions.classList.add("open");
    });

    suggestions.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      window.location.href = `product.html?id=${button.dataset.productId}`;
    });

    document.addEventListener("click", (event) => {
      if (!suggestions.contains(event.target) && event.target !== input) {
        suggestions.classList.remove("open");
      }
    });
  }

  bindCartDrawer() {
    const drawer = document.querySelector("[data-cart-drawer]");
    const open = document.querySelectorAll("[data-cart-toggle]");
    const close = document.querySelector("[data-cart-close]");
    if (!drawer) return;
    open.forEach((button) => button.addEventListener("click", () => this.openCartDrawer()));
    close?.addEventListener("click", () => drawer.classList.remove("open"));
    drawer.addEventListener("click", (event) => {
      if (event.target === drawer) drawer.classList.remove("open");
    });
  }

  openCartDrawer() {
    const drawer = document.querySelector("[data-cart-drawer]");
    if (!drawer) return;
    this.renderCartPreview();
    drawer.classList.add("open");
  }

  renderCartPreview() {
    const container = document.querySelector("[data-cart-items]");
    const subtotalEl = document.querySelector("[data-cart-subtotal]");
    if (!container || !subtotalEl) return;
    const cart = this.cartManager.getCart();
    const products = this.productManager.list();
    container.innerHTML = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return "";
        return `
          <div class="cart-item">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
            <div>
              <strong>${product.name}</strong>
              <span>$${product.price.toFixed(2)} x ${item.qty}</span>
            </div>
          </div>
        `;
      })
      .join("");
    const totals = this.cartManager.getTotals(products);
    subtotalEl.textContent = `$${totals.subtotal.toFixed(2)}`;
  }

  updateCartCount() {
    const badge = document.querySelector("[data-cart-count]");
    if (badge) {
      badge.textContent = this.cartManager.getCount();
    }
  }

  showToast(message) {
    if (!this.toast) return;
    this.toast.textContent = message;
    this.toast.classList.add("show");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.classList.remove("show"), 1800);
  }

  bindWishlist() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-wishlist]");
      if (!button) return;
      button.classList.toggle("active");
    });
  }

  renderProductCards(container, products) {
    container.innerHTML = products
      .map(
        (product) => `
        <article class="product-card">
          <button class="wishlist" type="button" data-wishlist aria-label="Wishlist"></button>
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
          <strong>${product.name}</strong>
          <span>$${product.price.toFixed(2)}</span>
          <div class="product-actions">
            <button class="btn ghost quick-view" type="button" data-quick-view="${product.id}">Quick View</button>
            <button class="btn primary" type="button" data-add-to-cart="${product.id}">Add to cart</button>
          </div>
        </article>
      `
      )
      .join("");
  }

  bindProductActions() {
    document.addEventListener("click", (event) => {
      const add = event.target.closest("[data-add-to-cart]");
      if (add) {
        this.cartManager.addItem(add.dataset.addToCart, 1);
        this.updateCartCount();
        this.showToast("Added to cart");
      }
      const quick = event.target.closest("[data-quick-view]");
      if (quick) {
        window.location.href = `product.html?id=${quick.dataset.quickView}`;
      }
    });
  }
}

class FilterManager {
  constructor(ui, productManager) {
    this.ui = ui;
    this.productManager = productManager;
    this.page = 1;
    this.pageSize = 8;
  }

  init() {
    this.price = document.querySelector("[data-price-range]");
    this.priceValue = document.querySelector("[data-price-value]");
    this.category = document.querySelector("[data-category-filter]");
    this.rating = document.querySelector("[data-rating-filter]");
    this.available = document.querySelector("[data-availability-filter]");
    this.sort = document.querySelector("[data-sort]");
    this.grid = document.querySelector("[data-shop-grid]");
    this.count = document.querySelector("[data-shop-count]");
    this.pagination = document.querySelector("[data-shop-pagination]");

    [this.price, this.category, this.rating, this.available, this.sort].forEach((input) => {
      input?.addEventListener("input", () => {
        this.page = 1;
        this.render();
      });
      input?.addEventListener("change", () => {
        this.page = 1;
        this.render();
      });
    });

    this.pagination?.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;
      this.page = Number(button.dataset.page);
      this.render();
    });

    this.render();
  }

  applySort(products) {
    const value = this.sort?.value;
    if (value === "low") {
      return products.sort((a, b) => a.price - b.price);
    }
    if (value === "high") {
      return products.sort((a, b) => b.price - a.price);
    }
    return products.sort((a, b) => b.rating - a.rating);
  }

  render() {
    if (!this.grid) return;
    const filters = {
      category: this.category?.value || "all",
      price: Number(this.price?.value || 900),
      rating: Number(this.rating?.value || 0),
      availability: Boolean(this.available?.checked)
    };
    if (this.priceValue) {
      this.priceValue.textContent = `$${filters.price}`;
    }
    let results = this.productManager.filter(filters);
    results = this.applySort(results);
    const totalPages = Math.max(1, Math.ceil(results.length / this.pageSize));
    if (this.page > totalPages) this.page = 1;
    const start = (this.page - 1) * this.pageSize;
    const paged = results.slice(start, start + this.pageSize);
    this.ui.renderProductCards(this.grid, paged);
    this.ui.bindProductActions();
    if (this.count) this.count.textContent = `${results.length} items`;
    this.renderPagination(totalPages);
  }

  renderPagination(totalPages) {
    if (!this.pagination) return;
    this.pagination.innerHTML = "";
    Array.from({ length: totalPages }, (_, index) => index + 1).forEach((page) => {
      const button = document.createElement("button");
      button.dataset.page = page;
      button.textContent = page;
      if (page === this.page) button.classList.add("active");
      this.pagination.appendChild(button);
    });
  }
}

const storage = new StorageManager();
const productManager = new ProductManager(PRODUCTS);
const cartManager = new CartManager(storage);
const ui = new UIController({ productManager, cartManager, storage });
const animations = new AnimationController();

ui.initCommon();
ui.bindProductActions();
animations.initReveal();
animations.initScrollTop();

const page = document.body.dataset.page;

if (page === "home") {
  const heroTrack = document.querySelector("[data-hero-track]");
  const heroIndicators = document.querySelector("[data-hero-indicators]");
  const heroSlides = [
    {
      title: "Premium tech for modern work",
      text: "Discover curated electronics with exclusive launch pricing.",
      image: "images/hero-01.jpg"
    },
    {
      title: "Home essentials with designer flair",
      text: "Upgrade your space with our seasonal collections.",
      image: "images/hero-02.jpg"
    },
    {
      title: "Athletic gear built for momentum",
      text: "Performance apparel and training equipment in one place.",
      image: "images/hero-03.jpg"
    }
  ];

  if (heroTrack && heroIndicators) {
    heroTrack.innerHTML = heroSlides
      .map(
        (slide) => `
          <article class="hero-slide">
            <div>
              <h1>${slide.title}</h1>
              <p>${slide.text}</p>
              <a class="btn primary" href="shop.html">Shop now</a>
            </div>
            <img src="${slide.image}" alt="${slide.title}" loading="lazy" />
          </article>
        `
      )
      .join("");

    heroIndicators.innerHTML = heroSlides
      .map((_, index) => `<span data-hero-dot="${index}"></span>`)
      .join("");

    let index = 0;
    const updateHero = () => {
      heroTrack.style.transform = `translateX(-${index * 100}%)`;
      heroIndicators.querySelectorAll("span").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    };
    updateHero();

    const next = () => {
      index = (index + 1) % heroSlides.length;
      updateHero();
    };
    let timer = setInterval(next, 5000);

    document.querySelector("[data-hero-next]")?.addEventListener("click", () => {
      next();
    });
    document.querySelector("[data-hero-prev]")?.addEventListener("click", () => {
      index = (index - 1 + heroSlides.length) % heroSlides.length;
      updateHero();
    });

    heroTrack.addEventListener("mouseenter", () => clearInterval(timer));
    heroTrack.addEventListener("mouseleave", () => {
      timer = setInterval(next, 5000);
    });
  }

  const dealTrack = document.querySelector("[data-deal-track]");
  if (dealTrack) {
    const deals = productManager.list().slice(0, 5);
    dealTrack.innerHTML = deals
      .map(
        (product) => `
        <article class="deal-card">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
          <strong>${product.name}</strong>
          <span>$${product.price.toFixed(2)}</span>
        </article>
      `
      )
      .join("");
  }

  document.querySelector("[data-scroll-left]")?.addEventListener("click", () => {
    dealTrack?.scrollBy({ left: -240, behavior: "smooth" });
  });
  document.querySelector("[data-scroll-right]")?.addEventListener("click", () => {
    dealTrack?.scrollBy({ left: 240, behavior: "smooth" });
  });

  const timerEl = document.querySelector("[data-deal-timer]");
  if (timerEl) {
    const end = Date.now() + 1000 * 60 * 60 * 6;
    setInterval(() => {
      const diff = end - Date.now();
      const hours = Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
      const mins = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
      const secs = Math.max(0, Math.floor((diff / 1000) % 60));
      timerEl.textContent = `${hours}h ${mins}m ${secs}s`;
    }, 1000);
  }

  const grid = document.querySelector("[data-product-grid]");
  if (grid) {
    ui.renderProductCards(grid, productManager.list().slice(0, 8));
    ui.bindProductActions();
  }

  const recTrack = document.querySelector("[data-carousel-track]");
  if (recTrack) {
    ui.renderProductCards(recTrack, productManager.list().slice(4));
  }
}

if (page === "shop") {
  new FilterManager(ui, productManager).init();
}

if (page === "product") {
  const params = new URLSearchParams(window.location.search);
  const product = productManager.getById(params.get("id")) || productManager.list()[0];
  const detail = document.querySelector("[data-product-detail]");
  if (detail && product) {
    detail.innerHTML = `
      <div class="gallery">
        <div class="gallery-main">
          <img src="${product.images[0]}" alt="${product.name}" data-gallery-main />
        </div>
        <div class="gallery-thumbs">
          ${product.images
            .map(
              (img, index) =>
                `<img src="${img}" alt="${product.name}" data-thumb="${index}" tabindex="0" role="button" aria-label="Preview image ${
                  index + 1
                }" class="${index === 0 ? "active" : ""}" />`
            )
            .join("")}
        </div>
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <div class="rating">${"*".repeat(5)}</div>
        <strong>$${product.price.toFixed(2)}</strong>
        <p>${product.description}</p>
        <div class="quantity">
          <button type="button" data-qty-minus>-</button>
          <span data-qty>1</span>
          <button type="button" data-qty-plus>+</button>
        </div>
        <div class="product-actions">
          <button class="btn primary" type="button" data-add-to-cart="${product.id}">Add to cart</button>
          <button class="btn ghost" type="button">Buy now</button>
        </div>
        <div class="accordion" data-accordion>
          <button type="button" data-accordion-toggle>Description</button>
          <div class="accordion-content">${product.description}</div>
        </div>
      </div>
    `;
  }

  const setPreview = (thumb) => {
    if (!thumb) return;
    const main = detail.querySelector("[data-gallery-main]");
    detail.querySelectorAll("[data-thumb]").forEach((img) => img.classList.remove("active"));
    thumb.classList.add("active");
    if (main) main.src = thumb.src;
  };

  detail?.addEventListener("click", (event) => {
    const thumb = event.target.closest("[data-thumb]");
    if (thumb) {
      setPreview(thumb);
    }
    const minus = event.target.closest("[data-qty-minus]");
    const plus = event.target.closest("[data-qty-plus]");
    const qtyEl = detail.querySelector("[data-qty]");
    if (qtyEl && (minus || plus)) {
      let qty = Number(qtyEl.textContent || 1);
      if (minus) qty = Math.max(1, qty - 1);
      if (plus) qty += 1;
      qtyEl.textContent = qty;
    }
    const accordion = event.target.closest("[data-accordion-toggle]");
    if (accordion) {
      accordion.closest("[data-accordion]")?.classList.toggle("open");
    }
  });

  detail?.addEventListener("mouseover", (event) => {
    const thumb = event.target.closest("[data-thumb]");
    if (thumb) {
      setPreview(thumb);
    }
  });

  detail?.addEventListener("keydown", (event) => {
    const thumb = event.target.closest("[data-thumb]");
    if (!thumb) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setPreview(thumb);
    }
  });

  document.addEventListener("click", (event) => {
    const add = event.target.closest("[data-add-to-cart]");
    if (!add) return;
    const qtyEl = detail?.querySelector("[data-qty]");
    const qty = qtyEl ? Number(qtyEl.textContent || 1) : 1;
    cartManager.addItem(add.dataset.addToCart, qty);
    ui.updateCartCount();
    ui.showToast("Added to cart");
  });

  const relatedTrack = document.querySelector("[data-related-track]");
  if (relatedTrack) {
    ui.renderProductCards(relatedTrack, productManager.list().slice(0, 6));
  }
}

if (page === "cart") {
  const container = document.querySelector("[data-cart-page]");
  const summary = document.querySelector("[data-order-summary]");
  const products = productManager.list();

  const renderCartPage = () => {
    const cart = cartManager.getCart();
    if (!container) return;
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      summary.innerHTML = "";
      return;
    }
    container.innerHTML = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) return "";
        return `
          <div class="cart-item" data-cart-item="${product.id}">
            <img src="${product.images[0]}" alt="${product.name}" />
            <div>
              <strong>${product.name}</strong>
              <span>$${product.price.toFixed(2)}</span>
              <div class="quantity">
                <button type="button" data-qty-minus>-</button>
                <span data-qty>${item.qty}</span>
                <button type="button" data-qty-plus>+</button>
              </div>
            </div>
            <button class="btn ghost" type="button" data-remove>Remove</button>
          </div>
        `;
      })
      .join("");

    const totals = cartManager.getTotals(products);
    summary.innerHTML = `
      <h3>Order summary</h3>
      <p>Subtotal: $${totals.subtotal.toFixed(2)}</p>
      <p>Tax: $${totals.tax.toFixed(2)}</p>
      <strong>Total: $${totals.total.toFixed(2)}</strong>
      <input type="text" placeholder="Coupon code" />
      <a class="btn primary" href="checkout.html">Proceed to checkout</a>
    `;
  };

  renderCartPage();

  container?.addEventListener("click", (event) => {
    const item = event.target.closest("[data-cart-item]");
    if (!item) return;
    const id = item.dataset.cartItem;
    const qtyEl = item.querySelector("[data-qty]");
    const minus = event.target.closest("[data-qty-minus]");
    const plus = event.target.closest("[data-qty-plus]");
    const remove = event.target.closest("[data-remove]");
    let qty = Number(qtyEl?.textContent || 1);
    if (minus) qty = Math.max(1, qty - 1);
    if (plus) qty += 1;
    if (minus || plus) {
      cartManager.updateItem(id, qty);
      if (qtyEl) qtyEl.textContent = qty;
      renderCartPage();
      ui.updateCartCount();
    }
    if (remove) {
      cartManager.removeItem(id);
      item.style.opacity = "0";
      setTimeout(() => {
        renderCartPage();
        ui.updateCartCount();
      }, 200);
    }
  });
}

if (page === "checkout") {
  const steps = document.querySelectorAll("[data-step]");
  const progress = document.querySelectorAll("[data-checkout-progress] span");
  const confirmation = document.querySelector("[data-order-confirmation]");
  let current = 0;

  const updateSteps = () => {
    steps.forEach((step) => step.classList.toggle("active", Number(step.dataset.step) === current));
    progress.forEach((item, index) => item.classList.toggle("active", index <= current));
  };

  document.querySelectorAll("[data-next-step]").forEach((button) => {
    button.addEventListener("click", () => {
      current = Math.min(3, current + 1);
      updateSteps();
    });
  });

  document.querySelector("[data-place-order]")?.addEventListener("click", () => {
    confirmation?.classList.add("show");
  });

  updateSteps();
}
