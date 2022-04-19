//Productos
const products = [
  {
    id: 1,
    img: "img/gd5480_app_photo_front-center_white.jpg",
    title: "CAMPERA ADIDAS ORIGINALS",
    price: "$20000",
  },
  {
    id: 2,
    img: "img/converseChuckTylor.jpg",
    title: "CONVERSE CHUCKTYLOR",
    price: "$12500",
  },
  {
    id: 3,
    img: "img/adidasForumMid.jpg",
    title: "ADIDAS FORUM MID",
    price: "$28997",
  },
  {
    id: 4,
    img: "img/gorraAdidasOriginals.jpg",
    title: "GORRA ORIGINALS",
    price: "$6000",
  },
  {
    id: 5,
    img: "img/product1.jpg",
    title: "REMERA AEROREADY",
    price: "$5997",
  },
  {
    id: 6,
    img: "img/product4.jpg",
    title: "BOTELLA DEPORTIVA",
    price: "$3799",
  },
  {
    id: 7,
    img: "img/headphonesAdidas.jpg",
    title: "HEADSET ADIDAS",
    price: "$32799",
  },
  {
    id: 8,
    img: "img/Maleta_Deportiva_Tiro_Primegreen_Mediana_Azul_GH7267_01_standard.jpg",
    title: "MALETA DEPORTIVA",
    price: "$10799",
  },
];

const shopContent = document.querySelector(".shop-content");

//Cargar productos
document.addEventListener("DOMContentLoaded", () => {
  showProducts();
});

//Funcion showProducts
function showProducts() {
  products.forEach((product) => {
    //Scripting
    const productBox = document.createElement("div");
    productBox.classList.add("product-box");

    const productImg = document.createElement("img");
    productImg.src = product.img;
    productImg.classList.add("product-img");

    const productTitle = document.createElement("h2");
    productTitle.textContent = product.title;
    productTitle.classList.add("product-title");

    const productPrice = document.createElement("span");
    productPrice.textContent = product.price;
    productPrice.classList.add("price");

    const productButton = document.createElement("i");
    productButton.className = "bx bx-shopping-bag add-cart";

    productBox.appendChild(productImg);
    productBox.appendChild(productTitle);
    productBox.appendChild(productPrice);
    productBox.appendChild(productButton);

    shopContent.appendChild(productBox);
  });
}

//Carrito
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//Abrir Carrito
cartIcon.onclick = () => {
  cart.classList.add("active");
};

//Cerrar Carrito
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//Carrito funcionando
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//Funcion ready
function ready() {
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  //console.log(removeCartButtons);
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  //cambiar cantidad
  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  //Agregar items al carrito
  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];
    button.addEventListener("click", addCartCLicked);
  }

  //Boton Comprar ahora
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

//Funcion buyButtonClicked
function buyButtonClicked() {
  alert("Gracias por su compra!!!");
  let cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

/////////////////////Funcion removeCartItem
function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

//////////////////////Cambios de cantidad
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 0;
  }
  updateTotal();
}

////////////////////Funcion addCartClicked
function addCartCLicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

///////////////// Agregar productos al carrito
function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("Ya agregaste este item al carrito");
      return;
    }
  }

  let cartBoxContent = `<img src="${productImg}" alt="" class="cart-img" />
                        <div class="detail-box">
                          <div class="cart-product-title">${title}</div>
                          <div class="cart-price">${price}</div>
                          <input type="number" value="1" class="cart-quantity" />
                        </div>
                        <i class="bx bxs-trash-alt cart-remove"></i> `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

////////////////////////Actualizar total
function updateTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;

  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  //Redondear precios
  total = Math.round(total * 100) / 100;
  //console.log(total);
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}
