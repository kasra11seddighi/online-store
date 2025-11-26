// ============ DATA ============
const products = [
  { id: 1, title: "لپ تاپ 15.6 اینچی لنوو مدل IdeaPad Slim 3", price: 32000000, img: "./public/images/products/image01.png", description: "لپ‌تاپ لنوو با پردازنده i7 نسل 13" },
  { id: 2, title: "لپ تاپ 14 اینچی ایسوس مدل VivoBook R465FA", price: 27000000, img: "./public/images/products/image02.png", description: "لپ‌تاپ اقتصادی ایسوس با i5 نسل 11" },
  { id: 3, title: "لپ تاپ اپل MacBook Air M1", price: 55000000, img: "./public/images/products/image03.png", description: "مک‌بوک ایر با پردازنده M1" },
  { id: 4, title: "لپ تاپ اچ‌پی Envy x360 Ryzen 7", price: 47000000, img: "./public/images/products/image04.png", description: "لپ‌تاپ تبدیل‌پذیر با Ryzen 7" },
  { id: 5, title: "لپ تاپ دل G5 SE Ryzen 5", price: 36000000, img: "./public/images/products/image05.png", description: "لپ‌تاپ گیمینگ دل" },
  { id: 6, title: "لپ تاپ ایسر Nitro 5 Ryzen 7", price: 54000000, img: "./public/images/products/image06.png", description: "گیمینگ قدرتمند با SSD یک ترابایت" },
  { id: 7, title: "لنوو ThinkPad X1 Carbon Gen9", price: 62000000, img: "./public/images/products/image07.png", description: "لپ‌تاپ تجاری با کیفیت بالا" },
  { id: 8, title: "لپ تاپ دل XPS 13 i7", price: 71000000, img: "./public/images/products/image08.png", description: "نازک، سبک و بسیار حرفه‌ای" },
  { id: 9, title: "ایسوس ZenBook 14 Ryzen 5", price: 38000000, img: "./public/images/products/image09.png", description: "سبک، زیبا، باتری عالی" },
  { id: 10, title: "MSI GF63 Thin i5", price: 46000000, img: "./public/images/products/image10.png", description: "مناسب گیمینگ و کارهای سنگین" },
  { id: 11, title: "HP Pavilion 15 i5-12th", price: 34000000, img: "./public/images/products/image11.png", description: "مناسب کارهای روزمره و اداری" },
  { id: 12, title: "Apple MacBook Pro 2021 M1 Pro", price: 85000000, img: "./public/images/products/image12.png", description: "قوی‌ترین لپ‌تاپ اپل برای کارهای سنگین" }
];

let basket = [];


// ============ DOM ============
const productsContainer = document.querySelector(".wrapper");
const basketScreen = document.querySelector(".basket-screen");
const basketMain = document.querySelector(".basket-main");
const openBasketBtn = document.querySelector(".open-basket");
const closeBasketBtn = document.querySelector(".close-basket");
const clearBtn = document.querySelector(".clear-button");
const productsCount = document.querySelector(".products-count");
const count = document.querySelector(".count");


// ============ UI FUNCTIONS ============

// نمایش محصولات
function showProducts() {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    productsContainer.insertAdjacentHTML("beforeend", `
      <article>
        <header class="product-header">
          <img src="${product.img}" class="product-img" />
        </header>

        <main class="product-body">
          <h3 class="product-title">${product.title}</h3>
          <p class="desc">${product.description}</p>
        </main>

        <footer class="product-footer">
          <p class="price">${product.price.toLocaleString()} ت</p>
          <button class="add-to-cart" onclick="addProductToBasket(${product.id})">
            <i class="bx bx-cart-alt"></i> افزودن به سبد
          </button>
        </footer>
      </article>
    `);
  });
}


// باز و بسته کردن سبد
function openBasket() { basketScreen.classList.remove("hidden"); }
function closeBasket() { basketScreen.classList.add("hidden"); }


//
// ============ نمایش سبد ============
function showBasketUI() {
  basketMain.innerHTML = "";

  basket.forEach(product => {
    basketMain.insertAdjacentHTML("beforeend", `
      <article class="basket-item" data-id="${product.id}">
        <div class="flex-center">
          <img src="${product.img}" />

          <div class="basket-item_details">
            <p class="basket-item_title">${product.title}</p>
            <p class="basket-item_price">${product.price.toLocaleString()}</p>
          </div>

          <div>
            <div class="buttons">
              <button class="increase"><i class="bx bx-plus"></i></button>
              <button class="remove-button"><i class="bx bx-trash"></i></button>
              <button class="decrease"><i class="bx bx-minus"></i></button>
            </div>

            <div class="product-count-card">
              <span>تعداد:</span>
              <span class="product-count">${product.count}</span>
            </div>
          </div>
        </div>
      </article>
    `);
  });

  productsCount.innerText = basket.length;
  count.innerText = basket.length;

  activateBasketButtons();
}



// ============ BASKET LOGIC ============

// اضافه کردن
function addProductToBasket(id) {
  const product = products.find(p => p.id === id);
  const existed = basket.find(p => p.id === id);

  if (existed) existed.count++;
  else basket.push({ ...product, count: 1 });

  updateBasket();
}

// حذف
function removeProduct(id) {
  basket = basket.filter(p => p.id !== id);
  updateBasket();
}

// افزایش
function increaseProduct(id) {
  const item = basket.find(p => p.id === id);
  item.count++;
  updateBasket();
}

// کاهش
function decreaseProduct(id) {
  const item = basket.find(p => p.id === id);

  if (item.count > 1) item.count--;
  else basket = basket.filter(p => p.id !== id);

  updateBasket();
}



// ============ دکمه‌های سبد ============
function activateBasketButtons() {
  document.querySelectorAll(".remove-button").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = +e.target.closest(".basket-item").dataset.id;
      removeProduct(id);
    })
  );

  document.querySelectorAll(".increase").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = +e.target.closest(".basket-item").dataset.id;
      increaseProduct(id);
    })
  );

  document.querySelectorAll(".decrease").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = +e.target.closest(".basket-item").dataset.id;
      decreaseProduct(id);
    })
  );
}



// ============ TOTAL PRICE (جمع کل) ============
function calcTotalPrice() {
  let total = basket.reduce((sum, p) => sum + p.price * p.count, 0);
  document.querySelector(".total-price").innerText = total.toLocaleString();
}



// ============ LOCAL STORAGE ============
function saveBasket() {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function loadBasket() {
  const local = JSON.parse(localStorage.getItem("basket"));
  if (local) basket = local;
}



// ============ HELPERS ============
function updateBasket() {
  saveBasket();
  showBasketUI();
  calcTotalPrice();   // ← جمع کل همیشه آپدیت می‌شود
}

function clearBasket() {
  basket = [];
  updateBasket();
  closeBasket();
}



// ============ EVENTS ============
openBasketBtn.addEventListener("click", openBasket);
closeBasketBtn.addEventListener("click", closeBasket);
clearBtn.addEventListener("click", clearBasket);


const loading = document.querySelector(".loading-screen")
function showContent () {
  loading.classList.add("hidden");
}

// ============ INIT ============
loadBasket();
showProducts();
showBasketUI();
calcTotalPrice();
