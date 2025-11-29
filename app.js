/* ============================================================
   SPORTX – GLOBAL STATE (CART + WISHLIST)
============================================================ */

const CART_KEY = "sportx_cart";
const WISH_KEY = "sportx_wishlist";

/* ---------- CART UTILS ---------- */
function loadCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartTotalCount(cart) {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotalPrice(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* ---------- WISHLIST UTILS ---------- */
function loadWishlist() {
    try {
        return JSON.parse(localStorage.getItem(WISH_KEY)) || [];
    } catch {
        return [];
    }
}

function saveWishlist(list) {
    localStorage.setItem(WISH_KEY, JSON.stringify(list));
}

/* ============================================================
   HEADER / BURGER / STICKY
============================================================ */

function initHeader() {
    const header = document.querySelector(".header");
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileOverlay = document.getElementById("mobileOverlay");

    // Sticky hide on scroll
    if (header) {
        let lastScroll = 0;
        window.addEventListener("scroll", () => {
            const current = window.scrollY;
            if (current > lastScroll && current > 120) {
                header.classList.add("hide");
            } else {
                header.classList.remove("hide");
            }
            lastScroll = current;
        });
    }

    // Burger / mobile menu
    if (burger && mobileMenu && mobileOverlay) {
        burger.addEventListener("click", () => {
            mobileMenu.classList.add("open");
            mobileOverlay.classList.add("show");
        });

        mobileOverlay.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            mobileOverlay.classList.remove("show");
        });
    }
}

/* ============================================================
   MEGA MENU
============================================================ */

function initMegaMenu() {
    const megaMenu = document.getElementById("megaMenu");
    const navItems = document.querySelectorAll(".nav-item");
    const header = document.querySelector(".header");

    if (!megaMenu || !navItems.length || !header) return;

    const menuData = {
        men: {
            categories: ["Running", "Football", "Training", "Sneakers"],
            clothing: ["T-shirts", "Hoodies", "Pants", "Jackets"],
            accessories: ["Bags", "Socks", "Caps"],
            banner: "assets/img/mega-men.jpg"
        },
        women: {
            categories: ["Running", "Lifestyle", "Training"],
            clothing: ["Leggings", "Sports Bras", "Tops", "Outerwear"],
            accessories: ["Bags", "Socks", "Headbands"],
            banner: "assets/img/mega-women.jpg"
        },
        kids: {
            categories: ["School", "Football", "Running"],
            clothing: ["T-shirts", "Shorts", "Tracksuits"],
            accessories: ["Backpacks", "Caps"],
            banner: "assets/img/mega-kids.jpg"
        },
        sports: {
            categories: ["Football", "Basketball", "Gym", "Running"],
            clothing: ["Training Wear", "Performance Gear"],
            accessories: ["Bags", "Balls", "Gloves"],
            banner: "assets/img/mega-sport.jpg"
        },
        collections: {
            categories: ["2025 Drop", "Street Pack", "Retro"],
            clothing: ["Premium Hoodies", "Limited Jackets"],
            accessories: ["Limited Bags"],
            banner: "assets/img/mega-collection.jpg"
        }
    };

    navItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            const key = item.dataset.menu;
            const data = menuData[key];
            if (!data) return;

            megaMenu.innerHTML = `
                <div class="mega-col">
                    <h4>Categories</h4>
                    ${data.categories.map(c => `<a href="products.html">${c}</a>`).join("")}
                </div>
                <div class="mega-col">
                    <h4>Clothing</h4>
                    ${data.clothing.map(c => `<a href="products.html">${c}</a>`).join("")}
                </div>
                <div class="mega-col">
                    <h4>Accessories</h4>
                    ${data.accessories.map(c => `<a href="products.html">${c}</a>`).join("")}
                </div>
                <div class="mega-banner">
                    <img src="${data.banner}" alt="${key} banner">
                </div>
            `;

            megaMenu.classList.add("active");
        });
    });

    header.addEventListener("mouseleave", () => {
        megaMenu.classList.remove("active");
    });
}

/* ============================================================
   HERO SLIDER (HOME)
============================================================ */

function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slider-dot");
    if (!slides.length || !dots.length) return;

    let current = 0;

    function show(i) {
        slides.forEach(s => s.classList.remove("active"));
        dots.forEach(d => d.classList.remove("active"));
        slides[i].classList.add("active");
        dots[i].classList.add("active");
        current = i;
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener("click", () => show(idx));
    });

    setInterval(() => {
        current = (current + 1) % slides.length;
        show(current);
    }, 5000);

    // Show first
    show(0);
}

/* ============================================================
   SEARCH OVERLAY
============================================================ */

function initSearchOverlay() {
    const searchBtn = document.getElementById("searchBtn");
    const overlay = document.getElementById("searchOverlay");
    const searchClose = document.getElementById("searchClose");
    const searchInput = document.getElementById("searchInputOverlay");
    const searchSuggest = document.getElementById("searchSuggest");

    if (!overlay || !searchInput || !searchSuggest) return;

    const suggestions = [
        "Running Shoes",
        "Football Boots",
        "Sport Jacket",
        "Training Pants",
        "Gym Bag",
        "Basketball Shoes",
        "Yoga Tights"
    ];

    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            overlay.classList.add("open");
            searchInput.focus();
        });
    }

    if (searchClose) {
        searchClose.addEventListener("click", () => {
            overlay.classList.remove("open");
            searchInput.value = "";
            searchSuggest.innerHTML = "";
        });
    }

    searchInput.addEventListener("input", () => {
        const q = searchInput.value.toLowerCase();
        searchSuggest.innerHTML = "";
        if (!q.length) return;

        suggestions
            .filter(item => item.toLowerCase().includes(q))
            .slice(0, 6)
            .forEach(item => {
                const div = document.createElement("div");
                div.className = "suggest-item";
                div.textContent = item;
                searchSuggest.appendChild(div);
            });
    });
}

/* ============================================================
   PRODUCT GALLERY (PRODUCT PAGE)
============================================================ */

function initProductGallery() {
    const mainImage = document.getElementById("mainImage") ||
        document.querySelector(".gallery-main img");
    const thumbs = document.querySelectorAll(".gallery-thumbs .thumb img");

    if (!mainImage || !thumbs.length) return;

    thumbs.forEach(img => {
        img.addEventListener("click", () => {
            mainImage.src = img.src;

            document.querySelectorAll(".gallery-thumbs .thumb")
                .forEach(t => t.classList.remove("active"));
            img.parentElement.classList.add("active");
        });
    });
}

/* ============================================================
   SIZE / COLOR SELECTORS
============================================================ */

function initSizeColorSelectors() {
    document.querySelectorAll(".size-option").forEach(opt => {
        opt.addEventListener("click", () => {
            document.querySelectorAll(".size-option")
                .forEach(o => o.classList.remove("active"));
            opt.classList.add("active");
        });
    });

    document.querySelectorAll(".color-dot").forEach(dot => {
        dot.addEventListener("click", () => {
            document.querySelectorAll(".color-dot")
                .forEach(d => d.classList.remove("active"));
            dot.classList.add("active");
        });
    });
}

/* ============================================================
   CART DRAWER (GLOBAL)
============================================================ */

function initCartDrawer() {
    const drawer = document.getElementById("cartDrawer");
    if (!drawer) return;

    const cartBtns = document.querySelectorAll(".cart-btn");
    const closeBtns = drawer.querySelectorAll(".cart-close");
    const cartList = drawer.querySelector(".cart-list");
    const totalEl = drawer.querySelector(".cart-total");
    const countEls = document.querySelectorAll(".cart-count");

    function renderDrawer() {
        let cart = loadCart();
        cartList.innerHTML = "";
        let total = 0;

        cart.forEach((item, idx) => {
            total += item.price * item.qty;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <img src="${item.img}" class="cart-item-img" alt="">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>Size: ${item.size || "-"}</span>
                    <span>Color: ${item.color || "-"}</span>
                    <div class="qty-box">
                        <button class="qty-btn minus" data-idx="${idx}">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn plus" data-idx="${idx}">+</button>
                    </div>
                </div>
                <strong class="cart-price">${item.price * item.qty} ₸</strong>
            `;
            cartList.appendChild(div);
        });

        totalEl.textContent = total + " ₸";
        const totalCount = getCartTotalCount(cart);
        countEls.forEach(c => c.textContent = totalCount);

        // qty events
        drawer.querySelectorAll(".qty-btn.minus").forEach(btn => {
            btn.addEventListener("click", () => {
                let cart = loadCart();
                const i = Number(btn.dataset.idx);
                if (cart[i].qty > 1) {
                    cart[i].qty--;
                } else {
                    cart.splice(i, 1);
                }
                saveCart(cart);
                renderDrawer();
                syncCartPages();
            });
        });

        drawer.querySelectorAll(".qty-btn.plus").forEach(btn => {
            btn.addEventListener("click", () => {
                let cart = loadCart();
                const i = Number(btn.dataset.idx);
                cart[i].qty++;
                saveCart(cart);
                renderDrawer();
                syncCartPages();
            });
        });
    }

    function openDrawer() {
        drawer.classList.add("open");
        renderDrawer();
    }

    function closeDrawer() {
        drawer.classList.remove("open");
    }

    cartBtns.forEach(btn => {
        btn.addEventListener("click", openDrawer);
    });
    closeBtns.forEach(btn => {
        btn.addEventListener("click", closeDrawer);
    });

    // Initial count sync
    const initCart = loadCart();
    const initCount = getCartTotalCount(initCart);
    countEls.forEach(c => c.textContent = initCount);

    // Export to global scope for reuse
    window.SPORTX_renderCartDrawer = renderDrawer;
}

/* ============================================================
   ADD TO CART (PRODUCT PAGE + PRODUCT CARDS)
============================================================ */

function addProductToCart(payload) {
    let cart = loadCart();

    // try to find same item (by name + size + color)
    const idx = cart.findIndex(
        it => it.name === payload.name &&
              it.size === payload.size &&
              it.color === payload.color
    );

    if (idx >= 0) {
        cart[idx].qty += payload.qty || 1;
    } else {
        cart.push(payload);
    }

    saveCart(cart);

    if (typeof window.SPORTX_renderCartDrawer === "function") {
        window.SPORTX_renderCartDrawer();
    }
}

function initProductPageAddToCart() {
    const btn = document.getElementById("addToCartBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const titleEl = document.querySelector(".product-title");
        const priceEl = document.querySelector(".product-price");
        const mainImg = document.getElementById("mainImage") ||
            document.querySelector(".gallery-main img");

        if (!titleEl || !priceEl || !mainImg) return;

        const priceAttr = priceEl.dataset?.price;
        let price = 0;
        if (priceAttr) {
            price = Number(priceAttr);
        } else {
            // fallback: parse from text "49,900 ₸"
            const num = priceEl.textContent.replace(/[^\d]/g, "");
            price = Number(num || 0);
        }

        const size = document.querySelector(".size-option.active")?.textContent || "M";
        const color = document.querySelector(".color-dot.active")?.dataset.color || "default";

        addProductToCart({
            id: Date.now(),
            name: titleEl.textContent.trim(),
            price,
            img: mainImg.src,
            size,
            color,
            qty: 1
        });

        // open drawer if exists
        const drawer = document.getElementById("cartDrawer");
        if (drawer) drawer.classList.add("open");
    });
}

/* PRODUCT CARDS (PRODUCTS.HTML, WISHLIST.HTML, т.б.) */
function initCardAddToCart() {
    const cards = document.querySelectorAll(".product-card");
    if (!cards.length) return;

    cards.forEach(card => {
        const button = card.querySelector(".add-to-cart");
        if (!button) return;

        button.addEventListener("click", () => {
            const titleEl = card.querySelector(".prod-title");
            const priceEl = card.querySelector(".prod-price");
            const imgEl = card.querySelector("img");

            if (!titleEl || !priceEl || !imgEl) return;

            const priceText = priceEl.textContent.replace(/[^\d]/g, "");
            const price = Number(priceText || 0);

            addProductToCart({
                id: card.dataset.id || Date.now(),
                name: titleEl.textContent.trim(),
                price,
                img: imgEl.src,
                size: "-",
                color: "-",
                qty: 1
            });

            const drawer = document.getElementById("cartDrawer");
            if (drawer) drawer.classList.add("open");
        });
    });
}

/* ============================================================
   CART PAGE RENDER (cart.html)
============================================================ */

function syncCartPages() {
    // if on cart page
    const cartContainer = document.querySelector(".cart-items");
    const cartSummaryTotal = document.getElementById("cartSummaryTotal");
    if (!cartContainer) return;

    const cart = loadCart();
    const total = getCartTotalPrice(cart);

    cartContainer.innerHTML = "";

    cart.forEach((item, idx) => {
        const row = document.createElement("div");
        row.className = "cart-item-row";
        row.innerHTML = `
            <img src="${item.img}" alt="">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span>Size: ${item.size || "-"}</span>
                <span>Color: ${item.color || "-"}</span>
            </div>
            <div>
                <div class="qty-box">
                    <button class="qty-btn minus" data-idx="${idx}">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn plus" data-idx="${idx}">+</button>
                </div>
            </div>
            <div>
                <strong>${item.price * item.qty} ₸</strong>
            </div>
        `;
        cartContainer.appendChild(row);
    });

    if (cartSummaryTotal) {
        cartSummaryTotal.textContent = total + " ₸";
    }

    // qty events
    cartContainer.querySelectorAll(".qty-btn.minus").forEach(btn => {
        btn.addEventListener("click", () => {
            let cart = loadCart();
            const i = Number(btn.dataset.idx);
            if (cart[i].qty > 1) {
                cart[i].qty--;
            } else {
                cart.splice(i, 1);
            }
            saveCart(cart);
            syncCartPages();
            if (typeof window.SPORTX_renderCartDrawer === "function") {
                window.SPORTX_renderCartDrawer();
            }
        });
    });

    cartContainer.querySelectorAll(".qty-btn.plus").forEach(btn => {
        btn.addEventListener("click", () => {
            let cart = loadCart();
            const i = Number(btn.dataset.idx);
            cart[i].qty++;
            saveCart(cart);
            syncCartPages();
            if (typeof window.SPORTX_renderCartDrawer === "function") {
                window.SPORTX_renderCartDrawer();
            }
        });
    });
}

function initCartPage() {
    const cartPage = document.querySelector(".cart-page");
    if (!cartPage) return;
    syncCartPages();
}

/* ============================================================
   CHECKOUT PAGE LOGIC (checkout.html)
============================================================ */

function initCheckoutPage() {
    const checkoutPage = document.querySelector(".checkout-page");
    if (!checkoutPage) return;

    const goPayment = document.getElementById("goPayment");
    const goConfirm = document.getElementById("goConfirm");
    const finishOrder = document.getElementById("finishOrder");
    const paymentSection = document.getElementById("paymentSection");
    const confirmSection = document.getElementById("confirmSection");

    const pills = document.querySelectorAll(".step-pill");

    function setStep(stepIdx) {
        pills.forEach(p => p.classList.remove("active"));
        if (pills[stepIdx]) pills[stepIdx].classList.add("active");
    }

    if (goPayment && paymentSection) {
        goPayment.addEventListener("click", () => {
            paymentSection.scrollIntoView({ behavior: "smooth" });
            if (confirmSection) confirmSection.classList.remove("hidden");
            setStep(1);
        });
    }

    if (goConfirm && confirmSection) {
        goConfirm.addEventListener("click", () => {
            confirmSection.scrollIntoView({ behavior: "smooth" });
            setStep(2);
        });
    }

    if (finishOrder) {
        finishOrder.addEventListener("click", () => {
            const cart = loadCart();
            if (!cart.length) {
                alert("Your cart is empty.");
                return;
            }

            alert("Your order has been successfully placed!");
            localStorage.setItem(CART_KEY, JSON.stringify([]));
            window.location.href = "orders.html";
        });
    }

    // Summary block
    const summarySubtotal = document.getElementById("summarySubtotal");
    const summaryTotal = document.getElementById("summaryTotal");
    const cartSummary = document.getElementById("cartSummary");

    if (summarySubtotal && summaryTotal && cartSummary) {
        const cart = loadCart();
        let sum = 0;
        cartSummary.innerHTML = "";
        cart.forEach(item => {
            sum += item.price * item.qty;
            cartSummary.innerHTML += `
                <div class="summary-row">
                    <span>${item.name} × ${item.qty}</span>
                    <span>${item.price * item.qty} ₸</span>
                </div>
            `;
        });
        summarySubtotal.textContent = sum + " ₸";
        summaryTotal.textContent = sum + " ₸";
    }
}

/* ============================================================
   PRODUCTS PAGE – FILTER + SORT (products.html)
============================================================ */

function initProductsPageFilters() {
    const grid = document.querySelector(".products-grid");
    const cards = grid ? grid.querySelectorAll(".product-card") : [];
    if (!grid || !cards.length) return;

    const genderBtns = document.querySelectorAll("[data-filter]");
    const catCheckboxes = document.querySelectorAll(".flt-cat");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const sortSelect = document.getElementById("sortSelect") ||
        document.querySelector(".sort-select");

    function applyFilters() {
        const activeGenderBtn = document.querySelector("[data-filter].active");
        const genderFilter = activeGenderBtn ? activeGenderBtn.dataset.filter : "all";

        const checkedCats = [...catCheckboxes]
            .filter(c => c.checked)
            .map(c => c.value);

        const maxPrice = priceRange ? Number(priceRange.value) : Number.MAX_SAFE_INTEGER;

        const items = [...cards];

        items.forEach(card => {
            const cardGender = card.dataset.gender || "all";
            const cardPrice = Number(card.dataset.price || 0);
            const cardCat = card.dataset.category || "";

            const genderOk = genderFilter === "all" || cardGender === genderFilter;
            const catOk = !checkedCats.length || checkedCats.includes(cardCat) || checkedCats.includes("shoes") || checkedCats.includes("clothes") || checkedCats.includes("accessories");
            const priceOk = cardPrice <= maxPrice || !priceRange;

            card.style.display = genderOk && catOk && priceOk ? "block" : "none";
        });
    }

    genderBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            genderBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            applyFilters();
        });
    });

    catCheckboxes.forEach(ch => {
        ch.addEventListener("change", applyFilters);
    });

    if (priceRange && priceValue) {
        priceRange.addEventListener("input", () => {
            priceValue.textContent = priceRange.value + " ₸";
            applyFilters();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            let items = [...cards];

            if (sortSelect.value === "low") {
                items.sort((a, b) => (a.dataset.price || 0) - (b.dataset.price || 0));
            }
            if (sortSelect.value === "high") {
                items.sort((a, b) => (b.dataset.price || 0) - (a.dataset.price || 0));
            }
            if (sortSelect.value === "new") {
                items.sort((a, b) => (b.dataset.id || 0) - (a.dataset.id || 0));
            }

            items.forEach(i => grid.appendChild(i));
        });
    }

    applyFilters();
}

/* ============================================================
   WISHLIST SYSTEM
============================================================ */

function initWishlist() {
    const cards = document.querySelectorAll(".product-card");
    const wishPage = document.querySelector(".wishlist-page");
    let wishlist = loadWishlist();

    function isInWishlist(title) {
        return wishlist.some(item => item.name === title);
    }

    // ON PRODUCT CARDS
    cards.forEach(card => {
        const wishBtn = card.querySelector(".wishlist-btn");
        const titleEl = card.querySelector(".prod-title");
        const priceEl = card.querySelector(".prod-price");
        const imgEl = card.querySelector("img");

        if (!wishBtn || !titleEl || !priceEl || !imgEl) return;

        const title = titleEl.textContent.trim();

        if (isInWishlist(title)) {
            wishBtn.innerHTML = "❤️";
        } else {
            wishBtn.innerHTML = "♡";
        }

        wishBtn.addEventListener("click", () => {
            wishlist = loadWishlist();
            if (isInWishlist(title)) {
                wishlist = wishlist.filter(item => item.name !== title);
            } else {
                const priceNum = Number(priceEl.textContent.replace(/[^\d]/g, ""));
                wishlist.push({
                    name: title,
                    price: priceNum,
                    img: imgEl.src
                });
            }
            saveWishlist(wishlist);
            wishBtn.innerHTML = isInWishlist(title) ? "❤️" : "♡";
            if (wishPage) renderWishlistPage(); // refresh page if on wishlist
        });
    });

    if (wishPage) {
        renderWishlistPage();
    }
}

function renderWishlistPage() {
    const container = document.querySelector(".wishlist-grid");
    const empty = document.querySelector(".wishlist-empty");
    if (!container) return;

    let wishlist = loadWishlist();
    container.innerHTML = "";

    if (!wishlist.length) {
        if (empty) empty.style.display = "block";
        return;
    } else if (empty) {
        empty.style.display = "none";
    }

    wishlist.forEach(item => {
        const card = document.createElement("div");
        card.className = "wishlist-card";
        card.innerHTML = `
            <img src="${item.img}" alt="">
            <h4>${item.name}</h4>
            <div class="price">${item.price} ₸</div>
            <div class="wishlist-actions">
                <button class="btn small-btn add-from-wish">Add to cart</button>
                <button class="remove-wish">×</button>
            </div>
        `;
        container.appendChild(card);

        const addBtn = card.querySelector(".add-from-wish");
        const removeBtn = card.querySelector(".remove-wish");

        addBtn.addEventListener("click", () => {
            addProductToCart({
                id: Date.now(),
                name: item.name,
                price: item.price,
                img: item.img,
                size: "-",
                color: "-",
                qty: 1
            });
            const drawer = document.getElementById("cartDrawer");
            if (drawer) drawer.classList.add("open");
        });

        removeBtn.addEventListener("click", () => {
            let w = loadWishlist();
            w = w.filter(x => x.name !== item.name);
            saveWishlist(w);
            renderWishlistPage();
        });
    });
}

/* ============================================================
   PROFILE PAGE TABS (profile.html)
============================================================ */

function initProfileTabs() {
    const profile = document.querySelector(".profile");
    if (!profile) return;

    const links = document.querySelectorAll(".profile-links li[data-tab]");
    const panels = document.querySelectorAll(".tab-panel");

    function showTab(tab) {
        links.forEach(li => li.classList.remove("active"));
        panels.forEach(p => p.classList.remove("active"));

        const activeLink = document.querySelector(`.profile-links li[data-tab="${tab}"]`);
        const activePanel = document.getElementById(tab);

        if (activeLink) activeLink.classList.add("active");
        if (activePanel) activePanel.classList.add("active");
    }

    links.forEach(li => {
        li.addEventListener("click", () => {
            const tab = li.dataset.tab;
            showTab(tab);
        });
    });

    // default
    if (links[0]) {
        const firstTab = links[0].dataset.tab;
        showTab(firstTab);
    }
}

/* ============================================================
   ORDERS PAGE (orders.html) – SIMPLE FILTER
============================================================ */

function initOrdersPage() {
    const ordersPage = document.querySelector(".orders-page");
    if (!ordersPage) return;

    const statusSelect = document.getElementById("orderStatusFilter");
    const cards = document.querySelectorAll(".order-card");

    if (!statusSelect || !cards.length) return;

    statusSelect.addEventListener("change", () => {
        const val = statusSelect.value; // all / delivered / shipped / processing / cancelled

        cards.forEach(card => {
            const badge = card.querySelector(".order-status");
            if (!badge) return;

            const statusClass = badge.classList.contains("delivered")
                ? "delivered"
                : badge.classList.contains("shipped")
                    ? "shipped"
                    : badge.classList.contains("processing")
                        ? "processing"
                        : badge.classList.contains("cancelled")
                            ? "cancelled"
                            : "other";

            if (val === "all" || val === statusClass) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

/* ============================================================
   INIT ALL ON DOM READY
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMegaMenu();
    initHeroSlider();
    initSearchOverlay();
    initProductGallery();
    initSizeColorSelectors();
    initCartDrawer();
    initProductPageAddToCart();
    initCardAddToCart();
    initCartPage();
    initCheckoutPage();
    initProductsPageFilters();
    initWishlist();
    initProfileTabs();
    initOrdersPage();
});
